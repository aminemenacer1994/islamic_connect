<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AiMessageReport;
use App\Models\ChatMessage;
use App\Models\ChatSession;
use App\Services\IslamicAssistantService;
use App\Services\IslamicVerificationPipeline;
use App\Services\PromptSanitizer;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

class AIController extends Controller
{
    public function ask(
        Request $request,
        IslamicAssistantService $assistantService,
        PromptSanitizer $sanitizer,
        IslamicVerificationPipeline $verificationPipeline
    ) {
        $validated = $request->validate([
            'question' => 'required|string|max:1500',
            'session_id' => 'nullable|string|max:64',
            'language' => 'nullable|string|max:12',
            'debug_mode' => 'nullable|boolean',
        ]);

        $language = strtolower($validated['language'] ?? 'en');
        $language = in_array($language, ['ar', 'en', 'fr', 'es'], true) ? $language : 'en';

        $question = $sanitizer->sanitize($validated['question']);
        if ($question === '') {
            return response()->json(['error' => 'Please enter a clearer question.'], 422);
        }

        if ($sanitizer->containsInjection($question)) {
            return response()->json([
                'error' => 'The question contains unsupported characters or instructions.',
            ], 422);
        }

        $sessionId = $this->validateSessionId($validated['session_id'] ?? null) ?? $this->generateSessionId();
        $session = $this->resolveSession($sessionId);

        try {
            $answer = $assistantService->answer($question, $language, [
                'debug_mode' => (bool) ($validated['debug_mode'] ?? false),
            ]);

            if (($answer['debug_mode'] ?? false) === true) {
                return response()->json([
                    'session_id' => $session?->session_id ?? $sessionId,
                    'assistant' => [
                        'message' => $answer['message'],
                        'summary' => [],
                        'references' => [],
                        'sourced' => false,
                        'category' => (string) ($answer['category'] ?? 'general'),
                        'evidence_level' => (string) ($answer['evidence_level'] ?? 'Weak'),
                        'confidence_score' => (int) ($answer['confidence_score'] ?? 0),
                        'confidence_badge' => (string) ($answer['confidence_badge'] ?? 'Low'),
                        'ui_badge' => (string) ($answer['ui_badge'] ?? 'Low Evidence'),
                        'context_sections' => [],
                        'debug_mode' => true,
                        'debug' => $answer['debug'] ?? [],
                    ],
                ]);
            }

            $references = array_slice($answer['references'] ?? [], 0, 8);
            $confidence = match ((int) ($answer['confidence_score'] ?? 0)) {
                90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100 => 'high',
                60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89 => 'medium',
                default => 'low',
            };
            $verification = [
                'verified' => (bool) ($answer['sourced'] ?? false),
                'confidence' => $confidence,
                'category' => [$answer['sourced'] ? 'retrieval_augmented' : 'fallback'],
                'totalSources' => count($references),
                'message' => ($answer['sourced'] ?? false)
                    ? 'Answer built from IslamHouse source context.'
                    : 'No verified IslamHouse source was found for this question.',
                'timestamp' => now()->toIso8601String(),
            ];

            $verification = array_merge(
                $verification,
                Arr::only(
                    $verificationPipeline->verifyResponse(
                        $question,
                        $answer['message'] ?? null,
                        $references
                    ),
                    ['criticalHashes']
                )
            );

            $this->storeMessageSafely($session, 'user', $question);
            $this->storeMessageSafely(
                $session,
                'assistant',
                $answer['message'],
                $answer['short_summary'] ?? null,
                $references,
            );

            return response()->json([
                'session_id' => $session?->session_id ?? $sessionId,
                'assistant' => [
                    'message' => $answer['message'],
                    'summary' => [],
                    'references' => $references,
                    'sourced' => (bool) ($answer['sourced'] ?? false),
                    'category' => (string) ($answer['category'] ?? 'general'),
                    'evidence_level' => (string) ($answer['evidence_level'] ?? 'Weak'),
                    'confidence_score' => (int) ($answer['confidence_score'] ?? 0),
                    'confidence_badge' => (string) ($answer['confidence_badge'] ?? 'Low'),
                    'ui_badge' => (string) ($answer['ui_badge'] ?? 'Low Evidence'),
                    'context_sections' => $answer['context_sections'] ?? [],
                    'verification' => Arr::only(
                        $verification,
                        ['verified', 'confidence', 'category', 'totalSources', 'message', 'timestamp']
                    ),
                ],
            ]);
        } catch (\Throwable $exception) {
            Log::error('AI ask failure', [
                'error' => $exception->getMessage(),
                'session_id' => $sessionId,
            ]);
            return response()->json([
                'error' => 'Noor is temporarily unable to fetch guidance. Please try again in a moment.',
            ], 500);
        }
    }

    public function report(Request $request)
    {
        $validated = $request->validate([
            'session_id' => 'nullable|string|max:64',
            'entry_key' => 'nullable|string|max:96',
            'reason' => 'required|string|in:incorrect,harmful,off_topic,offensive,other',
            'details' => 'nullable|string|max:1500',
            'reported_text' => 'required|string|max:12000',
            'question_text' => 'nullable|string|max:1500',
            'references' => 'nullable|array|max:2',
            'references.*.label' => 'required_with:references|string|max:180',
            'references.*.url' => 'nullable|url|max:2048',
            'references.*.sourceBadge' => 'nullable|string|max:24',
            'references.*.hadithGrade' => 'nullable|string|max:24',
            'verification' => 'nullable|array',
            'verification.verified' => 'nullable|boolean',
            'verification.confidence' => 'nullable|string|max:16',
            'verification.totalSources' => 'nullable|integer|min:0|max:50',
            'verification.message' => 'nullable|string|max:1000',
            'message_time' => 'nullable|date',
            'page_url' => 'nullable|url|max:2048',
        ]);

        $sessionId = $this->validateSessionId($validated['session_id'] ?? null);
        $chatSession = null;

        if ($sessionId) {
            try {
                $chatSession = ChatSession::where('session_id', $sessionId)->first();
            } catch (\Throwable $exception) {
                Log::warning('AI report session lookup failed', [
                    'session_id' => $sessionId,
                    'error' => $exception->getMessage(),
                ]);
            }
        }

        try {
            $report = AiMessageReport::create([
                'chat_session_id' => $chatSession?->id,
                'user_id' => auth()->id(),
                'session_id' => $sessionId,
                'entry_key' => $this->normalizeOptionalText($validated['entry_key'] ?? null),
                'reason' => $validated['reason'],
                'details' => $this->normalizeOptionalText($validated['details'] ?? null),
                'reported_text' => trim((string) $validated['reported_text']),
                'question_text' => $this->normalizeOptionalText($validated['question_text'] ?? null),
                'message_time' => $validated['message_time'] ?? null,
                'references' => $this->normalizeReportReferences($validated['references'] ?? []),
                'verification' => $this->normalizeReportVerification($validated['verification'] ?? null),
                'page_url' => $this->normalizeOptionalText($validated['page_url'] ?? null),
                'user_agent' => $this->normalizeOptionalText($request->userAgent(), 1024),
                'reporter_ip' => $request->ip(),
                'status' => 'open',
            ]);

            return response()->json([
                'message' => 'Report submitted successfully.',
                'report_id' => $report->id,
            ], 201);
        } catch (\Throwable $exception) {
            Log::error('AI report persistence failed', [
                'session_id' => $sessionId,
                'entry_key' => $validated['entry_key'] ?? null,
                'reason' => $validated['reason'] ?? null,
                'error' => $exception->getMessage(),
            ]);

            return response()->json([
                'error' => 'Unable to submit report right now. Please try again.',
            ], 500);
        }
    }

    private function resolveSession(string $sessionId): ?ChatSession
    {
        try {
            $session = ChatSession::firstOrCreate(
                ['session_id' => $sessionId],
                ['user_id' => auth()->id()]
            );

            if (auth()->check() && !$session->user_id) {
                $session->update(['user_id' => auth()->id()]);
            }

            return $session;
        } catch (\Throwable $exception) {
            Log::warning('AI session persistence unavailable', [
                'error' => $exception->getMessage(),
                'session_id' => $sessionId,
            ]);
            return null;
        }
    }

    public function batchVerify(
        Request $request,
        PromptSanitizer $sanitizer,
        IslamicVerificationPipeline $verificationPipeline
    ) {
        $validated = $request->validate([
            'questions' => 'required|array|min:1|max:1000',
            'questions.*.id' => 'nullable|string|max:64',
            'questions.*.question' => 'required|string|max:1500',
        ]);

        $questions = $validated['questions'];
        $results = [];
        $memo = [];
        $summary = [
            'total' => count($questions),
            'verified' => 0,
            'failed' => 0,
            'high_confidence' => 0,
            'medium_confidence' => 0,
            'low_confidence' => 0,
        ];

        foreach ($questions as $index => $item) {
            $question = $sanitizer->sanitize((string) ($item['question'] ?? ''));
            $id = (string) ($item['id'] ?? ('Q' . ($index + 1)));

            if ($question === '') {
                $summary['failed'] += 1;
                $summary['low_confidence'] += 1;
                $results[] = [
                    'id' => $id,
                    'question' => '',
                    'verified' => false,
                    'confidence' => 'low',
                    'message' => 'Empty or invalid question after sanitization.',
                    'category' => ['general'],
                    'totalSources' => 0,
                ];
                continue;
            }

            $memoKey = strtolower($question);
            if (!isset($memo[$memoKey])) {
                $memo[$memoKey] = $verificationPipeline->verifyResponse($question, null, []);
            }

            $verification = $memo[$memoKey];
            if ($verification['verified']) {
                $summary['verified'] += 1;
            } else {
                $summary['failed'] += 1;
            }

            $confidence = (string) ($verification['confidence'] ?? 'low');
            if ($confidence === 'high') {
                $summary['high_confidence'] += 1;
            } elseif ($confidence === 'medium') {
                $summary['medium_confidence'] += 1;
            } else {
                $summary['low_confidence'] += 1;
            }

            $results[] = [
                'id' => $id,
                'question' => $question,
                'verified' => (bool) ($verification['verified'] ?? false),
                'confidence' => $confidence,
                'message' => (string) ($verification['message'] ?? ''),
                'category' => $verification['category'] ?? ['general'],
                'totalSources' => (int) ($verification['totalSources'] ?? 0),
                'references' => array_slice($verification['references'] ?? [], 0, 5),
            ];
        }

        return response()->json([
            'summary' => $summary,
            'generated_at' => now()->toIso8601String(),
            'results' => $results,
        ]);
    }

    private function validateSessionId(?string $sessionId): ?string
    {
        if (!$sessionId) {
            return null;
        }

        return preg_match('/^[A-Za-z0-9\-]+$/', $sessionId) ? $sessionId : null;
    }

    private function generateSessionId(): string
    {
        return uniqid('noor-', true);
    }

    private function storeMessage(
        ChatSession $session,
        string $role,
        string $message,
        ?string $shortSummary = null,
        array $references = []
    ): ChatMessage {
        return ChatMessage::create([
            'chat_session_id' => $session->id,
            'role' => $role,
            'message' => $message,
            'short_summary' => $shortSummary,
            'references' => $references ?: null,
        ]);
    }

    private function storeMessageSafely(
        ?ChatSession $session,
        string $role,
        string $message,
        ?string $shortSummary = null,
        array $references = []
    ): void {
        if (!$session) {
            return;
        }

        try {
            $this->storeMessage($session, $role, $message, $shortSummary, $references);
        } catch (\Throwable $exception) {
            Log::warning('AI message persistence unavailable', [
                'error' => $exception->getMessage(),
                'session_id' => $session->session_id,
                'role' => $role,
            ]);
        }
    }

    private function normalizeReferenceUrl(?string $url): ?string
    {
        $url = trim((string) $url);
        if ($url === '') {
            return null;
        }
        if (str_starts_with($url, '//')) {
            return "https:{$url}";
        }
        if (!str_starts_with($url, 'http://') && !str_starts_with($url, 'https://')) {
            return null;
        }
        return $url;
    }

    private function normalizeOptionalText(?string $value, int $maxLength = 0): ?string
    {
        $text = trim((string) $value);
        if ($text === '') {
            return null;
        }
        if ($maxLength > 0 && strlen($text) > $maxLength) {
            return substr($text, 0, $maxLength);
        }
        return $text;
    }

    private function normalizeReportReferences($references): ?array
    {
        if (!is_array($references) || empty($references)) {
            return null;
        }

        $normalized = [];
        foreach (array_slice($references, 0, 2) as $reference) {
            if (!is_array($reference)) {
                continue;
            }
            $label = trim((string) ($reference['label'] ?? ''));
            if ($label === '') {
                continue;
            }

            $normalized[] = [
                'label' => substr($label, 0, 180),
                'url' => $this->normalizeReferenceUrl($reference['url'] ?? null),
                'sourceBadge' => $this->normalizeOptionalText($reference['sourceBadge'] ?? null, 24),
                'hadithGrade' => $this->normalizeOptionalText($reference['hadithGrade'] ?? null, 24),
            ];
        }

        return $normalized ?: null;
    }

    private function normalizeReportVerification($verification): ?array
    {
        if (!is_array($verification) || empty($verification)) {
            return null;
        }

        return [
            'verified' => (bool) ($verification['verified'] ?? false),
            'confidence' => $this->normalizeOptionalText($verification['confidence'] ?? null, 16),
            'totalSources' => max(0, (int) ($verification['totalSources'] ?? 0)),
            'message' => $this->normalizeOptionalText($verification['message'] ?? null, 1000),
        ];
    }

}
