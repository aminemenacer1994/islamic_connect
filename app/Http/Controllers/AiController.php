<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiController extends Controller
{
    private const SYSTEM_INSTRUCTIONS = <<<'INSTRUCTIONS'
You are Al-Ilm, the Islamic Connect Scholar Bot.
Answer using Quran and authentic Sunnah references, share concise context, and avoid speculation.
If a question is outside Islamic guidance, inappropriate, or cannot be handled accurately, gently say so and steer back to Islamic topics.
Keep responses respectful, inclusive, and grounded in reliable Islamic teachings.
INSTRUCTIONS;

    private const HISTORY_LIMIT = 6;
    private const DISALLOWED_PATTERN = '/\b(?:porn|sexual|nsfw|violence|terror|drugs|gamble|suicide|racism|hate speech?)\b/i';

    public function index()
    {
        return view('ai');
    }

    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:1500',
        ]);

        $message = trim($request->input('message', ''));
        if ($message === '') {
            return response()->json(['error' => 'Please enter a question.'], 422);
        }

        if ($this->containsDisallowedContent($message)) {
            return response()->json([
                'error' => 'This chatbot only responds to respectful Islamic questions. Please rephrase your request.'
            ], 422);
        }

        $history = $this->sanitizeHistory($request->input('history'));

        $token = config('services.huggingface.token');
        $model = config('services.huggingface.model');
        if (!$token || !$model) {
            return response()->json([
                'error' => 'The chat service is not configured. Please reach out to the site administrator.'
            ], 500);
        }

        $messages = $this->buildMessages($message, $history);

        $provider = config('services.huggingface.router_provider') ?? 'novita';

        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$token}",
                'Content-Type' => 'application/json',
            ])
            ->timeout(45000)
            ->post('https://router.huggingface.co/v1/chat/completions', [
                'model' => $model,
                'provider' => $provider,
                'messages' => $messages,
                'temperature' => 0.2,
                'top_p' => 0.8,
                'max_tokens' => 450,
                'stream' => false,
                'stop' => null,
                'options' => [
                    'use_cache' => false,
                ],
            ]);

            if ($response->failed()) {
                $payload = $response->json();
                $hfError = data_get($payload, 'error.message') ?: ($payload['error'] ?? null);
                $errorMessage = is_string($hfError) ? $hfError : 'The Hugging Face service returned an unexpected error.';
                Log::warning('Hugging Face response failed', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                return response()->json(['error' => $errorMessage], $response->status());
            }

            $payload = $response->json();
            $answer = $this->extractGeneratedText($payload);

            if (trim($answer) === '') {
                throw new \RuntimeException('Received empty response from Hugging Face');
            }

            return response()->json(['answer' => trim($answer)]);
        } catch (\Throwable $exception) {
            report($exception);
            return response()->json([
                'error' => 'The Islamic assistant is temporarily unavailable. Please try again in a moment.'
            ], 500);
        }
    }

    private function containsDisallowedContent(string $text): bool
    {
        return (bool) preg_match(self::DISALLOWED_PATTERN, $text);
    }

    private function sanitizeHistory($history): array
    {
        if (!is_array($history)) {
            return [];
        }

        $filtered = [];
        foreach ($history as $item) {
            $role = isset($item['role']) && $item['role'] === 'assistant' ? 'assistant' : 'user';
            $content = trim($item['content'] ?? $item['text'] ?? '');
            if ($content === '') {
                continue;
            }
            $filtered[] = [
                'role' => $role,
                'content' => $content,
            ];
        }

        return array_slice($filtered, -self::HISTORY_LIMIT);
    }

    private function buildMessages(string $message, array $history): array
    {
        $messages = [
            [
                'role' => 'system',
                'content' => self::SYSTEM_INSTRUCTIONS,
            ],
        ];

        foreach ($history as $entry) {
            $messages[] = [
                'role' => $entry['role'],
                'content' => $entry['content'],
            ];
        }

        $messages[] = [
            'role' => 'user',
            'content' => $message,
        ];

        return $messages;
    }

    private function extractGeneratedText($payload): string
    {
        if (is_string($payload)) {
            return $payload;
        }
        if (is_array($payload)) {
            if (isset($payload['choices']) && is_array($payload['choices'])) {
                foreach ($payload['choices'] as $choice) {
                    if (isset($choice['message']['content'])) {
                        return (string) $choice['message']['content'];
                    }
                    if (isset($choice['text'])) {
                        return (string) $choice['text'];
                    }
                }
            }
            $first = reset($payload);
            if (is_array($first) && isset($first['generated_text'])) {
                return (string) $first['generated_text'];
            }
            if (isset($payload['generated_text'])) {
                return (string) $payload['generated_text'];
            }
        }

        return '';
    }
}
