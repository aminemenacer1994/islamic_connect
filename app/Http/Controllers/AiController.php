<?php

namespace App\Http\Controllers;

use App\Services\IslamicAssistantService;
use Illuminate\Http\Request;

class AiController extends Controller
{
    private const DISALLOWED_PATTERN = '/\b(?:porn|sexual|nsfw|violence|terror|drugs|gamble|suicide|racism|hate speech?)\b/i';

    public function index()
    {
        return view('ai');
    }

    public function chat(Request $request, IslamicAssistantService $assistantService)
    {
        $request->validate([
            'message' => 'required|string|max:1500',
            'debug_mode' => 'nullable|boolean',
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

        try {
            $answer = $assistantService->answer($message, 'en', [
                'debug_mode' => (bool) $request->boolean('debug_mode'),
            ]);

            return response()->json([
                'answer' => $answer['message'],
                'references' => $answer['references'],
                'sourced' => $answer['sourced'],
                'category' => $answer['category'] ?? 'general',
                'evidence_level' => $answer['evidence_level'] ?? 'Weak',
                'confidence_score' => $answer['confidence_score'] ?? 0,
                'confidence_badge' => $answer['confidence_badge'] ?? 'Low',
                'ui_badge' => $answer['ui_badge'] ?? 'Low Evidence',
                'debug_mode' => (bool) ($answer['debug_mode'] ?? false),
                'debug' => $answer['debug'] ?? null,
            ]);
        } catch (\Throwable $exception) {
            report($exception);
            return response()->json([
                'error' => 'The Criterion-backed assistant is temporarily unavailable. Please try again in a moment.'
            ], 500);
        }
    }

    private function containsDisallowedContent(string $text): bool
    {
        return (bool) preg_match(self::DISALLOWED_PATTERN, $text);
    }
}
