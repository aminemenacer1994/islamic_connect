<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class HuggingFaceRecitationController extends Controller
{
    private const DEFAULT_MODEL = 'openai/whisper-large-v3';

    public function transcribe(Request $request): JsonResponse
    {
        $request->validate([
            'audio' => ['required', 'file', 'max:25600'],
            'model' => ['nullable', 'string', 'max:120'],
        ]);

        $token = trim((string) config('services.huggingface.recitation_token', ''));
        if ($token === '') {
            return response()->json([
                'error' => 'Hugging Face recitation token is not configured on the server.',
            ], 500);
        }

        $audio = $request->file('audio');
        if (!$audio || !$audio->isValid()) {
            return response()->json([
                'error' => 'A valid audio recording is required.',
            ], 422);
        }

        $model = trim((string) $request->input('model', self::DEFAULT_MODEL));
        if ($model === '') {
            $model = self::DEFAULT_MODEL;
        }

        $mimeType = trim((string) ($audio->getMimeType() ?: 'application/octet-stream'));
        $filename = trim((string) ($audio->getClientOriginalName() ?: 'recitation.webm'));

        try {
            $response = Http::withToken($token)
                ->withHeaders([
                    'Accept' => 'application/json',
                ])
                ->attach(
                    'file',
                    fopen($audio->getRealPath(), 'r'),
                    $filename,
                    ['Content-Type' => $mimeType]
                )
                ->timeout(90)
                ->post(
                    sprintf('https://api-inference.huggingface.co/models/%s', rawurlencode($model))
                );

            $payload = $response->json();

            if (!$response->successful()) {
                return response()->json([
                    'error' => data_get($payload, 'error')
                        ?: data_get($payload, 'message')
                        ?: sprintf('Transcription failed (%s).', $response->status()),
                    'estimated_time' => data_get($payload, 'estimated_time'),
                ], $response->status() ?: 502);
            }

            $text = '';
            if (is_string($payload)) {
                $text = $payload;
            } elseif (is_array($payload)) {
                $text = (string) (
                    data_get($payload, 'text')
                    ?: data_get($payload, '0.text')
                    ?: ''
                );
            }

            return response()->json([
                'text' => trim($text),
            ]);
        } catch (\Throwable $exception) {
            report($exception);

            return response()->json([
                'error' => 'Transcription proxy request failed.',
            ], 502);
        }
    }
}
