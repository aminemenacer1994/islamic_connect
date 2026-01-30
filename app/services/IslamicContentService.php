<?php

namespace App\Services;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use App\Models\Ahadith;

class IslamicContentService
{
    protected PromptSanitizer $sanitizer;

    public function __construct(PromptSanitizer $sanitizer)
    {
        $this->sanitizer = $sanitizer;
    }

    /**
     * Aggregate content from multiple Islamic sources.
     *
     * @return array{
     *     question: string,
     *     articles: array|null,
     *     quran: array|null,
     *     hadith: array|null,
     *     dua: array|null
     * }
     */
    public function gatherContent(string $question, string $language = 'en'): array
    {
        $language = $language ?: 'en';
        $cleanQuestion = $this->sanitizer->sanitize($question);
        $keywords = $this->extractKeywords($cleanQuestion);

        return [
            'question' => $cleanQuestion,
            'articles' => $this->fetchIslamHouseArticles($language, $keywords),
            'quran' => $this->fetchQuranReference($keywords, $language),
            'hadith' => $this->fetchHadith($keywords),
            'dua' => $this->fetchDua($language, $keywords),
        ];
    }

    protected function extractKeyword(string $input): string
    {
        $normalized = preg_replace('/[^a-z0-9\s]/i', ' ', trim($input));
        $normalized = preg_replace('/\s+/', ' ', $normalized);
        return Str::limit($normalized, 80, '');
    }

    protected function extractKeywords(string $input, int $limit = 6): array
    {
        if (!$input) {
            return [];
        }
        $clean = strtolower($this->extractKeyword($input));
        $tokens = array_filter(
            array_map('trim', preg_split('/\s+/', $clean)),
            fn ($value) => strlen($value) > 2,
        );
        return array_slice(array_unique($tokens), 0, $limit);
    }

    protected function fetchIslamHouseArticles(string $language, array $keywords = []): ?array
    {
        $apiKey = config('services.islamhouse.key');
        if (!$apiKey) {
            return null;
        }

        $version = strtolower((string) config('services.islamhouse.version', 'v1'));
        $defaultBase = $version === 'v3' ? 'https://api3.islamhouse.com/v3' : 'https://api.islamhouse.com/v1';
        $baseUrl = rtrim(config('services.islamhouse.base', $defaultBase), '/');
        $endpoint = $this->buildIslamHouseEndpoint($baseUrl, $apiKey, $language);

        try {
            $response = Http::withHeaders([
                'Accept' => 'application/json',
            ])->timeout(8000)->retry(1, 600)->get($endpoint);

            if (!$response->successful()) {
                Log::warning('IslamHouse API responded with an unexpected status', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                return null;
            }

            $data = $response->json();
            $items = Arr::get($data, 'items', $data);
            if (!is_array($items)) {
                return null;
            }

            $scored = [];
            $maxScore = 0;
            foreach ($items as $item) {
                $title = Arr::get($item, 'title') ?? Arr::get($item, 'name') ?? Arr::get($item, 'block_name');
                if (!$title) {
                    continue;
                }
                $description = Arr::get($item, 'description')
                    ?? Arr::get($item, 'summary')
                    ?? Arr::get($item, 'teaser')
                    ?? Arr::get($item, 'short_description');
                $url = $this->normalizeIslamHouseUrl(
                    Arr::get($item, 'page_url')
                    ?? Arr::get($item, 'url')
                    ?? Arr::get($item, 'link')
                    ?? Arr::get($item, 'api_url'),
                );

                $score = $this->articleKeywordScore($title, $description, $keywords);
                $maxScore = max($maxScore, $score);
                $scored[] = [
                    'score' => $score,
                    'title' => $title,
                    'description' => $description,
                    'url' => $url,
                ];
            }

            if (!$scored) {
                return null;
            }

            if ($keywords && $maxScore > 0) {
                usort($scored, fn ($a, $b) => $b['score'] <=> $a['score']);
            }

            $articles = array_map(
                fn ($entry) => Arr::only($entry, ['title', 'description', 'url']),
                array_slice($scored, 0, 3),
            );

            return $articles ?: null;
        } catch (\Throwable $exception) {
            Log::warning('Failed to fetch IslamHouse content', [
                'error' => $exception->getMessage(),
            ]);
            return null;
        }
    }

    protected function fetchQuranReference(array $keywords, string $language): ?array
    {
        $edition = $this->editionForLanguage($language);
        $ayahId = $this->pickQuranAyahId($keywords);
        if ($ayahId) {
            return $this->fetchQuranByAyah($ayahId, $edition);
        }

        $query = trim(implode(' ', $keywords));
        if (!$query) {
            return null;
        }

        $encoded = urlencode($query);
        $url = "https://api.alquran.cloud/v1/search/{$encoded}/all/{$edition}";

        try {
            $response = Http::timeout(8000)->retry(1, 500)->get($url);
            if (!$response->successful()) {
                return null;
            }

            $data = $response->json();
            $match = Arr::get($data, 'data.matches.0');
            if (!is_array($match)) {
                return null;
            }

            $surahNumber = Arr::get($match, 'surah.number') ?? Arr::get($match, 'surah') ?? Arr::get($match, 'number') ?? null;
            $ayahNumber = Arr::get($match, 'number') ?? Arr::get($match, 'ayah') ?? null;

            $referenceLabel = $surahNumber && $ayahNumber
                ? sprintf('Surah %s, Ayah %s (%s)', Arr::get($match, 'surah.englishName', 'Quran'), $ayahNumber, $edition)
                : Arr::get($match, 'surah.englishName') ?? 'Quran';

            $urlReference = $surahNumber && $ayahNumber
                ? "https://alquran.cloud/ayah/{$surahNumber}:{$ayahNumber}"
                : null;

            return [
                'text' => Arr::get($match, 'text'),
                'reference' => $referenceLabel,
                'url' => $urlReference,
                'edition' => Arr::get($match, 'edition.name') ?? $edition,
            ];
        } catch (\Throwable $exception) {
            Log::warning('Quran Cloud search failed', [
                'query' => $query,
                'error' => $exception->getMessage(),
            ]);
            return null;
        }
    }

    protected function editionForLanguage(string $language): string
    {
        return match (strtolower($language)) {
            'ar' => 'quran-uthmani',
            'fr' => 'fr.hamdi',
            'es' => 'es.ahmedali',
            default => 'en.asad',
        };
    }

    protected function articleKeywordScore(string $title, ?string $description, array $keywords): int
    {
        if (!$keywords) {
            return 0;
        }
        $haystack = strtolower("{$title} " . ($description ?? ''));
        $score = 0;
        foreach ($keywords as $keyword) {
            if ($keyword && str_contains($haystack, $keyword)) {
                $score += 1;
            }
        }
        return $score;
    }

    protected function buildIslamHouseEndpoint(string $baseUrl, string $apiKey, string $language): string
    {
        $language = $language ?: 'en';
        $version = $this->detectIslamHouseVersion($baseUrl);
        if ($version === 'v3') {
            $page = 1;
            $perPage = 25;
            return "{$baseUrl}/{$apiKey}/main/articles/{$language}/{$language}/{$page}/{$perPage}/json";
        }
        return "{$baseUrl}/{$apiKey}/main/latestupdated/showall/{$language}/showall/20/json";
    }

    protected function detectIslamHouseVersion(string $baseUrl): string
    {
        $normalized = strtolower($baseUrl);
        if (str_contains($normalized, 'api3.islamhouse.com') || str_ends_with($normalized, '/v3')) {
            return 'v3';
        }
        return 'v1';
    }

    protected function normalizeIslamHouseUrl(?string $url): ?string
    {
        $url = trim((string) $url);
        if ($url === '') {
            return null;
        }
        if (preg_match('#^https?://(api2|api3|api)\.islamhouse\.com#i', $url)) {
            return null;
        }
        if (str_starts_with($url, '//')) {
            return "https:{$url}";
        }
        if (str_starts_with($url, '/')) {
            return "https://islamhouse.com{$url}";
        }
        if (!str_starts_with($url, 'http://') && !str_starts_with($url, 'https://')) {
            return null;
        }
        return $url;
    }

    protected function fetchHadith(array $keywords = []): ?array
    {
        try {
            $query = Ahadith::query()->with(['chapter.imam']);
            if ($keywords) {
                $query->where(function ($builder) use ($keywords) {
                    foreach ($keywords as $keyword) {
                        $builder->orWhere('hadith_en', 'like', "%{$keyword}%")
                                ->orWhere('hadith_ar', 'like', "%{$keyword}%");
                    }
                });
            }
            $record = $query->inRandomOrder()->first();
            if ($record && $record->hadith_en) {
                $imam = $record->chapter?->imam?->imam_name;
                $chapter = $record->chapter?->chapter_text;
                $referenceParts = array_filter([$imam, $chapter]);
                $reference = $referenceParts ? implode(' — ', $referenceParts) : 'Prophetic guidance';
                return [
                    'text' => $record->hadith_en,
                    'reference' => $reference,
                    'url' => null,
                ];
            }
        } catch (\Throwable $exception) {
            Log::warning('Hadith lookup in database failed', [
                'error' => $exception->getMessage(),
            ]);
        }

        $edition = 'eng-bukhari';
        $id = random_int(1, 2500);
        $urls = [
            "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/{$edition}/{$id}.json",
            "https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/editions/{$edition}/{$id}.json",
        ];

        foreach ($urls as $url) {
            try {
                $response = Http::timeout(6000)->get($url);
                if (!$response->successful()) {
                    continue;
                }

                $data = $response->json();
                $hadithText = Arr::get($data, 'hadith')
                    ?? Arr::get($data, 'content')
                    ?? Arr::get($data, 'body');
                $reference = Arr::get($data, 'number')
                    ?? Arr::get($data, 'id')
                    ?? $id;
                $book = Arr::get($data, 'book') ?? 'Sahih al-Bukhari';

                if (!$hadithText) {
                    continue;
                }

                return [
                    'text' => $hadithText,
                    'reference' => sprintf('%s, Hadith %s', $book, $reference),
                    'url' => "https://www.sunnah.com/bukhari/{$reference}",
                ];
            } catch (\Throwable $exception) {
                Log::warning('Hadith API call failed', [
                    'url' => $url,
                    'error' => $exception->getMessage(),
                ]);
            }
        }

        return null;
    }

    protected function fetchDua(string $language, array $keywords = []): ?array
    {
        $baseUrl = 'https://dua-dhikr.vercel.app';
        $headers = [
            'Accept' => 'application/json',
            'Accept-Language' => $language,
        ];

        try {
            $categories = Http::withHeaders($headers)->timeout(6000)->get("{$baseUrl}/categories");
            if (!$categories->successful()) {
                return null;
            }

            $list = Arr::get($categories->json(), 'data', Arr::get($categories->json(), 'categories', []));
            if (empty($list) || !is_array($list)) {
                return null;
            }

            $slug = $this->pickDuaCategorySlug($list, $keywords);
            if (!$slug) {
                $slug = Arr::get($list, '0.slug') ?? Arr::get($list, '0.title');
            }

            if (!$slug) {
                return null;
            }

            $duaResponse = Http::withHeaders($headers)->timeout(6000)->get("{$baseUrl}/categories/{$slug}/1");
            if (!$duaResponse->successful()) {
                return null;
            }

            $duaData = Arr::get($duaResponse->json(), 'data', $duaResponse->json());
            if (is_array($duaData) && isset($duaData[0])) {
                $duaData = $duaData[0];
            }

            $text = Arr::get($duaData, 'text') ?? Arr::get($duaData, 'arabic') ?? Arr::get($duaData, 'description');
            $translation = Arr::get($duaData, 'translation') ?? Arr::get($duaData, 'en') ?? Arr::get($duaData, 'meaning');

            if (!$text && !$translation) {
                return null;
            }

            return [
                'text' => $text,
                'translation' => $translation,
                'reference' => Arr::get($duaData, 'title') ?? ucfirst(str_replace('-', ' ', $slug)),
                'url' => "{$baseUrl}/categories/{$slug}/1",
            ];
        } catch (\Throwable $exception) {
            Log::warning('Dua API fetch failed', [
                'error' => $exception->getMessage(),
            ]);
            return null;
        }
    }

    protected function pickDuaCategorySlug(array $categories, array $keywords): ?string
    {
        if (!$keywords) {
            return null;
        }
        foreach ($categories as $category) {
            $title = strtolower(Arr::get($category, 'title', ''));
            $slug = strtolower(Arr::get($category, 'slug', ''));
            foreach ($keywords as $keyword) {
                if (!$keyword) {
                    continue;
                }
                if (str_contains($title, $keyword) || str_contains($slug, $keyword)) {
                    return Arr::get($category, 'slug') ?: Arr::get($category, 'title');
                }
            }
        }
        return null;
    }

    protected function pickQuranAyahId(array $keywords): ?string
    {
        $map = [
            'salah' => '2:45',
            'prayer' => '29:45',
            'prayers' => '2:45',
            'dua' => '40:60',
            'supplication' => '40:60',
            'knowledge' => '20:114',
            'sincerity' => '98:5',
            'intention' => '98:5',
            'patience' => '2:153',
            'gratitude' => '14:7',
            'thankful' => '14:7',
            'mercy' => '39:53',
            'forgiveness' => '39:53',
            'trust' => '3:159',
            'tawakkul' => '3:159',
            'charity' => '2:261',
            'zakat' => '9:60',
            'fasting' => '2:183',
            'ramadan' => '2:185',
            'hajj' => '2:196',
            'hope' => '39:53',
            'fear' => '3:175',
            'taqwa' => '49:13',
            'marriage' => '30:21',
            'family' => '30:21',
            'parents' => '17:23',
            'justice' => '4:135',
            'backbiting' => '49:12',
            'gossip' => '49:12',
            'envy' => '113:5',
        ];

        foreach ($keywords as $keyword) {
            if (isset($map[$keyword])) {
                return $map[$keyword];
            }
        }

        return null;
    }

    protected function fetchQuranByAyah(string $ayahId, string $edition): ?array
    {
        $url = "https://api.alquran.cloud/v1/ayah/{$ayahId}/{$edition}";
        try {
            $response = Http::timeout(8000)->retry(1, 500)->get($url);
            if (!$response->successful()) {
                return null;
            }

            $data = Arr::get($response->json(), 'data');
            if (!is_array($data)) {
                return null;
            }

            $surahName = Arr::get($data, 'surah.englishName', 'Quran');
            $ayahNumber = Arr::get($data, 'numberInSurah') ?? Arr::get($data, 'number');
            $referenceLabel = $ayahNumber
                ? sprintf('Surah %s, Ayah %s (%s)', $surahName, $ayahNumber, $edition)
                : sprintf('Surah %s (%s)', $surahName, $edition);

            return [
                'text' => Arr::get($data, 'text'),
                'reference' => $referenceLabel,
                'url' => "https://alquran.cloud/ayah/{$ayahId}",
                'edition' => $edition,
            ];
        } catch (\Throwable $exception) {
            Log::warning('Quran Cloud ayah lookup failed', [
                'ayah' => $ayahId,
                'error' => $exception->getMessage(),
            ]);
            return null;
        }
    }
}
