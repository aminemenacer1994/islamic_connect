<?php

namespace App\Services;

use App\Models\RagDocument;
use Illuminate\Http\Client\Pool;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class IslamicAssistantService
{
    private const MAX_KEYWORDS = 10;
    private const MAX_CONTEXT_ITEMS = 8;
    private const MAX_SNIPPET_CHARS = 280;
    private const MAX_VECTOR_RESULTS = 10;
    private const MAX_LIVE_RESULTS = 12;
    private const MIN_FINAL_SCORE = 55.0;
    private const HUGGING_FACE_URL = 'https://router.huggingface.co/v1/chat/completions';
    private const ISLAMHOUSE_LIMITS = [
        'article' => 10,
        'fatwa' => 10,
        'book' => 5,
    ];

    protected PromptSanitizer $sanitizer;
    protected IslamicEmbeddingService $embeddingService;

    public function __construct(PromptSanitizer $sanitizer, IslamicEmbeddingService $embeddingService)
    {
        $this->sanitizer = $sanitizer;
        $this->embeddingService = $embeddingService;
    }

    /**
     * @return array{
     *   question: string,
     *   language: string,
     *   sourced: bool,
     *   message: string,
     *   short_summary: string,
     *   references: array<int, array<string, mixed>>,
     *   context_sections: array<int, array<string, mixed>>,
     *   total_sources: int
     * }
     */
    public function answer(string $question, string $language = 'en'): array
    {
        $language = $this->normalizeLanguage($language);
        $cleanQuestion = $this->sanitizer->sanitize($question, 1500);
        $profile = $this->buildQueryProfile($cleanQuestion, $language);

        $vectorBefore = $this->searchVectorStore($profile, $language, self::MAX_VECTOR_RESULTS);
        $liveDocuments = $this->fetchLiveDocuments($profile, $language);
        $this->indexDocuments($liveDocuments, $profile, $language);
        $vectorAfter = $this->searchVectorStore($profile, $language, self::MAX_VECTOR_RESULTS);

        $candidates = $this->mergeCandidates($profile, $vectorBefore, $liveDocuments, $vectorAfter);
        $topItems = $this->selectTopItems($candidates);
        $contextSections = $this->buildContextSections($topItems);
        $references = $this->buildReferences($topItems);
        $sourced = !empty($topItems);

        if ($sourced) {
            $contextBlock = $this->buildStructuredContext($contextSections);
            $message = $this->generateSourcedAnswer($cleanQuestion, $language, $contextBlock, $topItems);
        } else {
            $message = $this->generateFallbackAnswer($cleanQuestion, $language);
        }

        return [
            'question' => $cleanQuestion,
            'language' => $language,
            'sourced' => $sourced,
            'message' => $message,
            'short_summary' => $this->snippet($message, 180),
            'references' => $references,
            'context_sections' => $contextSections,
            'total_sources' => count($references),
        ];
    }

    protected function normalizeLanguage(string $language): string
    {
        $normalized = strtolower(trim($language));
        if ($normalized === '' || str_contains($normalized, '-')) {
            $normalized = explode('-', $normalized)[0] ?? 'en';
        }

        return in_array($normalized, ['en', 'ar', 'fr', 'es'], true) ? $normalized : 'en';
    }

    /**
     * @return array{
     *   normalized: string,
     *   keywords: array<int, string>,
     *   expanded_keywords: array<int, string>,
     *   search_text: string,
     *   intent: string,
     *   allow_weak_hadith: bool,
     *   verse_refs: array<int, array{surah:int, ayah:int, verse_key:string}>,
     *   embedding: array<int, float>
     * }
     */
    protected function buildQueryProfile(string $question, string $language): array
    {
        $normalized = $this->normalizeText($question);
        $keywords = $this->extractKeywords($normalized);
        $expandedKeywords = $this->expandKeywords($keywords, $normalized);
        $verseRefs = $this->extractVerseReferences($question);
        $intent = $this->detectIntent($normalized, $expandedKeywords);
        $searchText = trim(implode(' ', array_slice($expandedKeywords, 0, 6)));

        return [
            'normalized' => $normalized,
            'keywords' => $keywords,
            'expanded_keywords' => $expandedKeywords,
            'search_text' => $searchText,
            'intent' => $intent,
            'allow_weak_hadith' => $this->allowWeakHadith($normalized),
            'verse_refs' => $verseRefs,
            'embedding' => $this->embeddingService->embed($question, $expandedKeywords),
            'language' => $language,
        ];
    }

    protected function normalizeText(string $value): string
    {
        $text = Str::lower($value);
        $text = preg_replace('/[^a-z0-9:\s\-]/', ' ', $text);
        $text = preg_replace('/\s+/', ' ', (string) $text);
        return trim((string) $text);
    }

    /**
     * @return array<int, string>
     */
    protected function extractKeywords(string $normalizedQuestion): array
    {
        if ($normalizedQuestion === '') {
            return [];
        }

        $stopWords = [
            'a', 'about', 'allah', 'an', 'and', 'are', 'as', 'at', 'be', 'can', 'could', 'do',
            'does', 'for', 'from', 'give', 'guidance', 'hadith', 'help', 'how', 'i', 'in',
            'is', 'islam', 'islamic', 'it', 'me', 'my', 'of', 'on', 'or', 'please', 'quran',
            'regarding', 'say', 'show', 'tell', 'that', 'the', 'this', 'to', 'what', 'when',
            'where', 'which', 'with', 'would', 'you', 'your',
        ];

        $tokens = preg_split('/[\s\-]+/', $normalizedQuestion) ?: [];
        $keywords = [];

        foreach ($tokens as $token) {
            $token = trim($token);
            if ($token === '' || strlen($token) < 3 || preg_match('/^\d+$/', $token)) {
                continue;
            }
            if (in_array($token, $stopWords, true)) {
                continue;
            }

            $keywords[] = Str::singular($token);
        }

        return array_values(array_unique(array_slice($keywords, 0, self::MAX_KEYWORDS)));
    }

    /**
     * @param array<int, string> $keywords
     * @return array<int, string>
     */
    protected function expandKeywords(array $keywords, string $normalizedQuestion): array
    {
        $expanded = $keywords;
        $synonyms = $this->synonymMap();

        foreach ($keywords as $keyword) {
            foreach (($synonyms[$keyword] ?? []) as $synonym) {
                $expanded[] = $synonym;
            }
        }

        foreach ($synonyms as $key => $mappedTerms) {
            if (str_contains($normalizedQuestion, $key)) {
                $expanded[] = $key;
                foreach ($mappedTerms as $mappedTerm) {
                    $expanded[] = $mappedTerm;
                }
            }
        }

        return array_values(array_unique(array_slice(array_filter($expanded), 0, self::MAX_KEYWORDS + 8)));
    }

    /**
     * @return array<string, array<int, string>>
     */
    protected function synonymMap(): array
    {
        return [
            'sabr' => ['patience', 'steadfastness', 'perseverance'],
            'tawakkul' => ['trust', 'reliance'],
            'dua' => ['supplication', 'invocation'],
            'duaa' => ['supplication', 'invocation'],
            'salah' => ['prayer'],
            'salat' => ['prayer'],
            'zakat' => ['charity', 'alms'],
            'zakah' => ['charity', 'alms'],
            'sawm' => ['fasting'],
            'siyam' => ['fasting'],
            'iman' => ['faith', 'belief'],
            'ihsan' => ['excellence'],
            'taqwa' => ['piety', 'godfearing'],
            'rahma' => ['mercy', 'compassion'],
            'halal' => ['permissible', 'lawful'],
            'haram' => ['forbidden', 'impermissible'],
            'riba' => ['usury', 'interest'],
            'shirk' => ['idolatry', 'polytheism'],
        ];
    }

    protected function detectIntent(string $normalizedQuestion, array $expandedKeywords): string
    {
        $haystack = $normalizedQuestion . ' ' . implode(' ', $expandedKeywords);
        if (preg_match('/\b(quran|surah|ayah|verse)\b/', $haystack)) {
            return 'quran';
        }
        if (preg_match('/\b(hadith|sunnah|bukhari|muslim|tirmidhi|narrated)\b/', $haystack)) {
            return 'hadith';
        }
        if (preg_match('/\b(fatwa|ruling|halal|haram|permissible|forbidden)\b/', $haystack)) {
            return 'ruling';
        }

        return 'general';
    }

    protected function allowWeakHadith(string $normalizedQuestion): bool
    {
        return preg_match('/\b(weak hadith|daif|dhaif|da if|fabricated|mawdu)\b/', $normalizedQuestion) === 1;
    }

    /**
     * @return array<int, array{surah:int, ayah:int, verse_key:string}>
     */
    protected function extractVerseReferences(string $question): array
    {
        $matches = [];
        preg_match_all('/\b(\d{1,3})\s*[:\/]\s*(\d{1,3})\b/', $question, $matches, PREG_SET_ORDER);

        $references = [];
        foreach ($matches as $match) {
            $surah = (int) ($match[1] ?? 0);
            $ayah = (int) ($match[2] ?? 0);
            if ($surah < 1 || $surah > 114 || $ayah < 1) {
                continue;
            }
            $verseKey = "{$surah}:{$ayah}";
            $references[$verseKey] = [
                'surah' => $surah,
                'ayah' => $ayah,
                'verse_key' => $verseKey,
            ];
        }

        return array_values($references);
    }

    /**
     * @param array<string, mixed> $profile
     * @return array<int, array<string, mixed>>
     */
    protected function fetchLiveDocuments(array $profile, string $language): array
    {
        $queryCacheHours = max(24, (int) config('services.ai_rag.query_cache_hours', 24));
        $cacheKey = 'ai-rag-live:' . md5(json_encode([
            'language' => $language,
            'query' => $profile['normalized'] ?? '',
            'intent' => $profile['intent'] ?? 'general',
            'allow_weak_hadith' => $profile['allow_weak_hadith'] ?? false,
        ]));

        return Cache::remember($cacheKey, now()->addHours($queryCacheHours), function () use ($profile, $language): array {
            $documents = array_merge(
                $this->fetchQuranDocuments($profile, $language),
                $this->fetchHadithDocuments($profile, $language),
                $this->fetchIslamHouseDocuments($profile, $language),
            );

            return array_slice($documents, 0, self::MAX_LIVE_RESULTS);
        });
    }

    /**
     * @param array<string, mixed> $profile
     * @return array<int, array<string, mixed>>
     */
    protected function fetchQuranDocuments(array $profile, string $language): array
    {
        $baseUrl = rtrim((string) config('services.quranenc.base', 'https://quranenc.com/api/v1'), '/');
        $translationKey = (string) config('services.quranenc.fallback_translation_key', 'english_saheeh');
        $tafsirKey = (string) config('services.quranenc.tafsir_key', 'english_mokhtasar');
        $searchText = trim((string) ($profile['search_text'] ?? ''));

        $responses = Http::pool(function (Pool $pool) use ($baseUrl, $translationKey, $tafsirKey, $profile, $searchText) {
            $requests = [];

            if ($searchText !== '') {
                $requests['quran_search'] = $pool
                    ->as('quran_search')
                    ->acceptJson()
                    ->timeout(12)
                    ->get("{$baseUrl}/search/{$translationKey}/" . rawurlencode($searchText));
            }

            foreach (array_slice($profile['verse_refs'] ?? [], 0, 3) as $index => $reference) {
                $surah = (int) $reference['surah'];
                $ayah = (int) $reference['ayah'];
                $requests["quran_translation_{$index}"] = $pool
                    ->as("quran_translation_{$index}")
                    ->acceptJson()
                    ->timeout(12)
                    ->get("{$baseUrl}/translation/aya/{$translationKey}/{$surah}/{$ayah}");
                $requests["quran_tafsir_{$index}"] = $pool
                    ->as("quran_tafsir_{$index}")
                    ->acceptJson()
                    ->timeout(12)
                    ->get("{$baseUrl}/translation/aya/{$tafsirKey}/{$surah}/{$ayah}");
            }

            return $requests;
        });

        $searchResults = $this->extractListPayloadFromResponse($responses['quran_search'] ?? null);
        $verseKeys = [];
        foreach (array_slice($profile['verse_refs'] ?? [], 0, 3) as $reference) {
            $verseKeys[] = $reference['verse_key'];
        }
        foreach (array_slice($searchResults, 0, 5) as $row) {
            if (!is_array($row)) {
                continue;
            }
            $surah = (int) (Arr::get($row, 'sura') ?? Arr::get($row, 'surah') ?? 0);
            $ayah = (int) (Arr::get($row, 'aya') ?? Arr::get($row, 'ayah') ?? 0);
            if ($surah > 0 && $ayah > 0) {
                $verseKeys[] = "{$surah}:{$ayah}";
            }
        }

        $verseKeys = array_values(array_unique(array_slice($verseKeys, 0, 5)));
        $details = [];

        if (!empty($verseKeys)) {
            $details = Http::pool(function (Pool $pool) use ($baseUrl, $translationKey, $tafsirKey, $verseKeys) {
                $requests = [];
                foreach ($verseKeys as $index => $verseKey) {
                    [$surah, $ayah] = array_pad(explode(':', $verseKey, 2), 2, null);
                    if (!(int) $surah || !(int) $ayah) {
                        continue;
                    }
                    $requests["quran_detail_translation_{$index}"] = $pool
                        ->as("quran_detail_translation_{$index}")
                        ->acceptJson()
                        ->timeout(12)
                        ->get("{$baseUrl}/translation/aya/{$translationKey}/{$surah}/{$ayah}");
                    $requests["quran_detail_tafsir_{$index}"] = $pool
                        ->as("quran_detail_tafsir_{$index}")
                        ->acceptJson()
                        ->timeout(12)
                        ->get("{$baseUrl}/translation/aya/{$tafsirKey}/{$surah}/{$ayah}");
                }
                return $requests;
            });
        }

        $documents = [];
        foreach ($verseKeys as $index => $verseKey) {
            [$surah, $ayah] = array_pad(explode(':', $verseKey, 2), 2, null);
            $translation = $this->extractFirstPayloadRowFromResponse($details["quran_detail_translation_{$index}"] ?? $responses["quran_translation_{$index}"] ?? null);
            $tafsir = $this->extractFirstPayloadRowFromResponse($details["quran_detail_tafsir_{$index}"] ?? $responses["quran_tafsir_{$index}"] ?? null);

            $translationText = $this->cleanText((string) (
                Arr::get($translation ?? [], 'translation')
                ?? Arr::get($translation ?? [], 'text')
                ?? ''
            ));
            if ($translationText === '') {
                continue;
            }

            $tafsirText = $this->cleanText((string) (
                Arr::get($tafsir ?? [], 'translation')
                ?? Arr::get($tafsir ?? [], 'text')
                ?? ''
            ));
            $surahNumber = (int) $surah;
            $ayahNumber = (int) $ayah;
            $reference = "Surah {$surahNumber}, Ayah {$ayahNumber}";

            $documents[] = [
                'document_key' => "quran:{$verseKey}:{$language}",
                'source' => 'quran',
                'source_type' => 'verse',
                'source_id' => $verseKey,
                'language' => $language,
                'title' => $reference,
                'reference' => $reference,
                'body' => trim($translationText . ($tafsirText !== '' ? "\n\nTafsir: {$tafsirText}" : '')),
                'snippet' => $this->snippet($translationText . ' ' . $tafsirText, self::MAX_SNIPPET_CHARS),
                'translation' => $translationText,
                'description' => $tafsirText,
                'metadata' => [
                    'verse_key' => $verseKey,
                    'url' => "https://quran.com/{$surahNumber}/{$ayahNumber}",
                ],
                'grade' => null,
                'priority' => 100,
            ];
        }

        return $documents;
    }

    /**
     * @param array<string, mixed> $profile
     * @return array<int, array<string, mixed>>
     */
    protected function fetchHadithDocuments(array $profile, string $language): array
    {
        $baseUrl = rtrim((string) config('services.hadeethenc.base', 'https://hadeethenc.com/api/v1'), '/');
        $searchText = trim((string) ($profile['search_text'] ?? ''));
        $language = $this->normalizeLanguage($language);

        $responses = Http::pool(function (Pool $pool) use ($baseUrl, $searchText, $language) {
            $requests = [];
            if ($searchText !== '') {
                $requests['hadith_search_1'] = $pool
                    ->as('hadith_search_1')
                    ->acceptJson()
                    ->timeout(12)
                    ->get("{$baseUrl}/search/", ['language' => $language, 'keyword' => $searchText]);
                $requests['hadith_search_2'] = $pool
                    ->as('hadith_search_2')
                    ->acceptJson()
                    ->timeout(12)
                    ->get("{$baseUrl}/hadeeths/search/", ['language' => $language, 'q' => $searchText]);
                $requests['hadith_search_3'] = $pool
                    ->as('hadith_search_3')
                    ->acceptJson()
                    ->timeout(12)
                    ->get("{$baseUrl}/search", ['language' => $language, 'q' => $searchText]);
            }

            $requests['hadith_root_categories'] = $pool
                ->as('hadith_root_categories')
                ->acceptJson()
                ->timeout(12)
                ->get("{$baseUrl}/categories/root/", ['language' => $language]);

            return $requests;
        });

        $documents = [];
        $rawSearchCandidates = array_merge(
            $this->extractHadithRowsFromResponse($responses['hadith_search_1'] ?? null),
            $this->extractHadithRowsFromResponse($responses['hadith_search_2'] ?? null),
            $this->extractHadithRowsFromResponse($responses['hadith_search_3'] ?? null),
        );

        $searchCandidates = [];
        foreach ($rawSearchCandidates as $row) {
            if (!is_array($row)) {
                continue;
            }
            $document = $this->normalizeHadithDocument($row, $profile, $language);
            if ($document !== null) {
                $searchCandidates[] = $document;
            }
        }

        if (empty($searchCandidates)) {
            $searchCandidates = $this->fetchHadithCandidatesFromCategories(
                $baseUrl,
                $language,
                $profile,
                $responses['hadith_root_categories'] ?? null
            );
        }

        $searchCandidates = array_slice($this->dedupeDocuments($searchCandidates), 0, 8);

        foreach ($searchCandidates as $candidate) {
            $documents[] = $candidate;
        }

        return $documents;
    }

    /**
     * @param array<string, mixed> $profile
     * @return array<int, array<string, mixed>>
     */
    protected function fetchHadithCandidatesFromCategories(
        string $baseUrl,
        string $language,
        array $profile,
        $rootCategoryResponse
    ): array {
        $rootCategories = $this->extractListPayloadFromResponse($rootCategoryResponse);
        if (empty($rootCategories)) {
            return [];
        }

        $scoredCategories = [];
        foreach ($rootCategories as $category) {
            if (!is_array($category)) {
                continue;
            }
            $title = $this->cleanText((string) (Arr::get($category, 'title') ?? Arr::get($category, 'name') ?? ''));
            $id = trim((string) (Arr::get($category, 'id') ?? Arr::get($category, 'category_id') ?? ''));
            if ($id === '' || $title === '') {
                continue;
            }
            $scoredCategories[] = [
                'id' => $id,
                'title' => $title,
                'score' => $this->keywordScore($title, $profile['expanded_keywords'] ?? [])
                    + (($profile['intent'] ?? 'general') === 'hadith' ? 10 : 0),
            ];
        }

        usort($scoredCategories, fn (array $a, array $b): int => ($b['score'] ?? 0) <=> ($a['score'] ?? 0));
        $scoredCategories = array_slice(array_filter($scoredCategories, fn (array $category): bool => ($category['score'] ?? 0) > 0), 0, 3);

        if (empty($scoredCategories)) {
            return [];
        }

        $listResponses = Http::pool(function (Pool $pool) use ($baseUrl, $language, $scoredCategories) {
            $requests = [];
            foreach ($scoredCategories as $index => $category) {
                $requests["hadith_list_{$index}"] = $pool
                    ->as("hadith_list_{$index}")
                    ->acceptJson()
                    ->timeout(12)
                    ->get("{$baseUrl}/hadeeths/list/", [
                        'language' => $language,
                        'category_id' => $category['id'],
                        'page' => 1,
                        'per_page' => 20,
                    ]);
            }
            return $requests;
        });

        $candidateIds = [];
        foreach ($scoredCategories as $index => $category) {
            $rows = $this->extractListPayloadFromResponse($listResponses["hadith_list_{$index}"] ?? null);
            foreach (array_slice($rows, 0, 8) as $row) {
                if (!is_array($row)) {
                    continue;
                }
                $id = trim((string) (Arr::get($row, 'id') ?? Arr::get($row, 'hadeeth_id') ?? Arr::get($row, 'number') ?? ''));
                if ($id !== '') {
                    $candidateIds[] = $id;
                }
            }
        }

        $candidateIds = array_values(array_unique(array_slice($candidateIds, 0, 5)));
        if (empty($candidateIds)) {
            return [];
        }

        $detailResponses = Http::pool(function (Pool $pool) use ($baseUrl, $language, $candidateIds) {
            $requests = [];
            foreach ($candidateIds as $index => $candidateId) {
                $requests["hadith_detail_{$index}"] = $pool
                    ->as("hadith_detail_{$index}")
                    ->acceptJson()
                    ->timeout(12)
                    ->get("{$baseUrl}/hadeeths/one/", ['language' => $language, 'id' => $candidateId]);
            }
            return $requests;
        });

        $documents = [];
        foreach ($candidateIds as $index => $candidateId) {
            $rows = $this->extractHadithRowsFromResponse($detailResponses["hadith_detail_{$index}"] ?? null);
            foreach ($rows as $row) {
                if (!is_array($row)) {
                    continue;
                }
                $document = $this->normalizeHadithDocument($row, $profile, $language);
                if ($document !== null) {
                    $documents[] = $document;
                }
            }
        }

        return $documents;
    }

    /**
     * @param array<string, mixed> $profile
     * @return array<int, array<string, mixed>>
     */
    protected function fetchIslamHouseDocuments(array $profile, string $language): array
    {
        $baseUrl = rtrim((string) config('services.islamhouse.base', 'https://api3.islamhouse.com/v3'), '/');
        $apiKey = trim((string) config('services.islamhouse.key', ''));
        if ($apiKey === '') {
            return [];
        }

        $searchText = trim((string) ($profile['search_text'] ?? ''));
        $responses = Http::pool(function (Pool $pool) use ($baseUrl, $apiKey, $language, $searchText) {
            $requests = [];
            foreach (self::ISLAMHOUSE_LIMITS as $type => $limit) {
                $query = [
                    'type' => $type,
                    'lang' => $language,
                    'limit' => $limit,
                    'key' => $apiKey,
                ];
                if ($searchText !== '') {
                    $query['q'] = $searchText;
                }
                $requests["islamhouse_{$type}"] = $pool
                    ->as("islamhouse_{$type}")
                    ->acceptJson()
                    ->timeout(12)
                    ->get("{$baseUrl}/items", $query);
            }
            return $requests;
        });

        $documents = [];
        foreach (array_keys(self::ISLAMHOUSE_LIMITS) as $type) {
            $rows = $this->extractListPayloadFromResponse($responses["islamhouse_{$type}"] ?? null);
            foreach (array_slice($rows, 0, 6) as $row) {
                if (!is_array($row)) {
                    continue;
                }

                $title = $this->cleanText((string) (
                    Arr::get($row, 'title')
                    ?? Arr::get($row, 'name')
                    ?? Arr::get($row, 'block_name')
                    ?? ''
                ));
                $body = $this->cleanText((string) (
                    Arr::get($row, 'description')
                    ?? Arr::get($row, 'summary')
                    ?? Arr::get($row, 'teaser')
                    ?? Arr::get($row, 'body')
                    ?? Arr::get($row, 'content')
                    ?? ''
                ));
                if ($title === '' && $body === '') {
                    continue;
                }

                $sourceId = trim((string) (
                    Arr::get($row, 'id')
                    ?? Arr::get($row, 'guid')
                    ?? md5($title . $body)
                ));

                $documents[] = [
                    'document_key' => "islamhouse:{$type}:{$sourceId}:{$language}",
                    'source' => 'islamhouse',
                    'source_type' => $type,
                    'source_id' => $sourceId,
                    'language' => $language,
                    'title' => $title !== '' ? $title : Str::headline($type),
                    'reference' => $title !== '' ? $title : Str::headline($type),
                    'body' => $body !== '' ? $body : $title,
                    'snippet' => $this->snippet($body !== '' ? $body : $title, self::MAX_SNIPPET_CHARS),
                    'translation' => null,
                    'description' => $body,
                    'metadata' => [
                        'url' => $this->normalizeUrl((string) (
                            Arr::get($row, 'page_url')
                            ?? Arr::get($row, 'url')
                            ?? Arr::get($row, 'link')
                            ?? ''
                        )),
                    ],
                    'grade' => null,
                    'priority' => 45,
                ];
            }
        }

        return $documents;
    }

    /**
     * @param array<int, array<string, mixed>> $documents
     * @param array<string, mixed> $profile
     */
    protected function indexDocuments(array $documents, array $profile, string $language): void
    {
        if (!$this->vectorStoreAvailable() || empty($documents)) {
            return;
        }

        $timestamp = now();

        foreach ($documents as $document) {
            try {
                $body = $this->cleanText((string) ($document['body'] ?? ''));
                if ($body === '') {
                    continue;
                }

                $title = $this->cleanText((string) ($document['title'] ?? ''));
                $reference = $this->cleanText((string) ($document['reference'] ?? ''));
                $terms = array_values(array_unique(array_filter(array_merge(
                    $profile['expanded_keywords'] ?? [],
                    $this->extractKeywords($this->normalizeText($title . ' ' . $reference))
                ))));

                RagDocument::query()->updateOrCreate(
                    ['document_key' => (string) $document['document_key']],
                    [
                        'source' => (string) ($document['source'] ?? 'islamhouse'),
                        'source_type' => (string) ($document['source_type'] ?? 'item'),
                        'source_id' => (string) ($document['source_id'] ?? ''),
                        'language' => $language,
                        'title' => $title,
                        'reference' => $reference,
                        'body' => $body,
                        'snippet' => $this->cleanText((string) ($document['snippet'] ?? '')),
                        'grade' => $this->normalizeOptionalString($document['grade'] ?? null),
                        'priority' => (int) ($document['priority'] ?? 0),
                        'embedding' => $this->embeddingService->embed($title . "\n" . $reference . "\n" . $body, $terms),
                        'metadata' => is_array($document['metadata'] ?? null) ? $document['metadata'] : [],
                        'fetched_at' => $timestamp,
                    ]
                );
            } catch (\Throwable $exception) {
                Log::warning('Failed to index RAG document', [
                    'document_key' => $document['document_key'] ?? null,
                    'error' => $exception->getMessage(),
                ]);
            }
        }
    }

    protected function vectorStoreAvailable(): bool
    {
        static $available = null;

        if ($available !== null) {
            return $available;
        }

        try {
            $available = Schema::hasTable('rag_documents');
        } catch (\Throwable $exception) {
            $available = false;
        }

        return $available;
    }

    /**
     * @param array<string, mixed> $profile
     * @return array<int, array<string, mixed>>
     */
    protected function searchVectorStore(array $profile, string $language, int $limit): array
    {
        if (!$this->vectorStoreAvailable()) {
            return [];
        }

        try {
            $candidateLimit = max(100, (int) config('services.ai_rag.vector_candidate_limit', 500));
            $documents = RagDocument::query()
                ->where('language', $language)
                ->orderByDesc('fetched_at')
                ->limit($candidateLimit)
                ->get();
        } catch (\Throwable $exception) {
            Log::warning('Failed to query vector store', [
                'error' => $exception->getMessage(),
            ]);
            return [];
        }

        $items = [];
        foreach ($documents as $document) {
            $embedding = is_array($document->embedding) ? $document->embedding : [];
            $vectorScore = $this->embeddingService->cosineSimilarity($profile['embedding'] ?? [], $embedding);
            $keywordScore = $this->keywordScore(
                (string) $document->title . ' ' . (string) $document->reference . ' ' . (string) $document->body,
                $profile['expanded_keywords'] ?? []
            );

            if ($vectorScore < 0.08 && $keywordScore === 0) {
                continue;
            }

            $item = $this->ragDocumentToItem($document);
            $item['vector_score'] = $vectorScore;
            $item['keyword_score'] = $keywordScore;
            $item['final_score'] = $this->computeFinalScore($item, $profile, true);
            $items[] = $item;
        }

        usort($items, fn (array $a, array $b): int => ($b['final_score'] ?? 0) <=> ($a['final_score'] ?? 0));

        return array_slice($items, 0, $limit);
    }

    protected function ragDocumentToItem(RagDocument $document): array
    {
        $metadata = is_array($document->metadata) ? $document->metadata : [];

        return [
            'document_key' => $document->document_key,
            'source' => $document->source,
            'source_type' => $document->source_type,
            'source_id' => $document->source_id,
            'language' => $document->language,
            'title' => $document->title,
            'reference' => $document->reference,
            'body' => $document->body,
            'snippet' => $document->snippet ?: $this->snippet($document->body, self::MAX_SNIPPET_CHARS),
            'translation' => Arr::get($metadata, 'translation'),
            'description' => Arr::get($metadata, 'description'),
            'metadata' => $metadata,
            'grade' => $document->grade,
            'priority' => (int) $document->priority,
        ];
    }

    /**
     * @param array<string, mixed> $profile
     * @param array<int, array<string, mixed>> $candidateSets
     * @return array<int, array<string, mixed>>
     */
    protected function mergeCandidates(array $profile, array ...$candidateSets): array
    {
        $merged = [];
        $seen = [];

        foreach ($candidateSets as $candidateSet) {
            foreach ($candidateSet as $item) {
                if (!is_array($item)) {
                    continue;
                }

                $key = $this->candidateDedupKey($item);
                if ($key === '' || isset($seen[$key])) {
                    continue;
                }

                $item['final_score'] = $this->computeFinalScore($item, $profile, isset($item['vector_score']));
                $seen[$key] = true;
                $merged[] = $item;
            }
        }

        usort($merged, fn (array $a, array $b): int => ($b['final_score'] ?? 0) <=> ($a['final_score'] ?? 0));

        return $merged;
    }

    /**
     * @param array<int, array<string, mixed>> $items
     * @return array<int, array<string, mixed>>
     */
    protected function selectTopItems(array $items): array
    {
        $selected = [];
        $counts = [
            'quran' => 0,
            'hadith' => 0,
            'islamhouse' => 0,
        ];
        $limits = [
            'quran' => 3,
            'hadith' => 3,
            'islamhouse' => 3,
        ];

        foreach ($items as $item) {
            $source = (string) ($item['source'] ?? 'islamhouse');
            if (($item['final_score'] ?? 0) < self::MIN_FINAL_SCORE) {
                continue;
            }
            if (!isset($counts[$source])) {
                $counts[$source] = 0;
                $limits[$source] = 2;
            }
            if ($counts[$source] >= $limits[$source]) {
                continue;
            }

            $selected[] = $item;
            $counts[$source]++;

            if (count($selected) >= self::MAX_CONTEXT_ITEMS) {
                break;
            }
        }

        return $selected;
    }

    /**
     * @param array<string, mixed> $item
     * @param array<string, mixed> $profile
     */
    protected function computeFinalScore(array $item, array $profile, bool $hasVectorScore = false): float
    {
        $priority = (float) ($item['priority'] ?? $this->defaultPriority($item['source'] ?? 'islamhouse', $item['grade'] ?? null));
        $keywordScore = (float) ($item['keyword_score'] ?? $this->keywordScore(
            ($item['title'] ?? '') . ' ' . ($item['reference'] ?? '') . ' ' . ($item['body'] ?? ''),
            $profile['expanded_keywords'] ?? []
        ));
        $vectorScore = $hasVectorScore
            ? ((float) ($item['vector_score'] ?? 0.0)) * 100.0
            : ((float) $this->embeddingService->cosineSimilarity(
                $profile['embedding'] ?? [],
                $this->embeddingService->embed(
                    ($item['title'] ?? '') . "\n" . ($item['reference'] ?? '') . "\n" . ($item['body'] ?? ''),
                    $profile['expanded_keywords'] ?? []
                )
            )) * 100.0;

        return $priority
            + ($keywordScore * 6.0)
            + ($vectorScore * 0.75)
            + $this->sourceIntentBoost((string) ($item['source'] ?? ''), $item['grade'] ?? null, $profile);
    }

    protected function defaultPriority(string $source, ?string $grade): int
    {
        if ($source === 'quran') {
            return 100;
        }
        if ($source === 'hadith') {
            return match ($this->classifyHadithGrade($grade)) {
                'sahih' => 85,
                'hasan' => 75,
                'weak' => 15,
                default => 45,
            };
        }

        return 40;
    }

    /**
     * @param array<string, mixed> $profile
     */
    protected function sourceIntentBoost(string $source, ?string $grade, array $profile): int
    {
        $intent = (string) ($profile['intent'] ?? 'general');
        $boost = 0;

        if ($intent === 'quran' && $source === 'quran') {
            $boost += 20;
        }
        if ($intent === 'hadith' && $source === 'hadith') {
            $boost += 20;
        }
        if ($intent === 'ruling' && $source === 'islamhouse') {
            $boost += 10;
        }

        if ($source === 'hadith') {
            $classification = $this->classifyHadithGrade($grade);
            if ($classification === 'sahih') {
                $boost += 10;
            } elseif ($classification === 'hasan') {
                $boost += 6;
            } elseif ($classification === 'weak') {
                $boost -= 30;
            } else {
                $boost -= 8;
            }
        }

        return $boost;
    }

    /**
     * @param array<int, string> $keywords
     */
    protected function keywordScore(string $text, array $keywords): int
    {
        $normalizedText = $this->normalizeText($text);
        if ($normalizedText === '' || empty($keywords)) {
            return 0;
        }

        $score = 0;
        foreach ($keywords as $keyword) {
            $keyword = $this->normalizeText((string) $keyword);
            if ($keyword === '') {
                continue;
            }

            if (preg_match('/\b' . preg_quote($keyword, '/') . '\b/', $normalizedText)) {
                $score += 2;
            } elseif (str_contains($normalizedText, $keyword)) {
                $score += 1;
            }
        }

        return $score;
    }

    /**
     * @param array<int, array<string, mixed>> $items
     * @return array<int, array<string, mixed>>
     */
    protected function buildContextSections(array $items): array
    {
        $grouped = [
            'quran' => [],
            'hadith' => [],
            'islamhouse' => [],
        ];

        foreach ($items as $item) {
            $grouped[(string) ($item['source'] ?? 'islamhouse')][] = $item;
        }

        $sections = [];
        if (!empty($grouped['quran'])) {
            $sections[] = [
                'key' => 'quran',
                'title' => 'Quran (verses + translations + references)',
                'items' => $grouped['quran'],
            ];
        }
        if (!empty($grouped['hadith'])) {
            $sections[] = [
                'key' => 'hadith',
                'title' => 'Hadith (text + source + authenticity grade)',
                'items' => $grouped['hadith'],
            ];
        }
        if (!empty($grouped['islamhouse'])) {
            $sections[] = [
                'key' => 'islamhouse',
                'title' => 'IslamHouse (title + snippet + type)',
                'items' => $grouped['islamhouse'],
            ];
        }

        return $sections;
    }

    /**
     * @param array<int, array<string, mixed>> $sections
     */
    protected function buildStructuredContext(array $sections): string
    {
        $lines = [];
        $length = 0;

        foreach ($sections as $section) {
            $lines[] = $section['title'] . ':';
            foreach ($section['items'] as $item) {
                $block = [
                    '- Reference: ' . ($item['reference'] ?? $item['title'] ?? 'Source'),
                ];

                if (!empty($item['translation'])) {
                    $block[] = '  Translation: ' . $item['translation'];
                }

                if (!empty($item['body']) && empty($item['translation'])) {
                    $block[] = '  Text: ' . $this->snippet((string) $item['body'], self::MAX_SNIPPET_CHARS);
                }

                if (!empty($item['description'])) {
                    $label = ($item['source'] ?? '') === 'quran' ? '  Tafsir: ' : '  Description: ';
                    $block[] = $label . $item['description'];
                }

                if (!empty($item['grade'])) {
                    $block[] = '  Authenticity: ' . $item['grade'];
                }

                if (($item['source'] ?? '') === 'islamhouse') {
                    $block[] = '  Type: ' . Str::headline((string) ($item['source_type'] ?? 'item'));
                }

                $block[] = '  Snippet: ' . ($item['snippet'] ?? '');
                $text = implode("\n", $block);
                $length += strlen($text);
                if ($length > 5500) {
                    break 2;
                }
                $lines[] = $text;
            }
            $lines[] = '';
        }

        return trim(implode("\n", $lines));
    }

    /**
     * @param array<int, array<string, mixed>> $items
     * @return array<int, array<string, mixed>>
     */
    protected function buildReferences(array $items): array
    {
        $references = [];
        $seen = [];

        foreach ($items as $item) {
            $source = (string) ($item['source'] ?? 'islamhouse');
            $label = trim((string) ($item['reference'] ?? $item['title'] ?? ''));
            if ($label === '') {
                continue;
            }

            if ($source === 'quran') {
                $label = 'Quran: ' . $label;
            } elseif ($source === 'hadith') {
                $grade = $this->formatHadithGrade($item['grade'] ?? null);
                $label = 'Hadith: ' . $label . ($grade !== '' ? " ({$grade})" : '');
            } else {
                $label = 'IslamHouse: ' . $label . ' (' . Str::headline((string) ($item['source_type'] ?? 'item')) . ')';
            }

            $url = $this->normalizeOptionalString(Arr::get($item, 'metadata.url'));
            $key = strtolower($label . '|' . ($url ?? ''));
            if (isset($seen[$key])) {
                continue;
            }
            $seen[$key] = true;

            $references[] = [
                'label' => $label,
                'url' => $url,
                'sourceBadge' => ucfirst($source),
                'hadithGrade' => $source === 'hadith' ? $this->formatHadithGrade($item['grade'] ?? null) : null,
            ];
        }

        return array_slice($references, 0, self::MAX_CONTEXT_ITEMS);
    }

    /**
     * @param array<int, array<string, mixed>> $items
     */
    protected function generateSourcedAnswer(
        string $question,
        string $language,
        string $contextBlock,
        array $items
    ): string {
        $generated = $this->requestModelCompletion(
            [
                [
                    'role' => 'system',
                    'content' => $this->buildSourcedSystemPrompt($language),
                ],
                [
                    'role' => 'user',
                    'content' => "Question:\n{$question}\n\nStructured context:\n{$contextBlock}",
                ],
            ],
            500
        );

        if ($generated !== null && trim($generated) !== '') {
            return trim($generated);
        }

        return $this->buildDeterministicSourcedAnswer($items);
    }

    protected function generateFallbackAnswer(string $question, string $language): string
    {
        $generated = $this->requestModelCompletion(
            [
                [
                    'role' => 'system',
                    'content' => $this->buildFallbackSystemPrompt($language),
                ],
                [
                    'role' => 'user',
                    'content' => "Question:\n{$question}",
                ],
            ],
            260
        );

        if ($generated !== null && trim($generated) !== '') {
            return trim($generated);
        }

        return implode("\n\n", [
            'Answer',
            'General guidance (not directly sourced from Quran, Hadith, or IslamHouse): I could not find strong direct evidence for this question in the retrieved sources. Please ask a narrower question with a clear topic, verse reference, or hadith topic. Allah knows best.',
            'Evidence Structure',
            '- Quran references: none retrieved with strong confidence',
            '- Hadith references: none retrieved with strong confidence',
            '- IslamHouse references: none retrieved with strong confidence',
        ]);
    }

    protected function buildSourcedSystemPrompt(string $language): string
    {
        return <<<PROMPT
You are an evidence-based Islamic assistant.
Use ONLY the provided context.
Do not fabricate rulings, sources, or citations.
Prioritize Quran, then authentic Hadith, then IslamHouse scholarly explanation.
Maintain a respectful Islamic tone.
If the evidence is limited, say so clearly and end with "Allah knows best."
Write in {$language} only.
Format exactly with these sections:
Answer

Evidence Structure
- Quran references: ...
- Hadith references: ...
- IslamHouse references: ...
PROMPT;
    }

    protected function buildFallbackSystemPrompt(string $language): string
    {
        return <<<PROMPT
You are an Islamic assistant.
No strong direct source matches were retrieved.
Write in {$language} only.
Be cautious, respectful, and concise.
Start with the heading "Answer".
Add the heading "Evidence Structure".
State clearly that the answer is general guidance and not directly sourced from Quran, Hadith, or IslamHouse.
End with "Allah knows best."
PROMPT;
    }

    /**
     * @param array<int, array<string, string>> $messages
     */
    protected function requestModelCompletion(array $messages, int $maxTokens): ?string
    {
        $token = trim((string) config('services.huggingface.token', ''));
        $model = trim((string) config('services.huggingface.model', ''));
        if ($token === '' || $model === '') {
            return null;
        }

        $provider = (string) config('services.huggingface.router_provider', 'novita');

        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$token}",
                'Content-Type' => 'application/json',
            ])->timeout(45)->post(self::HUGGING_FACE_URL, [
                'model' => $model,
                'provider' => $provider,
                'messages' => $messages,
                'temperature' => 0.1,
                'top_p' => 0.8,
                'max_tokens' => $maxTokens,
                'stream' => false,
            ]);

            if (!$response->successful()) {
                Log::warning('AI assistant model request failed', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                return null;
            }

            return $this->extractGeneratedText($response->json());
        } catch (\Throwable $exception) {
            Log::warning('AI assistant model request exception', [
                'error' => $exception->getMessage(),
            ]);
            return null;
        }
    }

    protected function extractGeneratedText($payload): ?string
    {
        if (is_string($payload)) {
            return $payload;
        }
        if (!is_array($payload)) {
            return null;
        }

        foreach ((array) ($payload['choices'] ?? []) as $choice) {
            $message = Arr::get($choice, 'message.content');
            if (is_string($message) && trim($message) !== '') {
                return $message;
            }
            $text = Arr::get($choice, 'text');
            if (is_string($text) && trim($text) !== '') {
                return $text;
            }
        }

        $generatedText = Arr::get($payload, 'generated_text');
        return is_string($generatedText) ? $generatedText : null;
    }

    /**
     * @param array<int, array<string, mixed>> $items
     */
    protected function buildDeterministicSourcedAnswer(array $items): string
    {
        $quranRefs = [];
        $hadithRefs = [];
        $islamHouseRefs = [];
        $bodyParts = [];

        foreach ($items as $item) {
            $source = (string) ($item['source'] ?? 'islamhouse');
            if ($source === 'quran' && count($quranRefs) < 3) {
                $quranRefs[] = $item['reference'];
                $bodyParts[] = ($item['reference'] ?? 'Quran') . ': ' . ($item['translation'] ?? $item['snippet'] ?? '');
                continue;
            }
            if ($source === 'hadith' && count($hadithRefs) < 3) {
                $hadithRefs[] = ($item['reference'] ?? 'Hadith') . ' [' . $this->formatHadithGrade($item['grade'] ?? null) . ']';
                $bodyParts[] = ($item['reference'] ?? 'Hadith') . ': ' . $this->snippet((string) ($item['body'] ?? ''), 220);
                continue;
            }
            if ($source === 'islamhouse' && count($islamHouseRefs) < 3) {
                $islamHouseRefs[] = ($item['title'] ?? 'IslamHouse item') . ' (' . Str::headline((string) ($item['source_type'] ?? 'item')) . ')';
                $bodyParts[] = ($item['title'] ?? 'IslamHouse') . ': ' . ($item['snippet'] ?? '');
            }
        }

        return implode("\n\n", [
            'Answer',
            implode("\n\n", array_filter($bodyParts)) . "\n\nAllah knows best.",
            'Evidence Structure',
            '- Quran references: ' . (!empty($quranRefs) ? implode('; ', $quranRefs) : 'none'),
            '- Hadith references: ' . (!empty($hadithRefs) ? implode('; ', $hadithRefs) : 'none'),
            '- IslamHouse references: ' . (!empty($islamHouseRefs) ? implode('; ', $islamHouseRefs) : 'none'),
        ]);
    }

    protected function classifyHadithGrade(?string $grade): string
    {
        $normalized = $this->normalizeText((string) $grade);
        if ($normalized === '') {
            return 'unverified';
        }
        if (preg_match('/\b(sahih|saheeh|authentic)\b/', $normalized)) {
            return 'sahih';
        }
        if (preg_match('/\b(hasan|good)\b/', $normalized)) {
            return 'hasan';
        }
        if (preg_match('/\b(daif|dhaif|weak|fabricated|mawdu)\b/', $normalized)) {
            return 'weak';
        }

        return 'unverified';
    }

    protected function formatHadithGrade(?string $grade): string
    {
        return match ($this->classifyHadithGrade($grade)) {
            'sahih' => 'Sahih',
            'hasan' => 'Hasan',
            'weak' => 'Weak',
            default => 'Unverified',
        };
    }

    /**
     * @param array<string, mixed> $row
     * @param array<string, mixed> $profile
     * @return array<string, mixed>|null
     */
    protected function normalizeHadithDocument(array $row, array $profile, string $language): ?array
    {
        $text = $this->cleanText((string) (
            Arr::get($row, 'hadeeth')
            ?? Arr::get($row, 'text')
            ?? Arr::get($row, 'content')
            ?? Arr::get($row, 'description')
            ?? ''
        ));
        if ($text === '') {
            return null;
        }

        $grade = $this->cleanText((string) (
            Arr::get($row, 'grade')
            ?? Arr::get($row, 'rank')
            ?? Arr::get($row, 'hukm')
            ?? ''
        ));
        $classification = $this->classifyHadithGrade($grade);
        if ($classification === 'weak' && empty($profile['allow_weak_hadith'])) {
            return null;
        }

        $title = $this->cleanText((string) (
            Arr::get($row, 'title')
            ?? Arr::get($row, 'book')
            ?? Arr::get($row, 'collection')
            ?? 'Hadith'
        ));
        $id = trim((string) (
            Arr::get($row, 'id')
            ?? Arr::get($row, 'hadeeth_id')
            ?? Arr::get($row, 'number')
            ?? Arr::get($row, 'hadith_number')
            ?? md5($title . $text)
        ));
        $referenceBase = $this->cleanText((string) (
            Arr::get($row, 'attribution')
            ?? Arr::get($row, 'source')
            ?? Arr::get($row, 'book')
            ?? Arr::get($row, 'collection')
            ?? $title
        ));
        $reference = trim($referenceBase . (!str_contains($referenceBase, $id) && $id !== '' ? " {$id}" : ''));
        $description = $this->cleanText((string) (
            Arr::get($row, 'explanation')
            ?? Arr::get($row, 'description')
            ?? ''
        ));

        return [
            'document_key' => "hadith:{$id}:{$language}",
            'source' => 'hadith',
            'source_type' => 'hadith',
            'source_id' => $id,
            'language' => $language,
            'title' => $title !== '' ? $title : 'Hadith',
            'reference' => $reference !== '' ? $reference : 'HadithEnc',
            'body' => trim($text . ($description !== '' ? "\n\nExplanation: {$description}" : '')),
            'snippet' => $this->snippet($text . ' ' . $description, self::MAX_SNIPPET_CHARS),
            'translation' => null,
            'description' => $description,
            'metadata' => [
                'url' => rtrim((string) config('services.hadeethenc.base', 'https://hadeethenc.com/api/v1'), '/') . "/hadeeths/one/?language={$language}&id={$id}",
            ],
            'grade' => $classification === 'unverified' ? 'unverified' : $grade,
            'priority' => $this->defaultPriority('hadith', $grade),
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    protected function extractHadithRowsFromResponse($response): array
    {
        $rows = $this->extractListPayloadFromResponse($response);
        if (!empty($rows)) {
            $documents = [];
            foreach ($rows as $row) {
                if (is_array($row)) {
                    $documents[] = $row;
                }
            }
            return $documents;
        }

        $single = $this->extractFirstPayloadRowFromResponse($response);
        return is_array($single) ? [$single] : [];
    }

    /**
     * @return array<int, mixed>
     */
    protected function extractListPayloadFromResponse($response): array
    {
        if (!$response || !method_exists($response, 'successful') || !$response->successful()) {
            return [];
        }

        $payload = $response->json();
        if (!is_array($payload)) {
            return [];
        }

        $candidates = [
            Arr::get($payload, 'result'),
            Arr::get($payload, 'data'),
            Arr::get($payload, 'items'),
            Arr::get($payload, 'results'),
            $payload,
        ];

        foreach ($candidates as $candidate) {
            if (is_array($candidate) && array_is_list($candidate)) {
                return $candidate;
            }
        }

        foreach ($candidates as $candidate) {
            if (is_array($candidate)) {
                foreach ($candidate as $value) {
                    if (is_array($value) && array_is_list($value)) {
                        return $value;
                    }
                }
            }
        }

        return [];
    }

    /**
     * @return array<string, mixed>|null
     */
    protected function extractFirstPayloadRowFromResponse($response): ?array
    {
        if (!$response || !method_exists($response, 'successful') || !$response->successful()) {
            return null;
        }

        $payload = $response->json();
        if (!is_array($payload)) {
            return null;
        }

        $result = Arr::get($payload, 'result');
        if (is_array($result) && !array_is_list($result)) {
            return $result;
        }

        $data = Arr::get($payload, 'data');
        if (is_array($data) && !array_is_list($data)) {
            return $data;
        }

        $rows = $this->extractListPayloadFromResponse($response);
        $first = $rows[0] ?? null;

        return is_array($first) ? $first : null;
    }

    /**
     * @param array<int, array<string, mixed>> $documents
     * @return array<int, array<string, mixed>>
     */
    protected function dedupeDocuments(array $documents): array
    {
        $deduped = [];
        $seen = [];

        foreach ($documents as $document) {
            $key = $this->candidateDedupKey($document);
            if ($key === '' || isset($seen[$key])) {
                continue;
            }
            $seen[$key] = true;
            $deduped[] = $document;
        }

        return $deduped;
    }

    protected function cleanText(string $text): string
    {
        $text = strip_tags($text);
        $text = html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $text = preg_replace('/\s+/', ' ', $text);
        return trim((string) $text);
    }

    protected function snippet(string $text, int $limit = 240): string
    {
        $clean = $this->cleanText($text);
        if ($clean === '') {
            return '';
        }
        if (mb_strlen($clean) <= $limit) {
            return $clean;
        }

        return rtrim(mb_substr($clean, 0, $limit - 3)) . '...';
    }

    protected function normalizeUrl(string $url): ?string
    {
        $url = trim($url);
        if ($url === '') {
            return null;
        }
        if (str_starts_with($url, '//')) {
            return "https:{$url}";
        }
        if (str_starts_with($url, '/')) {
            return 'https://islamhouse.com' . $url;
        }
        if (!str_starts_with($url, 'http://') && !str_starts_with($url, 'https://')) {
            return null;
        }
        return $url;
    }

    protected function normalizeOptionalString($value): ?string
    {
        $text = trim((string) $value);
        return $text === '' ? null : $text;
    }

    /**
     * @param array<string, mixed> $item
     */
    protected function candidateDedupKey(array $item): string
    {
        $source = strtolower((string) ($item['source'] ?? ''));
        $url = strtolower((string) Arr::get($item, 'metadata.url', ''));
        $title = strtolower($this->cleanText((string) ($item['title'] ?? '')));

        if ($source === 'islamhouse' && ($title !== '' || $url !== '')) {
            return "islamhouse|{$title}|{$url}";
        }

        return strtolower((string) (
            $item['document_key']
            ?? ($source . '|'
                . ($item['source_id'] ?? '') . '|'
                . ($item['reference'] ?? '') . '|'
                . $url . '|'
                . $title)
        ));
    }
}
