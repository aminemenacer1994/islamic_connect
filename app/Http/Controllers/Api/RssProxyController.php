<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class RssProxyController extends Controller
{
    private const CACHE_SECONDS = 600; // 10 minutes

    /**
     * Keep this strict to avoid SSRF: only allow the podcast feed hosts we use.
     */
    private const ALLOWED_HOSTS = [
        'anchor.fm',
        'feeds.buzzsprout.com',
        'footprints.podcast.ismaili',
        'greedforilm.libsyn.com',
        'islamichistorypodcast.podbean.com',
        'muslimcentral.com',
        'www.muslimcentral.com',
        'seekersguidance.org',
        'sultansandsneakers.libsyn.com',
        'themadmamluks.libsyn.com',
        'wivesofjannah.libsyn.com',
        'www.qalaminstitute.org',
    ];

    public function show(Request $request)
    {
        $url = $request->query('url');
        if (!is_string($url) || trim($url) === '') {
            return response()->json(['message' => 'Missing url query parameter.'], 400);
        }

        // Normalize common copy/paste artifacts (zero-width spaces, BOM).
        $url = preg_replace('/[\x{200B}-\x{200D}\x{FEFF}]/u', '', trim($url));

        $parts = parse_url($url);
        if (!$parts || empty($parts['scheme']) || empty($parts['host'])) {
            return response()->json(['message' => 'Invalid RSS URL.'], 400);
        }

        $scheme = strtolower($parts['scheme']);
        if (!in_array($scheme, ['https', 'http'], true)) {
            return response()->json(['message' => 'Only http/https RSS URLs are supported.'], 400);
        }

        $host = strtolower($parts['host']);
        if (!in_array($host, self::ALLOWED_HOSTS, true)) {
            return response()->json(['message' => 'RSS host is not allowed.'], 403);
        }

        // Cache by full URL (including query string) to keep different feeds distinct.
        $cacheKey = 'rss_proxy:' . sha1($url);

        try {
            $body = Cache::remember($cacheKey, self::CACHE_SECONDS, function () use ($url) {
                // Some providers reject default user agents.
                $response = Http::withHeaders([
                    'User-Agent' => 'IslamicConnectRSSProxy/1.0',
                    'Accept' => 'application/rss+xml, application/xml, text/xml, */*',
                ])
                    ->timeout(12)
                    ->get($url);

                if (!$response->successful()) {
                    throw new \RuntimeException('Upstream HTTP ' . $response->status());
                }

                return $response->body();
            });
        } catch (\Throwable $e) {
            // Clear cached failures (if any) so a transient issue doesn't get stuck.
            try {
                Cache::forget($cacheKey);
            } catch (\Throwable $ignored) {
            }

            $message = $e->getMessage();
            if (!Str::startsWith($message, 'Upstream HTTP')) {
                $message = 'Failed to fetch RSS feed.';
            }

            return response()->json(['message' => $message], 502);
        }

        return response($body, 200, [
            'Content-Type' => 'application/xml; charset=UTF-8',
            'Cache-Control' => 'public, max-age=' . self::CACHE_SECONDS,
        ]);
    }
}
