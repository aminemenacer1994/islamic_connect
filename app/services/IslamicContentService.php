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
            'articles' => $this->fetchArticles($language, $keywords),
            'quran' => $this->fetchQuranReference($keywords, $language),
            'hadith' => $this->fetchHadith($keywords, $language),
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

    protected function fetchArticles(string $language, array $keywords = []): ?array
    {
        $sources = [
            $this->fetchIslamHouseArticles($language, $keywords),
            $this->fetchIslamicContentApiArticles($language, $keywords),
        ];

        $merged = [];
        $seen = [];

        foreach ($sources as $items) {
            if (!is_array($items)) {
                continue;
            }

            foreach ($items as $item) {
                if (!is_array($item)) {
                    continue;
                }

                $title = trim((string) ($item['title'] ?? ''));
                $description = trim((string) (
                    $item['description']
                    ?? $item['summary']
                    ?? $item['text']
                    ?? ''
                ));
                $url = $this->normalizeGenericUrl(
                    (string) ($item['url'] ?? $item['link'] ?? '')
                );

                if ($title === '' && $description === '') {
                    continue;
                }

                $dedupeKey = strtolower($title . '|' . ($url ?? ''));
                if ($dedupeKey === '|' || isset($seen[$dedupeKey])) {
                    continue;
                }
                $seen[$dedupeKey] = true;

                $merged[] = [
                    'title' => $title !== '' ? $title : 'Islamic insight',
                    'description' => $description,
                    'url' => $url,
                ];
            }
        }

        if (empty($merged)) {
            return null;
        }

        if (!empty($keywords)) {
            usort($merged, function (array $a, array $b) use ($keywords): int {
                $aScore = $this->articleKeywordScore((string) ($a['title'] ?? ''), (string) ($a['description'] ?? ''), $keywords);
                $bScore = $this->articleKeywordScore((string) ($b['title'] ?? ''), (string) ($b['description'] ?? ''), $keywords);
                return $bScore <=> $aScore;
            });
        }

        return array_slice($merged, 0, 3);
    }

    protected function fetchIslamicContentApiArticles(string $language, array $keywords = []): ?array
    {
        $baseUrl = rtrim((string) config('services.islamic_content_api.base', ''), '/');
        if ($baseUrl === '') {
            return null;
        }

        $headers = [
            'Accept' => 'application/json',
        ];

        $apiKey = trim((string) config('services.islamic_content_api.key', ''));
        $apiKeyHeader = trim((string) config('services.islamic_content_api.key_header', 'X-API-Key'));
        if ($apiKey !== '' && $apiKeyHeader !== '') {
            $headers[$apiKeyHeader] = $apiKey;
        }

        $query = $this->buildQuranSearchQuery($keywords);
        $searchEndpoint = (string) config('services.islamic_content_api.articles_search_endpoint', '/search');
        $articlesEndpoint = (string) config('services.islamic_content_api.articles_endpoint', '/articles');

        $payloads = [];
        $request = Http::withHeaders($headers)->acceptJson()->timeout(8)->retry(0, 0);

        if ($query !== '') {
            $searchUrl = $this->buildExternalApiUrl($baseUrl, $searchEndpoint);
            foreach ([
                ['q' => $query, 'language' => $language],
                ['query' => $query, 'lang' => $language],
                ['keyword' => $query, 'language' => $language],
            ] as $params) {
                try {
                    $response = $request->get($searchUrl, $params);
                    if ($response->successful() && is_array($response->json())) {
                        $payloads[] = $response->json();
                    }
                } catch (\Throwable $exception) {
                    Log::warning('Islamic Content API article search failed', [
                        'endpoint' => $searchUrl,
                        'error' => $exception->getMessage(),
                    ]);
                }
            }
        }

        $articlesUrl = $this->buildExternalApiUrl($baseUrl, $articlesEndpoint);
        foreach ([
            ['language' => $language],
            ['lang' => $language],
            [],
        ] as $params) {
            try {
                $response = $request->get($articlesUrl, $params);
                if ($response->successful() && is_array($response->json())) {
                    $payloads[] = $response->json();
                }
            } catch (\Throwable $exception) {
                Log::warning('Islamic Content API articles endpoint failed', [
                    'endpoint' => $articlesUrl,
                    'error' => $exception->getMessage(),
                ]);
            }
        }

        if (empty($payloads)) {
            return null;
        }

        $articles = [];
        foreach ($payloads as $payload) {
            $articles = array_merge(
                $articles,
                $this->extractArticlesFromPayload($payload, $keywords)
            );
        }

        if (empty($articles)) {
            return null;
        }

        $seen = [];
        $deduped = [];
        foreach ($articles as $article) {
            $title = strtolower(trim((string) ($article['title'] ?? '')));
            $url = strtolower(trim((string) ($article['url'] ?? '')));
            $key = $title . '|' . $url;
            if (isset($seen[$key])) {
                continue;
            }
            $seen[$key] = true;
            $deduped[] = $article;
        }

        if (empty($deduped)) {
            return null;
        }

        if (!empty($keywords)) {
            usort($deduped, function (array $a, array $b) use ($keywords): int {
                $aScore = $this->articleKeywordScore((string) ($a['title'] ?? ''), (string) ($a['description'] ?? ''), $keywords);
                $bScore = $this->articleKeywordScore((string) ($b['title'] ?? ''), (string) ($b['description'] ?? ''), $keywords);
                return $bScore <=> $aScore;
            });
        }

        return array_slice($deduped, 0, 3);
    }

    protected function fetchIslamHouseArticles(string $language, array $keywords = []): ?array
    {
        $apiKey = config('services.islamhouse.key');
        if (!$apiKey) {
            return null;
        }

        $baseUrl = rtrim((string) config('services.islamhouse.base', 'https://api3.islamhouse.com/v3'), '/');
        $endpoint = $this->buildIslamHouseEndpoint($baseUrl, $apiKey, $language, $keywords);

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
            $items = Arr::get($data, 'data.items')
                ?? Arr::get($data, 'items')
                ?? Arr::get($data, 'data');
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
        $quranEncResult = $this->fetchQuranReferenceFromQuranEnc($keywords, $language);
        if ($quranEncResult) {
            return $quranEncResult;
        }

        $quranComResult = $this->fetchQuranReferenceFromQuranCom($keywords, $language);
        if ($quranComResult) {
            return $quranComResult;
        }

        $ktauchathurangaResult = $this->fetchQuranReferenceFromKtauchathuranga($keywords, $language);
        if ($ktauchathurangaResult) {
            return $ktauchathurangaResult;
        }

        $quranFoundationResult = $this->fetchQuranReferenceFromQuranFoundation($keywords, $language);
        if ($quranFoundationResult) {
            return $quranFoundationResult;
        }

        $quranMcpResult = $this->fetchQuranReferenceFromMcpServer($keywords, $language);
        if ($quranMcpResult) {
            return $quranMcpResult;
        }

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

    protected function fetchQuranReferenceFromQuranEnc(array $keywords, string $language): ?array
    {
        $ayahId = $this->pickQuranAyahId($keywords);
        if ($ayahId) {
            $ayahResult = $this->fetchQuranByAyahFromQuranEnc($ayahId, $language);
            if ($ayahResult) {
                return $ayahResult;
            }
        }

        $query = $this->buildQuranSearchQuery($keywords);
        if ($query === '') {
            return null;
        }

        $translationKey = $this->resolveQuranEncTranslationKey($language);
        $baseUrl = rtrim((string) config('services.quranenc.base', 'https://quranenc.com/api/v1'), '/');
        $url = "{$baseUrl}/search/{$translationKey}/" . urlencode($query);

        try {
            $response = Http::acceptJson()->timeout(8000)->retry(1, 500)->get($url);
            if (!$response->successful()) {
                return null;
            }

            $results = Arr::get($response->json(), 'result', []);
            if (!is_array($results) || empty($results)) {
                return null;
            }

            $match = $this->selectBestQuranEncMatch($results, $keywords);
            if (!is_array($match)) {
                return null;
            }

            $surahNumber = (int) (Arr::get($match, 'sura') ?? Arr::get($match, 'surah') ?? 0);
            $ayahNumber = (int) (Arr::get($match, 'aya') ?? Arr::get($match, 'ayah') ?? 0);
            $translationText = trim((string) (
                Arr::get($match, 'translation')
                ?? Arr::get($match, 'text')
                ?? Arr::get($match, 'arabic_text')
                ?? ''
            ));

            if ($translationText === '' || $surahNumber <= 0 || $ayahNumber <= 0) {
                return null;
            }

            return [
                'text' => $translationText,
                'reference' => sprintf('Surah %d, Ayah %d (QuranEnc)', $surahNumber, $ayahNumber),
                'url' => "https://quran.com/{$surahNumber}/{$ayahNumber}",
                'edition' => $translationKey,
            ];
        } catch (\Throwable $exception) {
            Log::warning('QuranEnc search failed', [
                'query' => $query,
                'translation' => $translationKey,
                'error' => $exception->getMessage(),
            ]);
            return null;
        }
    }

    protected function fetchQuranByAyahFromQuranEnc(string $ayahId, string $language): ?array
    {
        [$surah, $ayah] = array_pad(explode(':', $ayahId, 2), 2, null);
        $surahNumber = (int) $surah;
        $ayahNumber = (int) $ayah;

        if ($surahNumber <= 0 || $ayahNumber <= 0) {
            return null;
        }

        $translationKey = $this->resolveQuranEncTranslationKey($language);
        $baseUrl = rtrim((string) config('services.quranenc.base', 'https://quranenc.com/api/v1'), '/');
        $url = "{$baseUrl}/translation/aya/{$translationKey}/{$surahNumber}/{$ayahNumber}";

        try {
            $response = Http::acceptJson()->timeout(8000)->retry(1, 500)->get($url);
            if (!$response->successful()) {
                return null;
            }

            $result = Arr::get($response->json(), 'result');
            if (!is_array($result)) {
                return null;
            }

            $translationText = trim((string) (
                Arr::get($result, 'translation')
                ?? Arr::get($result, 'text')
                ?? Arr::get($result, 'arabic_text')
                ?? ''
            ));

            if ($translationText === '') {
                return null;
            }

            return [
                'text' => $translationText,
                'reference' => sprintf('Surah %d, Ayah %d (QuranEnc)', $surahNumber, $ayahNumber),
                'url' => "https://quran.com/{$surahNumber}/{$ayahNumber}",
                'edition' => $translationKey,
            ];
        } catch (\Throwable $exception) {
            Log::warning('QuranEnc ayah lookup failed', [
                'ayah' => $ayahId,
                'translation' => $translationKey,
                'error' => $exception->getMessage(),
            ]);
            return null;
        }
    }

    protected function fetchQuranReferenceFromQuranCom(array $keywords, string $language): ?array
    {
        $query = $this->buildQuranSearchQuery($keywords);
        $searchLanguage = $this->resolveQuranComLanguage($language);
        $baseUrl = rtrim((string) config('services.quran_com.base', 'https://api.quran.com/api/v4'), '/');
        $searchSize = max(5, min(50, (int) config('services.quran_com.search_size', 20)));

        if ($query !== '') {
            $url = "{$baseUrl}/search?q=" . urlencode($query)
                . "&size={$searchSize}&page=1&language={$searchLanguage}";

            try {
                $response = Http::acceptJson()->timeout(8000)->retry(1, 500)->get($url);
                if ($response->successful()) {
                    $results = Arr::get($response->json(), 'search.results', []);
                    if (!is_array($results) || empty($results)) {
                        $results = Arr::get($response->json(), 'results', []);
                    }

                    if (is_array($results) && !empty($results)) {
                        $best = $this->selectBestQuranComMatch($results, $keywords);
                        if (is_array($best)) {
                            $verseKey = trim((string) (
                                Arr::get($best, 'verse_key')
                                ?? Arr::get($best, 'key')
                                ?? ''
                            ));
                            $snippet = $this->cleanQuranComSearchText((string) (
                                Arr::get($best, 'text')
                                ?? Arr::get($best, 'translated_text')
                                ?? Arr::get($best, 'translation')
                                ?? ''
                            ));

                            if ($verseKey !== '') {
                                $byKey = $this->fetchQuranComVerseByKey($verseKey, $snippet);
                                if ($byKey) {
                                    return $byKey;
                                }
                            }

                            if ($snippet !== '') {
                                return [
                                    'text' => $snippet,
                                    'reference' => 'Quran.com search result',
                                    'url' => $verseKey !== '' ? 'https://quran.com/' . str_replace(':', '/', $verseKey) : 'https://quran.com',
                                    'edition' => 'quran.com',
                                ];
                            }
                        }
                    }
                }
            } catch (\Throwable $exception) {
                Log::warning('Quran.com search failed', [
                    'query' => $query,
                    'language' => $searchLanguage,
                    'error' => $exception->getMessage(),
                ]);
            }
        }

        $ayahId = $this->pickQuranAyahId($keywords);
        if (!$ayahId) {
            return null;
        }

        return $this->fetchQuranComVerseByKey($ayahId);
    }

    protected function fetchQuranComVerseByKey(string $verseKey, string $fallbackText = ''): ?array
    {
        $cleanVerseKey = trim($verseKey);
        if ($cleanVerseKey === '') {
            return null;
        }

        $baseUrl = rtrim((string) config('services.quran_com.base', 'https://api.quran.com/api/v4'), '/');
        $url = "{$baseUrl}/verses/by_key/{$cleanVerseKey}?words=false&fields=text_uthmani,text_imlaei_simple";

        try {
            $response = Http::acceptJson()->timeout(8000)->retry(1, 500)->get($url);
            if (!$response->successful()) {
                return null;
            }

            $verse = Arr::get($response->json(), 'verse', []);
            if (!is_array($verse) || empty($verse)) {
                return null;
            }

            [$keySurah, $keyAyah] = array_pad(explode(':', $cleanVerseKey, 2), 2, null);
            $surahNumber = (int) (
                Arr::get($verse, 'chapter_id')
                ?? $keySurah
                ?? 0
            );
            $ayahNumber = (int) (
                Arr::get($verse, 'verse_number')
                ?? $keyAyah
                ?? 0
            );

            $text = trim((string) $fallbackText);
            if ($text === '') {
                $text = trim((string) (
                    Arr::get($verse, 'text_imlaei_simple')
                    ?? Arr::get($verse, 'text_uthmani')
                    ?? Arr::get($verse, 'text')
                    ?? ''
                ));
            }

            if ($text === '') {
                return null;
            }

            return [
                'text' => $text,
                'reference' => ($surahNumber > 0 && $ayahNumber > 0)
                    ? sprintf('Surah %d, Ayah %d (Quran.com)', $surahNumber, $ayahNumber)
                    : 'Quran.com verse',
                'url' => ($surahNumber > 0 && $ayahNumber > 0)
                    ? "https://quran.com/{$surahNumber}/{$ayahNumber}"
                    : "https://quran.com/" . str_replace(':', '/', $cleanVerseKey),
                'edition' => 'quran.com',
            ];
        } catch (\Throwable $exception) {
            Log::warning('Quran.com verse lookup failed', [
                'verse_key' => $cleanVerseKey,
                'error' => $exception->getMessage(),
            ]);
            return null;
        }
    }

    protected function fetchQuranReferenceFromKtauchathuranga(array $keywords, string $language): ?array
    {
        return $this->fetchQuranReferenceFromConfigurableProvider(
            'ktauchathuranga_quran',
            'Ktauchathuranga Quran API',
            $keywords,
            $language
        );
    }

    protected function fetchQuranReferenceFromQuranFoundation(array $keywords, string $language): ?array
    {
        return $this->fetchQuranReferenceFromConfigurableProvider(
            'quran_foundation',
            'Quran.Foundation API',
            $keywords,
            $language
        );
    }

    protected function fetchQuranReferenceFromMcpServer(array $keywords, string $language): ?array
    {
        $baseUrl = rtrim((string) config('services.quran_mcp.base', ''), '/');
        if ($baseUrl === '') {
            return null;
        }

        $headers = $this->buildProviderHeaders('quran_mcp', [
            'Accept' => 'application/json',
        ]);
        $searchEndpoint = (string) config('services.quran_mcp.search_endpoint', '/search');
        $ayahEndpoint = (string) config('services.quran_mcp.ayah_endpoint', '/ayah');

        $ayahId = $this->pickQuranAyahId($keywords);
        if ($ayahId) {
            $ayahUrl = $this->buildExternalApiUrl($baseUrl, $ayahEndpoint);
            foreach ([
                ['ayah' => $ayahId, 'language' => $language],
                ['verse_key' => $ayahId, 'language' => $language],
            ] as $body) {
                $payload = $this->requestJson('post', $ayahUrl, [], $body, $headers, 'quran_mcp_ayah');
                if (is_array($payload)) {
                    $result = $this->extractQuranReferenceFromExternalPayload(
                        $payload,
                        $keywords,
                        'Quran MCP Server'
                    );
                    if ($result) {
                        return $result;
                    }
                }
            }

            $payload = $this->requestJson(
                'get',
                $ayahUrl,
                ['ayah' => $ayahId, 'language' => $language],
                [],
                $headers,
                'quran_mcp_ayah'
            );
            if (is_array($payload)) {
                $result = $this->extractQuranReferenceFromExternalPayload(
                    $payload,
                    $keywords,
                    'Quran MCP Server'
                );
                if ($result) {
                    return $result;
                }
            }
        }

        $query = $this->buildQuranSearchQuery($keywords);
        if ($query === '') {
            return null;
        }

        $searchUrl = $this->buildExternalApiUrl($baseUrl, $searchEndpoint);
        foreach ([
            ['query' => $query, 'language' => $language],
            ['q' => $query, 'language' => $language],
            ['text' => $query, 'language' => $language],
        ] as $payloadBody) {
            $payload = $this->requestJson('post', $searchUrl, [], $payloadBody, $headers, 'quran_mcp_search');
            if (is_array($payload)) {
                $result = $this->extractQuranReferenceFromExternalPayload(
                    $payload,
                    $keywords,
                    'Quran MCP Server'
                );
                if ($result) {
                    return $result;
                }
            }
        }

        $payload = $this->requestJson(
            'get',
            $searchUrl,
            ['q' => $query, 'language' => $language],
            [],
            $headers,
            'quran_mcp_search'
        );
        if (is_array($payload)) {
            return $this->extractQuranReferenceFromExternalPayload(
                $payload,
                $keywords,
                'Quran MCP Server'
            );
        }

        return null;
    }

    protected function fetchQuranReferenceFromConfigurableProvider(
        string $providerConfigKey,
        string $sourceLabel,
        array $keywords,
        string $language
    ): ?array {
        $baseUrl = rtrim((string) config("services.{$providerConfigKey}.base", ''), '/');
        if ($baseUrl === '') {
            return null;
        }

        $headers = $this->buildProviderHeaders($providerConfigKey, [
            'Accept' => 'application/json',
        ]);

        $ayahId = $this->pickQuranAyahId($keywords);
        if ($ayahId) {
            $byAyah = $this->fetchQuranReferenceFromProviderByAyah(
                $providerConfigKey,
                $sourceLabel,
                $baseUrl,
                $headers,
                $ayahId,
                $keywords,
                $language
            );
            if ($byAyah) {
                return $byAyah;
            }
        }

        $query = $this->buildQuranSearchQuery($keywords);
        if ($query === '') {
            return null;
        }

        $endpoints = $this->normalizeEndpointList(
            config("services.{$providerConfigKey}.search_endpoints", []),
            (string) config("services.{$providerConfigKey}.search_endpoint", '/search')
        );

        foreach ($endpoints as $endpoint) {
            $url = $this->buildExternalApiUrl($baseUrl, $endpoint);
            foreach ([
                ['q' => $query, 'language' => $language],
                ['query' => $query, 'lang' => $language],
                ['search' => $query, 'language' => $language],
                ['keyword' => $query, 'language' => $language],
            ] as $params) {
                $payload = $this->requestJson(
                    'get',
                    $url,
                    $params,
                    [],
                    $headers,
                    "{$providerConfigKey}_search"
                );
                if (!is_array($payload)) {
                    continue;
                }

                $result = $this->extractQuranReferenceFromExternalPayload(
                    $payload,
                    $keywords,
                    $sourceLabel
                );
                if ($result) {
                    return $result;
                }
            }
        }

        return null;
    }

    protected function fetchQuranReferenceFromProviderByAyah(
        string $providerConfigKey,
        string $sourceLabel,
        string $baseUrl,
        array $headers,
        string $ayahId,
        array $keywords,
        string $language
    ): ?array {
        [$surah, $ayah] = array_pad(explode(':', $ayahId, 2), 2, null);
        $surahNumber = (int) $surah;
        $ayahNumber = (int) $ayah;
        if ($surahNumber <= 0 || $ayahNumber <= 0) {
            return null;
        }

        $endpoints = $this->normalizeEndpointList(
            config("services.{$providerConfigKey}.ayah_endpoints", []),
            (string) config("services.{$providerConfigKey}.ayah_endpoint", '/ayah/{surah}/{ayah}')
        );

        foreach ($endpoints as $endpoint) {
            $resolvedPath = strtr($endpoint, [
                '{surah}' => (string) $surahNumber,
                '{ayah}' => (string) $ayahNumber,
                '{ayah_id}' => $ayahId,
                '{verse_key}' => $ayahId,
            ]);
            $url = $this->buildExternalApiUrl($baseUrl, $resolvedPath);

            $payload = $this->requestJson(
                'get',
                $url,
                ['language' => $language],
                [],
                $headers,
                "{$providerConfigKey}_ayah"
            );
            if (!is_array($payload)) {
                $payload = $this->requestJson(
                    'get',
                    $url,
                    ['lang' => $language],
                    [],
                    $headers,
                    "{$providerConfigKey}_ayah"
                );
            }
            if (!is_array($payload)) {
                continue;
            }

            $result = $this->extractQuranReferenceFromExternalPayload(
                $payload,
                $keywords,
                $sourceLabel
            );
            if ($result) {
                return $result;
            }
        }

        return null;
    }

    protected function selectBestQuranComMatch(array $matches, array $keywords): ?array
    {
        $best = null;
        $bestScore = -1;

        foreach (array_slice($matches, 0, 40) as $match) {
            if (!is_array($match)) {
                continue;
            }

            $text = $this->cleanQuranComSearchText((string) (
                Arr::get($match, 'text')
                ?? Arr::get($match, 'translated_text')
                ?? Arr::get($match, 'translation')
                ?? ''
            ));
            $score = $this->scoreByKeywords($text, $keywords);

            if ($score > $bestScore) {
                $bestScore = $score;
                $best = $match;
            }
        }

        return $best ?? (is_array($matches[0] ?? null) ? $matches[0] : null);
    }

    protected function cleanQuranComSearchText(string $value): string
    {
        $text = strip_tags($value);
        $text = html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $text = preg_replace('/\s+/', ' ', $text);
        return trim((string) $text);
    }

    protected function resolveQuranComLanguage(string $language): string
    {
        $normalized = strtolower(trim($language));
        if ($normalized === '') {
            return 'en';
        }
        if (str_contains($normalized, '-')) {
            $normalized = explode('-', $normalized)[0];
        }

        if ($normalized === 'ar') {
            return 'ar';
        }

        // Quran.com search is most reliable with English for broad keyword search.
        return 'en';
    }

    protected function selectBestQuranEncMatch(array $matches, array $keywords): ?array
    {
        $best = null;
        $bestScore = -1;

        foreach (array_slice($matches, 0, 24) as $index => $match) {
            if (!is_array($match)) {
                continue;
            }

            $haystack = strtolower(trim((string) (
                Arr::get($match, 'translation')
                ?? Arr::get($match, 'text')
                ?? Arr::get($match, 'arabic_text')
                ?? ''
            )));

            $score = 0;
            foreach ($keywords as $keyword) {
                if ($keyword !== '' && $haystack !== '' && str_contains($haystack, strtolower($keyword))) {
                    $score += 2;
                }
            }

            if ($score > $bestScore) {
                $bestScore = $score;
                $best = $match;
            }
        }

        return $best ?? (is_array($matches[0] ?? null) ? $matches[0] : null);
    }

    protected function resolveQuranEncTranslationKey(string $language): string
    {
        static $resolved = [];

        $normalizedLanguage = $this->normalizeQuranEncLanguage($language);
        if (isset($resolved[$normalizedLanguage])) {
            return $resolved[$normalizedLanguage];
        }

        $fallbackMap = [
            'ar' => 'arabic_moyassar',
            'fr' => 'french_montada',
            'es' => 'spanish_garcia',
            'en' => (string) config('services.quranenc.fallback_translation_key', 'english_saheeh'),
        ];
        $fallback = $fallbackMap[$normalizedLanguage]
            ?? (string) config('services.quranenc.fallback_translation_key', 'english_saheeh');

        $translations = $this->loadQuranEncTranslationList();
        foreach ($translations as $translation) {
            $key = $this->extractQuranEncTranslationKey($translation);
            if ($key === null) {
                continue;
            }

            $haystack = strtolower((string) json_encode($translation));
            if ($normalizedLanguage === 'en' && str_contains($haystack, 'english')) {
                $resolved[$normalizedLanguage] = $key;
                return $key;
            }
            if ($normalizedLanguage === 'ar' && str_contains($haystack, 'arabic')) {
                $resolved[$normalizedLanguage] = $key;
                return $key;
            }
            if ($normalizedLanguage === 'fr' && str_contains($haystack, 'french')) {
                $resolved[$normalizedLanguage] = $key;
                return $key;
            }
            if ($normalizedLanguage === 'es' && str_contains($haystack, 'spanish')) {
                $resolved[$normalizedLanguage] = $key;
                return $key;
            }
        }

        $resolved[$normalizedLanguage] = $fallback;
        return $fallback;
    }

    protected function loadQuranEncTranslationList(): array
    {
        $baseUrl = rtrim((string) config('services.quranenc.base', 'https://quranenc.com/api/v1'), '/');
        $url = "{$baseUrl}/translations/list";

        try {
            $response = Http::acceptJson()->timeout(8000)->retry(1, 500)->get($url);
            if (!$response->successful()) {
                return [];
            }

            $result = Arr::get($response->json(), 'result', []);
            if (!is_array($result)) {
                return [];
            }

            return array_values(array_filter($result, fn ($row) => is_array($row)));
        } catch (\Throwable $exception) {
            Log::warning('QuranEnc translation list lookup failed', [
                'error' => $exception->getMessage(),
            ]);
            return [];
        }
    }

    protected function extractQuranEncTranslationKey(array $translation): ?string
    {
        $candidates = [
            Arr::get($translation, 'key'),
            Arr::get($translation, 'identifier'),
            Arr::get($translation, 'translation_key'),
            Arr::get($translation, 'slug'),
            Arr::get($translation, 'id'),
        ];

        foreach ($candidates as $candidate) {
            $value = trim((string) $candidate);
            if ($value !== '') {
                return $value;
            }
        }

        return null;
    }

    protected function normalizeQuranEncLanguage(string $language): string
    {
        $normalized = strtolower(trim($language));
        if ($normalized === '') {
            return 'en';
        }
        if (str_contains($normalized, '-')) {
            $normalized = explode('-', $normalized)[0];
        }
        return in_array($normalized, ['ar', 'en', 'fr', 'es'], true) ? $normalized : 'en';
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

    protected function buildIslamHouseEndpoint(string $baseUrl, string $apiKey, string $language, array $keywords = []): string
    {
        $language = $language ?: 'en';
        $params = [
            'key' => $apiKey,
            'lang' => $language,
            'flang' => $language,
            'slang' => 'showall',
            'type' => 'showall',
            'limit' => 20,
            'pageNum' => 1,
        ];

        $search = trim(implode(' ', array_slice(array_values(array_unique(array_filter($keywords))), 0, 6)));
        if ($search !== '') {
            $params['search'] = $search;
        }

        return "{$baseUrl}/items?" . http_build_query($params);
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

    protected function fetchHadith(array $keywords = [], string $language = 'en'): ?array
    {
        if (empty($keywords)) {
            return null;
        }

        $hadeethEncResult = $this->fetchHadithFromHadeethEnc($keywords, $language);
        if ($hadeethEncResult) {
            return $hadeethEncResult;
        }

        $deenApiResult = $this->fetchHadithFromDeenApi($keywords, $language);
        if ($deenApiResult) {
            return $deenApiResult;
        }

        $islamicContentApiResult = $this->fetchHadithFromIslamicContentApi($keywords, $language);
        if ($islamicContentApiResult) {
            return $islamicContentApiResult;
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

        $jsonApiResult = $this->fetchHadithFromJsonApis($keywords);
        if ($jsonApiResult) {
            return $jsonApiResult;
        }

        return null;
    }

    protected function fetchHadithFromHadeethEnc(array $keywords, string $language = 'en'): ?array
    {
        $normalizedLanguage = $this->resolveHadeethEncLanguage($language);
        $baseUrl = rtrim((string) config('services.hadeethenc.base', 'https://hadeethenc.com/api/v1'), '/');
        $rootCategories = $this->fetchHadeethEncCategories($baseUrl, $normalizedLanguage);

        if (empty($rootCategories)) {
            return null;
        }

        $categoryQueue = $this->buildHadeethEncCategoryQueue($baseUrl, $normalizedLanguage, $rootCategories, $keywords);
        if (empty($categoryQueue)) {
            return null;
        }

        foreach (array_slice($categoryQueue, 0, 8) as $category) {
            $categoryId = (string) ($category['id'] ?? '');
            if ($categoryId === '') {
                continue;
            }

            $entries = $this->fetchHadeethEncList($baseUrl, $normalizedLanguage, $categoryId);
            if (empty($entries)) {
                continue;
            }

            $bestEntry = $this->selectBestHadeethEncEntry($entries, $keywords);
            if (!$bestEntry) {
                continue;
            }

            $entryId = $this->extractHadeethEncId($bestEntry);
            $detailedEntry = $entryId !== null
                ? $this->fetchHadeethEncDetails($baseUrl, $normalizedLanguage, $entryId)
                : null;

            $selectedEntry = is_array($detailedEntry) ? $detailedEntry : $bestEntry;
            $text = $this->extractHadeethEncText($selectedEntry);
            if ($text === '') {
                continue;
            }

            $reference = trim((string) (
                Arr::get($selectedEntry, 'attribution')
                ?? Arr::get($selectedEntry, 'source')
                ?? Arr::get($selectedEntry, 'grade')
                ?? ''
            ));
            if ($reference === '') {
                $categoryTitle = trim((string) ($category['title'] ?? ''));
                $reference = $entryId !== null
                    ? "HadeethEnc Hadith {$entryId}" . ($categoryTitle !== '' ? " — {$categoryTitle}" : '')
                    : 'HadeethEnc Hadith';
            }

            return [
                'text' => $text,
                'reference' => $reference,
                'url' => $entryId !== null
                    ? "{$baseUrl}/hadeeths/one/?language={$normalizedLanguage}&id={$entryId}"
                    : null,
            ];
        }

        return null;
    }

    protected function fetchHadithFromDeenApi(array $keywords, string $language = 'en'): ?array
    {
        return $this->fetchHadithFromConfigurableProvider(
            'deen_api',
            'Deen API',
            $keywords,
            $language
        );
    }

    protected function fetchHadithFromIslamicContentApi(array $keywords, string $language = 'en'): ?array
    {
        return $this->fetchHadithFromConfigurableProvider(
            'islamic_content_api',
            'Islamic Content API',
            $keywords,
            $language
        );
    }

    protected function fetchHadithFromConfigurableProvider(
        string $providerConfigKey,
        string $sourceLabel,
        array $keywords,
        string $language = 'en'
    ): ?array {
        $baseUrl = rtrim((string) config("services.{$providerConfigKey}.base", ''), '/');
        if ($baseUrl === '') {
            return null;
        }

        $query = $this->buildQuranSearchQuery($keywords);
        if ($query === '') {
            return null;
        }

        $headers = $this->buildProviderHeaders($providerConfigKey, [
            'Accept' => 'application/json',
        ]);
        $endpoints = $this->normalizeEndpointList(
            config("services.{$providerConfigKey}.hadith_search_endpoints", []),
            (string) config("services.{$providerConfigKey}.hadith_search_endpoint", '/hadith/search')
        );

        foreach ($endpoints as $endpoint) {
            $url = $this->buildExternalApiUrl($baseUrl, $endpoint);
            foreach ([
                ['q' => $query, 'language' => $language],
                ['query' => $query, 'lang' => $language],
                ['keyword' => $query, 'language' => $language],
                ['search' => $query, 'language' => $language],
            ] as $params) {
                $payload = $this->requestJson(
                    'get',
                    $url,
                    $params,
                    [],
                    $headers,
                    "{$providerConfigKey}_hadith_search"
                );
                if (!is_array($payload)) {
                    continue;
                }

                $result = $this->extractHadithFromExternalPayload(
                    $payload,
                    $keywords,
                    $sourceLabel
                );
                if ($result) {
                    return $result;
                }
            }
        }

        return null;
    }

    protected function resolveHadeethEncLanguage(string $language): string
    {
        $normalized = strtolower(trim($language));
        if ($normalized === '') {
            $normalized = (string) config('services.hadeethenc.language', 'en');
        }
        if (str_contains($normalized, '-')) {
            $normalized = explode('-', $normalized)[0];
        }

        return in_array($normalized, ['ar', 'en', 'fr', 'es'], true) ? $normalized : 'en';
    }

    protected function fetchHadeethEncCategories(string $baseUrl, string $language): array
    {
        $url = "{$baseUrl}/categories/root/?language={$language}";
        try {
            $response = Http::acceptJson()->timeout(8000)->retry(1, 500)->get($url);
            if (!$response->successful()) {
                return [];
            }

            return $this->normalizeHadeethEncList(Arr::get($response->json(), 'data', []));
        } catch (\Throwable $exception) {
            Log::warning('HadeethEnc root category lookup failed', [
                'language' => $language,
                'error' => $exception->getMessage(),
            ]);
            return [];
        }
    }

    protected function fetchHadeethEncSubCategories(string $baseUrl, string $language, string $categoryId): array
    {
        $url = "{$baseUrl}/categories/list/?language={$language}&category_id={$categoryId}";
        try {
            $response = Http::acceptJson()->timeout(8000)->retry(1, 500)->get($url);
            if (!$response->successful()) {
                return [];
            }

            return $this->normalizeHadeethEncList(Arr::get($response->json(), 'data', []));
        } catch (\Throwable $exception) {
            Log::warning('HadeethEnc subcategory lookup failed', [
                'language' => $language,
                'category_id' => $categoryId,
                'error' => $exception->getMessage(),
            ]);
            return [];
        }
    }

    protected function fetchHadeethEncList(string $baseUrl, string $language, string $categoryId): array
    {
        $url = "{$baseUrl}/hadeeths/list/?language={$language}&category_id={$categoryId}&page=1&per_page=40";
        try {
            $response = Http::acceptJson()->timeout(8000)->retry(1, 500)->get($url);
            if (!$response->successful()) {
                return [];
            }

            return $this->normalizeHadeethEncList(Arr::get($response->json(), 'data', []));
        } catch (\Throwable $exception) {
            Log::warning('HadeethEnc hadith list lookup failed', [
                'language' => $language,
                'category_id' => $categoryId,
                'error' => $exception->getMessage(),
            ]);
            return [];
        }
    }

    protected function fetchHadeethEncDetails(string $baseUrl, string $language, string $id): ?array
    {
        $url = "{$baseUrl}/hadeeths/one/?language={$language}&id={$id}";
        try {
            $response = Http::acceptJson()->timeout(8000)->retry(1, 500)->get($url);
            if (!$response->successful()) {
                return null;
            }

            $payload = Arr::get($response->json(), 'data');
            if (!is_array($payload)) {
                return null;
            }

            if (array_is_list($payload)) {
                $first = $payload[0] ?? null;
                return is_array($first) ? $first : null;
            }

            return $payload;
        } catch (\Throwable $exception) {
            Log::warning('HadeethEnc hadith details lookup failed', [
                'language' => $language,
                'id' => $id,
                'error' => $exception->getMessage(),
            ]);
            return null;
        }
    }

    protected function buildHadeethEncCategoryQueue(
        string $baseUrl,
        string $language,
        array $rootCategories,
        array $keywords
    ): array {
        $scoredRoots = [];
        foreach ($rootCategories as $category) {
            if (!is_array($category)) {
                continue;
            }

            $id = trim((string) (Arr::get($category, 'id') ?? Arr::get($category, 'category_id') ?? ''));
            if ($id === '') {
                continue;
            }

            $title = trim((string) (
                Arr::get($category, 'title')
                ?? Arr::get($category, 'name')
                ?? Arr::get($category, 'category')
                ?? ''
            ));
            $score = $this->scoreByKeywords($title, $keywords);
            $scoredRoots[] = ['id' => $id, 'title' => $title, 'score' => $score];
        }

        if (empty($scoredRoots)) {
            return [];
        }

        usort($scoredRoots, fn ($a, $b) => $b['score'] <=> $a['score']);
        $queue = [];
        foreach (array_slice($scoredRoots, 0, 5) as $root) {
            $queue[] = $root;
            $subCategories = $this->fetchHadeethEncSubCategories($baseUrl, $language, (string) $root['id']);
            foreach ($subCategories as $subCategory) {
                if (!is_array($subCategory)) {
                    continue;
                }
                $id = trim((string) (Arr::get($subCategory, 'id') ?? Arr::get($subCategory, 'category_id') ?? ''));
                if ($id === '') {
                    continue;
                }

                $title = trim((string) (
                    Arr::get($subCategory, 'title')
                    ?? Arr::get($subCategory, 'name')
                    ?? Arr::get($subCategory, 'category')
                    ?? ''
                ));
                $score = $this->scoreByKeywords($title, $keywords);
                if ($score > 0) {
                    $queue[] = ['id' => $id, 'title' => $title, 'score' => $score + 1];
                }
            }
        }

        usort($queue, fn ($a, $b) => $b['score'] <=> $a['score']);
        $seen = [];
        $deduped = [];
        foreach ($queue as $entry) {
            $id = (string) ($entry['id'] ?? '');
            if ($id === '' || isset($seen[$id])) {
                continue;
            }
            $seen[$id] = true;
            $deduped[] = $entry;
        }

        return $deduped;
    }

    protected function selectBestHadeethEncEntry(array $entries, array $keywords): ?array
    {
        $best = null;
        $bestScore = -1;

        foreach (array_slice($entries, 0, 80) as $entry) {
            if (!is_array($entry)) {
                continue;
            }

            $title = trim((string) (
                Arr::get($entry, 'title')
                ?? Arr::get($entry, 'hadeeth')
                ?? Arr::get($entry, 'text')
                ?? ''
            ));
            $text = $this->extractHadeethEncText($entry);
            $score = $this->scoreByKeywords($title . ' ' . $text, $keywords);

            if ($score > $bestScore) {
                $bestScore = $score;
                $best = $entry;
            }
        }

        if ($best) {
            return $best;
        }

        return is_array($entries[0] ?? null) ? $entries[0] : null;
    }

    protected function extractHadeethEncText(array $entry): string
    {
        $textCandidates = [
            Arr::get($entry, 'hadeeth'),
            Arr::get($entry, 'text'),
            Arr::get($entry, 'content'),
            Arr::get($entry, 'description'),
            Arr::get($entry, 'hadeeth_text'),
        ];

        foreach ($textCandidates as $candidate) {
            $value = trim(strip_tags((string) $candidate));
            if ($value !== '') {
                return $value;
            }
        }

        return '';
    }

    protected function extractHadeethEncId(array $entry): ?string
    {
        $candidates = [
            Arr::get($entry, 'id'),
            Arr::get($entry, 'hadeeth_id'),
            Arr::get($entry, 'number'),
        ];

        foreach ($candidates as $candidate) {
            $value = trim((string) $candidate);
            if ($value !== '') {
                return $value;
            }
        }

        return null;
    }

    protected function normalizeHadeethEncList($list): array
    {
        if (!is_array($list)) {
            return [];
        }

        if (array_is_list($list)) {
            return array_values(array_filter($list, fn ($row) => is_array($row)));
        }

        if (is_array(Arr::get($list, 'data'))) {
            return $this->normalizeHadeethEncList(Arr::get($list, 'data'));
        }

        $values = array_values($list);
        if (!empty($values) && is_array($values[0] ?? null)) {
            return array_values(array_filter($values, fn ($row) => is_array($row)));
        }

        return [];
    }

    protected function scoreByKeywords(string $text, array $keywords): int
    {
        $haystack = strtolower(trim($text));
        if ($haystack === '' || empty($keywords)) {
            return 0;
        }

        $score = 0;
        foreach ($keywords as $keyword) {
            $needle = strtolower(trim((string) $keyword));
            if ($needle !== '' && str_contains($haystack, $needle)) {
                $score += 2;
            }
        }

        return $score;
    }

    protected function buildProviderHeaders(string $providerConfigKey, array $baseHeaders = []): array
    {
        $headers = $baseHeaders;
        $apiKey = trim((string) config("services.{$providerConfigKey}.key", ''));
        $apiKeyHeader = trim((string) config("services.{$providerConfigKey}.key_header", ''));
        if ($apiKey !== '' && $apiKeyHeader !== '') {
            $headers[$apiKeyHeader] = $apiKey;
        }

        $bearerToken = trim((string) config("services.{$providerConfigKey}.bearer_token", ''));
        if ($bearerToken !== '') {
            $headers['Authorization'] = "Bearer {$bearerToken}";
        }

        return $headers;
    }

    protected function normalizeEndpointList($configured, string $fallback): array
    {
        $list = [];
        if (is_array($configured)) {
            foreach ($configured as $endpoint) {
                $value = trim((string) $endpoint);
                if ($value !== '') {
                    $list[] = $value;
                }
            }
        } else {
            $value = trim((string) $configured);
            if ($value !== '') {
                $list[] = $value;
            }
        }

        $fallback = trim($fallback);
        if ($fallback !== '') {
            array_unshift($list, $fallback);
        }

        $deduped = [];
        $seen = [];
        foreach ($list as $endpoint) {
            $key = strtolower($endpoint);
            if (isset($seen[$key])) {
                continue;
            }
            $seen[$key] = true;
            $deduped[] = $endpoint;
        }

        return $deduped;
    }

    protected function buildExternalApiUrl(string $baseUrl, string $endpoint): string
    {
        $endpoint = trim($endpoint);
        if ($endpoint === '') {
            return $baseUrl;
        }

        if (str_starts_with($endpoint, 'http://') || str_starts_with($endpoint, 'https://')) {
            return $endpoint;
        }

        return rtrim($baseUrl, '/') . '/' . ltrim($endpoint, '/');
    }

    protected function requestJson(
        string $method,
        string $url,
        array $query = [],
        array $body = [],
        array $headers = [],
        string $logContext = 'external_provider'
    ): ?array {
        try {
            $request = Http::withHeaders($headers)->acceptJson()->timeout(8)->retry(0, 0);
            $response = strtolower($method) === 'post'
                ? $request->post($url, $body)
                : $request->get($url, $query);

            if (!$response->successful()) {
                return null;
            }

            $decoded = $response->json();
            return is_array($decoded) ? $decoded : null;
        } catch (\Throwable $exception) {
            Log::warning('External provider request failed', [
                'context' => $logContext,
                'method' => strtolower($method),
                'url' => $url,
                'error' => $exception->getMessage(),
            ]);
            return null;
        }
    }

    protected function normalizeGenericUrl(?string $url): ?string
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

    protected function extractArticlesFromPayload(array $payload, array $keywords = []): array
    {
        $rows = $this->collectPayloadRows(
            $payload,
            [
                'data.articles',
                'articles',
                'data.items',
                'items',
                'data.results',
                'results',
                'data',
                'result',
                '',
            ],
            fn (array $row): bool => $this->looksLikeArticleCandidate($row)
        );

        if (empty($rows)) {
            return [];
        }

        $articles = [];
        foreach ($rows as $row) {
            $title = trim((string) (
                Arr::get($row, 'title')
                ?? Arr::get($row, 'headline')
                ?? Arr::get($row, 'name')
                ?? Arr::get($row, 'subject')
                ?? ''
            ));
            $description = trim((string) (
                Arr::get($row, 'description')
                ?? Arr::get($row, 'summary')
                ?? Arr::get($row, 'text')
                ?? Arr::get($row, 'content')
                ?? Arr::get($row, 'excerpt')
                ?? ''
            ));
            $url = $this->normalizeGenericUrl((string) (
                Arr::get($row, 'url')
                ?? Arr::get($row, 'link')
                ?? Arr::get($row, 'page_url')
                ?? ''
            ));

            if ($title === '' && $description === '') {
                continue;
            }

            $articles[] = [
                'title' => $title !== '' ? $title : 'Islamic insight',
                'description' => $description,
                'url' => $url,
                '_score' => $this->articleKeywordScore($title, $description, $keywords),
            ];
        }

        if (!empty($keywords)) {
            usort($articles, fn (array $a, array $b): int => ((int) $b['_score']) <=> ((int) $a['_score']));
        }

        return array_map(function (array $article): array {
            unset($article['_score']);
            return $article;
        }, array_slice($articles, 0, 5));
    }

    protected function looksLikeArticleCandidate(array $row): bool
    {
        $hasTitle = trim((string) (
            Arr::get($row, 'title')
            ?? Arr::get($row, 'headline')
            ?? Arr::get($row, 'name')
            ?? ''
        )) !== '';
        $hasBody = trim((string) (
            Arr::get($row, 'description')
            ?? Arr::get($row, 'summary')
            ?? Arr::get($row, 'text')
            ?? Arr::get($row, 'content')
            ?? ''
        )) !== '';

        return $hasTitle || $hasBody;
    }

    protected function collectPayloadRows(array $payload, array $paths, ?callable $filter = null): array
    {
        $rows = [];
        foreach ($paths as $path) {
            $value = $path === '' ? $payload : Arr::get($payload, $path);
            if (!is_array($value)) {
                continue;
            }

            if (array_is_list($value)) {
                foreach ($value as $entry) {
                    if (is_array($entry)) {
                        $rows[] = $entry;
                    }
                }
                continue;
            }

            $rows[] = $value;
            foreach ($value as $entry) {
                if (is_array($entry)) {
                    $rows[] = $entry;
                }
            }
        }

        $rows = $this->dedupePayloadRows($rows);

        if ($filter !== null) {
            $rows = array_values(array_filter($rows, fn (array $row): bool => (bool) $filter($row)));
        }

        return $rows;
    }

    protected function dedupePayloadRows(array $rows): array
    {
        $deduped = [];
        $seen = [];
        foreach ($rows as $row) {
            if (!is_array($row)) {
                continue;
            }
            $key = md5((string) json_encode($row));
            if (isset($seen[$key])) {
                continue;
            }
            $seen[$key] = true;
            $deduped[] = $row;
        }

        return $deduped;
    }

    protected function extractQuranReferenceFromExternalPayload(
        array $payload,
        array $keywords,
        string $sourceLabel
    ): ?array {
        $rows = $this->collectPayloadRows(
            $payload,
            [
                'data.matches',
                'data.results',
                'data.verses',
                'data.items',
                'matches',
                'results',
                'verses',
                'items',
                'data',
                'result',
                'verse',
                'ayah',
                '',
            ],
            fn (array $row): bool => $this->looksLikeQuranCandidate($row)
        );
        if (empty($rows)) {
            return null;
        }

        $best = null;
        $bestScore = -1;
        foreach (array_slice($rows, 0, 120) as $row) {
            $text = $this->extractQuranTextCandidate($row);
            if ($text === '') {
                continue;
            }

            $surahName = strtolower(trim((string) (
                Arr::get($row, 'surah.englishName')
                ?? Arr::get($row, 'surah.name')
                ?? Arr::get($row, 'surah_name')
                ?? Arr::get($row, 'chapter_name')
                ?? ''
            )));
            $score = $this->scoreByKeywords($text . ' ' . $surahName, $keywords);

            if ($score > $bestScore) {
                $best = $row;
                $bestScore = $score;
            }
        }

        if (!is_array($best)) {
            return null;
        }

        return $this->formatQuranExternalReference($best, $sourceLabel);
    }

    protected function looksLikeQuranCandidate(array $row): bool
    {
        if ($this->extractQuranTextCandidate($row) !== '') {
            return true;
        }

        $verseKey = trim((string) (
            Arr::get($row, 'verse_key')
            ?? Arr::get($row, 'ayah_key')
            ?? Arr::get($row, 'key')
            ?? ''
        ));
        return $verseKey !== '';
    }

    protected function extractQuranTextCandidate(array $row): string
    {
        $candidates = [
            Arr::get($row, 'translation.text'),
            Arr::get($row, 'translation.en'),
            Arr::get($row, 'translation'),
            Arr::get($row, 'translated_text'),
            Arr::get($row, 'text_imlaei_simple'),
            Arr::get($row, 'text_uthmani'),
            Arr::get($row, 'text'),
            Arr::get($row, 'verse'),
            Arr::get($row, 'content'),
            Arr::get($row, 'ayah_text'),
            Arr::get($row, 'value'),
        ];

        foreach ($candidates as $candidate) {
            if (is_array($candidate)) {
                $candidate = Arr::get($candidate, 'en')
                    ?? Arr::get($candidate, 'text')
                    ?? Arr::get($candidate, 'translation')
                    ?? '';
            }
            $value = trim(strip_tags((string) $candidate));
            if ($value !== '') {
                return $value;
            }
        }

        return '';
    }

    protected function extractQuranLocationFromCandidate(array $row): array
    {
        $verseKey = trim((string) (
            Arr::get($row, 'verse_key')
            ?? Arr::get($row, 'ayah_key')
            ?? Arr::get($row, 'key')
            ?? Arr::get($row, 'verseKey')
            ?? ''
        ));
        if ($verseKey !== '' && preg_match('/^(\d+):(\d+)$/', $verseKey, $match)) {
            return [(int) $match[1], (int) $match[2], $verseKey];
        }

        $surahNumber = (int) (
            Arr::get($row, 'surah.number')
            ?? Arr::get($row, 'surah.id')
            ?? Arr::get($row, 'chapter_id')
            ?? Arr::get($row, 'chapter')
            ?? Arr::get($row, 'surah')
            ?? Arr::get($row, 'sura')
            ?? Arr::get($row, 'surah_number')
            ?? 0
        );
        $ayahNumber = (int) (
            Arr::get($row, 'ayah')
            ?? Arr::get($row, 'aya')
            ?? Arr::get($row, 'verse_number')
            ?? Arr::get($row, 'ayah_number')
            ?? Arr::get($row, 'number.inSurah')
            ?? Arr::get($row, 'numberInSurah')
            ?? Arr::get($row, 'number')
            ?? 0
        );
        if ($surahNumber > 0 && $ayahNumber > 0) {
            return [$surahNumber, $ayahNumber, "{$surahNumber}:{$ayahNumber}"];
        }

        $id = trim((string) Arr::get($row, 'id', ''));
        if ($id !== '' && preg_match('/(\d+)[\:\-_, ](\d+)/', $id, $match)) {
            return [(int) $match[1], (int) $match[2], "{$match[1]}:{$match[2]}"];
        }

        return [0, 0, ''];
    }

    protected function formatQuranExternalReference(array $row, string $sourceLabel): ?array
    {
        $text = $this->extractQuranTextCandidate($row);
        if ($text === '') {
            return null;
        }

        [$surahNumber, $ayahNumber, $verseKey] = $this->extractQuranLocationFromCandidate($row);
        $surahName = trim((string) (
            Arr::get($row, 'surah.englishName')
            ?? Arr::get($row, 'surah.name')
            ?? Arr::get($row, 'surah_name')
            ?? Arr::get($row, 'chapter_name')
            ?? ''
        ));

        $reference = $sourceLabel;
        if ($surahNumber > 0 && $ayahNumber > 0) {
            if ($surahName !== '') {
                $reference = "Surah {$surahName}, Ayah {$ayahNumber} ({$sourceLabel})";
            } else {
                $reference = "Surah {$surahNumber}, Ayah {$ayahNumber} ({$sourceLabel})";
            }
        } elseif ($verseKey !== '') {
            $reference = "{$verseKey} ({$sourceLabel})";
        }

        $url = $this->normalizeGenericUrl((string) (
            Arr::get($row, 'url')
            ?? Arr::get($row, 'link')
            ?? Arr::get($row, 'verse_url')
            ?? ''
        ));
        if ($url === null) {
            if ($surahNumber > 0 && $ayahNumber > 0) {
                $url = "https://quran.com/{$surahNumber}/{$ayahNumber}";
            } elseif ($verseKey !== '') {
                $url = 'https://quran.com/' . str_replace(':', '/', $verseKey);
            }
        }

        return [
            'text' => $text,
            'reference' => $reference,
            'url' => $url,
            'edition' => strtolower($sourceLabel),
        ];
    }

    protected function extractHadithFromExternalPayload(
        array $payload,
        array $keywords,
        string $sourceLabel
    ): ?array {
        $directText = trim((string) (
            Arr::get($payload, 'answer')
            ?? Arr::get($payload, 'response')
            ?? Arr::get($payload, 'message')
            ?? Arr::get($payload, 'data.answer')
            ?? Arr::get($payload, 'data.response')
            ?? Arr::get($payload, 'result.answer')
            ?? Arr::get($payload, 'result.response')
            ?? ''
        ));
        if ($directText !== '') {
            $reference = trim((string) (
                Arr::get($payload, 'reference')
                ?? Arr::get($payload, 'source')
                ?? Arr::get($payload, 'data.reference')
                ?? ''
            ));
            return [
                'text' => $directText,
                'reference' => $reference !== '' ? $reference : $sourceLabel,
                'url' => $this->normalizeGenericUrl((string) (
                    Arr::get($payload, 'url')
                    ?? Arr::get($payload, 'link')
                    ?? Arr::get($payload, 'data.url')
                    ?? ''
                )),
            ];
        }

        $rows = $this->collectPayloadRows(
            $payload,
            [
                'data.hadiths',
                'hadiths',
                'data.items',
                'items',
                'data.results',
                'results',
                'data',
                'result',
                'hadith',
                '',
            ],
            fn (array $row): bool => $this->extractHadithTextCandidate($row) !== ''
        );
        if (empty($rows)) {
            return null;
        }

        $best = null;
        $bestScore = -1;
        foreach (array_slice($rows, 0, 120) as $row) {
            $text = $this->extractHadithTextCandidate($row);
            if ($text === '') {
                continue;
            }
            $reference = $this->extractHadithReferenceCandidate($row, $sourceLabel);
            $score = $this->scoreByKeywords($text . ' ' . $reference, $keywords);
            if ($score > $bestScore) {
                $bestScore = $score;
                $best = $row;
            }
        }

        if (!is_array($best)) {
            return null;
        }

        $text = $this->extractHadithTextCandidate($best);
        if ($text === '') {
            return null;
        }

        return [
            'text' => $text,
            'reference' => $this->extractHadithReferenceCandidate($best, $sourceLabel),
            'url' => $this->normalizeGenericUrl((string) (
                Arr::get($best, 'url')
                ?? Arr::get($best, 'link')
                ?? Arr::get($best, 'source_url')
                ?? ''
            )),
        ];
    }

    protected function extractHadithTextCandidate(array $row): string
    {
        $candidates = [
            Arr::get($row, 'english'),
            Arr::get($row, 'text_en'),
            Arr::get($row, 'hadithEnglish'),
            Arr::get($row, 'hadeeth'),
            Arr::get($row, 'text'),
            Arr::get($row, 'content'),
            Arr::get($row, 'description'),
            Arr::get($row, 'arabic'),
            Arr::get($row, 'text_ar'),
            Arr::get($row, 'hadithArabic'),
        ];

        foreach ($candidates as $candidate) {
            if (is_array($candidate)) {
                $candidate = Arr::get($candidate, 'en')
                    ?? Arr::get($candidate, 'text')
                    ?? Arr::get($candidate, 'value')
                    ?? '';
            }
            $value = trim(strip_tags((string) $candidate));
            if ($value !== '') {
                return $value;
            }
        }

        return '';
    }

    protected function extractHadithReferenceCandidate(array $row, string $sourceLabel): string
    {
        $reference = trim((string) (
            Arr::get($row, 'reference')
            ?? Arr::get($row, 'source')
            ?? Arr::get($row, 'book')
            ?? Arr::get($row, 'collection')
            ?? Arr::get($row, 'title')
            ?? Arr::get($row, 'grade')
            ?? ''
        ));

        $number = trim((string) (
            Arr::get($row, 'hadith_number')
            ?? Arr::get($row, 'hadithnumber')
            ?? Arr::get($row, 'number')
            ?? Arr::get($row, 'id')
            ?? ''
        ));

        if ($reference !== '' && $number !== '' && !str_contains($reference, $number)) {
            return "{$reference} {$number}";
        }
        if ($reference !== '') {
            return $reference;
        }
        if ($number !== '') {
            return "{$sourceLabel} Hadith {$number}";
        }

        return $sourceLabel;
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
            'busy' => '2:45',
            'schedule' => '2:45',
            'consistent' => '20:132',
            'consistency' => '20:132',
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
            'trusting' => '3:159',
            'tawakkul' => '3:159',
            'hardship' => '94:5',
            'difficulty' => '94:6',
            'difficult' => '94:6',
            'anxiety' => '13:28',
            'overthinking' => '65:3',
            'stress' => '65:3',
            'worry' => '65:3',
            'anger' => '3:134',
            'angry' => '3:134',
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

                $english = $this->normalizeExternalTextValue(
                    Arr::get($row, 'english')
                    ?? Arr::get($row, 'text')
                    ?? Arr::get($row, 'text_en')
                    ?? Arr::get($row, 'hadithEnglish')
                    ?? ''
                );
                $arabic = $this->normalizeExternalTextValue(
                    Arr::get($row, 'arabic')
                    ?? Arr::get($row, 'text_ar')
                    ?? Arr::get($row, 'hadithArabic')
                    ?? ''
                );
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

            $number = $this->normalizeExternalTextValue(
                Arr::get($best, 'hadith_number')
                ?? Arr::get($best, 'hadithnumber')
                ?? Arr::get($best, 'number')
                ?? Arr::get($best, 'id')
                ?? ''
            );
            $text = $this->normalizeExternalTextValue(
                Arr::get($best, 'english')
                ?? Arr::get($best, 'text')
                ?? Arr::get($best, 'text_en')
                ?? Arr::get($best, 'hadithEnglish')
                ?? Arr::get($best, 'arabic')
                ?? Arr::get($best, 'text_ar')
                ?? Arr::get($best, 'hadithArabic')
                ?? ''
            );

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

    /**
     * Safely normalizes mixed API payload values into a plain string.
     *
     * @param mixed $value
     */
    protected function normalizeExternalTextValue($value): string
    {
        if (is_string($value)) {
            return trim($value);
        }
        if (is_int($value) || is_float($value) || is_bool($value)) {
            return trim((string) $value);
        }
        if (!is_array($value)) {
            return '';
        }

        foreach ([
            'english', 'text', 'text_en', 'hadithEnglish',
            'arabic', 'text_ar', 'hadithArabic',
            'translation', 'value', 'content', 'body',
        ] as $key) {
            if (!array_key_exists($key, $value)) {
                continue;
            }
            $normalized = $this->normalizeExternalTextValue($value[$key]);
            if ($normalized !== '') {
                return $normalized;
            }
        }

        foreach ($value as $entry) {
            $normalized = $this->normalizeExternalTextValue($entry);
            if ($normalized !== '') {
                return $normalized;
            }
        }

        return '';
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
