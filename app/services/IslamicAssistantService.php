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
    private const MAX_RETRIEVAL_ATTEMPTS = 2;
    private const MIN_FINAL_SCORE = 55.0;
    private const MIN_KEYWORD_SCORE = 1;
    private const MIN_STRICT_KEYWORD_SCORE = 2;
    private const VERIFIED_SOURCES_FALLBACK_MESSAGE = 'Evidence not found in primary sources. Allah knows best.';
    private const HUGGING_FACE_URL = 'https://router.huggingface.co/v1/chat/completions';
    private const STRICT_SOURCE_KEYWORDS = [
        'hadith',
        'quran',
        'verse',
        'prophet',
        'islam',
        'ruling',
        'halal',
        'haram',
    ];
    private const ISLAMHOUSE_LIMITS = [
        'article' => 10,
        'fatwa' => 10,
        'book' => 5,
    ];

    protected PromptSanitizer $sanitizer;
    protected IslamicEmbeddingService $embeddingService;
    protected array $debugTrace = [];

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
     *   category: string,
     *   evidence_level: string,
     *   confidence_score: int,
     *   confidence_badge: string,
     *   ui_badge: string,
     *   debug_mode?: bool,
     *   debug?: array<string, mixed>,
     *   message: string,
     *   short_summary: string,
     *   references: array<int, array<string, mixed>>,
     *   context_sections: array<int, array<string, mixed>>,
     *   total_sources: int
     * }
     */
    public function answer(string $question, string $language = 'en', array $options = []): array
    {
        $this->debugTrace = [];
        $language = $this->normalizeLanguage($language);
        $cleanQuestion = $this->sanitizer->sanitize($question, 1500);
        $profile = $this->buildQueryProfile($cleanQuestion, $language, $options);
        $this->logRetrievalQueries($cleanQuestion, $profile);
        $hardDebugChecks = ($profile['debug_mode'] ?? false) === true
            ? $this->runDebugEndpointChecks($language)
            : [];
        $retrieval = $this->retrieveValidatedItems($profile, $language);

        if ($this->shouldRetryRetrieval($retrieval, $profile)) {
            $retryProfile = $this->buildRetryProfile($profile);
            $retryRetrieval = $this->retrieveValidatedItems($retryProfile, $language);

            if ($this->shouldPreferRetryResult($retrieval, $retryRetrieval)) {
                $profile = $retryProfile;
                $retrieval = $retryRetrieval;
            }
        }

        $validation = $retrieval['validation'];
        $profile['evidence_level'] = (string) ($validation['stats']['evidence_level'] ?? 'Weak');
        $profile['confidence_score'] = (int) ($validation['stats']['confidence_score'] ?? 0);
        $profile['confidence_badge'] = (string) ($validation['stats']['confidence_badge'] ?? 'Low');
        $profile['ui_badge'] = (string) ($validation['stats']['ui_badge'] ?? 'Low Evidence');
        $profile['scholarly_only'] = (bool) ($validation['stats']['scholarly_only'] ?? false);
        $this->logRetrievalValidation($cleanQuestion, $profile, $validation);

        if (($profile['debug_mode'] ?? false) === true) {
            return [
                'question' => $cleanQuestion,
                'language' => $language,
                'sourced' => false,
                'category' => (string) ($profile['category'] ?? 'general'),
                'evidence_level' => (string) ($profile['evidence_level'] ?? 'Weak'),
                'confidence_score' => (int) ($profile['confidence_score'] ?? 0),
                'confidence_badge' => (string) ($profile['confidence_badge'] ?? 'Low'),
                'ui_badge' => (string) ($profile['ui_badge'] ?? 'Low Evidence'),
                'debug_mode' => true,
                'debug' => [
                    'hard_tests' => $hardDebugChecks,
                    'raw_responses' => $this->debugTrace,
                    'source_counts' => $retrieval['source_counts'] ?? [],
                    'validation' => $validation,
                ],
                'message' => 'Debug mode enabled. Raw API responses returned before AI processing.',
                'short_summary' => 'Debug mode enabled. Raw API responses returned before AI processing.',
                'references' => [],
                'context_sections' => [],
                'total_sources' => 0,
            ];
        }

        if (($validation['blocked'] ?? false) === true) {
            $message = $this->buildStructuredFallbackResponse((string) $validation['message']);

            return [
                'question' => $cleanQuestion,
                'language' => $language,
                'sourced' => false,
                'category' => (string) ($profile['category'] ?? 'general'),
                'evidence_level' => (string) ($profile['evidence_level'] ?? 'Weak'),
                'confidence_score' => (int) ($profile['confidence_score'] ?? 0),
                'confidence_badge' => (string) ($profile['confidence_badge'] ?? 'Low'),
                'ui_badge' => (string) ($profile['ui_badge'] ?? 'Low Evidence'),
                'message' => $message,
                'short_summary' => $this->snippet($message, 180),
                'references' => [],
                'context_sections' => [],
                'total_sources' => 0,
            ];
        }

        $topItems = $validation['items'] ?? [];
        $contextSections = $this->buildContextSections($topItems);
        $references = $this->buildReferences($topItems);
        $sourced = !empty($topItems);

        if ($sourced) {
            $contextBlock = $this->buildStructuredContext($contextSections);
            if ($contextBlock === '') {
                $message = $this->strictOrGeneralFallback($profile, false);
                $sourced = false;
                $references = [];
                $contextSections = [];
            } else {
                $message = $this->generateSourcedAnswer($cleanQuestion, $language, $contextBlock, $topItems, $references, $profile);
            }
        } else {
            $message = $this->strictOrGeneralFallback($profile, false, $cleanQuestion, $language);
        }

        return [
            'question' => $cleanQuestion,
            'language' => $language,
            'sourced' => $sourced,
            'category' => (string) ($profile['category'] ?? 'general'),
            'evidence_level' => (string) ($profile['evidence_level'] ?? 'Weak'),
            'confidence_score' => (int) ($profile['confidence_score'] ?? 0),
            'confidence_badge' => (string) ($profile['confidence_badge'] ?? 'Low'),
            'ui_badge' => (string) ($profile['ui_badge'] ?? 'Low Evidence'),
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
     *   normalized_queries: array<int, string>,
     *   islamhouse_queries: array<int, string>,
     *   intent: string,
     *   category: string,
     *   evidence_required: bool,
     *   smart_evidence_mode: bool,
     *   broaden_search_filters: bool,
     *   debug_mode: bool,
     *   allow_weak_hadith: bool,
     *   retrieval_attempt: int,
     *   verse_refs: array<int, array{surah:int, ayah:int, verse_key:string}>,
     *   embedding: array<int, float>
     * }
     */
    protected function buildQueryProfile(string $question, string $language, array $options = []): array
    {
        $normalized = $this->normalizeText($question);
        $keywords = $this->extractKeywords($normalized);
        $expandedKeywords = $this->expandKeywords($keywords, $normalized);
        $verseRefs = $this->extractVerseReferences($question);
        $category = $this->classifyQueryCategory($normalized);
        $intent = $this->detectIntent($normalized, $expandedKeywords, $category);
        $smartEvidenceMode = array_key_exists('smart_evidence_mode', $options)
            ? (bool) $options['smart_evidence_mode']
            : (bool) config('services.ai_rag.smart_evidence_mode', true);
        $evidenceRequired = $smartEvidenceMode && $this->requiresEvidence($normalized, $category);
        $normalizedQueries = $this->buildNormalizedQueries($normalized, $keywords, $expandedKeywords);

        return [
            'normalized' => $normalized,
            'keywords' => $keywords,
            'expanded_keywords' => $expandedKeywords,
            'search_text' => $this->buildSearchText($keywords, 1),
            'normalized_queries' => $normalizedQueries,
            'islamhouse_queries' => $this->buildIslamHouseSearchQueries($normalizedQueries, $keywords, $expandedKeywords),
            'intent' => $intent,
            'category' => $category,
            'evidence_required' => $evidenceRequired,
            'smart_evidence_mode' => $smartEvidenceMode,
            'broaden_search_filters' => false,
            'debug_mode' => array_key_exists('debug_mode', $options)
                ? (bool) $options['debug_mode']
                : (bool) config('services.ai_rag.debug_mode', false),
            'allow_weak_hadith' => $this->allowWeakHadith($normalized),
            'retrieval_attempt' => 1,
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

    protected function classifyQueryCategory(string $normalizedQuestion): string
    {
        if ($normalizedQuestion === '') {
            return 'general';
        }

        if ($this->containsAnyQuerySignal($normalizedQuestion, [
            'ruling',
            'halal',
            'haram',
            'permissible',
            'allowed',
            'forbidden',
            'fatwa',
        ])) {
            return 'fiqh';
        }

        if ($this->containsAnyQuerySignal($normalizedQuestion, [
            'hadith',
            'prophet said',
            'narration',
        ])) {
            return 'hadith';
        }

        if ($this->containsAnyQuerySignal($normalizedQuestion, [
            'quran',
            'verse',
            'ayah',
            'surah',
        ])) {
            return 'quran';
        }

        if ($this->containsAnyQuerySignal($normalizedQuestion, [
            'what does islam say',
            'is it allowed',
            'should i',
            'can i',
        ])) {
            return 'religious_guidance';
        }

        return 'general';
    }

    /**
     * @param array<int, string> $signals
     */
    protected function containsAnyQuerySignal(string $normalizedQuestion, array $signals): bool
    {
        foreach ($signals as $signal) {
            $signal = $this->normalizeText($signal);
            if ($signal === '') {
                continue;
            }

            if (str_contains($signal, ' ')) {
                if (str_contains($normalizedQuestion, $signal)) {
                    return true;
                }
                continue;
            }

            if (preg_match('/\b' . preg_quote($signal, '/') . '\b/', $normalizedQuestion)) {
                return true;
            }
        }

        return false;
    }

    protected function detectIntent(string $normalizedQuestion, array $expandedKeywords, string $category = 'general'): string
    {
        if ($category === 'quran') {
            return 'quran';
        }
        if ($category === 'hadith') {
            return 'hadith';
        }
        if (in_array($category, ['fiqh', 'religious_guidance'], true)) {
            return 'ruling';
        }

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

    protected function requiresEvidence(string $normalizedQuestion, string $category): bool
    {
        if (in_array($category, ['fiqh', 'hadith', 'quran', 'religious_guidance'], true)) {
            return true;
        }

        foreach (self::STRICT_SOURCE_KEYWORDS as $keyword) {
            if (preg_match('/\b' . preg_quote($keyword, '/') . '\b/', $normalizedQuestion)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param array<int, string> $terms
     */
    protected function buildSearchText(array $terms, int $attempt): string
    {
        $limit = $attempt >= self::MAX_RETRIEVAL_ATTEMPTS ? 10 : 6;

        return trim(implode(' ', array_slice(array_values(array_unique(array_filter($terms))), 0, $limit)));
    }

    /**
     * @param array<int, string> $expandedKeywords
     * @return array<int, string>
     */
    protected function buildNormalizedQueries(
        string $normalizedQuestion,
        array $keywords = [],
        array $expandedKeywords = [],
        bool $aggressive = false
    ): array
    {
        if ($normalizedQuestion === '') {
            return [];
        }

        $queries = [
            $normalizedQuestion,
            str_replace([
                'what do scholars say about',
                'is it allowed',
                'is it haram',
                'is it halal',
            ], '', $normalizedQuestion),
        ];

        $primaryKeywords = array_values(array_unique(array_filter(array_slice($keywords, 0, 3))));
        foreach ($primaryKeywords as $keyword) {
            $keyword = $this->normalizeText((string) $keyword);
            if ($keyword === '') {
                continue;
            }

            $queries[] = $keyword;
            $queries[] = "{$keyword} ruling";
            $queries[] = "is {$keyword} haram";
            $queries[] = "islam {$keyword}";
            $queries[] = "fatwa {$keyword}";
        }

        if ($aggressive && !empty($expandedKeywords)) {
            $queries[] = $this->buildSearchText($expandedKeywords, self::MAX_RETRIEVAL_ATTEMPTS);
            foreach (array_slice($expandedKeywords, 0, 4) as $keyword) {
                $keyword = $this->normalizeText((string) $keyword);
                if ($keyword !== '') {
                    $queries[] = $keyword;
                }
            }
        }

        return array_values(array_unique(array_filter(array_map(
            fn ($query): string => $this->normalizeText((string) $query),
            $queries
        ))));
    }

    /**
     * @param array<int, string> $keywords
     * @param array<int, string> $expandedKeywords
     * @return array<int, string>
     */
    protected function buildQuranSearchQueries(string $normalizedQuestion, array $keywords, array $expandedKeywords): array
    {
        $queries = [];
        $topicSearchMap = [
            'anger' => 'anger patience control',
            'prayer' => 'prayer salah',
            'salah' => 'prayer salah',
            'music' => 'music prohibition',
            'patience' => 'patience sabr',
            'sabr' => 'patience sabr',
            'halal' => 'halal lawful permissible',
            'haram' => 'haram forbidden prohibition',
            'sin' => 'sin repentance forgiveness',
            'worship' => 'worship devotion obedience',
            'intention' => 'intention sincerity',
        ];

        foreach ($topicSearchMap as $signal => $query) {
            if (in_array($signal, $expandedKeywords, true) || str_contains($normalizedQuestion, $signal)) {
                $queries[] = $query;
            }
        }

        $queries[] = $this->buildSearchText($keywords, 1);
        $queries[] = $this->buildSearchText($expandedKeywords, 1);

        return array_values(array_slice(array_unique(array_filter(array_map(
            fn ($query): string => $this->normalizeText((string) $query),
            $queries
        ))), 0, 3));
    }

    /**
     * @param array<int, string> $normalizedQueries
     * @param array<int, string> $expandedKeywords
     * @return array<int, string>
     */
    protected function buildHadithSearchQueries(
        string $normalizedQuestion,
        array $normalizedQueries,
        array $expandedKeywords
    ): array {
        $queries = [];

        foreach (array_slice($normalizedQueries, 0, 2) as $query) {
            $queries[] = $query;
        }

        $topicFallbacks = [
            'anger' => 'anger',
            'prayer' => 'prayer',
            'salah' => 'prayer',
            'intention' => 'intention',
            'sin' => 'sin',
            'patience' => 'patience',
            'sabr' => 'patience',
            'prophet' => 'prophet said',
        ];

        foreach ($topicFallbacks as $signal => $query) {
            if (in_array($signal, $expandedKeywords, true) || str_contains($normalizedQuestion, $signal)) {
                $queries[] = $query;
            }
        }

        $queries = array_merge($queries, [
            'anger',
            'prayer',
            'intention',
            'prophet said',
            'sin',
            'patience',
        ]);

        return array_values(array_slice(array_unique(array_filter(array_map(
            fn ($query): string => $this->normalizeText((string) $query),
            $queries
        ))), 0, 7));
    }

    /**
     * @param array<int, string> $normalizedQueries
     * @param array<int, string> $expandedKeywords
     * @return array<int, string>
     */
    protected function buildIslamHouseSearchQueries(array $normalizedQueries, array $keywords, array $expandedKeywords): array
    {
        $queries = $normalizedQueries;
        $keywordPhrase = $this->buildSearchText($expandedKeywords, 1);
        if ($keywordPhrase !== '') {
            $queries[] = $keywordPhrase;
        }

        foreach (array_slice($keywords, 0, 3) as $keyword) {
            $keyword = $this->normalizeText((string) $keyword);
            if ($keyword === '') {
                continue;
            }

            $queries[] = $keyword;
            $queries[] = "{$keyword} ruling";
            $queries[] = "is {$keyword} haram";
            $queries[] = "islam {$keyword}";
            $queries[] = "fatwa {$keyword}";
        }

        return array_values(array_slice(array_unique(array_filter(array_map(
            fn ($query): string => $this->normalizeText((string) $query),
            $queries
        ))), 0, 12));
    }

    /**
     * @param array<string, mixed> $profile
     * @return array{
     *   validation: array<string, mixed>,
     *   source_counts: array{quran:int, hadith:int, islamhouse:int}
     * }
     */
    protected function retrieveValidatedItems(array $profile, string $language): array
    {
        $vectorLimit = ($profile['retrieval_attempt'] ?? 1) > 1
            ? self::MAX_VECTOR_RESULTS + 4
            : self::MAX_VECTOR_RESULTS;

        $vectorBefore = $this->searchVectorStore($profile, $language, $vectorLimit);
        $liveDocuments = $this->fetchLiveDocuments($profile, $language);
        $this->indexDocuments($liveDocuments, $profile, $language);
        $vectorAfter = $this->searchVectorStore($profile, $language, $vectorLimit);

        $candidates = $this->mergeCandidates($profile, $vectorBefore, $liveDocuments, $vectorAfter);
        $topItems = $this->selectTopItems($candidates, $profile);

        return [
            'validation' => $this->validateRetrievedItems($topItems, $profile),
            'source_counts' => $this->countDocumentsBySource($liveDocuments),
        ];
    }

    protected function runDebugEndpointChecks(string $language): array
    {
        $islamHouseBase = rtrim((string) config('services.islamhouse.base', 'https://api3.islamhouse.com/v3'), '/');

        $checks = [];
        $checks['islamhouse'] = $this->performDebugHttpGet(
            'ISLAMHOUSE_RAW_RESPONSE',
            "{$islamHouseBase}/items",
            [
                'key' => (string) config('services.islamhouse.key', 'paV29H2gm56kvLP'),
                'lang' => 'en',
                'flang' => 'en',
                'slang' => 'showall',
                'type' => 'showall',
                'limit' => 5,
                'search' => 'prayer',
            ],
            ['data.items', 'items', 'data']
        );

        return $checks;
    }

    /**
     * @param array<string, mixed> $query
     * @param array<int, string> $paths
     * @return array<string, mixed>
     */
    protected function performDebugHttpGet(string $label, string $endpoint, array $query, array $paths): array
    {
        try {
            $response = Http::acceptJson()
                ->timeout(12)
                ->get($endpoint, $query);
        } catch (\Throwable $exception) {
            $message = 'API returned no data - check endpoint or key';
            Log::warning('API_FAILED', [
                'endpoint' => $endpoint,
                'error' => $exception->getMessage(),
            ]);

            $entry = [
                'label' => $label,
                'endpoint' => $this->buildEndpointForLog($endpoint, $query),
                'status' => null,
                'response' => null,
                'failed' => true,
                'message' => $message,
                'error' => $exception->getMessage(),
            ];
            $this->debugTrace[] = $entry;

            return $entry;
        }

        return $this->recordRawApiResponse($label, $endpoint, $query, $response, $paths);
    }

    /**
     * @param array<string, mixed> $query
     * @param array<int, string> $paths
     * @return array<string, mixed>
     */
    protected function recordRawApiResponse(string $label, string $endpoint, array $query, $response, array $paths): array
    {
        $resolvedEndpoint = $this->buildEndpointForLog($endpoint, $query);
        $status = method_exists($response, 'status') ? $response->status() : null;
        $payload = method_exists($response, 'json') ? $response->json() : null;
        $body = method_exists($response, 'body') ? $response->body() : null;
        $matchedPath = null;
        $matchedValue = null;

        if (is_array($payload)) {
            [$matchedPath, $matchedValue] = $this->resolveResponsePathMatch($payload, $paths);
        }

        $responseData = is_array($payload) ? $payload : $body;
        $isEmpty = $this->responseIsEmpty($responseData);
        $entry = [
            'label' => $label,
            'endpoint' => $resolvedEndpoint,
            'status' => $status,
            'response' => $responseData,
            'failed' => $isEmpty,
            'matched_path' => $matchedPath,
            'paths_checked' => $paths,
            'message' => $isEmpty ? 'API returned no data - check endpoint or key' : null,
        ];

        Log::info($label, $entry);

        if ($isEmpty) {
            Log::warning('API_FAILED', [
                'endpoint' => $resolvedEndpoint,
                'status' => $status,
                'paths_checked' => $paths,
                'matched_path' => $matchedPath,
            ]);
        }

        if ($matchedPath === null && !$isEmpty) {
            Log::warning('API_RESPONSE_STRUCTURE_MISMATCH', [
                'endpoint' => $resolvedEndpoint,
                'status' => $status,
                'paths_checked' => $paths,
            ]);
        }

        if ($matchedPath !== null && $matchedValue !== null && !is_scalar($matchedValue)) {
            $entry['matched_preview'] = $matchedValue;
        }

        $this->debugTrace[] = $entry;

        return $entry;
    }

    /**
     * @param array<string, mixed> $query
     */
    protected function buildEndpointForLog(string $endpoint, array $query): string
    {
        if (empty($query)) {
            return $endpoint;
        }

        return $endpoint . (str_contains($endpoint, '?') ? '&' : '?') . http_build_query($query);
    }

    /**
     * @param array<string, mixed> $profile
     * @param array{
     *   validation: array<string, mixed>,
     *   source_counts: array{quran:int, hadith:int, islamhouse:int}
     * } $retrieval
     */
    protected function shouldRetryRetrieval(array $retrieval, array $profile): bool
    {
        if ((int) ($profile['retrieval_attempt'] ?? 1) >= self::MAX_RETRIEVAL_ATTEMPTS) {
            return false;
        }

        return $this->allSourceResultsEmpty($retrieval['source_counts'] ?? []);
    }

    /**
     * @param array<string, mixed> $profile
     * @return array<string, mixed>
     */
    protected function buildRetryProfile(array $profile): array
    {
        $profile['retrieval_attempt'] = 2;
        $profile['search_text'] = $this->buildSearchText(
            array_merge($profile['keywords'] ?? [], $profile['expanded_keywords'] ?? []),
            2
        );
        $profile['normalized_queries'] = $this->buildNormalizedQueries(
            (string) ($profile['normalized'] ?? ''),
            $profile['keywords'] ?? [],
            $profile['expanded_keywords'] ?? [],
            true
        );
        $profile['islamhouse_queries'] = $this->buildIslamHouseSearchQueries(
            $profile['normalized_queries'] ?? [],
            $profile['keywords'] ?? [],
            $profile['expanded_keywords'] ?? []
        );
        $profile['broaden_search_filters'] = true;

        return $profile;
    }

    /**
     * @param array{
     *   validation: array<string, mixed>,
     *   source_counts: array{quran:int, hadith:int, islamhouse:int}
     * } $current
     * @param array{
     *   validation: array<string, mixed>,
     *   source_counts: array{quran:int, hadith:int, islamhouse:int}
     * } $retry
     */
    protected function shouldPreferRetryResult(array $current, array $retry): bool
    {
        $currentScore = $this->retrievalOutcomeScore($current['validation'] ?? []);
        $retryScore = $this->retrievalOutcomeScore($retry['validation'] ?? []);

        return $retryScore >= $currentScore;
    }

    /**
     * @param array<string, mixed> $validation
     */
    protected function retrievalOutcomeScore(array $validation): int
    {
        $stats = is_array($validation['stats'] ?? null) ? $validation['stats'] : [];
        $rank = match ((string) ($stats['evidence_level'] ?? 'Weak')) {
            'Very Strong' => 5,
            'Strong (Quran-based)', 'Strong (Hadith-based)' => 4,
            'Scholarly Opinion' => 3,
            'Weak' => 2,
            default => 1,
        };

        return ($rank * 100) + (int) ($stats['validated_count'] ?? 0);
    }

    /**
     * @param array<int, array<string, mixed>> $documents
     * @return array{quran:int, hadith:int, islamhouse:int}
     */
    protected function countDocumentsBySource(array $documents): array
    {
        $counts = [
            'quran' => 0,
            'hadith' => 0,
            'islamhouse' => 0,
        ];

        foreach ($documents as $document) {
            $source = (string) ($document['source'] ?? '');
            if (isset($counts[$source])) {
                $counts[$source]++;
            }
        }

        return $counts;
    }

    /**
     * @param array{quran?:int, hadith?:int, islamhouse?:int} $sourceCounts
     */
    protected function allSourceResultsEmpty(array $sourceCounts): bool
    {
        return ((int) ($sourceCounts['quran'] ?? 0)) === 0
            && ((int) ($sourceCounts['hadith'] ?? 0)) === 0
            && ((int) ($sourceCounts['islamhouse'] ?? 0)) === 0;
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
            'search_text' => $profile['search_text'] ?? '',
            'normalized_queries' => $profile['normalized_queries'] ?? [],
            'islamhouse_queries' => $profile['islamhouse_queries'] ?? [],
            'allow_weak_hadith' => $profile['allow_weak_hadith'] ?? false,
            'broaden_search_filters' => $profile['broaden_search_filters'] ?? false,
            'attempt' => $profile['retrieval_attempt'] ?? 1,
        ]));

        $cached = Cache::get($cacheKey);
        if (is_array($cached)) {
            return $cached;
        }

        $documents = $this->fetchIslamHouseDocuments($profile, $language);
        $documents = array_slice($documents, 0, self::MAX_LIVE_RESULTS);

        if (!empty($documents)) {
            Cache::put($cacheKey, $documents, now()->addHours($queryCacheHours));
        } else {
            Cache::forget($cacheKey);
        }

        return $documents;
    }

    /**
     * @param array<string, mixed> $profile
     * @return array<int, array<string, mixed>>
     */
    protected function fetchQuranDocuments(array $profile, string $language): array
    {
        $baseUrl = rtrim((string) config('services.quranenc.base', 'https://api.quranenc.com/api/v1'), '/');
        $legacyBaseUrl = rtrim((string) config('services.quranenc.legacy_base', 'https://quranenc.com/api/v1'), '/');
        $apiKey = trim((string) config('services.quranenc.key', ''));
        $translateEndpoint = '/' . ltrim((string) config('services.quranenc.translate_endpoint', '/translation/translate'), '/');
        $translationKey = (string) config('services.quranenc.fallback_translation_key', 'english_saheeh');
        $tafsirKey = (string) config('services.quranenc.tafsir_key', 'english_mokhtasar');
        $searchQueries = array_values(array_unique(array_filter(array_map(
            'trim',
            $profile['quran_queries'] ?? []
        ))));
        $documents = $this->fetchMappedQuranDocuments(
            $profile,
            $language,
            $baseUrl,
            $translateEndpoint,
            $apiKey
        );

        $responses = Http::pool(function (Pool $pool) use ($legacyBaseUrl, $translationKey, $tafsirKey, $profile, $searchQueries) {
            $requests = [];

            foreach ($searchQueries as $index => $searchQuery) {
                if ($searchQuery === '') {
                    continue;
                }

                $requests["quran_search_{$index}"] = $pool
                    ->as("quran_search_{$index}")
                    ->acceptJson()
                    ->timeout(12)
                    ->get("{$legacyBaseUrl}/search/{$translationKey}/" . rawurlencode($searchQuery));
            }

            foreach (array_slice($profile['verse_refs'] ?? [], 0, 3) as $index => $reference) {
                $surah = (int) $reference['surah'];
                $ayah = (int) $reference['ayah'];
                $requests["quran_translation_{$index}"] = $pool
                    ->as("quran_translation_{$index}")
                    ->acceptJson()
                    ->timeout(12)
                    ->get("{$legacyBaseUrl}/translation/aya/{$translationKey}/{$surah}/{$ayah}");
                $requests["quran_tafsir_{$index}"] = $pool
                    ->as("quran_tafsir_{$index}")
                    ->acceptJson()
                    ->timeout(12)
                    ->get("{$legacyBaseUrl}/translation/aya/{$tafsirKey}/{$surah}/{$ayah}");
            }

            return $requests;
        });
        $searchResults = [];
        foreach ($searchQueries as $index => $searchQuery) {
            $this->recordRawApiResponse(
                'QURANENC_RAW_RESPONSE',
                "{$legacyBaseUrl}/search/{$translationKey}/" . rawurlencode($searchQuery),
                [],
                $responses["quran_search_{$index}"] ?? null,
                ['data.result', 'result', 'data']
            );
            $searchResults = array_merge(
                $searchResults,
                $this->extractListPayloadFromResponse($responses["quran_search_{$index}"] ?? null)
            );
        }

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
            $details = Http::pool(function (Pool $pool) use ($legacyBaseUrl, $translationKey, $tafsirKey, $verseKeys) {
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
                        ->get("{$legacyBaseUrl}/translation/aya/{$translationKey}/{$surah}/{$ayah}");
                    $requests["quran_detail_tafsir_{$index}"] = $pool
                        ->as("quran_detail_tafsir_{$index}")
                        ->acceptJson()
                        ->timeout(12)
                        ->get("{$legacyBaseUrl}/translation/aya/{$tafsirKey}/{$surah}/{$ayah}");
                }
                return $requests;
            });
        }

        foreach ($verseKeys as $index => $verseKey) {
            [$surah, $ayah] = array_pad(explode(':', $verseKey, 2), 2, null);
            $this->recordRawApiResponse(
                'QURANENC_RAW_RESPONSE',
                "{$legacyBaseUrl}/translation/aya/{$translationKey}/{$surah}/{$ayah}",
                [],
                $details["quran_detail_translation_{$index}"] ?? $responses["quran_translation_{$index}"] ?? null,
                ['data.result', 'result', 'data']
            );
            $this->recordRawApiResponse(
                'QURANENC_RAW_RESPONSE',
                "{$legacyBaseUrl}/translation/aya/{$tafsirKey}/{$surah}/{$ayah}",
                [],
                $details["quran_detail_tafsir_{$index}"] ?? $responses["quran_tafsir_{$index}"] ?? null,
                ['data.result', 'result', 'data']
            );
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
            $surahName = $this->surahNameMap()[$surahNumber] ?? "Surah {$surahNumber}";
            $reference = "Surah {$surahName}, Ayah {$ayahNumber}";

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
                    'surah_name' => $surahName,
                    'surah_number' => $surahNumber,
                    'ayah_number' => $ayahNumber,
                    'url' => "https://quran.com/{$surahNumber}/{$ayahNumber}",
                    'source_name' => 'QuranEnc',
                ],
                'grade' => null,
                'priority' => 100,
            ];
        }

        $documents = $this->dedupeDocuments($documents);

        Log::info('QURAN_RESULT', [
            'queries' => $searchQueries,
            'result_count' => count($documents),
            'mapped_reference_count' => count($profile['verse_refs'] ?? []),
        ]);

        return $documents;
    }

    /**
     * @param array<string, mixed> $profile
     * @return array<int, array<string, mixed>>
     */
    protected function fetchHadithDocuments(array $profile, string $language): array
    {
        $documents = $this->fetchHadithApiDocuments($profile, $language);
        if (!empty($documents)) {
            Log::info('HADITH_RESULT', [
                'queries' => $profile['hadith_queries'] ?? [],
                'result_count' => count($documents),
                'source' => 'hadithapi',
            ]);
            return $documents;
        }

        $baseUrl = rtrim((string) config('services.hadeethenc.base', 'https://hadeethenc.com/api/v1'), '/');
        $searchQueries = array_values(array_unique(array_filter(array_map(
            'trim',
            array_slice($profile['hadith_queries'] ?? [], 0, 5)
        ))));
        $language = $this->normalizeLanguage($language);

        $responses = Http::pool(function (Pool $pool) use ($baseUrl, $searchQueries, $language) {
            $requests = [];
            foreach ($searchQueries as $index => $searchQuery) {
                if ($searchQuery === '') {
                    continue;
                }

                $requests["hadith_search_1_{$index}"] = $pool
                    ->as("hadith_search_1_{$index}")
                    ->acceptJson()
                    ->timeout(12)
                    ->get("{$baseUrl}/search/", ['language' => $language, 'keyword' => $searchQuery]);
                $requests["hadith_search_2_{$index}"] = $pool
                    ->as("hadith_search_2_{$index}")
                    ->acceptJson()
                    ->timeout(12)
                    ->get("{$baseUrl}/hadeeths/search/", ['language' => $language, 'q' => $searchQuery]);
                $requests["hadith_search_3_{$index}"] = $pool
                    ->as("hadith_search_3_{$index}")
                    ->acceptJson()
                    ->timeout(12)
                    ->get("{$baseUrl}/search", ['language' => $language, 'q' => $searchQuery]);
            }

            $requests['hadith_root_categories'] = $pool
                ->as('hadith_root_categories')
                ->acceptJson()
                ->timeout(12)
                ->get("{$baseUrl}/categories/root/", ['language' => $language]);

            return $requests;
        });

        foreach ($searchQueries as $index => $searchQuery) {
            $this->recordRawApiResponse(
                'HADITHENC_RAW_RESPONSE',
                "{$baseUrl}/search/",
                ['language' => $language, 'keyword' => $searchQuery],
                $responses["hadith_search_1_{$index}"] ?? null,
                ['hadiths', 'hadiths.data', 'data', 'result', 'items']
            );
            $this->recordRawApiResponse(
                'HADITHENC_RAW_RESPONSE',
                "{$baseUrl}/hadeeths/search/",
                ['language' => $language, 'q' => $searchQuery],
                $responses["hadith_search_2_{$index}"] ?? null,
                ['hadiths', 'hadiths.data', 'data', 'result', 'items']
            );
            $this->recordRawApiResponse(
                'HADITHENC_RAW_RESPONSE',
                "{$baseUrl}/search",
                ['language' => $language, 'q' => $searchQuery],
                $responses["hadith_search_3_{$index}"] ?? null,
                ['hadiths', 'hadiths.data', 'data', 'result', 'items']
            );
        }
        $this->recordRawApiResponse(
            'HADITHENC_RAW_RESPONSE',
            "{$baseUrl}/categories/root/",
            ['language' => $language],
            $responses['hadith_root_categories'] ?? null,
            ['data', 'result', 'items']
        );

        $documents = [];
        $rawSearchCandidates = [];
        foreach ($searchQueries as $index => $searchQuery) {
            $rawSearchCandidates = array_merge(
                $rawSearchCandidates,
                $this->extractHadithRowsFromResponse($responses["hadith_search_1_{$index}"] ?? null),
                $this->extractHadithRowsFromResponse($responses["hadith_search_2_{$index}"] ?? null),
                $this->extractHadithRowsFromResponse($responses["hadith_search_3_{$index}"] ?? null),
            );
        }

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

        Log::info('HADITH_RESULT', [
            'queries' => $searchQueries,
            'result_count' => count($documents),
            'source' => 'legacy_hadeethenc',
        ]);

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
            $this->recordRawApiResponse(
                'HADITHENC_RAW_RESPONSE',
                "{$baseUrl}/hadeeths/list/",
                [
                    'language' => $language,
                    'category_id' => $category['id'],
                    'page' => 1,
                    'per_page' => 20,
                ],
                $listResponses["hadith_list_{$index}"] ?? null,
                ['hadiths', 'hadiths.data', 'data', 'result', 'items']
            );
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
            $this->recordRawApiResponse(
                'HADITHENC_RAW_RESPONSE',
                "{$baseUrl}/hadeeths/one/",
                ['language' => $language, 'id' => $candidateId],
                $detailResponses["hadith_detail_{$index}"] ?? null,
                ['hadiths', 'hadiths.data', 'data', 'result', 'items']
            );
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

        $searchQueries = array_values(array_unique(array_filter(array_map(
            'trim',
            $profile['islamhouse_queries'] ?? []
        ))));
        if (empty($searchQueries)) {
            return [];
        }

        $broadenFilters = (bool) ($profile['broaden_search_filters'] ?? false);
        $preferredType = $this->detectIslamHouseType($profile, implode(' ', $searchQueries));

        $primaryRows = $this->fetchIslamHouseRowsForQueries(
            $baseUrl,
            $apiKey,
            $language,
            $searchQueries,
            $preferredType,
            $broadenFilters
        );

        $rows = $primaryRows;
        if (empty($rows)) {
            $rows = $this->fetchIslamHouseRowsForQueries(
                $baseUrl,
                $apiKey,
                $language,
                $this->buildIslamHouseFallbackQueriesFromSet($searchQueries),
                $preferredType,
                $broadenFilters
            );
        }

        if (empty($rows)) {
            $rows = $this->fetchIslamHouseWebsiteRowsForQueries(
                $language,
                $searchQueries,
                $preferredType
            );
        }

        if (empty($rows)) {
            $rows = $this->fetchIslamHouseWebsiteRowsForQueries(
                $language,
                $this->buildIslamHouseFallbackQueriesFromSet($searchQueries),
                $preferredType
            );
        }

        $documents = [];
        foreach ($rows as $row) {
            if (!is_array($row)) {
                continue;
            }

            $document = $this->normalizeIslamHouseDocument($row, $language);
            if ($document !== null) {
                $document['keyword_score'] = $this->scoreIslamHouseRow(
                    $row,
                    $profile['expanded_keywords'] ?? []
                );
                $document['priority'] = 40 + min(30, (int) ($document['keyword_score'] ?? 0));
                $documents[] = $document;
            }
        }

        usort($documents, fn (array $a, array $b): int => ($b['keyword_score'] ?? 0) <=> ($a['keyword_score'] ?? 0));
        $documents = array_slice($this->dedupeDocuments($documents), 0, 20);

        Log::info('ISLAMHOUSE_RESULT', [
            'queries' => $searchQueries,
            'result_count' => count($documents),
            'preferred_type' => $preferredType,
            'broaden_filters' => $broadenFilters,
        ]);

        return $documents;
    }

    /**
     * @param array<int, string> $queries
     * @return array<int, array<string, mixed>>
     */
    protected function fetchIslamHouseRowsForQueries(
        string $baseUrl,
        string $apiKey,
        string $language,
        array $queries,
        string $preferredType,
        bool $broadenFilters
    ): array {
        $queries = array_values(array_unique(array_filter(array_map('trim', $queries))));
        if (empty($queries)) {
            return [];
        }

        $rows = [];
        foreach ($queries as $query) {
            $baseParams = $this->buildIslamHouseBaseParams(
                $apiKey !== '' ? $apiKey : env('ISLAMHOUSE_KEY'),
                $language,
                trim($query),
                $broadenFilters
            );

            $response = Http::acceptJson()
                ->timeout(12)
                ->get("{$baseUrl}/items", $baseParams);

            $rawPayload = $response->json();
            Log::info('ISLAMHOUSE_RAW', [
                'status' => $response->status(),
                'response' => $rawPayload,
            ]);

            if (!$response->successful()) {
                continue;
            }

            $this->recordRawApiResponse(
                'ISLAMHOUSE_RAW_RESPONSE',
                "{$baseUrl}/items",
                $baseParams,
                $response,
                ['items', 'data.items', 'data']
            );

            $items = $this->extractIslamHouseItemsFromPayload($rawPayload);

            if (is_array($items) && !empty($items)) {
                $rows = array_merge($rows, $items);
            }
        }

        return $this->dedupeArrayRows($rows);
    }

    /**
     * @param array<int, string> $queries
     * @return array<int, array<string, mixed>>
     */
    protected function fetchIslamHouseWebsiteRowsForQueries(
        string $language,
        array $queries,
        string $preferredType
    ): array {
        $queries = array_values(array_unique(array_filter(array_map('trim', $queries))));
        if (empty($queries)) {
            return [];
        }

        $endpoint = 'https://islamhouse.com/search/search.php';
        $rows = [];

        foreach ($queries as $query) {
            $payload = [
                'term' => $query,
                'langs' => '-1',
                'types' => '-1',
                'page' => 1,
                'flang' => $language,
            ];

            $response = Http::asForm()
                ->acceptJson()
                ->timeout(12)
                ->post($endpoint, $payload);

            $this->recordRawApiResponse(
                'ISLAMHOUSE_WEB_RAW_RESPONSE',
                $endpoint,
                $payload,
                $response,
                ['items', 'data.items', 'data']
            );

            if (!$response->successful()) {
                continue;
            }

            $data = $response->json();
            if (!is_array($data)) {
                continue;
            }

            $items = Arr::get($data, 'items');
            if (!is_array($items) || !array_is_list($items)) {
                continue;
            }

            foreach ($items as $item) {
                if (!is_array($item)) {
                    continue;
                }

                $itemLanguage = strtolower(trim((string) Arr::get($item, 'lang', '')));
                $itemType = strtolower(trim((string) Arr::get($item, 'type', '')));

                if ($itemLanguage !== '' && $itemLanguage !== $language) {
                    continue;
                }

                if ($preferredType !== 'showall' && $itemType !== '' && !str_contains($itemType, $preferredType)) {
                    continue;
                }

                $rows[] = [
                    'id' => Arr::get($item, 'id'),
                    'title' => $this->cleanText((string) Arr::get($item, 'title', '')),
                    'description' => $this->cleanText((string) Arr::get($item, 'nabza', '')),
                    'type' => $this->normalizeIslamHouseType((string) $itemType),
                    'url' => $this->extractIslamHouseSearchResultUrl($item),
                    'lang' => $itemLanguage !== '' ? $itemLanguage : $language,
                ];
            }
        }

        return $this->dedupeArrayRows($rows);
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    protected function extractIslamHouseItemsFromPayload($payload): array
    {
        if (!is_array($payload)) {
            return [];
        }

        $items = Arr::get($payload, 'items');
        if (is_array($items) && array_is_list($items)) {
            return array_values(array_filter($items, 'is_array'));
        }

        $nestedItems = Arr::get($payload, 'data.items');
        if (is_array($nestedItems) && array_is_list($nestedItems)) {
            return array_values(array_filter($nestedItems, 'is_array'));
        }

        $data = Arr::get($payload, 'data');
        if (is_array($data) && array_is_list($data)) {
            return array_values(array_filter($data, 'is_array'));
        }

        return [];
    }

    /**
     * @param array<int, string> $keywords
     */
    protected function scoreIslamHouseRow(array $row, array $keywords): int
    {
        $title = (string) (
            Arr::get($row, 'title')
            ?? Arr::get($row, 'name')
            ?? Arr::get($row, 'block_name')
            ?? ''
        );
        $description = (string) (
            Arr::get($row, 'description')
            ?? Arr::get($row, 'summary')
            ?? Arr::get($row, 'teaser')
            ?? Arr::get($row, 'body')
            ?? Arr::get($row, 'content')
            ?? ''
        );

        return ($this->keywordScore($title, $keywords) * 3)
            + $this->keywordScore($description, $keywords);
    }

    /**
     * @param array<string, mixed> $profile
     * @return array<int, array<string, mixed>>
     */
    protected function fetchMappedQuranDocuments(
        array $profile,
        string $language,
        string $baseUrl,
        string $translateEndpoint,
        string $apiKey
    ): array {
        if ($apiKey === '') {
            return [];
        }

        $references = $this->buildQuranReferenceCandidates($profile);
        if (empty($references)) {
            return [];
        }

        $responses = Http::pool(function (Pool $pool) use ($baseUrl, $translateEndpoint, $apiKey, $language, $references) {
            $requests = [];
            foreach ($references as $index => $reference) {
                $requests["quran_mapped_{$index}"] = $pool
                    ->as("quran_mapped_{$index}")
                    ->acceptJson()
                    ->timeout(12)
                    ->get("{$baseUrl}{$translateEndpoint}", [
                        'key' => $apiKey,
                        'sura' => $reference['surah'],
                        'aya' => $reference['ayah'],
                        'lang' => $language,
                    ]);
            }

            return $requests;
        });

        $documents = [];
        foreach ($references as $index => $reference) {
            $this->recordRawApiResponse(
                'QURANENC_RAW_RESPONSE',
                "{$baseUrl}{$translateEndpoint}",
                [
                    'key' => $apiKey,
                    'surah' => $reference['surah'],
                    'aya' => $reference['ayah'],
                    'lang' => $language,
                ],
                $responses["quran_mapped_{$index}"] ?? null,
                ['data.result', 'result', 'data']
            );
            $payload = $this->extractFirstPayloadRowFromResponse($responses["quran_mapped_{$index}"] ?? null);
            if (!is_array($payload)) {
                continue;
            }

            $surahNumber = (int) ($reference['surah'] ?? 0);
            $ayahNumber = (int) ($reference['ayah'] ?? 0);
            $verseKey = "{$surahNumber}:{$ayahNumber}";
            $translationText = $this->cleanText((string) (
                Arr::get($payload, 'translation')
                ?? Arr::get($payload, 'text')
                ?? Arr::get($payload, 'translation_text')
                ?? ''
            ));

            if ($translationText === '') {
                continue;
            }

            $arabicText = $this->cleanText((string) (
                Arr::get($payload, 'arabic_text')
                ?? Arr::get($payload, 'aya_text')
                ?? Arr::get($payload, 'text_ar')
                ?? ''
            ));
            $surahName = $this->surahNameMap()[$surahNumber] ?? "Surah {$surahNumber}";
            $referenceLabel = "Surah {$surahName}, Ayah {$ayahNumber}";
            $body = $arabicText !== ''
                ? trim($arabicText . "\n\nTranslation: {$translationText}")
                : $translationText;

            $documents[] = [
                'document_key' => "quran:{$verseKey}:{$language}",
                'source' => 'quran',
                'source_type' => 'verse',
                'source_id' => $verseKey,
                'language' => $language,
                'title' => $referenceLabel,
                'reference' => $referenceLabel,
                'body' => $body,
                'snippet' => $this->snippet($body, self::MAX_SNIPPET_CHARS),
                'translation' => $translationText,
                'description' => null,
                'metadata' => [
                    'verse_key' => $verseKey,
                    'surah_name' => $surahName,
                    'surah_number' => $surahNumber,
                    'ayah_number' => $ayahNumber,
                    'arabic_text' => $arabicText !== '' ? $arabicText : null,
                    'url' => "https://quran.com/{$surahNumber}/{$ayahNumber}",
                    'source_name' => 'QuranEnc',
                ],
                'grade' => null,
                'priority' => 100,
            ];
        }

        return $documents;
    }

    /**
     * @param array<string, mixed> $profile
     * @return array<int, array{surah:int, ayah:int}>
     */
    protected function buildQuranReferenceCandidates(array $profile): array
    {
        $references = [];

        foreach (array_slice($profile['verse_refs'] ?? [], 0, 5) as $reference) {
            $key = ((int) ($reference['surah'] ?? 0)) . ':' . ((int) ($reference['ayah'] ?? 0));
            $references[$key] = [
                'surah' => (int) ($reference['surah'] ?? 0),
                'ayah' => (int) ($reference['ayah'] ?? 0),
            ];
        }

        foreach ($this->quranTopicMap() as $keyword => $mappedReferences) {
            if (!in_array($keyword, $profile['expanded_keywords'] ?? [], true)) {
                continue;
            }

            foreach ($mappedReferences as $mappedReference) {
                $key = $mappedReference['surah'] . ':' . $mappedReference['ayah'];
                $references[$key] = $mappedReference;
            }
        }

        return array_values(array_slice($references, 0, 5));
    }

    /**
     * @return array<string, array<int, array{surah:int, ayah:int}>>
     */
    protected function quranTopicMap(): array
    {
        return [
            'patience' => [['surah' => 2, 'ayah' => 153]],
            'sabr' => [['surah' => 2, 'ayah' => 153]],
            'hardship' => [['surah' => 94, 'ayah' => 5]],
            'prayer' => [['surah' => 2, 'ayah' => 45], ['surah' => 29, 'ayah' => 45]],
            'salah' => [['surah' => 2, 'ayah' => 45], ['surah' => 29, 'ayah' => 45]],
            'worship' => [['surah' => 51, 'ayah' => 56]],
            'halal' => [['surah' => 2, 'ayah' => 168]],
            'haram' => [['surah' => 7, 'ayah' => 33]],
            'forbidden' => [['surah' => 7, 'ayah' => 33]],
            'sin' => [['surah' => 39, 'ayah' => 53]],
            'tawakkul' => [['surah' => 3, 'ayah' => 159]],
            'trust' => [['surah' => 3, 'ayah' => 159]],
            'reliance' => [['surah' => 3, 'ayah' => 159]],
            'sincerity' => [['surah' => 98, 'ayah' => 5]],
            'anger' => [['surah' => 3, 'ayah' => 134]],
        ];
    }

    /**
     * @param array<string, mixed> $profile
     * @return array<int, array<string, mixed>>
     */
    protected function fetchHadithApiDocuments(array $profile, string $language): array
    {
        $searchQueries = array_values(array_unique(array_filter(array_map(
            'trim',
            $profile['hadith_queries'] ?? []
        ))));
        $apiKey = trim((string) config('services.hadithenc.key', ''));
        $baseUrl = rtrim((string) config('services.hadithenc.base', 'https://hadithapi.com/api'), '/');
        $endpoint = '/' . ltrim((string) config('services.hadithenc.endpoint', '/hadiths'), '/');
        if (empty($searchQueries) || $apiKey === '') {
            return [];
        }

        try {
            $responses = Http::pool(function (Pool $pool) use ($baseUrl, $endpoint, $apiKey, $searchQueries) {
                $requests = [];

                foreach ($searchQueries as $index => $searchQuery) {
                    $requests["hadith_api_{$index}"] = $pool
                        ->as("hadith_api_{$index}")
                        ->acceptJson()
                        ->timeout(12)
                        ->get("{$baseUrl}{$endpoint}", [
                            'key' => $apiKey,
                            'query' => $searchQuery,
                        ]);
                }

                return $requests;
            });
        } catch (\Throwable $exception) {
            Log::warning('API_FAILED', [
                'endpoint' => "{$baseUrl}{$endpoint}",
                'error' => $exception->getMessage(),
            ]);
            $this->debugTrace[] = [
                'label' => 'HADITHENC_RAW_RESPONSE',
                'endpoint' => "{$baseUrl}{$endpoint}",
                'status' => null,
                'response' => null,
                'failed' => true,
                'message' => 'API returned no data - check endpoint or key',
                'error' => $exception->getMessage(),
            ];
            return [];
        }

        $rows = [];
        foreach ($searchQueries as $index => $searchQuery) {
            $response = $responses["hadith_api_{$index}"] ?? null;
            $this->recordRawApiResponse(
                'HADITHENC_RAW_RESPONSE',
                "{$baseUrl}{$endpoint}",
                [
                    'key' => $apiKey,
                    'query' => $searchQuery,
                ],
                $response,
                ['hadiths', 'hadiths.data', 'data']
            );

            $payload = $response && method_exists($response, 'json') ? $response->json() : null;
            if (!is_array($payload)) {
                continue;
            }

            $rows = array_merge(
                $rows,
                is_array(Arr::get($payload, 'hadiths.data')) ? Arr::get($payload, 'hadiths.data') : [],
                is_array(Arr::get($payload, 'data')) ? Arr::get($payload, 'data') : [],
                is_array(Arr::get($payload, 'hadiths')) && array_is_list(Arr::get($payload, 'hadiths')) ? Arr::get($payload, 'hadiths') : []
            );
        }

        $documents = [];
        foreach ($rows as $row) {
            if (!is_array($row)) {
                continue;
            }

            $normalizedRow = [
                'id' => Arr::get($row, 'hadithNumber') ?? Arr::get($row, 'id') ?? Arr::get($row, 'number'),
                'title' => Arr::get($row, 'heading') ?? Arr::get($row, 'book.bookName') ?? Arr::get($row, 'bookSlug') ?? 'Hadith',
                'hadeeth' => Arr::get($row, 'hadithEnglish') ?? Arr::get($row, 'hadith') ?? Arr::get($row, 'text'),
                'grade' => Arr::get($row, 'status') ?? Arr::get($row, 'grade'),
                'attribution' => Arr::get($row, 'book.bookName') ?? Arr::get($row, 'bookSlug') ?? Arr::get($row, 'collection'),
                'explanation' => Arr::get($row, 'explanation') ?? Arr::get($row, 'description'),
            ];

            $document = $this->normalizeHadithDocument($normalizedRow, $profile, $language);
            if ($document !== null) {
                $document['metadata']['source_name'] = 'HadithEnc';
                $documents[] = $document;
            }
        }

        $documents = array_slice($this->dedupeDocuments($documents), 0, 8);

        Log::info('HADITH_RESULT', [
            'queries' => $searchQueries,
            'result_count' => count($documents),
            'source' => 'hadithapi',
        ]);

        return $documents;
    }

    protected function buildIslamHouseBaseParams(
        string $apiKey,
        string $language,
        string $search,
        bool $broadenFilters
    ): array {
        return [
            'key' => $apiKey,
            'lang' => $broadenFilters ? 'showall' : $language,
            'flang' => $language,
            'slang' => 'showall',
            'type' => 'showall',
            'limit' => 20,
            'pageNum' => 1,
            'search' => $search,
        ];
    }

    /**
     * @param array<string, mixed> $profile
     */
    protected function detectIslamHouseType(array $profile, string $searchText): string
    {
        $haystack = $this->normalizeText(
            trim((string) ($profile['normalized'] ?? '')) . ' ' . $searchText
        );

        if (preg_match('/\b(ruling|haram|halal)\b/', $haystack)) {
            return 'article';
        }

        if (preg_match('/\b(quran)\b/', $haystack)) {
            return 'book';
        }

        if (preg_match('/\b(audio|dua|duaa)\b/', $haystack)) {
            return 'audio';
        }

        return 'showall';
    }

    /**
     * @return array<int, string>
     */
    protected function buildIslamHouseFallbackQueries(string $query): array
    {
        $query = trim($query);
        if ($query === '') {
            return [];
        }

        return array_values(array_unique([
            $query,
            'islam ruling ' . $query,
            'fatwa ' . $query,
            'islam explanation ' . $query,
            'halal haram ' . $query,
            'islamHouse ' . $query,
        ]));
    }

    /**
     * @param array<int, string> $queries
     * @return array<int, string>
     */
    protected function buildIslamHouseFallbackQueriesFromSet(array $queries): array
    {
        $fallbacks = [];

        foreach ($queries as $query) {
            $fallbacks = array_merge($fallbacks, $this->buildIslamHouseFallbackQueries((string) $query));
        }

        return array_values(array_slice(array_unique(array_filter($fallbacks)), 0, 10));
    }

    /**
     * @param array<string, mixed> $row
     * @return array<string, mixed>|null
     */
    protected function normalizeIslamHouseDocument(array $row, string $language): ?array
    {
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
            return null;
        }

        $sourceType = strtolower(trim((string) (
            Arr::get($row, 'type')
            ?? Arr::get($row, 'item_type')
            ?? 'showall'
        )));
        $sourceId = trim((string) (
            Arr::get($row, 'id')
            ?? Arr::get($row, 'guid')
            ?? md5($title . $body)
        ));
        $url = $this->normalizeUrl((string) (
            Arr::get($row, 'page_url')
            ?? Arr::get($row, 'url')
            ?? Arr::get($row, 'link')
            ?? ''
        ));

        return [
            'document_key' => "islamhouse:{$sourceType}:{$sourceId}:{$language}",
            'source' => 'islamhouse',
            'source_type' => $sourceType !== '' ? $sourceType : 'showall',
            'source_id' => $sourceId,
            'language' => $language,
            'title' => $title !== '' ? $title : 'IslamHouse',
            'reference' => $title !== '' ? $title : 'IslamHouse',
            'body' => $body !== '' ? $body : $title,
            'snippet' => $this->snippet($body !== '' ? $body : $title, self::MAX_SNIPPET_CHARS),
            'translation' => null,
            'description' => $body,
            'metadata' => [
                'url' => $url,
                'source_name' => 'IslamHouse',
            ],
            'grade' => null,
            'priority' => 45,
        ];
    }

    protected function normalizeIslamHouseType(string $type): string
    {
        $normalized = strtolower(trim($type));

        return match ($normalized) {
            'articles' => 'article',
            'books' => 'book',
            'audios' => 'audio',
            'videos' => 'video',
            default => $normalized !== '' ? $normalized : 'showall',
        };
    }

    /**
     * @param array<string, mixed> $item
     */
    protected function extractIslamHouseSearchResultUrl(array $item): ?string
    {
        $title = (string) Arr::get($item, 'title', '');
        if (preg_match('/href=\\\"([^\\\"]+)\\\"/i', $title, $matches)) {
            return $this->normalizeUrl(html_entity_decode((string) ($matches[1] ?? ''), ENT_QUOTES | ENT_HTML5, 'UTF-8'));
        }

        $id = trim((string) Arr::get($item, 'id', ''));
        if ($id !== '') {
            return "https://islamhouse.com/{$id}";
        }

        return null;
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
                ->where('source', 'islamhouse')
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
    protected function selectTopItems(array $items, array $profile): array
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
        if (($profile['retrieval_attempt'] ?? 1) > 1) {
            $limits = [
                'quran' => 4,
                'hadith' => 4,
                'islamhouse' => 4,
            ];
        }

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
     * @param array<int, array<string, mixed>> $items
     * @param array<string, mixed> $profile
     * @return array{
     *   blocked: bool,
     *   message?: string,
     *   items: array<int, array<string, mixed>>,
     *   stats: array{
     *     quran_count: int,
     *     authentic_hadith_count: int,
     *     sahih_hadith_count: int,
     *     hasan_hadith_count: int,
     *     islamhouse_count: int,
     *     validated_count: int
     *   }
     * }
     */
    protected function validateRetrievedItems(array $items, array $profile): array
    {
        $validated = [];
        $quranCount = 0;
        $authenticHadithCount = 0;
        $sahihHadithCount = 0;
        $hasanHadithCount = 0;
        $islamhouseCount = 0;

        foreach ($items as $item) {
            if (!is_array($item)) {
                continue;
            }

            $source = (string) ($item['source'] ?? 'islamhouse');
            $keywordScore = (int) ($item['keyword_score'] ?? $this->keywordScore(
                ($item['title'] ?? '') . ' ' . ($item['reference'] ?? '') . ' ' . ($item['body'] ?? ''),
                $profile['expanded_keywords'] ?? []
            ));

            if ($keywordScore < $this->minimumKeywordScore($profile, $source)) {
                continue;
            }

            if ($source !== 'islamhouse') {
                continue;
            }

            $islamhouseCount++;
            $validated[] = $item;
        }

        $stats = $this->buildEvidenceStats(
            $quranCount,
            $authenticHadithCount,
            $sahihHadithCount,
            $hasanHadithCount,
            $islamhouseCount,
            count($validated)
        );

        if (empty($validated)) {
            return [
                'blocked' => true,
                'message' => 'I could not find a verified IslamHouse source for this question. Please try a narrower topic or different wording. Allah knows best.',
                'items' => [],
                'stats' => $stats,
            ];
        }

        return [
            'blocked' => false,
            'items' => $validated,
            'stats' => $stats,
        ];
    }

    protected function buildEvidenceStats(
        int $quranCount,
        int $authenticHadithCount,
        int $sahihHadithCount,
        int $hasanHadithCount,
        int $islamhouseCount,
        int $validatedCount
    ): array {
        $evidenceLevel = 'No Verified Source';
        $confidenceBadge = 'Unavailable';
        $confidenceScore = 0;

        if ($islamhouseCount > 0) {
            $evidenceLevel = 'Verified Source';
            $confidenceBadge = 'Verified';
            $confidenceScore = 75;
        }

        return [
            'quran_count' => $quranCount,
            'authentic_hadith_count' => $authenticHadithCount,
            'sahih_hadith_count' => $sahihHadithCount,
            'hasan_hadith_count' => $hasanHadithCount,
            'islamhouse_count' => $islamhouseCount,
            'validated_count' => $validatedCount,
            'evidence_level' => $evidenceLevel,
            'confidence_score' => $confidenceScore,
            'confidence_badge' => $confidenceBadge,
            'ui_badge' => $this->uiBadgeForConfidence($confidenceScore),
            'scholarly_only' => $islamhouseCount > 0,
        ];
    }

    protected function uiBadgeForConfidence(int $confidenceScore): string
    {
        if ($confidenceScore >= 60) {
            return 'IslamHouse Source';
        }

        return 'No Verified Source';
    }

    /**
     * @param array<string, mixed> $profile
     * @param array<string, mixed> $validation
     */
    protected function logRetrievalValidation(string $question, array $profile, array $validation): void
    {
        $stats = is_array($validation['stats'] ?? null) ? $validation['stats'] : [];

        Log::info('Islamic assistant retrieval validation', [
            'query' => $question,
            'category' => (string) ($profile['category'] ?? 'general'),
            'evidence_required' => (bool) ($profile['evidence_required'] ?? false),
            'smart_evidence_mode' => (bool) ($profile['smart_evidence_mode'] ?? false),
            'islamhouse_results' => (int) ($stats['islamhouse_count'] ?? 0),
            'evidence_level' => (string) ($stats['evidence_level'] ?? 'Weak'),
            'confidence_badge' => (string) ($stats['confidence_badge'] ?? 'Low'),
            'validated_items' => (int) ($stats['validated_count'] ?? 0),
            'blocked' => (bool) ($validation['blocked'] ?? false),
        ]);
    }

    /**
     * @param array<string, mixed> $profile
     */
    protected function logRetrievalQueries(string $question, array $profile): void
    {
        Log::info('QUERY', [
            'query' => $question,
            'attempt' => (int) ($profile['retrieval_attempt'] ?? 1),
        ]);

        Log::info('NORMALIZED', [
            'normalized' => (string) ($profile['normalized'] ?? ''),
            'normalized_queries' => $profile['normalized_queries'] ?? [],
            'islamhouse_queries' => $profile['islamhouse_queries'] ?? [],
        ]);
    }

    /**
     * @param array<string, mixed> $profile
     */
    protected function minimumKeywordScore(array $profile, string $source): int
    {
        if (
            ($profile['evidence_required'] ?? false) === true
            && ($profile['retrieval_attempt'] ?? 1) === 1
            && in_array($source, ['quran', 'hadith'], true)
        ) {
            return self::MIN_STRICT_KEYWORD_SCORE;
        }

        return self::MIN_KEYWORD_SCORE;
    }

    /**
     * @param array<string, mixed> $item
     */
    protected function isValidQuranItem(array $item): bool
    {
        $translation = $this->cleanText((string) ($item['translation'] ?? ''));
        $surahName = $this->cleanText((string) Arr::get($item, 'metadata.surah_name'));
        $ayahNumber = (int) Arr::get($item, 'metadata.ayah_number', 0);

        return $translation !== ''
            && $surahName !== ''
            && $ayahNumber > 0;
    }

    /**
     * @param array<string, mixed> $item
     */
    protected function isValidHadithItem(array $item, array $profile): bool
    {
        $reference = $this->cleanText((string) ($item['reference'] ?? ''));
        $body = $this->cleanText((string) ($item['body'] ?? ''));
        $gradeClass = $this->classifyHadithGrade($item['grade'] ?? null);

        if ($reference === '' || $body === '') {
            return false;
        }

        return $gradeClass !== 'weak';
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
        $items = array_values(array_filter($items, fn (array $item): bool => ($item['source'] ?? '') === 'islamhouse'));
        if (empty($items)) {
            return [];
        }

        return [[
            'key' => 'islamhouse',
            'title' => 'IslamHouse sources',
            'items' => $items,
        ]];
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

                if (!empty($item['body'])) {
                    $block[] = '  Text: ' . $this->snippet((string) $item['body'], self::MAX_SNIPPET_CHARS);
                }

                if (!empty($item['description'])) {
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
        array $items,
        array $references,
        array $profile
    ): string {
        $attempts = [
            $this->buildSourcedSystemPrompt($language, false, $profile),
            $this->buildSourcedSystemPrompt($language, true, $profile),
        ];

        foreach ($attempts as $prompt) {
            $generated = $this->requestModelCompletion(
                [
                    [
                        'role' => 'system',
                        'content' => $prompt,
                    ],
                    [
                        'role' => 'user',
                        'content' => "Question:\n{$question}\n\nStructured context:\n{$contextBlock}",
                    ],
                ],
                500
            );

            if ($this->isValidGeneratedResponse($generated, $references, $profile)) {
                return trim((string) $generated);
            }
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

        if ($this->isValidGeneratedResponse($generated, [], ['evidence_required' => false])) {
            return trim($generated);
        }

        return $this->strictOrGeneralFallback(['evidence_required' => false], false, $question, $language);
    }

    protected function buildSourcedSystemPrompt(string $language, bool $retry, array $profile): string
    {
        $retryRule = $retry
            ? 'This is a retry. If any statement cannot be directly grounded in context, omit it.'
            : '';
        $evidenceLevel = (string) ($profile['evidence_level'] ?? 'Weak');
        $scholarlyRule = ($profile['scholarly_only'] ?? false) === true
            ? 'This answer is based on scholarly sources. State that clearly and avoid presenting it as direct Quran or Hadith evidence.'
            : '';

        return <<<PROMPT
You are an evidence-based Islamic assistant.
Use ONLY the provided context.
Do not fabricate rulings, sources, or citations.
Base the answer only on IslamHouse material in the context.
Do not mention QuranEnc or HadeethEnc.
Avoid absolute rulings when the issue may involve scholarly difference; use phrases like "Scholars differ on this issue" when the context supports that.
Maintain a respectful Islamic tone.
If the evidence is limited, say so clearly and end with "Allah knows best."
Write in {$language} only.
{$retryRule}
{$scholarlyRule}
Write a plain answer only with no headings, no badge line, and no sources section.
PROMPT;
    }

    protected function buildFallbackSystemPrompt(string $language): string
    {
        return <<<PROMPT
You are an Islamic assistant.
No strong direct source matches were retrieved.
Write in {$language} only.
Be cautious, respectful, and concise.
Do not use headings, badges, or a sources section.
State clearly that no verified IslamHouse source was found for the question.
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
        $islamHouseRefs = [];
        $bodyParts = [];
        $stats = $this->buildEvidenceStatsFromItems($items);
        $scholarlyOnly = (bool) ($stats['scholarly_only'] ?? true);

        $bodyParts[] = 'Based on the available IslamHouse sources, here is the closest supported answer.';
        if ($scholarlyOnly) {
            $bodyParts[] = 'This is a scholarly summary from IslamHouse and should not be treated as a direct Qur\'an or hadith citation.';
        }

        foreach ($items as $item) {
            $source = (string) ($item['source'] ?? 'islamhouse');
            if ($source === 'islamhouse' && count($islamHouseRefs) < 3) {
                $islamHouseRefs[] = ($item['title'] ?? 'IslamHouse item') . ' (' . Str::headline((string) ($item['source_type'] ?? 'item')) . ')';
                $bodyParts[] = ($item['title'] ?? 'IslamHouse') . ': ' . ($item['snippet'] ?? '');
            }
        }

        return trim(implode("\n\n", array_filter($bodyParts))) . "\n\nAllah knows best.";
    }

    /**
     * @param array<int, array<string, mixed>> $items
     */
    protected function buildEvidenceStatsFromItems(array $items): array
    {
        $islamhouseCount = 0;

        foreach ($items as $item) {
            $source = (string) ($item['source'] ?? 'islamhouse');
            if ($source === 'islamhouse') {
                $islamhouseCount++;
            }
        }

        return $this->buildEvidenceStats(
            0,
            0,
            0,
            0,
            $islamhouseCount,
            count($items)
        );
    }

    /**
     * @param array<int, array<string, mixed>> $references
     * @param array<string, mixed> $profile
     */
    protected function isValidGeneratedResponse(?string $message, array $references, array $profile): bool
    {
        $message = trim((string) $message);
        if ($message === '') {
            return false;
        }

        if (($profile['evidence_required'] ?? false) === true && str_contains(Str::lower($message), 'not directly sourced')) {
            return false;
        }

        if (($profile['evidence_required'] ?? false) === true && empty($references)) {
            return false;
        }

        if (preg_match('/(^|\n)(Sources|Answer|Evidence Level:|\[Confidence Badge:)/i', $message)) {
            return false;
        }

        return true;
    }

    /**
     * @param array<string, mixed> $profile
     */
    protected function strictOrGeneralFallback(
        array $profile,
        bool $noReliableSources = true,
        string $question = '',
        string $language = 'en'
    ): string {
        return $this->buildStructuredFallbackResponse(
            'I could not find a verified IslamHouse source for this question. Please try a narrower topic or different wording. Allah knows best.'
        );
    }

    protected function buildStructuredFallbackResponse(string $answer): string
    {
        return trim($answer);
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
            Arr::get($payload, 'data.result'),
            Arr::get($payload, 'result'),
            Arr::get($payload, 'hadiths.data'),
            Arr::get($payload, 'data.items'),
            Arr::get($payload, 'hadiths'),
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

        $nestedResult = Arr::get($payload, 'data.result');
        if (is_array($nestedResult) && !array_is_list($nestedResult)) {
            return $nestedResult;
        }

        $result = Arr::get($payload, 'result');
        if (is_array($result) && !array_is_list($result)) {
            return $result;
        }

        $hadithsData = Arr::get($payload, 'hadiths.data');
        if (is_array($hadithsData) && !array_is_list($hadithsData)) {
            return $hadithsData;
        }

        $items = Arr::get($payload, 'data.items');
        if (is_array($items) && !array_is_list($items)) {
            return $items;
        }

        $hadiths = Arr::get($payload, 'hadiths');
        if (is_array($hadiths) && !array_is_list($hadiths)) {
            return $hadiths;
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
     * @param array<string, mixed> $payload
     * @param array<int, string> $paths
     * @return array{0:string|null,1:mixed}
     */
    protected function resolveResponsePathMatch(array $payload, array $paths): array
    {
        foreach ($paths as $path) {
            $value = Arr::get($payload, $path);
            if ($this->responseHasData($value)) {
                return [$path, $value];
            }
        }

        return [null, null];
    }

    protected function responseHasData($value): bool
    {
        if (is_array($value)) {
            return !empty($value);
        }

        if (is_string($value)) {
            return trim($value) !== '';
        }

        return $value !== null;
    }

    protected function responseIsEmpty($value): bool
    {
        if (is_array($value)) {
            return empty($value);
        }

        if (is_string($value)) {
            return trim($value) === '';
        }

        return $value === null;
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

    /**
     * @param array<int, array<string, mixed>> $rows
     * @return array<int, array<string, mixed>>
     */
    protected function dedupeArrayRows(array $rows): array
    {
        $deduped = [];
        $seen = [];

        foreach ($rows as $row) {
            $key = strtolower($this->cleanText((string) (
                Arr::get($row, 'id')
                ?? Arr::get($row, 'guid')
                ?? Arr::get($row, 'title')
                ?? Arr::get($row, 'name')
                ?? md5(json_encode($row))
            )));

            if ($key === '' || isset($seen[$key])) {
                continue;
            }

            $seen[$key] = true;
            $deduped[] = $row;
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

    /**
     * @return array<int, string>
     */
    protected function surahNameMap(): array
    {
        return Cache::remember('ai-rag-surah-name-map', now()->addDays(30), function (): array {
            $path = base_path('database/data/csv/surat.csv');
            if (!is_file($path)) {
                return [];
            }

            $rows = @file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];
            if (count($rows) < 2) {
                return [];
            }

            $map = [];
            foreach (array_slice($rows, 1) as $row) {
                $columns = str_getcsv($row);
                $id = (int) ($columns[0] ?? 0);
                $name = trim((string) ($columns[1] ?? ''));
                if ($id >= 1 && $id <= 114 && $name !== '') {
                    $map[$id] = $name;
                }
            }

            return $map;
        });
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
