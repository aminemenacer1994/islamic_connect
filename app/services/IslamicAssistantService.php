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
    private const VERIFIED_SOURCES_FALLBACK_MESSAGE = 'Evidence not found in retrieved IslamHouse sources.';
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
    protected CriterionLocalCorpusService $criterionCorpus;
    protected array $debugTrace = [];

    public function __construct(
        PromptSanitizer $sanitizer,
        IslamicEmbeddingService $embeddingService,
        CriterionLocalCorpusService $criterionCorpus
    )
    {
        $this->sanitizer = $sanitizer;
        $this->embeddingService = $embeddingService;
        $this->criterionCorpus = $criterionCorpus;
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
     *   quran_queries: array<int, string>,
     *   hadith_queries: array<int, string>,
     *   verse_refs: array<int, array{surah:int, ayah:int, verse_key:string}>,
     *   intent: string,
     *   category: string,
     *   evidence_required: bool,
     *   smart_evidence_mode: bool,
     *   broaden_search_filters: bool,
     *   debug_mode: bool,
     *   retrieval_attempt: int,
     *   embedding: array<int, float>
     * }
     */
    protected function buildQueryProfile(string $question, string $language, array $options = []): array
    {
        $normalized = $this->normalizeText($question);
        $keywords = $this->extractKeywords($normalized);
        $expandedKeywords = $this->expandKeywords($keywords, $normalized);
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
            'quran_queries' => $this->buildQuranSearchQueries($normalized, $keywords, $expandedKeywords),
            'hadith_queries' => $this->buildHadithSearchQueries($normalized, $normalizedQueries, $expandedKeywords),
            'verse_refs' => $this->extractVerseReferences($question),
            'intent' => $intent,
            'category' => $category,
            'evidence_required' => $evidenceRequired,
            'smart_evidence_mode' => $smartEvidenceMode,
            'broaden_search_filters' => false,
            'debug_mode' => array_key_exists('debug_mode', $options)
                ? (bool) $options['debug_mode']
                : (bool) config('services.ai_rag.debug_mode', false),
            'retrieval_attempt' => 1,
            'allow_weak_hadith' => $this->allowWeakHadith($normalized),
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
            'a', 'about', 'an', 'and', 'are', 'as', 'at', 'be', 'can', 'could', 'do',
            'does', 'for', 'from', 'give', 'guidance', 'hadith', 'help', 'how', 'i', 'in',
            'is', 'islam', 'islamic', 'it', 'me', 'my', 'of', 'on', 'or', 'please', 'quran',
            'regarding', 'say', 'show', 'tell', 'that', 'the', 'this', 'to', 'what', 'when',
            'where', 'which', 'with', 'would', 'you', 'your',
            'according', 'alternative', 'based', 'later', 'make', 'making', 'muslim', 'muslims',
            'scholar', 'scholars', 'taking',
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

            $keywords[] = $token;
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
            'jesus' => ['isa', 'messiah', 'son of mary'],
            'isa' => ['jesus', 'messiah', 'son of mary'],
            'messiah' => ['jesus', 'isa', 'son of mary'],
            'belief' => ['faith', 'iman'],
            'believe' => ['faith', 'iman'],
            'faith' => ['belief', 'iman'],
            'prayer' => ['salah', 'salat'],
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
            'anger' => ['angry', 'rage'],
            'angry' => ['anger', 'rage'],
            'halal' => ['permissible', 'lawful'],
            'haram' => ['forbidden', 'impermissible'],
            'riba' => ['usury', 'interest'],
            'interest' => ['riba', 'usury'],
            'loan' => ['borrowing', 'debt'],
            'music' => ['song', 'singing', 'instrument'],
            'birthday' => ['celebration', 'birthday celebration'],
            'birthdays' => ['birthday', 'celebration'],
            'missed' => ['make up prayer', 'qada'],
            'salah' => ['prayer', 'make up prayer', 'qada'],
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
        $hasSpecificTopicKeywords = $this->hasSpecificTopicKeywords($expandedKeywords);
        $topicSearchMap = [
            'anger' => 'anger patience control',
            'prayer' => 'prayer salah',
            'salah' => 'prayer salah',
            'jesus' => 'jesus isa son of mary messiah prophet',
            'isa' => 'jesus isa son of mary messiah prophet',
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
            if ($hasSpecificTopicKeywords && $this->isGenericLegalKeyword($signal)) {
                continue;
            }
            if (in_array($signal, $expandedKeywords, true) || str_contains($normalizedQuestion, $signal)) {
                $queries[] = $query;
            }
        }

        if (str_contains($normalizedQuestion, 'jesus')) {
            $queries[] = 'jesus isa son of mary messiah prophet';
            $queries[] = 'jesus son of mary messenger of allah';
        }

        if (str_contains($normalizedQuestion, 'what is islam') || (str_contains($normalizedQuestion, 'muslim') && (str_contains($normalizedQuestion, 'believe') || str_contains($normalizedQuestion, 'belief')))) {
            $queries[] = 'islam submission to allah';
            $queries[] = 'belief in allah angels books messengers last day';
            $queries[] = 'we have believed in allah and what was revealed';
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
            'anger' => ['anger'],
            'prayer' => ['prayer', 'salah', 'salat', 'islam built on five'],
            'salah' => ['prayer', 'salah', 'salat', 'islam built on five'],
            'salat' => ['prayer', 'salah', 'salat', 'islam built on five'],
            'intention' => ['intention'],
            'sin' => ['sin'],
            'patience' => ['patience'],
            'sabr' => ['patience'],
            'prophet' => ['prophet said'],
        ];

        foreach ($topicFallbacks as $signal => $mappedQueries) {
            if (in_array($signal, $expandedKeywords, true) || str_contains($normalizedQuestion, $signal)) {
                foreach ($mappedQueries as $mappedQuery) {
                    $queries[] = $mappedQuery;
                }
            }
        }

        if (str_contains($normalizedQuestion, 'jesus')) {
            $queries[] = 'jesus son of mary prophet';
            $queries[] = 'i met jesus';
        }

        if (str_contains($normalizedQuestion, 'what is islam') || (str_contains($normalizedQuestion, 'muslim') && (str_contains($normalizedQuestion, 'believe') || str_contains($normalizedQuestion, 'belief')))) {
            $queries[] = 'islam is based on five';
            $queries[] = 'inform me about al islam';
            $queries[] = 'inform me about iman';
        }

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

        $normalizedHaystack = implode(' ', $normalizedQueries) . ' ' . implode(' ', $expandedKeywords);
        $topicSearchMap = [
            'music' => ['music ruling in islam', 'listening to music', 'music fatwa'],
            'anger' => ['anger management in islam', 'control anger', 'how to behave when angry'],
            'birthday' => ['celebrating birthdays in islam', 'birthday celebration ruling', 'birthday fatwa'],
            'birthdays' => ['celebrating birthdays in islam', 'birthday celebration ruling', 'birthday fatwa'],
            'interest' => ['interest based loans in islam', 'riba loan necessity', 'loan with interest fatwa'],
            'riba' => ['riba loan necessity', 'interest based loans in islam', 'borrowing with interest'],
            'loan' => ['loan with interest in islam', 'interest based loans in islam', 'borrowing with interest'],
            'salah' => ['making up missed prayers', 'missed salah', 'qada prayer'],
            'prayer' => ['making up missed prayers', 'missed salah', 'qada prayer'],
            'missed' => ['making up missed prayers', 'missed salah', 'qada prayer'],
        ];

        foreach ($topicSearchMap as $signal => $topicQueries) {
            if (!str_contains($normalizedHaystack, $signal)) {
                continue;
            }
            foreach ($topicQueries as $topicQuery) {
                $queries[] = $topicQuery;
            }
        }

        foreach (array_slice($keywords, 0, 3) as $keyword) {
            $keyword = $this->normalizeText((string) $keyword);
            if ($keyword === '') {
                continue;
            }

            $queries[] = $keyword;
            $queries[] = "{$keyword} ruling";
            $queries[] = "fatwa {$keyword}";
            $queries[] = "{$keyword} in islam";
        }

        return array_values(array_slice(array_unique(array_filter(array_map(
            fn ($query): string => $this->normalizeText((string) $query),
            $queries
        ))), 0, 10));
    }

    /**
     * @param array<string, mixed> $profile
     * @return array{
     *   validation: array<string, mixed>,
     *   source_counts: array{quran:int, hadith:int}
     * }
     */
    protected function retrieveValidatedItems(array $profile, string $language): array
    {
        if ($this->criterionCorpus->shouldUseLocalCorpus()) {
            $liveDocuments = $this->fetchLiveDocuments($profile, $language);
            $candidates = $this->mergeCandidates($profile, $liveDocuments);
            $topItems = $this->selectTopItems($candidates, $profile);

            return [
                'validation' => $this->validateRetrievedItems($topItems, $profile),
                'source_counts' => $this->countDocumentsBySource($liveDocuments),
            ];
        }

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
        if ($this->criterionCorpus->shouldUseLocalCorpus()) {
            $checks = [];
            $checks['criterion_quran'] = $this->recordRawDataResponse(
                'CRITERION_QURAN_RAW_RESPONSE',
                'criterion-local://quran/search',
                ['q' => 'prayer', 'limit' => 5],
                ['results' => $this->criterionCorpus->searchQuran('prayer', 5)]
            );
            $checks['criterion_hadith'] = $this->recordRawDataResponse(
                'CRITERION_HADITH_RAW_RESPONSE',
                'criterion-local://hadith/search',
                [
                    'q' => 'prayer',
                    'limit' => 5,
                    'grade' => (string) config('services.criterion.hadith_grade', 'sahih-and-hasan'),
                ],
                [
                    'results' => $this->criterionCorpus->searchHadith(
                        'prayer',
                        5,
                        (string) config('services.criterion.hadith_grade', 'sahih-and-hasan')
                    ),
                ]
            );

            return $checks;
        }

        $criterionBase = rtrim((string) config('services.criterion.base', 'https://criterion.life/api/v1'), '/');
        $timeout = max(5, (int) config('services.criterion.timeout', 12));

        $checks = [];
        $checks['criterion_quran'] = $this->performDebugHttpGet(
            'CRITERION_QURAN_RAW_RESPONSE',
            $this->buildExternalApiUrl($criterionBase, (string) config('services.criterion.quran_search_endpoint', '/quran/search')),
            [
                'q' => 'prayer',
                'limit' => 5,
            ],
            ['results', 'data.results', 'data']
        );
        $checks['criterion_hadith'] = $this->performDebugHttpGet(
            'CRITERION_HADITH_RAW_RESPONSE',
            $this->buildExternalApiUrl($criterionBase, (string) config('services.criterion.hadith_search_endpoint', '/hadith/search')),
            [
                'q' => 'prayer',
                'limit' => 5,
                'grade' => (string) config('services.criterion.hadith_grade', 'sahih-and-hasan'),
            ],
            ['results', 'data.results', 'data']
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
     * @param array<string, mixed> $payload
     * @return array<string, mixed>
     */
    protected function recordRawDataResponse(string $label, string $endpoint, array $query, array $payload): array
    {
        $responseData = $payload;
        $isEmpty = $this->responseIsEmpty($responseData);
        $entry = [
            'label' => $label,
            'endpoint' => $this->buildEndpointForLog($endpoint, $query),
            'status' => 200,
            'response' => $responseData,
            'failed' => $isEmpty,
            'matched_path' => array_key_exists('results', $payload) ? 'results' : null,
            'paths_checked' => ['results', 'data.results', 'data'],
            'message' => $isEmpty ? 'Local Criterion corpus returned no data' : null,
        ];

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
     *   source_counts: array{quran:int, hadith:int}
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
        $profile['quran_queries'] = $this->buildQuranSearchQueries(
            (string) ($profile['normalized'] ?? ''),
            $profile['keywords'] ?? [],
            $profile['expanded_keywords'] ?? []
        );
        $profile['hadith_queries'] = $this->buildHadithSearchQueries(
            (string) ($profile['normalized'] ?? ''),
            $profile['normalized_queries'] ?? [],
            $profile['expanded_keywords'] ?? []
        );
        $profile['broaden_search_filters'] = true;

        return $profile;
    }

    /**
     * @param array{
     *   validation: array<string, mixed>,
     *   source_counts: array{quran:int, hadith:int}
     * } $current
     * @param array{
     *   validation: array<string, mixed>,
     *   source_counts: array{quran:int, hadith:int}
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
            'Scholarly Opinion' => 3,
            'Weak' => 2,
            default => 1,
        };

        return ($rank * 100) + (int) ($stats['validated_count'] ?? 0);
    }

    /**
     * @param array<int, array<string, mixed>> $documents
     * @return array{quran:int, hadith:int}
     */
    protected function countDocumentsBySource(array $documents): array
    {
        $counts = [
            'quran' => 0,
            'hadith' => 0,
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
     * @param array{quran?:int, hadith?:int} $sourceCounts
     */
    protected function allSourceResultsEmpty(array $sourceCounts): bool
    {
        return ((int) ($sourceCounts['quran'] ?? 0)) === 0
            && ((int) ($sourceCounts['hadith'] ?? 0)) === 0;
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
            'strategy' => $this->criterionCorpus->shouldUseLocalCorpus() ? 'criterion-local-v2' : 'criterion-http-v1',
            'language' => $language,
            'query' => $profile['normalized'] ?? '',
            'intent' => $profile['intent'] ?? 'general',
            'search_text' => $profile['search_text'] ?? '',
            'normalized_queries' => $profile['normalized_queries'] ?? [],
            'quran_queries' => $profile['quran_queries'] ?? [],
            'hadith_queries' => $profile['hadith_queries'] ?? [],
            'verse_refs' => $profile['verse_refs'] ?? [],
            'broaden_search_filters' => $profile['broaden_search_filters'] ?? false,
            'attempt' => $profile['retrieval_attempt'] ?? 1,
        ]));

        $cached = Cache::get($cacheKey);
        if (is_array($cached)) {
            return $cached;
        }

        $documents = $this->fetchCriterionDocuments($profile, $language);
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
    protected function fetchCriterionDocuments(array $profile, string $language): array
    {
        $baseUrl = rtrim((string) config('services.criterion.base', 'https://criterion.life/api/v1'), '/');
        $useLocalCorpus = $this->criterionCorpus->shouldUseLocalCorpus();

        if ($baseUrl === '' && !$useLocalCorpus) {
            return [];
        }

        $intent = (string) ($profile['intent'] ?? 'general');
        $shouldFetchQuran = in_array($intent, ['quran', 'ruling', 'general'], true);
        $shouldFetchHadith = in_array($intent, ['hadith', 'ruling', 'general'], true);

        if (($profile['category'] ?? 'general') === 'religious_guidance' || ($profile['category'] ?? 'general') === 'fiqh') {
            $shouldFetchQuran = true;
            $shouldFetchHadith = true;
        }

        $quranQuery = $this->criterionQuranQuery($profile);
        $hadithQuery = $this->criterionHadithQuery($profile);
        $quranLimit = max(1, min(20, (int) config('services.criterion.quran_limit', 5)));
        $hadithLimit = max(1, min(15, (int) config('services.criterion.hadith_limit', 5)));
        $timeout = max(5, (int) config('services.criterion.timeout', 12));
        $hadithGrade = (string) config('services.criterion.hadith_grade', 'sahih-and-hasan');

        if ($useLocalCorpus) {
            $documents = [];

            if ($shouldFetchQuran && $quranQuery !== '') {
                $quranRows = $this->criterionCorpus->searchQuran($quranQuery, $quranLimit);
                $this->recordRawDataResponse(
                    'CRITERION_QURAN_RAW_RESPONSE',
                    'criterion-local://quran/search',
                    ['q' => $quranQuery, 'limit' => $quranLimit],
                    ['results' => $quranRows]
                );

                foreach ($quranRows as $row) {
                    if (!is_array($row)) {
                        continue;
                    }
                    $document = $this->normalizeCriterionQuranDocument($row, $language);
                    if ($document !== null) {
                        $documents[] = $document;
                    }
                }
            }

            if ($shouldFetchHadith && $hadithQuery !== '') {
                $hadithRows = $this->criterionCorpus->searchHadith($hadithQuery, $hadithLimit, $hadithGrade);
                $this->recordRawDataResponse(
                    'CRITERION_HADITH_RAW_RESPONSE',
                    'criterion-local://hadith/search',
                    ['q' => $hadithQuery, 'limit' => $hadithLimit, 'grade' => $hadithGrade],
                    ['results' => $hadithRows]
                );

                foreach ($hadithRows as $row) {
                    if (!is_array($row)) {
                        continue;
                    }
                    $document = $this->normalizeCriterionHadithDocument($row, $profile, $language);
                    if ($document !== null) {
                        $documents[] = $document;
                    }
                }
            }

            return $this->dedupeDocuments($documents);
        }

        $responses = Http::pool(function (Pool $pool) use (
            $shouldFetchQuran,
            $shouldFetchHadith,
            $baseUrl,
            $quranQuery,
            $hadithQuery,
            $quranLimit,
            $hadithLimit,
            $hadithGrade,
            $timeout
        ) {
            $requests = [];

            if ($shouldFetchQuran && $quranQuery !== '') {
                $requests['criterion_quran'] = $pool
                    ->as('criterion_quran')
                    ->acceptJson()
                    ->timeout($timeout)
                    ->get($this->buildExternalApiUrl(
                        $baseUrl,
                        (string) config('services.criterion.quran_search_endpoint', '/quran/search')
                    ), [
                        'q' => $quranQuery,
                        'limit' => $quranLimit,
                    ]);
            }

            if ($shouldFetchHadith && $hadithQuery !== '') {
                $requests['criterion_hadith'] = $pool
                    ->as('criterion_hadith')
                    ->acceptJson()
                    ->timeout($timeout)
                    ->get($this->buildExternalApiUrl(
                        $baseUrl,
                        (string) config('services.criterion.hadith_search_endpoint', '/hadith/search')
                    ), [
                        'q' => $hadithQuery,
                        'limit' => $hadithLimit,
                        'grade' => $hadithGrade,
                    ]);
            }

            return $requests;
        });

        $documents = [];

        $quranResponse = $responses['criterion_quran'] ?? null;
        if ($quranResponse) {
            $this->recordRawApiResponse(
                'CRITERION_QURAN_RAW_RESPONSE',
                $this->buildExternalApiUrl($baseUrl, (string) config('services.criterion.quran_search_endpoint', '/quran/search')),
                ['q' => $quranQuery, 'limit' => $quranLimit],
                $quranResponse,
                ['results', 'data.results', 'data']
            );
            foreach ($this->extractListPayloadFromResponse($quranResponse) as $row) {
                if (!is_array($row)) {
                    continue;
                }
                $document = $this->normalizeCriterionQuranDocument($row, $language);
                if ($document !== null) {
                    $documents[] = $document;
                }
            }
        }

        $hadithResponse = $responses['criterion_hadith'] ?? null;
        if ($hadithResponse) {
            $this->recordRawApiResponse(
                'CRITERION_HADITH_RAW_RESPONSE',
                $this->buildExternalApiUrl($baseUrl, (string) config('services.criterion.hadith_search_endpoint', '/hadith/search')),
                ['q' => $hadithQuery, 'limit' => $hadithLimit, 'grade' => $hadithGrade],
                $hadithResponse,
                ['results', 'data.results', 'data']
            );
            foreach ($this->extractListPayloadFromResponse($hadithResponse) as $row) {
                if (!is_array($row)) {
                    continue;
                }
                $document = $this->normalizeCriterionHadithDocument($row, $profile, $language);
                if ($document !== null) {
                    $documents[] = $document;
                }
            }
        }

        return $this->dedupeDocuments($documents);
    }

    /**
     * @param array<string, mixed> $profile
     */
    protected function criterionQuranQuery(array $profile): string
    {
        $verseReference = Arr::get($profile, 'verse_refs.0.verse_key');
        if (is_string($verseReference) && trim($verseReference) !== '') {
            return trim($verseReference);
        }

        foreach ((array) ($profile['quran_queries'] ?? []) as $query) {
            $normalized = trim((string) $query);
            if ($normalized !== '') {
                return $normalized;
            }
        }

        return trim((string) ($profile['normalized'] ?? ''));
    }

    /**
     * @param array<string, mixed> $profile
     */
    protected function criterionHadithQuery(array $profile): string
    {
        foreach ((array) ($profile['hadith_queries'] ?? []) as $query) {
            $normalized = trim((string) $query);
            if ($normalized !== '') {
                return $normalized;
            }
        }

        return trim((string) ($profile['normalized'] ?? ''));
    }

    /**
     * @param array<string, mixed> $row
     * @return array<string, mixed>|null
     */
    protected function normalizeCriterionQuranDocument(array $row, string $language): ?array
    {
        $surahNumber = (int) Arr::get($row, 'surahNumber', 0);
        $ayahNumber = (int) Arr::get($row, 'ayahNumber', 0);
        $textEnglish = $this->cleanText((string) (
            Arr::get($row, 'textEnglish')
            ?? Arr::get($row, 'translation')
            ?? Arr::get($row, 'text')
            ?? ''
        ));
        $textArabic = $this->cleanText((string) Arr::get($row, 'textArabic', ''));

        if ($surahNumber <= 0 || $ayahNumber <= 0 || $textEnglish === '') {
            return null;
        }

        $surahNameEnglish = $this->cleanText((string) Arr::get($row, 'surahNameEnglish', 'Quran'));
        $surahNameArabic = $this->cleanText((string) Arr::get($row, 'surahNameArabic', ''));
        $reference = trim(sprintf('%s %d:%d', $surahNameEnglish !== '' ? $surahNameEnglish : 'Quran', $surahNumber, $ayahNumber));
        $verseKey = "{$surahNumber}:{$ayahNumber}";
        $contextBefore = $this->normalizeCriterionQuranContext((array) Arr::get($row, 'contextBefore', []));
        $contextAfter = $this->normalizeCriterionQuranContext((array) Arr::get($row, 'contextAfter', []));

        $bodyParts = [$textEnglish];
        if ($textArabic !== '') {
            $bodyParts[] = 'Arabic: ' . $textArabic;
        }
        if (!empty($contextBefore)) {
            $bodyParts[] = 'Context before: ' . implode(' ', $contextBefore);
        }
        if (!empty($contextAfter)) {
            $bodyParts[] = 'Context after: ' . implode(' ', $contextAfter);
        }

        return [
            'document_key' => "quran:criterion:{$verseKey}:{$language}",
            'source' => 'quran',
            'source_type' => 'verse',
            'source_id' => (string) (Arr::get($row, 'verseId') ?? $verseKey),
            'language' => $language,
            'title' => $surahNameEnglish !== '' ? $surahNameEnglish : 'Quran',
            'reference' => $reference,
            'body' => implode("\n\n", array_filter($bodyParts)),
            'snippet' => $this->snippet($textEnglish, self::MAX_SNIPPET_CHARS),
            'translation' => $textEnglish,
            'description' => null,
            'metadata' => [
                'surah_number' => $surahNumber,
                'ayah_number' => $ayahNumber,
                'surah_name' => $surahNameEnglish,
                'surah_name_arabic' => $surahNameArabic,
                'text_arabic' => $textArabic,
                'url' => "https://quran.com/{$surahNumber}/{$ayahNumber}",
                'source_name' => 'Criterion',
            ],
            'grade' => null,
            'priority' => $this->defaultPriority('quran', null),
            'vector_score' => (float) Arr::get($row, 'similarity', 0.0),
        ];
    }

    /**
     * @param array<int, array<string, mixed>> $contextRows
     * @return array<int, string>
     */
    protected function normalizeCriterionQuranContext(array $contextRows): array
    {
        $lines = [];

        foreach ($contextRows as $row) {
            if (!is_array($row)) {
                continue;
            }

            $surahNumber = (int) Arr::get($row, 'surahNumber', 0);
            $ayahNumber = (int) Arr::get($row, 'ayahNumber', 0);
            $textEnglish = $this->cleanText((string) Arr::get($row, 'textEnglish', ''));
            if ($surahNumber <= 0 || $ayahNumber <= 0 || $textEnglish === '') {
                continue;
            }

            $lines[] = "{$surahNumber}:{$ayahNumber} {$textEnglish}";
        }

        return $lines;
    }

    /**
     * @param array<string, mixed> $row
     * @param array<string, mixed> $profile
     * @return array<string, mixed>|null
     */
    protected function normalizeCriterionHadithDocument(array $row, array $profile, string $language): ?array
    {
        $document = $this->normalizeHadithDocument([
            'title' => Arr::get($row, 'collection', 'Hadith'),
            'id' => Arr::get($row, 'reference'),
            'attribution' => Arr::get($row, 'reference'),
            'hadeeth' => Arr::get($row, 'english') ?? Arr::get($row, 'textEnglish'),
            'text' => Arr::get($row, 'english') ?? Arr::get($row, 'textEnglish'),
            'description' => trim(implode(' ', array_filter([
                $this->cleanText((string) Arr::get($row, 'narrator', '')),
                $this->cleanText((string) Arr::get($row, 'book', '')),
                $this->cleanText((string) Arr::get($row, 'chapter', '')),
            ]))),
            'grade' => Arr::get($row, 'grade'),
            'source' => Arr::get($row, 'reference'),
            'sourceUrl' => Arr::get($row, 'sourceUrl'),
            'sourceName' => 'Criterion',
        ], $profile, $language);

        if ($document === null) {
            return null;
        }

        $document['vector_score'] = (float) Arr::get($row, 'similarity', 0.0);

        return $document;
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
        $mappedReferences = $this->buildQuranReferenceCandidates($profile);
        $documents = $this->fetchMappedQuranDocuments(
            $profile,
            $language,
            $baseUrl,
            $translateEndpoint,
            $apiKey,
            $mappedReferences
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
        foreach (array_slice($mappedReferences, 0, 5) as $reference) {
            $surah = (int) ($reference['surah'] ?? 0);
            $ayah = (int) ($reference['ayah'] ?? 0);
            if ($surah > 0 && $ayah > 0) {
                $verseKeys[] = "{$surah}:{$ayah}";
            }
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
            'mapped_reference_count' => count($mappedReferences),
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

        $documents = [];
        foreach ($rows as $row) {
            if (!is_array($row)) {
                continue;
            }

            $document = $this->normalizeIslamHouseDocument($row, $language);
            if ($document !== null) {
                $document['keyword_score'] = $this->scoreIslamHouseRow(
                    $row,
                    $profile
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
                $preferredType,
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
        $expandedKeywords = $keywords['expanded_keywords'] ?? $keywords;
        $topicKeywords = $this->specificTopicKeywords($expandedKeywords);
        $combined = trim($title . ' ' . $description);
        $expandedScore = $this->keywordScore($combined, $expandedKeywords);
        $topicScore = $this->keywordScore($combined, $topicKeywords);
        $score = ($this->keywordScore($title, $expandedKeywords) * 4)
            + ($this->keywordScore($description, $expandedKeywords) * 2)
            + ($topicScore * 5);

        if (!empty($topicKeywords) && $topicScore === 0) {
            $score -= 18;
        } elseif ($expandedScore === 0) {
            $score -= 10;
        }

        $normalizedTitle = $this->normalizeText($title);
        if ($normalizedTitle !== '' && $this->looksGenericIslamHouseTitle($normalizedTitle)) {
            $score -= 12;
        }

        return $score;
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
        string $apiKey,
        array $references = []
    ): array {
        if (empty($references)) {
            return [];
        }

        $responses = Http::pool(function (Pool $pool) use ($baseUrl, $translateEndpoint, $apiKey, $language, $references) {
            $requests = [];
            foreach ($references as $index => $reference) {
                $query = [
                    'sura' => $reference['surah'],
                    'aya' => $reference['ayah'],
                    'lang' => $language,
                ];
                if ($apiKey !== '') {
                    $query['key'] = $apiKey;
                }

                $requests["quran_mapped_{$index}"] = $pool
                    ->as("quran_mapped_{$index}")
                    ->acceptJson()
                    ->timeout(12)
                    ->get("{$baseUrl}{$translateEndpoint}", $query);
            }

            return $requests;
        });

        $documents = [];
        foreach ($references as $index => $reference) {
            $this->recordRawApiResponse(
                'QURANENC_RAW_RESPONSE',
                "{$baseUrl}{$translateEndpoint}",
                array_filter([
                    'key' => $apiKey !== '' ? $apiKey : null,
                    'sura' => $reference['surah'],
                    'aya' => $reference['ayah'],
                    'lang' => $language,
                ], fn ($value) => $value !== null),
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
        $expandedKeywords = $profile['expanded_keywords'] ?? [];
        $hasSpecificTopicKeywords = $this->hasSpecificTopicKeywords($expandedKeywords);

        foreach (array_slice($profile['verse_refs'] ?? [], 0, 5) as $reference) {
            $key = ((int) ($reference['surah'] ?? 0)) . ':' . ((int) ($reference['ayah'] ?? 0));
            $references[$key] = [
                'surah' => (int) ($reference['surah'] ?? 0),
                'ayah' => (int) ($reference['ayah'] ?? 0),
            ];
        }

        foreach ($this->quranTopicMap() as $keyword => $mappedReferences) {
            if (!in_array($keyword, $expandedKeywords, true)) {
                continue;
            }

            if ($hasSpecificTopicKeywords && $this->isGenericLegalKeyword($keyword)) {
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
     * @param array<int, string> $expandedKeywords
     */
    protected function hasSpecificTopicKeywords(array $expandedKeywords): bool
    {
        return !empty($this->specificTopicKeywords($expandedKeywords));
    }

    /**
     * @param array<int, string> $expandedKeywords
     * @return array<int, string>
     */
    protected function specificTopicKeywords(array $expandedKeywords): array
    {
        $topicKeywords = [];

        foreach ($expandedKeywords as $keyword) {
            $keyword = $this->normalizeText((string) $keyword);
            if ($keyword === '' || $this->isGenericLegalKeyword($keyword)) {
                continue;
            }

            if (in_array($keyword, [
                'islam', 'islamic', 'quran', 'hadith', 'verse', 'surah', 'ayah',
                'ruling', 'scholar', 'scholarly', 'guidance', 'religion',
                'muslim', 'muslims', 'according', 'say', 'says', 'said',
                'should', 'what', 'when', 'where', 'which', 'about',
                'taking', 'based', 'later', 'alternative', 'make', 'making',
                'think', 'belief', 'believe', 'faith', 'question', 'does',
            ], true)) {
                continue;
            }

            $topicKeywords[] = $keyword;
        }

        return array_values(array_unique($topicKeywords));
    }

    protected function isGenericLegalKeyword(string $keyword): bool
    {
        return in_array($this->normalizeText($keyword), [
            'halal',
            'haram',
            'permissible',
            'forbidden',
            'lawful',
            'impermissible',
            'allowed',
            'ruling',
        ], true);
    }

    /**
     * @param array<string, mixed> $item
     * @param array<int, string> $topicKeywords
     */
    protected function matchesTopicKeywords(array $item, array $topicKeywords): bool
    {
        return $this->topicKeywordScore($item, $topicKeywords) > 0;
    }

    /**
     * @param array<string, mixed> $item
     * @param array<int, string> $topicKeywords
     */
    protected function topicKeywordScore(array $item, array $topicKeywords): int
    {
        $haystack = $this->normalizeText(
            (string) ($item['title'] ?? '') . ' '
            . (string) ($item['reference'] ?? '') . ' '
            . (string) ($item['body'] ?? '') . ' '
            . (string) ($item['description'] ?? '')
        );

        if ($haystack === '' || empty($topicKeywords)) {
            return 0;
        }

        $score = 0;
        foreach (array_values(array_unique($topicKeywords)) as $keyword) {
            $keyword = $this->normalizeText((string) $keyword);
            if ($keyword === '') {
                continue;
            }

            if (preg_match('/\b' . preg_quote($keyword, '/') . '\b/', $haystack)) {
                $score += 2;
            } elseif (str_contains($haystack, $keyword)) {
                $score += 1;
            }
        }

        return $score;
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
        if (empty($searchQueries)) {
            return [];
        }

        try {
            $responses = Http::pool(function (Pool $pool) use ($baseUrl, $endpoint, $apiKey, $searchQueries) {
                $requests = [];

                foreach ($searchQueries as $index => $searchQuery) {
                    $query = [
                        'query' => $searchQuery,
                    ];
                    if ($apiKey !== '') {
                        $query['key'] = $apiKey;
                    }

                    $requests["hadith_api_{$index}"] = $pool
                        ->as("hadith_api_{$index}")
                        ->acceptJson()
                        ->timeout(12)
                        ->get("{$baseUrl}{$endpoint}", $query);
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
                array_filter([
                    'key' => $apiKey !== '' ? $apiKey : null,
                    'query' => $searchQuery,
                ], fn ($value) => $value !== null),
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
        string $preferredType,
        bool $broadenFilters
    ): array {
        return [
            'key' => $apiKey,
            'lang' => $broadenFilters ? 'showall' : $language,
            'flang' => $language,
            'slang' => 'showall',
            'type' => $broadenFilters ? 'showall' : ($preferredType !== '' ? $preferredType : 'showall'),
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

        if (preg_match('/\b(ruling|haram|halal|allowed|permissible|forbidden|loan|loans|interest|riba|music|birthday|birthdays|celebration)\b/', $haystack)) {
            return 'fatwa';
        }

        if (preg_match('/\b(quran)\b/', $haystack)) {
            return 'book';
        }

        if (preg_match('/\b(audio|dua|duaa)\b/', $haystack)) {
            return 'audio';
        }

        if (preg_match('/\b(how|explain|importance|virtue|anger|patience|sincerity|prayer|salah)\b/', $haystack)) {
            return 'article';
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
            $query . ' in islam',
            $query . ' ruling',
            'fatwa ' . $query,
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

        if ($this->isLowQualityIslamHouseDocument($title, $body)) {
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

    protected function isLowQualityIslamHouseDocument(string $title, string $body): bool
    {
        $normalizedTitle = $this->normalizeText($title);
        $normalizedBody = $this->normalizeText($body);

        $blockedTitles = [
            'islamhouse important links',
            'important links',
            'home',
            'search results',
            'search',
            'categories',
            'about',
            'contact us',
        ];

        if (in_array($normalizedTitle, $blockedTitles, true)) {
            return true;
        }

        if ($normalizedTitle !== '' && $normalizedTitle === $normalizedBody && mb_strlen($normalizedTitle) < 80) {
            return true;
        }

        return false;
    }

    protected function looksGenericIslamHouseTitle(string $normalizedTitle): bool
    {
        foreach ([
            'how to become a muslim',
            'how to convert to islam',
            'discover islam',
            'a glimpse of muslim spain',
            'important links',
            'ramadan and fasting',
        ] as $genericTitle) {
            if ($normalizedTitle === $genericTitle) {
                return true;
            }
        }

        return false;
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

        if (!(bool) config('services.ai_rag.vector_store_enabled', true)) {
            return false;
        }

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
                ->whereIn('source', ['quran', 'hadith'])
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
            if ($item === null) {
                continue;
            }
            $item['vector_score'] = $vectorScore;
            $item['keyword_score'] = $keywordScore;
            $item['final_score'] = $this->computeFinalScore($item, $profile, true);
            $items[] = $item;
        }

        usort($items, fn (array $a, array $b): int => ($b['final_score'] ?? 0) <=> ($a['final_score'] ?? 0));

        return array_slice($items, 0, $limit);
    }

    protected function ragDocumentToItem(RagDocument $document): ?array
    {
        $metadata = is_array($document->metadata) ? $document->metadata : [];
        $source = (string) $document->source;
        $title = (string) $document->title;
        $body = (string) $document->body;

        if ($source === 'islamhouse' && $this->isLowQualityIslamHouseDocument($title, $body)) {
            return null;
        }

        return [
            'document_key' => $document->document_key,
            'source' => $source,
            'source_type' => $document->source_type,
            'source_id' => $document->source_id,
            'language' => $document->language,
            'title' => $title,
            'reference' => $document->reference,
            'body' => $body,
            'snippet' => $document->snippet ?: $this->snippet($body, self::MAX_SNIPPET_CHARS),
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
        $seen = [];
        $limit = ($profile['retrieval_attempt'] ?? 1) > 1 ? 4 : 3;

        foreach ($items as $item) {
            $source = (string) ($item['source'] ?? '');
            if (!in_array($source, ['quran', 'hadith'], true)) {
                continue;
            }
            if (($item['final_score'] ?? 0) < self::MIN_FINAL_SCORE) {
                continue;
            }

            $key = $this->candidateDedupKey($item);
            if ($key === '' || isset($seen[$key])) {
                continue;
            }

            $seen[$key] = true;
            $selected[] = $item;

            if (count($selected) >= min(self::MAX_CONTEXT_ITEMS, $limit)) {
                return $selected;
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
        $specificTopicKeywords = $this->specificTopicKeywords($profile['expanded_keywords'] ?? []);
        $requiredTopicScore = count($specificTopicKeywords) >= 3 ? 3 : (count($specificTopicKeywords) === 2 ? 2 : (count($specificTopicKeywords) === 1 ? 1 : 0));

        foreach ($items as $item) {
            if (!is_array($item)) {
                continue;
            }

            $source = (string) ($item['source'] ?? '');
            $keywordScore = (int) ($item['keyword_score'] ?? $this->keywordScore(
                ($item['title'] ?? '') . ' ' . ($item['reference'] ?? '') . ' ' . ($item['body'] ?? ''),
                $profile['expanded_keywords'] ?? []
            ));

            if ($keywordScore < $this->minimumKeywordScore($profile, $source)) {
                continue;
            }

            if ($requiredTopicScore > 0 && $this->topicKeywordScore($item, $specificTopicKeywords) < $requiredTopicScore) {
                continue;
            }

            if ($source === 'quran') {
                if (!$this->isValidQuranItem($item)) {
                    continue;
                }
                $quranCount++;
                $validated[] = $item;
                continue;
            }

            if ($source !== 'hadith' || !$this->isValidHadithItem($item, $profile)) {
                continue;
            }

            $classification = $this->classifyHadithGrade($item['grade'] ?? null);
            if ($classification === 'sahih') {
                $sahihHadithCount++;
                $authenticHadithCount++;
            } elseif ($classification === 'hasan') {
                $hasanHadithCount++;
                $authenticHadithCount++;
            }

            $validated[] = $item;
        }

        $stats = $this->buildEvidenceStats(
            $quranCount,
            $authenticHadithCount,
            $sahihHadithCount,
            $hasanHadithCount,
            0,
            count($validated)
        );

        if (empty($validated)) {
            return [
                'blocked' => true,
                'message' => 'I could not find a clear Quran or authentic Hadith answer for that question. Try a narrower wording.',
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
        $evidenceLevel = 'Weak';
        $confidenceBadge = 'Low';
        $confidenceScore = 0;
        $scholarlyOnly = false;

        if ($quranCount > 0 && $authenticHadithCount > 0) {
            $evidenceLevel = 'Quran and Hadith';
            $confidenceBadge = 'Quran and Hadith';
            $confidenceScore = 95;
        } elseif ($quranCount > 0) {
            $evidenceLevel = 'Quran';
            $confidenceBadge = 'Quran Evidence';
            $confidenceScore = 92;
        } elseif ($sahihHadithCount > 0) {
            $evidenceLevel = 'Authentic Hadith';
            $confidenceBadge = 'Authentic Hadith';
            $confidenceScore = 88;
        } elseif ($authenticHadithCount > 0) {
            $evidenceLevel = 'Hadith';
            $confidenceBadge = 'Hadith Evidence';
            $confidenceScore = 80;
        } elseif ($islamhouseCount > 0) {
            $evidenceLevel = 'Scholarly Opinion';
            $confidenceBadge = 'Supported by Islamic Sources';
            $confidenceScore = 75;
            $scholarlyOnly = true;
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
            'scholarly_only' => $scholarlyOnly,
        ];
    }

    protected function uiBadgeForConfidence(int $confidenceScore): string
    {
        return '';
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
            'quran_results' => (int) ($stats['quran_count'] ?? 0),
            'hadith_results' => (int) ($stats['authentic_hadith_count'] ?? 0),
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
            'quran_queries' => $profile['quran_queries'] ?? [],
            'hadith_queries' => $profile['hadith_queries'] ?? [],
            'verse_refs' => $profile['verse_refs'] ?? [],
        ]);
    }

    /**
     * @param array<string, mixed> $profile
     */
    protected function minimumKeywordScore(array $profile, string $source): int
    {
        if (in_array($source, ['quran', 'hadith'], true)) {
            if (empty($profile['expanded_keywords'] ?? [])) {
                return 0;
            }

            return 1;
        }

        $specificTopicKeywords = $this->specificTopicKeywords($profile['expanded_keywords'] ?? []);
        if (($profile['evidence_required'] ?? false) && count($specificTopicKeywords) >= 2) {
            return 3;
        }

        return 2;
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
     */
    protected function isValidIslamHouseItem(array $item): bool
    {
        $title = $this->cleanText((string) ($item['title'] ?? ''));
        $body = $this->cleanText((string) ($item['body'] ?? ''));

        if ($title === '' && $body === '') {
            return false;
        }

        return !$this->isLowQualityIslamHouseDocument($title, $body);
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
        if ($intent === 'ruling' && in_array($source, ['quran', 'hadith'], true)) {
            $boost += 8;
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
        $quranItems = array_values(array_filter(
            $items,
            fn (array $item): bool => ($item['source'] ?? '') === 'quran'
        ));
        $hadithItems = array_values(array_filter(
            $items,
            fn (array $item): bool => ($item['source'] ?? '') === 'hadith'
        ));

        $sections = [];
        if (!empty($quranItems)) {
            $sections[] = [
                'key' => 'quran',
                'title' => 'Quran evidence',
                'items' => $quranItems,
            ];
        }

        if (!empty($hadithItems)) {
            $sections[] = [
                'key' => 'hadith',
                'title' => 'Hadith evidence',
                'items' => $hadithItems,
            ];
        }

        if (empty($sections)) {
            return [];
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
                $block = ['- Reference: ' . ($item['reference'] ?? $item['title'] ?? 'Source')];
                if (!empty($item['body'])) {
                    $block[] = '  Text: ' . $this->snippet((string) $item['body'], self::MAX_SNIPPET_CHARS);
                }
                $block[] = '  Type: ' . Str::headline((string) ($item['source_type'] ?? 'item'));
                if (($item['source'] ?? '') === 'hadith' && !empty($item['grade'])) {
                    $block[] = '  Grade: ' . $this->formatHadithGrade((string) $item['grade']);
                }

                if (!empty($item['snippet'])) {
                    $block[] = '  Snippet: ' . $item['snippet'];
                }

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
            $source = (string) ($item['source'] ?? '');
            if (!in_array($source, ['quran', 'hadith'], true)) {
                continue;
            }

            $label = trim((string) ($item['reference'] ?? $item['title'] ?? ''));
            if ($label === '') {
                continue;
            }

            $url = $this->normalizeOptionalString(Arr::get($item, 'metadata.url'));
            $badge = $source === 'quran' ? 'Quran' : 'Hadith';
            $label = $badge . ': ' . $label;
            $key = strtolower($source . '|' . $label . '|' . ($url ?? ''));
            if (isset($seen[$key])) {
                continue;
            }
            $seen[$key] = true;

            $references[] = [
                'label' => $label,
                'url' => $url,
                'sourceBadge' => $badge,
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
        return $this->buildDeterministicSourcedAnswer($items, $profile);
    }

    /**
     * @param array<int, array<string, mixed>> $items
     */
    protected function containsPrimaryEvidence(array $items): bool
    {
        return false;
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

        $generated = $this->sanitizeFinalAnswer($generated);
        if ($this->isValidGeneratedResponse($generated, [], ['evidence_required' => false])) {
            return $generated;
        }

        return $this->strictOrGeneralFallback(['evidence_required' => false], false, $question, $language);
    }

    protected function buildSourcedSystemPrompt(string $language, bool $retry, array $profile): string
    {
        $retryRule = $retry
            ? 'This is a retry. If any statement cannot be directly grounded in context, omit it.'
            : '';
        $scholarlyRule = ($profile['scholarly_only'] ?? false) === true
            ? 'Ground the answer in the provided Quran and Hadith context without mentioning the retrieval process.'
            : '';

        return <<<PROMPT
You are an evidence-based Islamic assistant.
Use ONLY the provided context.
Do not fabricate rulings, sources, or citations.
Use Quran and authentic Hadith material only.
Clearly distinguish between sourced primary text and general explanation.
Answer the question directly in clear natural English.
Be concise, specific, and grammatically clean.
Do not tell the user to read links or articles unless the retrieved text is insufficient.
Do not start with phrases like "Based on verified Quran and Hadith sources".
Do not say "Allah knows best."
Avoid absolute rulings when the issue may involve scholarly difference; use phrases like "Scholars differ on this issue" when the context supports that.
Maintain a respectful Islamic tone.
If the evidence is limited, say so clearly in one short sentence.
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
State clearly that no clear Quran or authentic Hadith source was found for the question.
Do not say "Allah knows best."
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
    protected function buildDeterministicSourcedAnswer(array $items, array $profile = []): string
    {
        $specialized = $this->buildSpecializedSourcedAnswer($items, $profile);
        if ($specialized !== null) {
            return $this->sanitizeFinalAnswer($specialized);
        }

        $sentences = $this->extractDirectAnswerSentences(
            $items,
            $profile['expanded_keywords'] ?? [],
            3
        );

        if (!empty($sentences)) {
            return $this->sanitizeFinalAnswer(implode(' ', $sentences));
        }

        $fallback = $this->buildConciseExtractiveFallback($items, $profile);
        if ($fallback !== '') {
            return $fallback;
        }

        return 'I found related Quran or Hadith material, but not enough clear text to answer directly.';
    }

    /**
     * @param array<int, array<string, mixed>> $items
     * @param array<string, mixed> $profile
     */
    protected function buildSpecializedSourcedAnswer(array $items, array $profile): ?string
    {
        $normalized = $this->normalizeText((string) ($profile['normalized'] ?? ''));

        if (preg_match('/\b(who|what)\s+is\s+allah\b/', $normalized) === 1) {
            return $this->buildAllahIdentityAnswer($items);
        }
        if (str_contains($normalized, 'jesus')) {
            return $this->buildJesusAnswer($items);
        }
        if (str_contains($normalized, 'what is islam') || (str_contains($normalized, 'muslim') && (str_contains($normalized, 'believe') || str_contains($normalized, 'belief')))) {
            return $this->buildIslamBeliefAnswer($items);
        }

        return null;
    }

    /**
     * @param array<int, array<string, mixed>> $items
     */
    protected function buildAllahIdentityAnswer(array $items): string
    {
        $hasIkhlas = false;
        $hasTawhidHadith = false;

        foreach ($items as $item) {
            $source = (string) ($item['source'] ?? '');
            $surahNumber = (int) Arr::get($item, 'metadata.surah_number', 0);
            $body = $this->normalizeText((string) ($item['body'] ?? ''));

            if ($source === 'quran' && $surahNumber === 112) {
                $hasIkhlas = true;
            }

            if ($source === 'hadith' && str_contains($body, 'none has the right to be worshipped except allah')) {
                $hasTawhidHadith = true;
            }
        }

        $sentences = [];

        if ($hasIkhlas) {
            $sentences[] = 'Allah is One, the Eternal Refuge, and nothing is comparable to Him.';
        } else {
            $sentences[] = 'Allah is the one true God, perfect in His lordship and unlike His creation.';
        }

        if ($hasTawhidHadith) {
            $sentences[] = 'Belief in Allah means worshipping Him alone without any partner.';
        }

        return implode(' ', $sentences);
    }

    /**
     * @param array<int, array<string, mixed>> $items
     */
    protected function buildJesusAnswer(array $items): string
    {
        $hasJesusMessengerVerse = false;
        $hasJesusHonorVerse = false;

        foreach ($items as $item) {
            $body = $this->normalizeText((string) ($item['body'] ?? ''));
            if (str_contains($body, 'jesus') || str_contains($body, 'son of mary')) {
                $hasJesusHonorVerse = true;
            }
            if (str_contains($body, 'messiah jesus son of mary was but a messenger') || str_contains($body, 'we gave jesus the son of mary clear proofs')) {
                $hasJesusMessengerVerse = true;
            }
        }

        $sentences = [];
        if ($hasJesusMessengerVerse) {
            $sentences[] = 'In Islam, Jesus, the son of Mary, is a noble messenger of Allah and not divine.';
        } else {
            $sentences[] = 'In Islam, Jesus is honored as a prophet and messenger of Allah.';
        }
        if ($hasJesusHonorVerse) {
            $sentences[] = 'Muslims believe Allah gave him clear signs and supported him by His permission.';
        }

        return implode(' ', $sentences);
    }

    /**
     * @param array<int, array<string, mixed>> $items
     */
    protected function buildIslamBeliefAnswer(array $items): string
    {
        $hasCoreBeliefs = false;
        $hasSubmission = false;
        $hasFivePillars = false;

        foreach ($items as $item) {
            $body = $this->normalizeText((string) ($item['body'] ?? ''));

            if (str_contains($body, 'angels') || str_contains($body, 'books') || str_contains($body, 'messengers') || str_contains($body, 'last day') || str_contains($body, 'hereafter')) {
                $hasCoreBeliefs = true;
            }
            if (str_contains($body, 'submission') || str_contains($body, 'submits his face in islam') || str_contains($body, 'muslims in submission')) {
                $hasSubmission = true;
            }
            if (str_contains($body, 'islam is based on five') || str_contains($body, 'islam is founded on five')) {
                $hasFivePillars = true;
            }
        }

        $sentences = ['Islam means submission to Allah alone.'];

        if ($hasCoreBeliefs) {
            $sentences[] = 'Muslims believe in Allah, His angels, His books, His messengers, and the Last Day.';
        } else {
            $sentences[] = 'Muslims believe in Allah and the guidance He revealed through His messengers.';
        }

        if ($hasFivePillars) {
            $sentences[] = 'Islam is practiced through the testimony of faith, prayer, zakat, fasting Ramadan, and Hajj.';
        } elseif ($hasSubmission) {
            $sentences[] = 'A Muslim is one who submits to Allah with faith and obedience.';
        }

        return implode(' ', $sentences);
    }

    /**
     * @param array<string, mixed> $item
     */
    protected function fullAnswerText(array $item): string
    {
        $body = $this->cleanText((string) ($item['body'] ?? ''));
        if ($body !== '') {
            return $body;
        }

        $description = $this->cleanText((string) ($item['description'] ?? ''));
        if ($description !== '') {
            return $description;
        }

        $snippet = $this->cleanText((string) ($item['snippet'] ?? ''));
        $title = $this->cleanText((string) ($item['title'] ?? ''));

        if ($snippet !== '' && $snippet !== $title) {
            return $snippet;
        }

        return '';
    }

    /**
     * @param array<int, array<string, mixed>> $items
     */
    protected function buildEvidenceStatsFromItems(array $items): array
    {
        $quranCount = 0;
        $authenticHadithCount = 0;
        $sahihHadithCount = 0;
        $hasanHadithCount = 0;

        foreach ($items as $item) {
            $source = (string) ($item['source'] ?? '');
            if ($source === 'quran') {
                $quranCount++;
                continue;
            }
            if ($source === 'hadith') {
                $classification = $this->classifyHadithGrade($item['grade'] ?? null);
                if ($classification === 'sahih') {
                    $sahihHadithCount++;
                    $authenticHadithCount++;
                } elseif ($classification === 'hasan') {
                    $hasanHadithCount++;
                    $authenticHadithCount++;
                }
            }
        }

        return $this->buildEvidenceStats(
            $quranCount,
            $authenticHadithCount,
            $sahihHadithCount,
            $hasanHadithCount,
            0,
            count($items)
        );
    }

    /**
     * @param array<int, array<string, mixed>> $references
     * @param array<string, mixed> $profile
     */
    protected function isValidGeneratedResponse(?string $message, array $references, array $profile): bool
    {
        $message = $this->sanitizeFinalAnswer($message);
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

        foreach ([
            'based on verified quran and hadith sources',
            'based on the available verified quran and hadith sources',
            'this answer is based on verified islamic source material',
            'supported by islamic sources',
            'allah knows best',
        ] as $phrase) {
            if (str_contains(Str::lower($message), $phrase)) {
                return false;
            }
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
            'I could not find a clear Quran or authentic Hadith answer for that question. Try a narrower wording.'
        );
    }

    protected function buildStructuredFallbackResponse(string $answer): string
    {
        return $this->sanitizeFinalAnswer($answer);
    }

    /**
     * @param array<int, array<string, mixed>> $items
     * @param array<int, string> $keywords
     * @return array<int, string>
     */
    protected function extractDirectAnswerSentences(array $items, array $keywords, int $limit = 3): array
    {
        $candidates = [];
        $seen = [];
        $topicKeywords = $this->specificTopicKeywords($keywords);

        foreach ($items as $itemIndex => $item) {
            $parts = [
                (string) ($item['body'] ?? ''),
                (string) ($item['description'] ?? ''),
                (string) ($item['snippet'] ?? ''),
            ];

            foreach ($parts as $part) {
                $text = $this->cleanText($part);
                if ($text === '') {
                    continue;
                }

                $sentences = preg_split('/(?<=[.!?])\s+/u', $text) ?: [];
                foreach ($sentences as $sentence) {
                    $sentence = trim($this->sanitizeFinalAnswer($sentence));
                    if ($sentence === '' || mb_strlen($sentence) < 35) {
                        continue;
                    }

                    if (preg_match('/\b(click|visit|read more|download|listen|watch|article|source:)\b/i', $sentence)) {
                        continue;
                    }

                    if ($this->looksLikeDocumentLabel($sentence)) {
                        continue;
                    }

                    $normalized = Str::lower($sentence);
                    if (isset($seen[$normalized])) {
                        continue;
                    }

                    if (!preg_match('/[.!?]$/u', $sentence)) {
                        $sentence .= '.';
                    }

                    $expandedScore = $this->keywordScore($sentence, $keywords);
                    $topicScore = $this->keywordScore($sentence, $topicKeywords);
                    $score = ($expandedScore * 2) + ($topicScore * 4) + max(0, 4 - $itemIndex);
                    if (!empty($topicKeywords) && $topicScore === 0) {
                        continue;
                    }
                    if ($expandedScore < 2 && $topicScore < 2) {
                        continue;
                    }

                    $candidates[] = [
                        'sentence' => $sentence,
                        'score' => $score,
                    ];
                    $seen[$normalized] = true;
                }
            }
        }

        usort($candidates, fn (array $a, array $b): int => ($b['score'] ?? 0) <=> ($a['score'] ?? 0));

        return array_slice(array_column($candidates, 'sentence'), 0, $limit);
    }

    /**
     * @param array<int, array<string, mixed>> $items
     * @param array<string, mixed> $profile
     */
    protected function buildConciseExtractiveFallback(array $items, array $profile): string
    {
        $topicKeywords = $this->specificTopicKeywords($profile['expanded_keywords'] ?? []);

        foreach (array_slice($items, 0, 2) as $item) {
            $body = $this->cleanText((string) ($item['body'] ?? ''));
            if ($body === '') {
                continue;
            }

            $body = preg_replace('/\b\d+\s*-\s*/u', '. ', $body);
            $parts = preg_split('/(?<=[.!?])\s+|\s+\.\s+/u', (string) $body) ?: [];
            $cleanParts = [];

            foreach ($parts as $part) {
                $part = trim($this->sanitizeFinalAnswer((string) $part));
                if ($part === '' || $this->looksLikeLowValueAnswerSentence($part)) {
                    continue;
                }

                if (!empty($topicKeywords) && $this->keywordScore($part, $topicKeywords) === 0) {
                    continue;
                }

                if (preg_match('/^how to\b/i', $part)) {
                    $part = 'The source explains ' . lcfirst($part);
                }
                if (preg_match('/^what is\b/i', $part)) {
                    $part = 'The source addresses ' . lcfirst($part);
                }
                if (!preg_match('/[.!?]$/u', $part)) {
                    $part .= '.';
                }

                $cleanParts[] = $part;
            }

            if (!empty($cleanParts)) {
                return implode(' ', array_slice($cleanParts, 0, 2));
            }
        }

        return '';
    }

    protected function looksLikeDocumentLabel(string $sentence): bool
    {
        $normalized = $this->normalizeText($sentence);
        if ($normalized === '') {
            return true;
        }

        if (mb_strlen($sentence) < 55 && preg_match('/^[A-Z][A-Za-z0-9\'’()\\-,: ]+$/u', $sentence)) {
            return true;
        }

        return preg_match('/\b(saleh|bin|ibn|philips|group of scholars|discoveralislam)\b/i', $sentence) === 1;
    }

    protected function looksLikeLowValueAnswerSentence(string $sentence): bool
    {
        $normalized = $this->normalizeText($sentence);

        foreach ([
            'a brief book shows',
            'i wish to put before',
            'a concise scholarly explanation',
            'a focused fatwa discussing',
            'an article in english shows',
            'the steps a person needs to take',
        ] as $prefix) {
            if (str_starts_with($normalized, $prefix)) {
                return true;
            }
        }

        return $this->looksLikeDocumentLabel($sentence);
    }

    protected function sanitizeFinalAnswer(?string $message): string
    {
        $message = trim((string) $message);
        if ($message === '') {
            return '';
        }

        $patterns = [
            '/\bBased on verified Quran and Hadith sources, here is the closest supported answer\.?\s*/i',
            '/\bBased on the available verified Quran and Hadith sources, here is the closest supported answer\.?\s*/i',
            '/\bThis answer is based on verified Islamic source material\.?\s*/i',
            '/\bAllah knows best\.?\s*/i',
        ];

        $message = preg_replace($patterns, '', $message);
        $message = preg_replace('/\s+/', ' ', (string) $message);
        $message = preg_replace('/\s+([,.;!?])/', '$1', (string) $message);

        return trim((string) $message);
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
        $sourceUrl = $this->normalizeOptionalString(
            Arr::get($row, 'sourceUrl')
            ?? Arr::get($row, 'source_url')
            ?? Arr::get($row, 'url')
        );
        $sourceName = $this->cleanText((string) (
            Arr::get($row, 'sourceName')
            ?? Arr::get($row, 'source_name')
            ?? 'Criterion'
        ));

        return [
            'document_key' => "hadith:{$id}:{$language}",
            'source' => 'hadith',
            'source_type' => 'hadith',
            'source_id' => $id,
            'language' => $language,
            'title' => $title !== '' ? $title : 'Hadith',
            'reference' => $reference !== '' ? $reference : 'Hadith',
            'body' => trim($text . ($description !== '' ? "\n\nExplanation: {$description}" : '')),
            'snippet' => $this->snippet($text . ' ' . $description, self::MAX_SNIPPET_CHARS),
            'translation' => null,
            'description' => $description,
            'metadata' => [
                'url' => $sourceUrl,
                'source_name' => $sourceName,
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

    protected function buildExternalApiUrl(string $baseUrl, string $endpoint): string
    {
        return rtrim($baseUrl, '/') . '/' . ltrim($endpoint, '/');
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
