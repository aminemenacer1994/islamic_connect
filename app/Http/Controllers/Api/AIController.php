<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChatMessage;
use App\Models\ChatSession;
use App\Services\AIResponseFormatter;
use App\Services\IslamicContentService;
use App\Services\PromptSanitizer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AIController extends Controller
{
    public function ask(
        Request $request,
        IslamicContentService $contentService,
        PromptSanitizer $sanitizer,
        AIResponseFormatter $formatter
    ) {
        $validated = $request->validate([
            'question' => 'required|string|max:1500',
            'session_id' => 'nullable|string|max:64',
            'language' => 'nullable|string|max:12',
        ]);

        $language = strtolower($validated['language'] ?? 'en');
        $language = in_array($language, ['ar', 'en', 'fr', 'es'], true) ? $language : 'en';

        $question = $sanitizer->sanitize($validated['question']);
        if ($question === '') {
            return response()->json(['error' => 'Please enter a clearer question.'], 422);
        }

        if ($sanitizer->containsInjection($question)) {
            return response()->json([
                'error' => 'The question contains unsupported characters or instructions.'
            ], 422);
        }

        $sessionId = $this->validateSessionId($validated['session_id'] ?? null) ?? $this->generateSessionId();
        $session = ChatSession::firstOrCreate(
            ['session_id' => $sessionId],
            ['user_id' => auth()->id()]
        );

        if (auth()->check() && !$session->user_id) {
            $session->update(['user_id' => auth()->id()]);
        }

        try {
            $content = $contentService->gatherContent($question, $language);
            $formatted = $formatter->format($content);
            $this->storeMessage($session, 'user', $question);
            $this->storeMessage(
                $session,
                'assistant',
                $formatted['message'],
                $formatted['short_summary'] ?? null,
                $formatted['references'] ?? [],
            );

            return response()->json([
                'session_id' => $session->session_id,
                'assistant' => [
                    'message' => $formatted['message'],
                    'summary' => $formatted['summary'] ?? [],
                    'references' => $formatted['references'] ?? [],
                ],
            ]);
        } catch (\Throwable $exception) {
            Log::error('AI ask failure', [
                'error' => $exception->getMessage(),
                'session_id' => $sessionId,
            ]);
            return response()->json([
                'error' => 'Noor is temporarily unable to fetch guidance. Please try again in a moment.'
            ], 500);
        }
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
}
