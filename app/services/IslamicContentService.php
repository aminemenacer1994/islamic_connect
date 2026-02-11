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
     *     dua: array|null,
     *     local_faq: array|null
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
            'dua' => null,
            'local_faq' => null,
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

        $stopWords = [
            'what', 'which', 'who', 'where', 'when', 'why', 'how',
            'tell', 'show', 'explain', 'share', 'give', 'teach',
            'about', 'regarding', 'related', 'please',
            'this', 'that', 'these', 'those',
            'with', 'from', 'into', 'onto', 'over', 'under',
            'have', 'has', 'had', 'will', 'would', 'could', 'should',
            'does', 'did', 'done', 'make', 'made', 'also', 'just',
            'your', 'yours', 'my', 'mine', 'our', 'ours', 'their', 'theirs',
            'for', 'and', 'the', 'are', 'was', 'were',
        ];

        $filtered = array_values(array_filter(
            $tokens,
            fn ($token) => !in_array($token, $stopWords, true)
        ));

        if (empty($filtered)) {
            $filtered = array_values($tokens);
        }

        $normalized = array_map(
            fn ($token) => trim(strtolower(Str::singular($token))),
            $filtered
        );

        return array_slice(array_values(array_unique(array_filter($normalized))), 0, $limit);
    }

    protected function fetchLocalFaqAnswer(string $question, array $keywords = []): ?array
    {
        static $faqDataset = null;
        if ($faqDataset === null) {
            $faqDataset = $this->loadLocalFaqDataset();
        }

        if (empty($faqDataset)) {
            return null;
        }

        $queryKeywords = $keywords ?: $this->extractKeywords($question, 8);
        $normalizedQuestion = strtolower(trim($this->extractKeyword($question)));
        $best = null;
        $bestScore = 0;
        $bestKeywordMatches = 0;
        $bestTitleExactMatch = false;

        foreach ($faqDataset as $chapter) {
            if (!is_array($chapter)) {
                continue;
            }

            $chapterTitle = strtolower(trim((string) ($chapter['title'] ?? $chapter['key'] ?? '')));
            $faqs = $chapter['faqs'] ?? [];
            if (!is_array($faqs)) {
                continue;
            }

            foreach ($faqs as $faq) {
                if (!is_array($faq)) {
                    continue;
                }

                $title = trim((string) ($faq['title'] ?? ''));
                $body = $this->plainText((string) ($faq['body'] ?? ''));
                if ($title === '' || $body === '') {
                    continue;
                }

                $titleHaystack = strtolower($title);
                $bodyHaystack = strtolower($body);
                $score = 0;
                $matchedKeywords = 0;
                $titleExactMatch = false;

                foreach ($queryKeywords as $keyword) {
                    if ($keyword === '') {
                        continue;
                    }
                    $normalizedKeyword = strtolower($keyword);
                    $matched = false;
                    if (str_contains($titleHaystack, $normalizedKeyword)) {
                        $score += 4;
                        $matched = true;
                    }
                    if ($chapterTitle !== '' && str_contains($chapterTitle, $normalizedKeyword)) {
                        $score += 2;
                        $matched = true;
                    }
                    if (str_contains($bodyHaystack, $normalizedKeyword)) {
                        $score += 1;
                        $matched = true;
                    }
                    if ($matched) {
                        $matchedKeywords++;
                    }
                }

                if ($normalizedQuestion !== '') {
                    if (str_contains($titleHaystack, $normalizedQuestion) || str_contains($normalizedQuestion, $titleHaystack)) {
                        $score += 15;
                        $titleExactMatch = true;
                    }
                }

                if (!empty($queryKeywords)) {
                    $allKeywordsInTitle = true;
                    foreach ($queryKeywords as $keyword) {
                        if (!str_contains($titleHaystack, strtolower($keyword))) {
                            $allKeywordsInTitle = false;
                            break;
                        }
                    }
                    if ($allKeywordsInTitle) {
                        $score += 8;
                    }
                }

                if (!empty($queryKeywords) && $matchedKeywords === 0 && !$titleExactMatch) {
                    continue;
                }

                if (
                    $score > $bestScore
                    || ($score === $bestScore && $matchedKeywords > $bestKeywordMatches)
                ) {
                    $bestScore = $score;
                    $bestKeywordMatches = $matchedKeywords;
                    $bestTitleExactMatch = $titleExactMatch;
                    $best = [
                        'title' => $title,
                        'text' => $body,
                        'topic' => $chapter['title'] ?? $chapter['key'] ?? 'General',
                    ];
                }
            }
        }

        if (!$best) {
            return null;
        }

        $requiredKeywordMatches = count($queryKeywords) >= 2 ? 2 : (count($queryKeywords) === 1 ? 1 : 0);
        if (!$bestTitleExactMatch && $bestScore < 4) {
            return null;
        }
        if (!$bestTitleExactMatch && $requiredKeywordMatches > 0 && $bestKeywordMatches < $requiredKeywordMatches) {
            return null;
        }

        return [
            'title' => $best['title'],
            'text' => Str::limit((string) $best['text'], 720, '...'),
            'reference' => sprintf('Local FAQ: %s', (string) $best['title']),
            'topic' => $best['topic'],
            'url' => null,
        ];
    }

    protected function loadLocalFaqDataset(): array
    {
        $paths = [
            resource_path('components/vue/data/faqs.json'),
            resource_path('components/vue/data/commonQuestions.json'),
        ];

        $all = [];

        foreach ($paths as $path) {
            if (!is_file($path)) {
                continue;
            }

            try {
                $raw = file_get_contents($path);
                $decoded = json_decode((string) $raw, true);
                if (is_array($decoded)) {
                    $all = array_merge($all, $decoded);
                }
            } catch (\Throwable $exception) {
                Log::warning('Failed to load local FAQ dataset file', [
                    'path' => $path,
                    'error' => $exception->getMessage(),
                ]);
            }
        }

        return $all;
    }

    protected function plainText(string $value): string
    {
        $text = strip_tags($value);
        $text = html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $text = preg_replace('/\s+/', ' ', $text);
        return trim((string) $text);
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

        $query = $this->buildQuranSearchQuery($keywords);
        if (!$query) {
            return null;
        }

        $encoded = urlencode($query);
        $url = "https://api.alquran.cloud/v1/search/{$encoded}/all/{$edition}";

        try {
            $response = Http::timeout(8000)->retry(1, 500)->get($url);
            if (!$response->successful()) {
                return $this->fetchQuranReferenceFromGading($keywords);
            }

            $data = $response->json();
            $match = $this->selectBestQuranMatch(
                Arr::get($data, 'data.matches', []),
                $keywords
            );
            if (!is_array($match)) {
                return $this->fetchQuranReferenceFromGading($keywords);
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
        }

        return $this->fetchQuranReferenceFromGading($keywords);
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
        if (empty($keywords)) {
            return null;
        }

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
            $record = $query->orderBy('id')->first();
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

        return $this->fetchHadithFromJsonApis($keywords);
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
                return $this->fetchQuranByAyahFromGading($ayahId);
            }

            $data = Arr::get($response->json(), 'data');
            if (!is_array($data)) {
                return $this->fetchQuranByAyahFromGading($ayahId);
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
        }

        return $this->fetchQuranByAyahFromGading($ayahId);
    }

    protected function fetchQuranReferenceFromGading(array $keywords): ?array
    {
        $query = $this->buildQuranSearchQuery($keywords);
        if ($query === '') {
            return null;
        }

        $baseUrl = rtrim((string) config('services.quran_gading.base', 'https://api.quran.gading.dev'), '/');
        $url = "{$baseUrl}/search?q=" . urlencode($query);

        try {
            $response = Http::acceptJson()->timeout(8000)->retry(1, 500)->get($url);
            if (!$response->successful()) {
                return null;
            }

            $results = Arr::get($response->json(), 'data', []);
            if (!is_array($results) || empty($results)) {
                return null;
            }

            $match = is_array($results[0] ?? null) ? $results[0] : null;
            if (!$match) {
                return null;
            }

            $surahNumber = (int) (Arr::get($match, 'surah.number') ?? Arr::get($match, 'surah.number.id') ?? 0);
            $ayahNumber = (int) (Arr::get($match, 'number.inSurah') ?? Arr::get($match, 'number') ?? 0);
            $verseText = trim((string) (
                Arr::get($match, 'translation.en')
                ?? Arr::get($match, 'translation.id')
                ?? Arr::get($match, 'text.transliteration.en')
                ?? Arr::get($match, 'text.arab')
                ?? ''
            ));

            if ($surahNumber <= 0 || $ayahNumber <= 0 || $verseText === '') {
                return null;
            }

            $surahName = trim((string) (
                Arr::get($match, 'surah.name.transliteration.en')
                ?? Arr::get($match, 'surah.englishName')
                ?? Arr::get($match, 'surah.name.short')
                ?? 'Quran'
            ));

            return [
                'text' => $verseText,
                'reference' => sprintf('Surah %s, Ayah %d (quran.gading.dev)', $surahName, $ayahNumber),
                'url' => "https://quran.com/{$surahNumber}/{$ayahNumber}",
                'edition' => 'quran.gading.dev',
            ];
        } catch (\Throwable $exception) {
            Log::warning('Quran Gading search failed', [
                'query' => $query,
                'error' => $exception->getMessage(),
            ]);
            return null;
        }
    }

    protected function fetchQuranByAyahFromGading(string $ayahId): ?array
    {
        [$surah, $ayah] = array_pad(explode(':', $ayahId, 2), 2, null);
        $surahNumber = (int) $surah;
        $ayahNumber = (int) $ayah;
        if ($surahNumber <= 0 || $ayahNumber <= 0) {
            return null;
        }

        $baseUrl = rtrim((string) config('services.quran_gading.base', 'https://api.quran.gading.dev'), '/');
        $url = "{$baseUrl}/surah/{$surahNumber}/{$ayahNumber}";

        try {
            $response = Http::acceptJson()->timeout(8000)->retry(1, 500)->get($url);
            if (!$response->successful()) {
                return null;
            }

            $data = Arr::get($response->json(), 'data', []);
            if (!is_array($data)) {
                return null;
            }

            $verseText = trim((string) (
                Arr::get($data, 'translation.en')
                ?? Arr::get($data, 'translation.id')
                ?? Arr::get($data, 'text.transliteration.en')
                ?? Arr::get($data, 'text.arab')
                ?? ''
            ));
            if ($verseText === '') {
                return null;
            }

            $surahName = trim((string) (
                Arr::get($data, 'surah.name.transliteration.en')
                ?? Arr::get($data, 'surah.englishName')
                ?? Arr::get($data, 'surah.name.short')
                ?? 'Quran'
            ));

            return [
                'text' => $verseText,
                'reference' => sprintf('Surah %s, Ayah %d (quran.gading.dev)', $surahName, $ayahNumber),
                'url' => "https://quran.com/{$surahNumber}/{$ayahNumber}",
                'edition' => 'quran.gading.dev',
            ];
        } catch (\Throwable $exception) {
            Log::warning('Quran Gading ayah lookup failed', [
                'ayah' => $ayahId,
                'error' => $exception->getMessage(),
            ]);
            return null;
        }
    }

    protected function fetchHadithFromJsonApis(array $keywords): ?array
    {
        if (empty($keywords)) {
            return null;
        }

        $baseUrl = rtrim((string) config(
            'services.hadith_json.base',
            'https://raw.githubusercontent.com/AhmedBaset/hadith-json/main/db/by_book/the_9_books'
        ), '/');
        $legacyBase = rtrim((string) config(
            'services.hadith_json.legacy_base',
            'https://raw.githubusercontent.com/islamic-network/hadith-json/main'
        ), '/');

        $collections = ['bukhari', 'muslim', 'abudawud', 'tirmidhi', 'nasai', 'ibnmajah'];

        foreach ($collections as $collection) {
            $result = $this->searchHadithJsonCollection("{$baseUrl}/{$collection}.json", $collection, $keywords);
            if ($result) {
                return $result;
            }
        }

        foreach (['bukhari', 'muslim'] as $collection) {
            $result = $this->searchHadithJsonCollection("{$legacyBase}/{$collection}.json", $collection, $keywords, true);
            if ($result) {
                return $result;
            }
        }

        return null;
    }

    protected function searchHadithJsonCollection(
        string $url,
        string $collection,
        array $keywords,
        bool $legacyFormat = false
    ): ?array {
        try {
            $response = Http::acceptJson()->timeout(8000)->retry(1, 500)->get($url);
            if (!$response->successful()) {
                return null;
            }

            $payload = $response->json();
            $rows = $legacyFormat
                ? (is_array($payload) ? $payload : [])
                : Arr::get($payload, 'hadiths', []);
            if (!is_array($rows) || empty($rows)) {
                return null;
            }

            $best = null;
            $bestScore = 0;
            foreach (array_slice($rows, 0, 2000) as $row) {
                if (!is_array($row)) {
                    continue;
                }

                $english = trim((string) (
                    Arr::get($row, 'english')
                    ?? Arr::get($row, 'text')
                    ?? Arr::get($row, 'text_en')
                    ?? Arr::get($row, 'hadithEnglish')
                    ?? ''
                ));
                $arabic = trim((string) (
                    Arr::get($row, 'arabic')
                    ?? Arr::get($row, 'text_ar')
                    ?? Arr::get($row, 'hadithArabic')
                    ?? ''
                ));
                $text = $english !== '' ? $english : $arabic;
                if ($text === '') {
                    continue;
                }

                $haystack = strtolower($english !== '' ? $english : $text);
                $score = 0;
                foreach ($keywords as $keyword) {
                    if ($keyword !== '' && str_contains($haystack, strtolower($keyword))) {
                        $score += 1;
                    }
                }

                if ($score > $bestScore) {
                    $bestScore = $score;
                    $best = $row;
                }
            }

            if (!$best || $bestScore === 0) {
                return null;
            }

            $number = trim((string) (
                Arr::get($best, 'hadith_number')
                ?? Arr::get($best, 'hadithnumber')
                ?? Arr::get($best, 'number')
                ?? Arr::get($best, 'id')
                ?? ''
            ));
            $text = trim((string) (
                Arr::get($best, 'english')
                ?? Arr::get($best, 'text')
                ?? Arr::get($best, 'text_en')
                ?? Arr::get($best, 'hadithEnglish')
                ?? Arr::get($best, 'arabic')
                ?? Arr::get($best, 'text_ar')
                ?? Arr::get($best, 'hadithArabic')
                ?? ''
            ));

            if ($text === '') {
                return null;
            }

            $reference = ucfirst($collection) . ($number !== '' ? " Hadith {$number}" : ' Hadith');

            return [
                'text' => $text,
                'reference' => $reference,
                'url' => $number !== '' ? "https://sunnah.com/{$collection}:{$number}" : null,
            ];
        } catch (\Throwable $exception) {
            Log::warning('Hadith JSON lookup failed', [
                'collection' => $collection,
                'url' => $url,
                'error' => $exception->getMessage(),
            ]);
            return null;
        }
    }

    protected function buildQuranSearchQuery(array $keywords): string
    {
        if (empty($keywords)) {
            return '';
        }

        $priority = [
            'allah', 'islam', 'iman', 'tawhid', 'taqwa',
            'salah', 'prayer', 'dua', 'charity', 'zakat',
            'fasting', 'ramadan', 'hajj', 'mercy', 'forgiveness',
            'patience', 'justice', 'family', 'parents', 'marriage',
        ];

        $scored = [];
        foreach ($keywords as $index => $keyword) {
            $score = in_array($keyword, $priority, true) ? 2 : 1;
            $scored[] = ['keyword' => $keyword, 'score' => $score, 'index' => $index];
        }

        usort($scored, function ($a, $b) {
            if ($a['score'] === $b['score']) {
                return $a['index'] <=> $b['index'];
            }
            return $b['score'] <=> $a['score'];
        });

        $top = array_slice(array_map(fn ($item) => $item['keyword'], $scored), 0, 3);
        return trim(implode(' ', $top));
    }

    protected function selectBestQuranMatch($matches, array $keywords): ?array
    {
        if (!is_array($matches) || empty($matches)) {
            return null;
        }

        $candidates = array_slice($matches, 0, 12);
        $ranked = [];

        foreach ($candidates as $index => $match) {
            if (!is_array($match)) {
                continue;
            }

            $text = strtolower(trim((string) Arr::get($match, 'text', '')));
            $surahName = strtolower(trim((string) Arr::get($match, 'surah.englishName', '')));

            $score = 0;
            foreach ($keywords as $keyword) {
                if ($keyword === '') {
                    continue;
                }
                if ($text !== '' && str_contains($text, $keyword)) {
                    $score += 3;
                }
                if ($surahName !== '' && str_contains($surahName, $keyword)) {
                    $score += 1;
                }
            }

            $ranked[] = [
                'score' => $score,
                'index' => $index,
                'match' => $match,
            ];
        }

        if (empty($ranked)) {
            return null;
        }

        usort($ranked, function ($a, $b) {
            if ($a['score'] === $b['score']) {
                return $a['index'] <=> $b['index'];
            }
            return $b['score'] <=> $a['score'];
        });

        return $ranked[0]['match'] ?? null;
    }
}
