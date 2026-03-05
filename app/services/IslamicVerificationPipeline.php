<?php

namespace App\Services;

use App\Models\Ahadith;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class IslamicVerificationPipeline
{
    private const CACHE_TTL_MINUTES = 20;

    /**
     * @param array<int,array{label:string,url?:string|null}> $existingReferences
     */
    public function verifyResponse(string $question, ?string $proposedAnswer = null, array $existingReferences = []): array
    {
        $question = trim($question);
        if ($question === '') {
            return $this->emptyVerification('Question is empty.');
        }

        $cacheKey = 'ai-verification:' . md5($this->generateCacheKey($question));
        $baseResult = Cache::remember(
            $cacheKey,
            now()->addMinutes(self::CACHE_TTL_MINUTES),
            fn () => $this->runExternalVerification($question),
        );

        return $this->mergeExistingReferences($baseResult, $existingReferences);
    }

    private function runExternalVerification(string $question): array
    {
        $categories = $this->categorizeQuestion($question);
        $results = [];

        if ($this->requiresQuranVerification($categories)) {
            $results[] = $this->verifyWithQuranApi($question);
        }

        if ($this->requiresHadithVerification($categories)) {
            $results[] = $this->verifyWithHadithSources($question);
        }

        if (in_array('fiqh', $categories, true)) {
            $results[] = $this->verifyWithFiqhSources($question);
        }

        return $this->processVerificationResults($results, $categories);
    }

    private function requiresQuranVerification(array $categories): bool
    {
        return (bool) array_intersect($categories, ['quran', 'aqidah', 'fiqh', 'seerah', 'history', 'general']);
    }

    private function requiresHadithVerification(array $categories): bool
    {
        return (bool) array_intersect($categories, ['hadith', 'aqidah', 'fiqh', 'seerah', 'history', 'general']);
    }

    private function verifyWithQuranApi(string $question): array
    {
        $searchQuery = $this->buildQuranQuery($question);
        $query = rawurlencode($searchQuery);
        $quranComUrl = "https://api.quran.com/api/v4/search/{$query}?size=5&page=1&language=en";

        try {
            $response = Http::acceptJson()->timeout(8)->retry(1, 500)->get($quranComUrl);
            if ($response->successful()) {
                $results = Arr::get($response->json(), 'search.results', []);
                if (is_array($results) && !empty($results)) {
                    $normalized = array_values(array_filter(array_map(function ($item) {
                        $verseKey = trim((string) Arr::get($item, 'verse_key', ''));
                        $text = trim((string) Arr::get($item, 'text', ''));
                        if ($verseKey === '' || $text === '') {
                            return null;
                        }
                        return [
                            'verse_key' => $verseKey,
                            'text' => $text,
                            'reference' => "Quran {$verseKey}",
                        ];
                    }, array_slice($results, 0, 5))));

                    if (!empty($normalized)) {
                        return [
                            'source' => 'quran',
                            'data' => $normalized,
                            'confidence' => 'high',
                            'metadata' => [
                                'api' => 'quran.com',
                                'total_results' => (int) Arr::get($response->json(), 'search.total_results', count($normalized)),
                            ],
                            'references' => array_map(
                                fn ($entry) => [
                                    'label' => $entry['reference'],
                                    'url' => "https://quran.com/{$entry['verse_key']}",
                                ],
                                $normalized,
                            ),
                        ];
                    }
                }
            }
        } catch (\Throwable $exception) {
            Log::warning('Quran.com verification failed', ['error' => $exception->getMessage()]);
        }

        return $this->verifyWithQuranBackup($question);
    }

    private function verifyWithQuranBackup(string $question): array
    {
        $searchQuery = $this->buildQuranQuery($question);
        $query = rawurlencode($searchQuery);
        $url = "https://api.alquran.cloud/v1/search/{$query}/en.asad";

        try {
            $response = Http::acceptJson()->timeout(8)->retry(1, 500)->get($url);
            if (!$response->successful()) {
                return $this->verifyWithQuranGadingApi($question);
            }

            $matches = Arr::get($response->json(), 'data.matches', []);
            if (!is_array($matches) || empty($matches)) {
                return $this->verifyWithQuranGadingApi($question);
            }

            $normalized = array_values(array_filter(array_map(function ($match) {
                $surahNumber = (int) Arr::get($match, 'surah.number', 0);
                $ayahNumber = (int) Arr::get($match, 'numberInSurah', 0);
                $text = trim((string) Arr::get($match, 'text', ''));
                if ($surahNumber <= 0 || $ayahNumber <= 0 || $text === '') {
                    return null;
                }

                $verseKey = "{$surahNumber}:{$ayahNumber}";
                return [
                    'verse_key' => $verseKey,
                    'text' => $text,
                    'reference' => "Quran {$verseKey}",
                ];
            }, array_slice($matches, 0, 5))));

            return [
                'source' => 'quran_backup',
                'data' => $normalized,
                'confidence' => !empty($normalized) ? 'medium' : 'low',
                'metadata' => ['api' => 'alquran.cloud'],
                'references' => array_map(
                    fn ($entry) => [
                        'label' => $entry['reference'],
                        'url' => "https://alquran.cloud/ayah/{$entry['verse_key']}",
                    ],
                    $normalized,
                ),
            ];
        } catch (\Throwable $exception) {
            Log::warning('Quran backup verification failed', ['error' => $exception->getMessage()]);
            return $this->verifyWithQuranGadingApi($question);
        }
    }

    private function verifyWithQuranGadingApi(string $question): array
    {
        $searchQuery = $this->buildQuranQuery($question);
        if ($searchQuery === '') {
            return [
                'source' => 'quran_gading',
                'data' => [],
                'confidence' => 'low',
                'metadata' => ['api' => 'quran.gading.dev'],
                'references' => [],
            ];
        }

        $baseUrl = rtrim((string) config('services.quran_gading.base', 'https://api.quran.gading.dev'), '/');
        $url = "{$baseUrl}/search?q=" . rawurlencode($searchQuery);

        try {
            $response = Http::acceptJson()->timeout(8)->retry(1, 500)->get($url);
            if (!$response->successful()) {
                return [
                    'source' => 'quran_gading',
                    'data' => [],
                    'confidence' => 'low',
                    'metadata' => ['api' => 'quran.gading.dev'],
                    'references' => [],
                ];
            }

            $items = Arr::get($response->json(), 'data', []);
            if (!is_array($items) || empty($items)) {
                return [
                    'source' => 'quran_gading',
                    'data' => [],
                    'confidence' => 'low',
                    'metadata' => ['api' => 'quran.gading.dev'],
                    'references' => [],
                ];
            }

            $normalized = [];
            foreach (array_slice($items, 0, 5) as $item) {
                if (!is_array($item)) {
                    continue;
                }
                $surahNumber = (int) (Arr::get($item, 'surah.number') ?? Arr::get($item, 'surah.number.id') ?? 0);
                $ayahNumber = (int) (Arr::get($item, 'number.inSurah') ?? Arr::get($item, 'number') ?? 0);
                $text = trim((string) (
                    Arr::get($item, 'translation.en')
                    ?? Arr::get($item, 'translation.id')
                    ?? Arr::get($item, 'text.transliteration.en')
                    ?? Arr::get($item, 'text.arab')
                    ?? ''
                ));
                if ($surahNumber <= 0 || $ayahNumber <= 0 || $text === '') {
                    continue;
                }
                $verseKey = "{$surahNumber}:{$ayahNumber}";
                $normalized[] = [
                    'verse_key' => $verseKey,
                    'text' => $text,
                    'reference' => "Quran {$verseKey}",
                ];
            }

            return [
                'source' => 'quran_gading',
                'data' => $normalized,
                'confidence' => !empty($normalized) ? 'medium' : 'low',
                'metadata' => ['api' => 'quran.gading.dev'],
                'references' => array_map(
                    fn ($entry) => [
                        'label' => $entry['reference'],
                        'url' => "https://quran.com/{$entry['verse_key']}",
                    ],
                    $normalized,
                ),
            ];
        } catch (\Throwable $exception) {
            Log::warning('Quran Gading verification failed', ['error' => $exception->getMessage()]);
            return [
                'source' => 'quran_gading',
                'data' => [],
                'confidence' => 'low',
                'metadata' => ['api' => 'quran.gading.dev'],
                'references' => [],
            ];
        }
    }

    private function verifyWithHadithSources(string $question): array
    {
        $keywords = $this->extractKeywords($question);
        if (empty($keywords)) {
            return $this->verifyWithSunnahApi($question, $keywords);
        }
        $matches = [];

        try {
            $query = Ahadith::query()->with(['chapter.imam']);
            $query->where(function ($builder) use ($keywords) {
                foreach ($keywords as $keyword) {
                    $builder->orWhere('hadith_en', 'like', "%{$keyword}%")
                        ->orWhere('hadith_ar', 'like', "%{$keyword}%");
                }
            });

            $records = $query->limit(5)->get();
            foreach ($records as $record) {
                $text = trim((string) ($record->hadith_en ?: $record->hadith_ar));
                if ($text === '') {
                    continue;
                }

                $imam = trim((string) ($record->chapter?->imam?->imam_name ?: 'Hadith'));
                $chapter = trim((string) ($record->chapter?->chapter_text ?: ''));
                $label = $chapter !== '' ? "{$imam} - {$chapter}" : $imam;

                $matches[] = [
                    'reference' => $label,
                    'text' => $text,
                    'collection' => strtolower((string) $imam),
                ];
            }
        } catch (\Throwable $exception) {
            Log::warning('Hadith DB verification failed', ['error' => $exception->getMessage()]);
        }

        if (!empty($matches)) {
            return [
                'source' => 'hadith_db',
                'data' => $matches,
                'confidence' => count($matches) >= 2 ? 'high' : 'medium',
                'metadata' => [
                    'source' => 'local_database',
                    'keywords' => $keywords,
                ],
                'references' => array_map(function ($entry) {
                    return [
                        'label' => $entry['reference'],
                        'url' => null,
                    ];
                }, $matches),
            ];
        }

        $jsonFallback = $this->verifyWithHadithJsonApis($keywords);
        if (!empty($jsonFallback['data'])) {
            return $jsonFallback;
        }

        return $this->verifyWithSunnahApi($question, $keywords);
    }

    private function verifyWithHadithJsonApis(array $keywords): array
    {
        if (empty($keywords)) {
            return [
                'source' => 'hadith_json',
                'data' => [],
                'confidence' => 'low',
                'metadata' => ['note' => 'No keywords available for hadith JSON lookup'],
                'references' => [],
            ];
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
            if (!empty($result['data'])) {
                return $result;
            }
        }

        foreach (['bukhari', 'muslim'] as $collection) {
            $result = $this->searchHadithJsonCollection(
                "{$legacyBase}/{$collection}.json",
                $collection,
                $keywords,
                true,
            );
            if (!empty($result['data'])) {
                return $result;
            }
        }

        return [
            'source' => 'hadith_json',
            'data' => [],
            'confidence' => 'low',
            'metadata' => ['note' => 'No hadith JSON matches found'],
            'references' => [],
        ];
    }

    private function searchHadithJsonCollection(
        string $url,
        string $collection,
        array $keywords,
        bool $legacyFormat = false
    ): array {
        try {
            $response = Http::acceptJson()->timeout(8)->retry(1, 500)->get($url);
            if (!$response->successful()) {
                return [
                    'source' => 'hadith_json',
                    'data' => [],
                    'confidence' => 'low',
                    'metadata' => ['collection' => $collection, 'note' => 'Collection fetch failed'],
                    'references' => [],
                ];
            }

            $payload = $response->json();
            $rows = $legacyFormat
                ? (is_array($payload) ? $payload : [])
                : Arr::get($payload, 'hadiths', []);
            if (!is_array($rows) || empty($rows)) {
                return [
                    'source' => 'hadith_json',
                    'data' => [],
                    'confidence' => 'low',
                    'metadata' => ['collection' => $collection, 'note' => 'Collection is empty'],
                    'references' => [],
                ];
            }

            $matches = [];
            foreach (array_slice($rows, 0, 3000) as $row) {
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

                $score = 0;
                $haystack = strtolower($english !== '' ? $english : $text);
                foreach ($keywords as $keyword) {
                    if ($keyword !== '' && str_contains($haystack, strtolower($keyword))) {
                        $score += 1;
                    }
                }
                if ($score <= 0) {
                    continue;
                }

                $number = $this->normalizeExternalTextValue(
                    Arr::get($row, 'hadith_number')
                    ?? Arr::get($row, 'hadithnumber')
                    ?? Arr::get($row, 'number')
                    ?? Arr::get($row, 'id')
                    ?? ''
                );
                $label = ucfirst($collection) . ($number !== '' ? " Hadith {$number}" : ' Hadith');
                $urlRef = $number !== '' ? "https://sunnah.com/{$collection}:{$number}" : null;

                $matches[] = [
                    'reference' => $label,
                    'text' => $text,
                    'url' => $urlRef,
                    'score' => $score,
                ];
            }

            if (empty($matches)) {
                return [
                    'source' => 'hadith_json',
                    'data' => [],
                    'confidence' => 'low',
                    'metadata' => ['collection' => $collection, 'note' => 'No keyword matches found'],
                    'references' => [],
                ];
            }

            usort($matches, fn ($a, $b) => $b['score'] <=> $a['score']);
            $topMatches = array_map(
                fn ($entry) => Arr::only($entry, ['reference', 'text', 'url']),
                array_slice($matches, 0, 5),
            );

            return [
                'source' => 'hadith_json',
                'data' => $topMatches,
                'confidence' => count($topMatches) >= 2 ? 'medium' : 'low',
                'metadata' => ['collection' => $collection, 'source' => 'github_hadith_json'],
                'references' => array_values(array_filter(array_map(
                    fn ($entry) => $entry['reference'] ? ['label' => $entry['reference'], 'url' => $entry['url']] : null,
                    $topMatches,
                ))),
            ];
        } catch (\Throwable $exception) {
            Log::warning('Hadith JSON verification failed', [
                'collection' => $collection,
                'url' => $url,
                'error' => $exception->getMessage(),
            ]);
            return [
                'source' => 'hadith_json',
                'data' => [],
                'confidence' => 'low',
                'metadata' => ['collection' => $collection, 'note' => 'Lookup error'],
                'references' => [],
            ];
        }
    }

    private function verifyWithSunnahApi(string $question, array $keywords): array
    {
        $apiKey = trim((string) config('services.sunnah.key', ''));
        $baseUrl = rtrim((string) config('services.sunnah.base', 'https://api.sunnah.com/v1'), '/');
        if ($apiKey === '') {
            return [
                'source' => 'hadith',
                'data' => [],
                'confidence' => 'low',
                'metadata' => ['note' => 'Sunnah API key not configured'],
                'references' => [],
            ];
        }

        try {
            $query = implode(' ', $keywords ?: $this->extractKeywords($question, 3));
            if ($query === '') {
                $query = $question;
            }
            $response = Http::acceptJson()
                ->withHeaders(['X-API-Key' => $apiKey])
                ->timeout(8)
                ->retry(1, 500)
                ->get("{$baseUrl}/search", [
                    'query' => $query,
                    'collection' => 'bukhari',
                ]);

            if (!$response->successful()) {
                return [
                    'source' => 'hadith',
                    'data' => [],
                    'confidence' => 'low',
                    'metadata' => ['note' => 'Sunnah API did not return results'],
                    'references' => [],
                ];
            }

            $payload = $response->json();
            $candidates = Arr::get($payload, 'data.hadiths', Arr::get($payload, 'data', []));
            if (!is_array($candidates)) {
                return [
                    'source' => 'hadith',
                    'data' => [],
                    'confidence' => 'low',
                    'metadata' => ['note' => 'No hadith matches found'],
                    'references' => [],
                ];
            }

            $normalized = [];
            foreach (array_slice($candidates, 0, 5) as $entry) {
                $text = $this->normalizeExternalTextValue(
                    Arr::get($entry, 'text')
                    ?? Arr::get($entry, 'body')
                    ?? Arr::get($entry, 'hadith.0.body')
                    ?? Arr::get($entry, 'hadith.0.text')
                );
                if ($text === '') {
                    continue;
                }

                $collection = strtolower($this->normalizeExternalTextValue(
                    Arr::get($entry, 'collection')
                    ?? Arr::get($entry, 'bookSlug')
                    ?? 'bukhari'
                ));
                $number = $this->normalizeExternalTextValue(
                    Arr::get($entry, 'hadithNumber')
                    ?? Arr::get($entry, 'number')
                    ?? Arr::get($entry, 'id')
                );

                $referenceLabel = $number !== ''
                    ? ucfirst($collection) . " Hadith {$number}"
                    : ucfirst($collection) . ' Hadith';
                $url = $number !== '' ? "https://sunnah.com/{$collection}:{$number}" : null;

                $normalized[] = [
                    'reference' => $referenceLabel,
                    'text' => $text,
                    'collection' => $collection,
                    'url' => $url,
                ];
            }

            return [
                'source' => 'hadith',
                'data' => $normalized,
                'confidence' => !empty($normalized) ? 'medium' : 'low',
                'metadata' => ['api' => 'sunnah.com'],
                'references' => array_values(array_filter(array_map(
                    fn ($entry) => $entry['reference'] ? ['label' => $entry['reference'], 'url' => $entry['url']] : null,
                    $normalized,
                ))),
            ];
        } catch (\Throwable $exception) {
            Log::warning('Sunnah API verification failed', ['error' => $exception->getMessage()]);
            return [
                'source' => 'hadith',
                'data' => [],
                'confidence' => 'low',
                'metadata' => ['note' => 'Sunnah verification failed'],
                'references' => [],
            ];
        }
    }

    private function verifyWithFiqhSources(string $question): array
    {
        return [
            'source' => 'fiqh',
            'data' => [],
            'confidence' => 'low',
            'metadata' => [
                'note' => 'Fiqh answers require qualified scholarly review in addition to source citations.',
            ],
            'references' => [],
        ];
    }

    private function processVerificationResults(array $results, array $category): array
    {
        $successful = array_values(array_filter($results, function ($result) {
            return is_array($result) && isset($result['data']) && is_array($result['data']) && count($result['data']) > 0;
        }));

        if (empty($successful)) {
            return [
                'verified' => false,
                'confidence' => 'low',
                'sources' => [],
                'references' => [],
                'totalSources' => 0,
                'category' => $category,
                'message' => 'No verified external sources found for this query.',
                'timestamp' => now()->toIso8601String(),
            ];
        }

        $sourceSummaries = [];
        $references = [];
        $overallConfidence = 'low';
        $totalSources = 0;

        foreach ($successful as $result) {
            $count = count($result['data']);
            $totalSources += $count;

            $confidence = (string) ($result['confidence'] ?? 'low');
            if ($confidence === 'high') {
                $overallConfidence = 'high';
            } elseif ($overallConfidence !== 'high' && $confidence === 'medium') {
                $overallConfidence = 'medium';
            }

            $sourceSummaries[] = [
                'type' => (string) ($result['source'] ?? 'unknown'),
                'count' => $count,
                'confidence' => $confidence,
                'sample' => $this->buildSample($result['data']),
                'metadata' => $result['metadata'] ?? [],
            ];

            $references = $this->mergeReferenceLists($references, $result['references'] ?? []);
        }

        return [
            'verified' => true,
            'confidence' => $overallConfidence,
            'sources' => $sourceSummaries,
            'references' => $references,
            'totalSources' => $totalSources,
            'category' => $category,
            'message' => 'Verified with trusted sources.',
            'timestamp' => now()->toIso8601String(),
        ];
    }

    private function buildSample(array $data): array
    {
        $subset = array_slice($data, 0, 2);
        return array_map(function ($item) {
            $reference = trim((string) Arr::get($item, 'reference', Arr::get($item, 'verse_key', '')));
            $text = trim((string) Arr::get($item, 'text', ''));
            return [
                'reference' => $reference,
                'text' => mb_substr($text, 0, 200),
            ];
        }, $subset);
    }

    private function mergeExistingReferences(array $verificationResult, array $existingReferences): array
    {
        $normalized = $this->normalizeReferenceList($existingReferences);
        if (empty($normalized)) {
            return $verificationResult;
        }

        $verificationResult['references'] = $this->mergeReferenceLists(
            $verificationResult['references'] ?? [],
            $normalized,
        );

        $alreadyIncluded = false;
        foreach ($verificationResult['sources'] ?? [] as $source) {
            if (($source['type'] ?? '') === 'internal_curated') {
                $alreadyIncluded = true;
                break;
            }
        }

        if (!$alreadyIncluded) {
            $verificationResult['sources'][] = [
                'type' => 'internal_curated',
                'count' => count($normalized),
                'confidence' => 'medium',
                'sample' => array_map(
                    fn ($reference) => ['reference' => $reference['label'], 'text' => 'Internal curated source'],
                    array_slice($normalized, 0, 2),
                ),
                'metadata' => ['origin' => 'formatted_response'],
            ];
            $verificationResult['totalSources'] = (int) ($verificationResult['totalSources'] ?? 0) + count($normalized);
        }

        if (!($verificationResult['verified'] ?? false)) {
            $verificationResult['verified'] = true;
            $verificationResult['confidence'] = 'medium';
            $verificationResult['message'] = 'Verified using curated internal references.';
        }

        return $verificationResult;
    }

    private function normalizeReferenceList(array $references): array
    {
        $normalized = [];
        foreach ($references as $reference) {
            if (!is_array($reference)) {
                continue;
            }
            $label = trim((string) ($reference['label'] ?? ''));
            if ($label === '') {
                continue;
            }
            $url = $this->normalizeUrl($reference['url'] ?? null);
            $normalized[] = ['label' => $label, 'url' => $url];
        }
        return $this->mergeReferenceLists([], $normalized);
    }

    private function mergeReferenceLists(array $left, array $right): array
    {
        $merged = [];
        $seen = [];
        foreach (array_merge($left, $right) as $reference) {
            if (!is_array($reference)) {
                continue;
            }
            $label = trim((string) ($reference['label'] ?? ''));
            if ($label === '') {
                continue;
            }
            $url = $this->normalizeUrl($reference['url'] ?? null);
            $key = strtolower($label . '|' . ($url ?? ''));
            if (isset($seen[$key])) {
                continue;
            }
            $seen[$key] = true;
            $merged[] = ['label' => $label, 'url' => $url];
        }
        return $merged;
    }

    private function normalizeUrl(?string $url): ?string
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

    private function categorizeQuestion(string $question): array
    {
        $normalized = strtolower($question);
        $categories = [];

        if ($this->containsAny($normalized, ['quran', 'surah', 'ayah', 'ayat', 'verse', 'tafsir', 'tafseer'])) {
            $categories[] = 'quran';
        }
        if ($this->containsAny($normalized, ['hadith', 'sunnah', 'prophet', 'narration', 'bukhari', 'muslim'])) {
            $categories[] = 'hadith';
        }
        if ($this->containsAny($normalized, ['fiqh', 'halal', 'haram', 'wudu', 'salah', 'prayer', 'zakat', 'hajj', 'umrah'])) {
            $categories[] = 'fiqh';
        }
        if ($this->containsAny($normalized, ['aqidah', 'aqeedah', 'tawheed', 'iman', 'qadar', 'creed'])) {
            $categories[] = 'aqidah';
        }
        if ($this->containsAny($normalized, ['seerah', 'medina', 'makkah', 'mecca', 'hijrah', 'badr', 'uhud'])) {
            $categories[] = 'seerah';
        }
        if ($this->containsAny($normalized, ['caliph', 'khilafah', 'abbasid', 'umayyad', 'ottoman', 'history'])) {
            $categories[] = 'history';
        }

        return empty($categories) ? ['general'] : array_values(array_unique($categories));
    }

    private function containsAny(string $haystack, array $needles): bool
    {
        foreach ($needles as $needle) {
            if ($needle !== '' && str_contains($haystack, $needle)) {
                return true;
            }
        }
        return false;
    }

    private function extractKeywords(string $question, int $limit = 5): array
    {
        $cleaned = strtolower(trim(preg_replace('/[^a-z0-9\s]/i', ' ', $question)));
        if ($cleaned === '') {
            return [];
        }

        $stopWords = [
            'what', 'which', 'when', 'where', 'who', 'why', 'how', 'can', 'could', 'would',
            'should', 'does', 'did', 'tell', 'show', 'find', 'about', 'from', 'into', 'with',
            'that', 'this', 'these', 'those', 'there', 'their', 'your', 'please', 'explain',
            'give', 'make', 'just', 'then', 'than', 'also', 'have', 'has', 'had', 'will',
            'shall', 'for', 'the', 'and', 'are', 'was', 'were',
        ];

        $tokens = array_filter(
            array_map('trim', preg_split('/\s+/', $cleaned)),
            fn ($token) => strlen($token) > 2 && !in_array($token, $stopWords, true),
        );

        return array_slice(array_values(array_unique($tokens)), 0, $limit);
    }

    private function buildQuranQuery(string $question): string
    {
        $keywords = $this->extractKeywords($question, 4);
        if (!empty($keywords)) {
            return implode(' ', $keywords);
        }

        return trim($question);
    }

    private function generateCacheKey(string $question): string
    {
        return trim(preg_replace('/\s+/', '_', strtolower(preg_replace('/[^a-z0-9\s]/i', '', $question))));
    }

    /**
     * Safely normalizes mixed API payload values into plain text.
     *
     * @param mixed $value
     */
    private function normalizeExternalTextValue($value): string
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
            'body', 'value', 'content',
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

    private function emptyVerification(string $message): array
    {
        return [
            'verified' => false,
            'confidence' => 'low',
            'sources' => [],
            'references' => [],
            'totalSources' => 0,
            'category' => ['general'],
            'message' => $message,
            'timestamp' => now()->toIso8601String(),
        ];
    }
}
