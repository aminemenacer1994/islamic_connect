<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class PexelsController extends Controller
{
    public function search(Request $request)
    {
        $query = trim((string) $request->query('query', ''));
        $perPage = (int) $request->query('per_page', 1);

        if ($query === '') {
            return response()->json(['message' => 'Missing query'], 422);
        }

        $perPage = max(1, min($perPage, 3));

        $apiKey = (string) config('services.pexels.key');
        if (trim($apiKey) === '') {
            return response()->json(['message' => 'Pexels API key not configured'], 500);
        }

        $cacheKey = 'pexels:search:' . md5(strtolower($query) . ':' . $perPage);

        return Cache::remember($cacheKey, now()->addDay(), function () use ($apiKey, $query, $perPage) {
            $base = rtrim((string) config('services.pexels.base', 'https://api.pexels.com/v1'), '/');
            $url = $base . '/search';

            $resp = Http::withHeaders([
                'Authorization' => $apiKey,
                'Accept' => 'application/json',
            ])->timeout(12)->get($url, [
                'query' => $query,
                'per_page' => $perPage,
                'orientation' => 'landscape',
                'size' => 'large',
            ]);

            if (!$resp->ok()) {
                return response()->json([
                    'message' => 'Pexels request failed',
                    'status' => $resp->status(),
                ], 502);
            }

            $data = $resp->json() ?: [];
            $photos = $data['photos'] ?? [];
            $first = is_array($photos) && count($photos) ? $photos[0] : null;

            $result = [
                'url' => $first['src']['large'] ?? $first['src']['landscape'] ?? null,
                'photographer' => $first['photographer'] ?? null,
                'pexels_url' => $first['url'] ?? null,
            ];

            return response()->json($result);
        });
    }
}

