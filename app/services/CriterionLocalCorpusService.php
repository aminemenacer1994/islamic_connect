<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class CriterionLocalCorpusService
{
    private const QURAN_CONTEXT_RADIUS = 2;
    private const QURAN_TRANSLATION_FILE = 'en.sahih.txt';
    private const QURAN_ARABIC_FILE = 'quran-arabic.txt';
    private const HADITH_TEXT_FILES = [
        'bukhari' => [
            'file' => 'bukhari.txt',
            'name' => 'Sahih Bukhari',
            'grade' => 'Sahih',
            'url_pattern' => 'https://sunnah.com/bukhari:%s',
        ],
        'muslim' => [
            'file' => 'muslim.txt',
            'name' => 'Sahih Muslim',
            'grade' => 'Sahih',
            'url_pattern' => 'https://sunnah.com/muslim:%s',
        ],
        'nawawi40' => [
            'file' => 'nawawi40.txt',
            'name' => '40 Hadith Nawawi',
            'grade' => 'Sahih',
            'url_pattern' => 'https://sunnah.com/nawawi40:%s',
        ],
        'riyadussalihin' => [
            'file' => 'riyadussalihin.txt',
            'name' => 'Riyad as-Salihin',
            'grade' => 'Hasan',
            'url_pattern' => 'https://sunnah.com/riyadussalihin:%s',
        ],
    ];
    private const STOP_WORDS = [
        'a',
        'about',
        'an',
        'and',
        'are',
        'as',
        'at',
        'be',
        'by',
        'can',
        'did',
        'do',
        'does',
        'for',
        'from',
        'how',
        'i',
        'in',
        'is',
        'it',
        'me',
        'my',
        'of',
        'on',
        'or',
        'our',
        'the',
        'their',
        'there',
        'they',
        'this',
        'to',
        'was',
        'we',
        'what',
        'when',
        'where',
        'which',
        'who',
        'why',
        'with',
        'you',
        'your',
    ];
    private const TOPIC_EXPANSIONS = [
        'allah' => ['allah', 'one', 'lord', 'merciful', 'deity', 'creator', 'worship', 'eternal'],
        'god' => ['god', 'allah', 'one', 'lord', 'merciful', 'deity', 'creator', 'worship'],
        'jesus' => ['jesus', 'isa', 'messiah', 'son of mary', 'mary', 'prophet'],
        'isa' => ['isa', 'jesus', 'messiah', 'son of mary', 'mary', 'prophet'],
        'messiah' => ['messiah', 'jesus', 'isa', 'son of mary'],
        'islam' => ['islam', 'muslim', 'submission', 'allah', 'prophet', 'faith'],
        'muslim' => ['muslim', 'islam', 'submission', 'believe', 'faith'],
        'muslims' => ['muslims', 'muslim', 'islam', 'submission', 'believe', 'faith'],
        'belief' => ['belief', 'believe', 'faith', 'iman'],
        'believe' => ['believe', 'belief', 'faith', 'iman'],
        'faith' => ['faith', 'belief', 'believe', 'iman'],
        'iman' => ['iman', 'faith', 'belief', 'believe'],
        'pray' => ['pray', 'prayer', 'salah', 'salat'],
        'prayer' => ['prayer', 'pray', 'salah', 'salat'],
        'salah' => ['salah', 'salat', 'prayer', 'pray'],
        'salat' => ['salat', 'salah', 'prayer', 'pray'],
        'charity' => ['charity', 'zakat', 'sadaqah', 'give'],
        'fasting' => ['fasting', 'fast', 'ramadan', 'sawm'],
        'forgive' => ['forgive', 'forgiveness', 'mercy', 'merciful'],
        'forgiveness' => ['forgiveness', 'forgive', 'mercy', 'merciful'],
        'mercy' => ['mercy', 'merciful', 'forgiving'],
        'patience' => ['patience', 'patient', 'steadfast'],
        'faith' => ['faith', 'belief', 'iman'],
        'tawhid' => ['tawhid', 'oneness', 'allah', 'one', 'deity'],
    ];

    public function shouldUseLocalCorpus(): bool
    {
        return (bool) config('services.criterion.prefer_local_corpus', true) && $this->isAvailable();
    }

    public function isAvailable(): bool
    {
        $path = $this->dataPath();

        return is_dir($path)
            && is_file($path . DIRECTORY_SEPARATOR . self::QURAN_TRANSLATION_FILE)
            && is_file($path . DIRECTORY_SEPARATOR . self::QURAN_ARABIC_FILE)
            && is_file($path . DIRECTORY_SEPARATOR . self::HADITH_TEXT_FILES['bukhari']['file']);
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function searchQuran(string $query, int $limit = 5): array
    {
        $limit = max(1, min(20, $limit));
        $exactVerse = $this->extractVerseReference($query);
        $verses = $this->quranVerses();

        if ($exactVerse !== null) {
            $key = $this->verseKey($exactVerse['surah'], $exactVerse['ayah']);
            if (isset($verses[$key])) {
                return [$this->formatQuranResult($verses[$key], 1.0, true)];
            }
        }

        $weights = $this->buildWeightedTerms($query);
        $identityQuery = $this->isAllahIdentityQuery($query);
        $jesusQuery = $this->isJesusQuery($query);
        $beliefQuery = $this->isIslamBeliefQuery($query);
        $results = [];

        foreach ($verses as $verse) {
            $score = $this->scoreQuranVerse($verse, $query, $weights, $identityQuery, $jesusQuery, $beliefQuery);
            if ($score <= 0) {
                continue;
            }

            $results[] = [
                'score' => $score,
                'verse' => $verse,
            ];
        }

        usort($results, function (array $left, array $right): int {
            $scoreComparison = $right['score'] <=> $left['score'];
            if ($scoreComparison !== 0) {
                return $scoreComparison;
            }

            $surahComparison = ($left['verse']['surahNumber'] ?? 0) <=> ($right['verse']['surahNumber'] ?? 0);
            if ($surahComparison !== 0) {
                return $surahComparison;
            }

            return ($left['verse']['ayahNumber'] ?? 0) <=> ($right['verse']['ayahNumber'] ?? 0);
        });

        $topScore = (float) ($results[0]['score'] ?? 0.0);
        $selected = array_slice($results, 0, $limit);
        $formatted = [];

        foreach ($selected as $index => $match) {
            $similarity = $topScore > 0 ? max(0.35, min(0.99, $match['score'] / $topScore)) : 0.35;
            $formatted[] = $this->formatQuranResult($match['verse'], $similarity, $index < 3);
        }

        return $formatted;
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function searchHadith(string $query, int $limit = 5, string $gradePreference = 'sahih-and-hasan'): array
    {
        $limit = max(1, min(15, $limit));
        $weights = $this->buildWeightedTerms($query);
        $identityQuery = $this->isAllahIdentityQuery($query);
        $jesusQuery = $this->isJesusQuery($query);
        $beliefQuery = $this->isIslamBeliefQuery($query);
        $results = [];

        foreach ($this->hadithNarrations() as $hadith) {
            if (!$this->matchesGradePreference((string) ($hadith['grade'] ?? ''), $gradePreference)) {
                continue;
            }

            $score = $this->scoreHadith($hadith, $query, $weights, $identityQuery, $jesusQuery, $beliefQuery);
            if ($score <= 0) {
                continue;
            }

            $results[] = [
                'score' => $score,
                'hadith' => $hadith,
            ];
        }

        usort($results, function (array $left, array $right): int {
            $scoreComparison = $right['score'] <=> $left['score'];
            if ($scoreComparison !== 0) {
                return $scoreComparison;
            }

            return strcmp((string) ($left['hadith']['reference'] ?? ''), (string) ($right['hadith']['reference'] ?? ''));
        });

        $topScore = (float) ($results[0]['score'] ?? 0.0);
        $selected = array_slice($results, 0, $limit);
        $formatted = [];

        foreach ($selected as $match) {
            $hadith = $match['hadith'];
            $formatted[] = [
                'reference' => (string) ($hadith['reference'] ?? 'Hadith'),
                'collection' => (string) ($hadith['collectionName'] ?? 'Hadith'),
                'english' => (string) ($hadith['english'] ?? ''),
                'arabic' => (string) ($hadith['arabic'] ?? ''),
                'grade' => (string) ($hadith['grade'] ?? 'Unknown'),
                'narrator' => (string) ($hadith['narrator'] ?? ''),
                'book' => (string) ($hadith['book'] ?? ''),
                'chapter' => (string) ($hadith['chapter'] ?? ''),
                'sourceUrl' => (string) ($hadith['sourceUrl'] ?? ''),
                'similarity' => $topScore > 0 ? max(0.35, min(0.99, $match['score'] / $topScore)) : 0.35,
            ];
        }

        return $formatted;
    }

    protected function dataPath(): string
    {
        return rtrim((string) config('services.criterion.local_data_path', base_path('criterion-local/data')), DIRECTORY_SEPARATOR);
    }

    /**
     * @return array<string, array<string, mixed>>
     */
    protected function quranVerses(): array
    {
        static $cache = null;

        if (is_array($cache)) {
            return $cache;
        }

        $cache = Cache::remember(
            'criterion-local-quran:' . $this->dataSignature([self::QURAN_TRANSLATION_FILE, self::QURAN_ARABIC_FILE]),
            now()->addDays(30),
            fn (): array => $this->loadQuranVerses()
        );

        return $cache;
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    protected function hadithNarrations(): array
    {
        static $cache = null;

        if (is_array($cache)) {
            return $cache;
        }

        $cache = Cache::remember(
            'criterion-local-hadith:' . $this->dataSignature(array_column(self::HADITH_TEXT_FILES, 'file')),
            now()->addDays(30),
            fn (): array => $this->loadHadithNarrations()
        );

        return $cache;
    }

    /**
     * @param array<int, string> $files
     */
    protected function dataSignature(array $files): string
    {
        $parts = [];

        foreach ($files as $file) {
            $path = $this->dataPath() . DIRECTORY_SEPARATOR . $file;
            $parts[] = $file . ':' . (is_file($path) ? (string) filemtime($path) : 'missing');
        }

        return md5(implode('|', $parts));
    }

    /**
     * @return array<string, array<string, mixed>>
     */
    protected function loadQuranVerses(): array
    {
        $translationRows = $this->parseDelimitedTextFile($this->dataPath() . DIRECTORY_SEPARATOR . self::QURAN_TRANSLATION_FILE);
        $arabicRows = $this->parseDelimitedTextFile($this->dataPath() . DIRECTORY_SEPARATOR . self::QURAN_ARABIC_FILE);
        $surahNames = $this->surahNames();
        $verses = [];

        foreach ($translationRows as $row) {
            $surahNumber = (int) ($row['surah'] ?? 0);
            $ayahNumber = (int) ($row['ayah'] ?? 0);
            $textEnglish = trim((string) ($row['text'] ?? ''));

            if ($surahNumber <= 0 || $ayahNumber <= 0 || $textEnglish === '') {
                continue;
            }

            $key = $this->verseKey($surahNumber, $ayahNumber);
            $surahMeta = $surahNames[$surahNumber] ?? [
                'english' => "Surah {$surahNumber}",
                'arabic' => '',
            ];
            $textArabic = trim((string) ($arabicRows[$key]['text'] ?? ''));
            $searchBlob = $this->normalizeSearchText(implode(' ', array_filter([
                $surahMeta['english'],
                $textEnglish,
                $textArabic,
                "{$surahNumber}:{$ayahNumber}",
            ])));

            $verses[$key] = [
                'verseId' => $key,
                'surahNumber' => $surahNumber,
                'ayahNumber' => $ayahNumber,
                'surahNameEnglish' => (string) ($surahMeta['english'] ?? "Surah {$surahNumber}"),
                'surahNameArabic' => (string) ($surahMeta['arabic'] ?? ''),
                'textEnglish' => $textEnglish,
                'textArabic' => $textArabic,
                'searchBlob' => $searchBlob,
            ];
        }

        return $verses;
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    protected function loadHadithNarrations(): array
    {
        $narrations = [];

        foreach (self::HADITH_TEXT_FILES as $collectionSlug => $meta) {
            $path = $this->dataPath() . DIRECTORY_SEPARATOR . $meta['file'];
            if (!is_file($path)) {
                continue;
            }

            $lines = @file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];
            foreach ($lines as $line) {
                $parts = explode('|', (string) $line, 3);
                if (count($parts) !== 3) {
                    continue;
                }

                $hadithNumber = ltrim(trim($parts[1]), '0');
                $english = trim($parts[2]);
                if ($hadithNumber === '' || $english === '') {
                    continue;
                }

                $reference = $meta['name'] . ' ' . $hadithNumber;
                $searchBlob = $this->normalizeSearchText(implode(' ', array_filter([
                    $meta['name'],
                    $reference,
                    $english,
                ])));

                $narrations[] = [
                    'collection' => $collectionSlug,
                    'collectionName' => $meta['name'],
                    'reference' => $reference,
                    'english' => $english,
                    'arabic' => '',
                    'grade' => $meta['grade'],
                    'narrator' => '',
                    'book' => '',
                    'chapter' => '',
                    'sourceUrl' => sprintf($meta['url_pattern'], $hadithNumber),
                    'searchBlob' => $searchBlob,
                ];
            }
        }

        return $narrations;
    }

    /**
     * @return array<string, array{surah:int, ayah:int, text:string}>
     */
    protected function parseDelimitedTextFile(string $path): array
    {
        if (!is_file($path)) {
            return [];
        }

        $lines = @file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];
        $rows = [];

        foreach ($lines as $line) {
            $line = preg_replace('/^\xEF\xBB\xBF/', '', (string) $line);
            $parts = explode('|', (string) $line, 3);
            if (count($parts) !== 3) {
                continue;
            }

            $surah = (int) ltrim(trim($parts[0]), '0');
            $ayah = (int) ltrim(trim($parts[1]), '0');
            if ($surah <= 0 || $ayah <= 0) {
                continue;
            }

            $rows[$this->verseKey($surah, $ayah)] = [
                'surah' => $surah,
                'ayah' => $ayah,
                'text' => trim($parts[2]),
            ];
        }

        return $rows;
    }

    /**
     * @return array<int, array{english:string, arabic:string}>
     */
    protected function surahNames(): array
    {
        static $cache = null;

        if (is_array($cache)) {
            return $cache;
        }

        $path = base_path('database/data/csv/surat.csv');
        if (!is_file($path)) {
            return [];
        }

        $rows = @file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];
        if (count($rows) < 2) {
            return [];
        }

        $cache = [];
        foreach (array_slice($rows, 1) as $row) {
            $columns = str_getcsv($row);
            $surahNumber = (int) ($columns[0] ?? 0);
            $english = trim((string) ($columns[1] ?? ''));
            $arabic = trim((string) ($columns[2] ?? ''));

            if ($surahNumber >= 1 && $surahNumber <= 114 && $english !== '') {
                $cache[$surahNumber] = [
                    'english' => $english,
                    'arabic' => $arabic,
                ];
            }
        }

        return $cache;
    }

    protected function verseKey(int $surahNumber, int $ayahNumber): string
    {
        return "{$surahNumber}:{$ayahNumber}";
    }

    /**
     * @return array{surah:int, ayah:int}|null
     */
    protected function extractVerseReference(string $query): ?array
    {
        if (preg_match('/\b(\d{1,3})\s*[:\/]\s*(\d{1,3})\b/', $query, $matches) === 1) {
            return [
                'surah' => (int) $matches[1],
                'ayah' => (int) $matches[2],
            ];
        }

        if (preg_match('/surah\s+(\d{1,3})\s+ayah\s+(\d{1,3})/i', $query, $matches) === 1) {
            return [
                'surah' => (int) $matches[1],
                'ayah' => (int) $matches[2],
            ];
        }

        return null;
    }

    /**
     * @return array<string, float>
     */
    protected function buildWeightedTerms(string $query): array
    {
        $normalized = $this->normalizeSearchText($query);
        $tokens = $this->queryTokens($normalized);
        $weights = [];

        foreach ($tokens as $token) {
            $weights[$token] = max($weights[$token] ?? 0.0, $this->tokenWeight($token));

            foreach ((array) (self::TOPIC_EXPANSIONS[$token] ?? []) as $index => $expanded) {
                $weights[$expanded] = max(
                    $weights[$expanded] ?? 0.0,
                    max(1.0, $this->tokenWeight($token) - 1.4 - ($index * 0.1))
                );
            }
        }

        if ($this->isAllahIdentityQuery($query)) {
            $weights['allah'] = max($weights['allah'] ?? 0.0, 5.0);
            $weights['one'] = max($weights['one'] ?? 0.0, 4.0);
            $weights['lord'] = max($weights['lord'] ?? 0.0, 4.0);
            $weights['deity'] = max($weights['deity'] ?? 0.0, 4.0);
            $weights['merciful'] = max($weights['merciful'] ?? 0.0, 3.0);
            $weights['creator'] = max($weights['creator'] ?? 0.0, 3.0);
        }

        return $weights;
    }

    /**
     * @return array<int, string>
     */
    protected function queryTokens(string $normalizedQuery): array
    {
        $tokens = preg_split('/\s+/', $normalizedQuery) ?: [];
        $filtered = [];

        foreach ($tokens as $token) {
            $token = trim($token);
            if ($token === '' || in_array($token, self::STOP_WORDS, true)) {
                continue;
            }
            if (strlen($token) <= 1 && !preg_match('/^\d+$/', $token)) {
                continue;
            }

            $filtered[] = $token;
        }

        return array_values(array_unique($filtered));
    }

    protected function tokenWeight(string $token): float
    {
        if (preg_match('/^\d+$/', $token) === 1) {
            return 1.0;
        }

        return match (true) {
            strlen($token) >= 8 => 3.5,
            strlen($token) >= 6 => 3.0,
            strlen($token) >= 4 => 2.4,
            default => 1.8,
        };
    }

    protected function normalizeSearchText(string $text): string
    {
        $normalized = Str::of($text)
            ->ascii()
            ->lower()
            ->replaceMatches('/[^a-z0-9:\s]+/', ' ')
            ->replaceMatches('/\s+/', ' ')
            ->trim();

        return (string) $normalized;
    }

    /**
     * @param array<string, mixed> $verse
     * @param array<string, float> $weights
     */
    protected function scoreQuranVerse(
        array $verse,
        string $query,
        array $weights,
        bool $identityQuery,
        bool $jesusQuery,
        bool $beliefQuery
    ): float
    {
        $blob = (string) ($verse['searchBlob'] ?? '');
        if ($blob === '') {
            return 0.0;
        }

        $score = $this->baseMatchScore($blob, $query, $weights);

        if ($identityQuery) {
            $score += $this->allahIdentityVerseBoost($verse, $blob);
        }
        if ($jesusQuery) {
            $score += $this->jesusVerseBoost($verse, $blob);
        }
        if ($beliefQuery) {
            $score += $this->islamBeliefVerseBoost($verse, $blob);
        }

        return $score;
    }

    /**
     * @param array<string, mixed> $hadith
     * @param array<string, float> $weights
     */
    protected function scoreHadith(
        array $hadith,
        string $query,
        array $weights,
        bool $identityQuery,
        bool $jesusQuery,
        bool $beliefQuery
    ): float
    {
        $blob = (string) ($hadith['searchBlob'] ?? '');
        if ($blob === '') {
            return 0.0;
        }

        $score = $this->baseMatchScore($blob, $query, $weights);
        $classification = $this->classifyHadithGrade((string) ($hadith['grade'] ?? ''));

        if ($classification === 'sahih') {
            $score += 5.0;
        } elseif ($classification === 'hasan') {
            $score += 2.5;
        }

        if ($identityQuery) {
            $book = $this->normalizeSearchText((string) ($hadith['book'] ?? ''));
            $english = $this->normalizeSearchText((string) ($hadith['english'] ?? ''));

            if (str_contains($book, 'oneness uniqueness of allah')) {
                $score += 20.0;
            }
            if (str_contains($english, 'none has the right to be worshipped except allah')) {
                $score += 24.0;
            }
            if (str_contains($english, 'belief in allah')) {
                $score += 12.0;
            }
            if (str_contains($english, 'who created the heaven')) {
                $score += 14.0;
            }
        }
        if ($jesusQuery) {
            $score += $this->jesusHadithBoost($hadith);
        }
        if ($beliefQuery) {
            $score += $this->islamBeliefHadithBoost($hadith);
        }

        return $score;
    }

    /**
     * @param array<string, float> $weights
     */
    protected function baseMatchScore(string $blob, string $query, array $weights): float
    {
        $normalizedQuery = $this->normalizeSearchText($query);
        $score = 0.0;

        if ($normalizedQuery !== '' && str_contains($blob, $normalizedQuery)) {
            $score += 10.0;
        }

        foreach ($weights as $term => $weight) {
            if ($this->containsTerm($blob, $term)) {
                $score += $weight;
            }
        }

        return $score;
    }

    protected function containsTerm(string $blob, string $term): bool
    {
        if ($term === '') {
            return false;
        }

        if (str_contains($term, ' ')) {
            return str_contains($blob, $term);
        }

        return preg_match('/(^|\s)' . preg_quote($term, '/') . '(\s|$)/', $blob) === 1;
    }

    /**
     * @param array<string, mixed> $verse
     */
    protected function allahIdentityVerseBoost(array $verse, string $blob): float
    {
        $score = 0.0;

        if (str_contains($blob, 'he is allah')) {
            $score += 45.0;
        }
        if (str_contains($blob, 'there is no deity except him')) {
            $score += 35.0;
        }
        if (str_contains($blob, 'lord of the worlds')) {
            $score += 15.0;
        }
        if (str_contains($blob, 'creator of the heavens and the earth') || str_contains($blob, 'is there any creator other than allah')) {
            $score += 20.0;
        }
        if (str_contains($blob, 'the entirely merciful') || str_contains($blob, 'the especially merciful') || str_contains($blob, 'the most merciful')) {
            $score += 12.0;
        }

        $surahNumber = (int) ($verse['surahNumber'] ?? 0);
        $ayahNumber = (int) ($verse['ayahNumber'] ?? 0);

        if ($surahNumber === 112) {
            $score += 80.0;
        }
        if ($surahNumber === 2 && $ayahNumber === 255) {
            $score += 55.0;
        }
        if ($surahNumber === 59 && $ayahNumber >= 22 && $ayahNumber <= 24) {
            $score += 50.0;
        }
        if ($surahNumber === 20 && $ayahNumber === 14) {
            $score += 26.0;
        }

        return $score;
    }

    protected function isAllahIdentityQuery(string $query): bool
    {
        $normalized = $this->normalizeSearchText($query);

        return (str_contains($normalized, 'who is allah') || str_contains($normalized, 'what is allah'))
            || ((str_contains($normalized, 'allah') || str_contains($normalized, 'god'))
                && (str_contains($normalized, 'who ') || str_contains($normalized, 'what ')));
    }

    protected function isJesusQuery(string $query): bool
    {
        $normalized = $this->normalizeSearchText($query);

        return str_contains($normalized, 'jesus')
            || str_contains($normalized, ' isa ')
            || str_contains($normalized, ' son of mary ')
            || str_contains($normalized, ' messiah ');
    }

    protected function isIslamBeliefQuery(string $query): bool
    {
        $normalized = $this->normalizeSearchText($query);

        return str_contains($normalized, 'what is islam')
            || str_contains($normalized, 'what do muslims believe')
            || str_contains($normalized, 'what do muslim believe')
            || str_contains($normalized, 'what do muslims believe')
            || str_contains($normalized, 'what do muslims')
            || str_contains($normalized, 'muslims believe')
            || str_contains($normalized, 'muslims believe')
            || (str_contains($normalized, 'islam') && (str_contains($normalized, 'believe') || str_contains($normalized, 'belief') || str_contains($normalized, 'faith')));
    }

    /**
     * @param array<string, mixed> $verse
     */
    protected function jesusVerseBoost(array $verse, string $blob): float
    {
        $score = 0.0;
        $surahNumber = (int) ($verse['surahNumber'] ?? 0);
        $ayahNumber = (int) ($verse['ayahNumber'] ?? 0);

        if (str_contains($blob, 'jesus') || str_contains($blob, 'son of mary') || str_contains($blob, 'messiah')) {
            $score += 18.0;
        }
        if (str_contains($blob, 'messenger of allah')) {
            $score += 12.0;
        }
        if (str_contains($blob, 'we gave jesus') || str_contains($blob, 'o jesus son of mary')) {
            $score += 18.0;
        }
        if (str_contains($blob, 'do not say three') || str_contains($blob, 'the messiah jesus son of mary was but a messenger')) {
            $score += 30.0;
        }

        if (($surahNumber === 4 && $ayahNumber === 171) || ($surahNumber === 5 && $ayahNumber === 75) || ($surahNumber === 3 && $ayahNumber === 45)) {
            $score += 55.0;
        }
        if (($surahNumber === 2 && in_array($ayahNumber, [87, 136, 253], true)) || ($surahNumber === 5 && in_array($ayahNumber, [110, 111], true)) || ($surahNumber === 19 && $ayahNumber >= 30 && $ayahNumber <= 36)) {
            $score += 25.0;
        }

        return $score;
    }

    /**
     * @param array<string, mixed> $verse
     */
    protected function islamBeliefVerseBoost(array $verse, string $blob): float
    {
        $score = 0.0;
        $surahNumber = (int) ($verse['surahNumber'] ?? 0);
        $ayahNumber = (int) ($verse['ayahNumber'] ?? 0);

        if (str_contains($blob, 'believed in allah') || str_contains($blob, 'we have believed in allah')) {
            $score += 15.0;
        }
        if (str_contains($blob, 'angels') || str_contains($blob, 'books') || str_contains($blob, 'messengers') || str_contains($blob, 'last day') || str_contains($blob, 'hereafter')) {
            $score += 12.0;
        }
        if (str_contains($blob, 'muslims in submission') || str_contains($blob, 'submits his face in islam')) {
            $score += 12.0;
        }

        if (($surahNumber === 2 && in_array($ayahNumber, [136, 177, 285], true)) || ($surahNumber === 4 && $ayahNumber === 136) || ($surahNumber === 49 && $ayahNumber === 15)) {
            $score += 55.0;
        }
        if ($surahNumber === 2 && in_array($ayahNumber, [2, 3, 4, 5], true)) {
            $score += 28.0;
        }

        return $score;
    }

    /**
     * @param array<string, mixed> $hadith
     */
    protected function jesusHadithBoost(array $hadith): float
    {
        $english = $this->normalizeSearchText((string) ($hadith['english'] ?? ''));
        $score = 0.0;

        if (str_contains($english, 'jesus')) {
            $score += 12.0;
        }
        if (str_contains($english, 'son of mary')) {
            $score += 15.0;
        }
        if (str_contains($english, 'i met jesus')) {
            $score += 18.0;
        }

        return $score;
    }

    /**
     * @param array<string, mixed> $hadith
     */
    protected function islamBeliefHadithBoost(array $hadith): float
    {
        $english = $this->normalizeSearchText((string) ($hadith['english'] ?? ''));
        $score = 0.0;

        if (str_contains($english, 'islam is based on five') || str_contains($english, 'islam is founded on five')) {
            $score += 70.0;
        }
        if (str_contains($english, 'inform me about al islam') || str_contains($english, 'inform me about islam')) {
            $score += 60.0;
        }
        if (str_contains($english, 'inform me about iman') || str_contains($english, 'faith in allah in his angels in his books')) {
            $score += 60.0;
        }
        if (str_contains($english, 'testify that there is no god but allah') || str_contains($english, 'none has the right to be worshipped but allah')) {
            $score += 18.0;
        }

        return $score;
    }

    protected function matchesGradePreference(string $grade, string $preference): bool
    {
        return match ($preference) {
            'sahih-only' => $this->classifyHadithGrade($grade) === 'sahih',
            'sahih-and-hasan' => in_array($this->classifyHadithGrade($grade), ['sahih', 'hasan'], true),
            default => true,
        };
    }

    protected function classifyHadithGrade(string $grade): string
    {
        $normalized = $this->normalizeSearchText($grade);

        if ($normalized === '') {
            return 'unverified';
        }
        if (str_contains($normalized, 'daif') || str_contains($normalized, 'weak') || str_contains($normalized, 'fabricated') || str_contains($normalized, 'mawdu')) {
            return 'weak';
        }
        if (str_contains($normalized, 'hasan')) {
            return 'hasan';
        }
        if (str_contains($normalized, 'sahih') || str_contains($normalized, 'authentic')) {
            return 'sahih';
        }

        return 'unverified';
    }

    /**
     * @param array<string, mixed> $verse
     * @return array<string, mixed>
     */
    protected function formatQuranResult(array $verse, float $similarity, bool $withContext): array
    {
        return [
            'verseId' => (string) ($verse['verseId'] ?? ''),
            'surahNumber' => (int) ($verse['surahNumber'] ?? 0),
            'ayahNumber' => (int) ($verse['ayahNumber'] ?? 0),
            'textEnglish' => (string) ($verse['textEnglish'] ?? ''),
            'textArabic' => (string) ($verse['textArabic'] ?? ''),
            'translation' => (string) ($verse['textEnglish'] ?? ''),
            'text' => (string) ($verse['textEnglish'] ?? ''),
            'surahNameEnglish' => (string) ($verse['surahNameEnglish'] ?? 'Quran'),
            'surahNameArabic' => (string) ($verse['surahNameArabic'] ?? ''),
            'similarity' => round($similarity, 4),
            'contextBefore' => $withContext ? $this->quranContext($verse, -1) : [],
            'contextAfter' => $withContext ? $this->quranContext($verse, 1) : [],
        ];
    }

    /**
     * @param array<string, mixed> $verse
     * @return array<int, array<string, mixed>>
     */
    protected function quranContext(array $verse, int $direction): array
    {
        $items = [];
        $surahNumber = (int) ($verse['surahNumber'] ?? 0);
        $ayahNumber = (int) ($verse['ayahNumber'] ?? 0);
        $allVerses = $this->quranVerses();

        for ($step = 1; $step <= self::QURAN_CONTEXT_RADIUS; $step++) {
            $targetAyah = $ayahNumber + ($step * $direction);
            if ($targetAyah <= 0) {
                continue;
            }

            $key = $this->verseKey($surahNumber, $targetAyah);
            if (!isset($allVerses[$key])) {
                continue;
            }

            $neighbor = $allVerses[$key];
            $items[] = [
                'surahNumber' => (int) ($neighbor['surahNumber'] ?? 0),
                'ayahNumber' => (int) ($neighbor['ayahNumber'] ?? 0),
                'textEnglish' => (string) ($neighbor['textEnglish'] ?? ''),
            ];
        }

        if ($direction < 0) {
            $items = array_reverse($items);
        }

        return $items;
    }
}
