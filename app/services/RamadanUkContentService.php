<?php

namespace App\Services;

use App\Models\Ahadith;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RamadanUkContentService
{
    private const DEFAULT_TIMEZONE = 'Europe/London';
    private const DEFAULT_EDITION = 'en.asad';
    private const DEFAULT_COUNTRY = 'United Kingdom';

    public function build(Request $request): array
    {
        $date = $this->resolveDate($request->input('date'));
        $city = $this->normalizeCity($request->input('city'));
        $includePrayerTimes = $city !== null || $request->boolean('include_prayer_times');
        $includeAllCities = $request->boolean('all_cities');

        $citiesPayload = $this->loadJsonFile(base_path('resources/data/uk_cities.json'));
        $contentPayload = $this->loadJsonFile(base_path('resources/data/ramadan_uk_content.json'));

        $options = [
            'calculation_methods' => $this->getCalculationMethods(),
            'juristic_schools' => [
                ['id' => 0, 'name' => 'Shafi (Maliki, Hanbali)'],
                ['id' => 1, 'name' => 'Hanafi'],
            ],
            'latitude_adjustment_methods' => [
                ['id' => 1, 'name' => 'Middle of the Night'],
                ['id' => 2, 'name' => 'One Seventh'],
                ['id' => 3, 'name' => 'Angle Based'],
            ],
            'midnight_modes' => [
                ['id' => 0, 'name' => 'Standard'],
                ['id' => 1, 'name' => 'Jafari'],
            ],
        ];

        $quranReferences = $this->fetchQuranReferences(
            $request->input('edition', self::DEFAULT_EDITION)
        );

        $hadithReferences = $this->fetchHadithReferences(
            ['ramadan', 'fasting', 'sawm', 'laylat'],
            3
        );

        $prayerTimes = null;
        if ($includePrayerTimes) {
            $prayerTimes = $this->fetchPrayerTimes(
                $date,
                $city,
                $includeAllCities,
                $citiesPayload
            );
        }

        return [
            'meta' => [
                'region' => 'UK',
                'timezone' => self::DEFAULT_TIMEZONE,
                'date' => $date->toDateString(),
                'generated_at' => now()->toIso8601String(),
            ],
            'cities' => $citiesPayload,
            'options' => $options,
            'content' => $contentPayload,
            'quran' => $quranReferences,
            'hadith' => $hadithReferences,
            'prayer_times' => $prayerTimes,
            'sources' => [
                ['name' => 'UK Cities List', 'source' => Arr::get($citiesPayload, 'source')],
                ['name' => 'AlAdhan Prayer Times', 'source' => $this->aladhanBaseUrl()],
                ['name' => 'Quran API', 'source' => 'https://api.alquran.cloud'],
                ['name' => 'Hadith API', 'source' => 'https://sunnah.com/developers'],
            ],
        ];
    }

    public function prayerTimes(Request $request): array
    {
        $date = $this->resolveDate($request->input('date'));
        $city = $this->normalizeCity($request->input('city'));
        $includeAllCities = $request->boolean('all_cities');
        $citiesPayload = $this->loadJsonFile(base_path('resources/data/uk_cities.json'));

        return [
            'meta' => [
                'region' => 'UK',
                'timezone' => self::DEFAULT_TIMEZONE,
                'date' => $date->toDateString(),
                'generated_at' => now()->toIso8601String(),
            ],
            'prayer_times' => $this->fetchPrayerTimes(
                $date,
                $city,
                $includeAllCities,
                $citiesPayload
            ),
        ];
    }

    private function resolveDate(?string $date): Carbon
    {
        if (!$date) {
            return now(self::DEFAULT_TIMEZONE);
        }

        try {
            return Carbon::parse($date, self::DEFAULT_TIMEZONE);
        } catch (\Throwable $exception) {
            return now(self::DEFAULT_TIMEZONE);
        }
    }

    private function normalizeCity(?string $city): ?string
    {
        $city = trim((string) $city);
        return $city !== '' ? $city : null;
    }

    private function loadJsonFile(string $path): array
    {
        if (!is_file($path)) {
            return [];
        }

        try {
            $decoded = json_decode(file_get_contents($path), true);
            return is_array($decoded) ? $decoded : [];
        } catch (\Throwable $exception) {
            Log::warning('Failed to read Ramadan UK data file', [
                'path' => $path,
                'error' => $exception->getMessage(),
            ]);
            return [];
        }
    }

    private function aladhanBaseUrl(): string
    {
        return rtrim(config('services.aladhan.base', 'https://api.aladhan.com/v1'), '/');
    }

    private function getCalculationMethods(): array
    {
        return Cache::remember('ramadan.uk.aladhan.methods', now()->addDay(), function () {
            $url = $this->aladhanBaseUrl() . '/methods';

            try {
                $response = Http::timeout(8000)->retry(1, 500)->get($url);
                if (!$response->successful()) {
                    return [];
                }

                $data = Arr::get($response->json(), 'data', []);
                if (!is_array($data)) {
                    return [];
                }

                $methods = [];
                foreach ($data as $key => $method) {
                    $methods[] = [
                        'id' => isset($method['id']) ? (int) $method['id'] : (int) $key,
                        'name' => Arr::get($method, 'name'),
                        'params' => Arr::get($method, 'params', []),
                    ];
                }

                return $methods;
            } catch (\Throwable $exception) {
                Log::warning('Failed to fetch AlAdhan methods', [
                    'error' => $exception->getMessage(),
                ]);
                return [];
            }
        });
    }

    private function fetchPrayerTimes(
        Carbon $date,
        ?string $city,
        bool $includeAllCities,
        array $citiesPayload
    ): ?array {
        $cities = Arr::get($citiesPayload, 'cities', []);

        if ($includeAllCities && $cities) {
            $payload = [];
            foreach ($cities as $entry) {
                $cityName = Arr::get($entry, 'name');
                if (!$cityName) {
                    continue;
                }
                $payload[$cityName] = $this->fetchPrayerTimesByCity($date, $cityName);
            }

            return [
                'mode' => 'all_cities',
                'count' => count($payload),
                'items' => $payload,
            ];
        }

        if ($city) {
            return [
                'mode' => 'single_city',
                'items' => [
                    $city => $this->fetchPrayerTimesByCity($date, $city),
                ],
            ];
        }

        return null;
    }

    private function fetchPrayerTimesByCity(Carbon $date, string $city): array
    {
        $method = (int) config('services.aladhan.method', 2);
        $school = (int) config('services.aladhan.school', 0);
        $country = config('services.aladhan.country', self::DEFAULT_COUNTRY);

        $cacheKey = sprintf(
            'ramadan.uk.timings.%s.%s.%s.%s',
            $date->format('Y-m-d'),
            strtolower($city),
            $method,
            $school
        );

        return Cache::remember($cacheKey, now()->addMinutes(90), function () use ($date, $city, $method, $school, $country) {
            $url = sprintf('%s/timingsByCity/%s', $this->aladhanBaseUrl(), $date->format('d-m-Y'));
            $query = [
                'city' => $city,
                'country' => $country,
                'method' => $method,
                'school' => $school,
            ];

            try {
                $response = Http::timeout(8000)->retry(1, 500)->get($url, $query);
                if (!$response->successful()) {
                    return [
                        'error' => 'Prayer times unavailable',
                        'status' => $response->status(),
                    ];
                }

                $data = Arr::get($response->json(), 'data', []);
                return [
                    'timings' => Arr::get($data, 'timings'),
                    'date' => Arr::get($data, 'date'),
                    'meta' => Arr::get($data, 'meta'),
                ];
            } catch (\Throwable $exception) {
                Log::warning('Failed to fetch AlAdhan timings', [
                    'city' => $city,
                    'error' => $exception->getMessage(),
                ]);

                return [
                    'error' => 'Prayer times unavailable',
                ];
            }
        });
    }

    private function fetchQuranReferences(string $edition): array
    {
        $edition = $edition ?: self::DEFAULT_EDITION;
        $ayahs = ['2:183', '2:185', '97:1', '97:3'];
        $references = [];

        foreach ($ayahs as $ayah) {
            $reference = $this->fetchQuranByAyah($ayah, $edition);
            if ($reference) {
                $references[] = $reference;
            }
        }

        return $references;
    }

    private function fetchQuranByAyah(string $ayahId, string $edition): ?array
    {
        $cacheKey = sprintf('ramadan.uk.quran.%s.%s', $ayahId, $edition);

        return Cache::remember($cacheKey, now()->addDays(7), function () use ($ayahId, $edition) {
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
                    'verse_key' => $ayahId,
                    'text' => Arr::get($data, 'text'),
                    'reference' => $referenceLabel,
                    'url' => "https://alquran.cloud/ayah/{$ayahId}",
                    'edition' => $edition,
                ];
            } catch (\Throwable $exception) {
                Log::warning('Quran lookup failed', [
                    'ayah' => $ayahId,
                    'error' => $exception->getMessage(),
                ]);
                return null;
            }
        });
    }

    private function fetchHadithReferences(array $keywords, int $limit): array
    {
        $references = [];

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

            $records = $query->limit($limit)->get();
            foreach ($records as $record) {
                if (!$record->hadith_en) {
                    continue;
                }
                $imam = $record->chapter?->imam?->imam_name;
                $chapter = $record->chapter?->chapter_text;
                $referenceParts = array_filter([$imam, $chapter]);
                $reference = $referenceParts ? implode(' — ', $referenceParts) : 'Prophetic guidance';
                $references[] = [
                    'text' => $record->hadith_en,
                    'reference' => $reference,
                    'url' => null,
                    'source' => 'Local hadith database',
                ];
            }
        } catch (\Throwable $exception) {
            Log::warning('Hadith lookup failed', [
                'error' => $exception->getMessage(),
            ]);
        }

        if (count($references) >= $limit) {
            return $references;
        }

        $fallback = $this->fetchHadithFallback($limit - count($references));
        return array_merge($references, $fallback);
    }

    private function fetchHadithFallback(int $limit): array
    {
        if ($limit <= 0) {
            return [];
        }

        $results = [];
        $edition = 'eng-bukhari';

        for ($i = 0; $i < $limit; $i += 1) {
            $id = random_int(1, 2500);
            $url = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/{$edition}/{$id}.json";

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

                $results[] = [
                    'text' => $hadithText,
                    'reference' => sprintf('%s, Hadith %s', $book, $reference),
                    'url' => "https://www.sunnah.com/bukhari/{$reference}",
                    'source' => 'Hadith API mirror',
                ];
            } catch (\Throwable $exception) {
                Log::warning('Hadith API fallback failed', [
                    'url' => $url,
                    'error' => $exception->getMessage(),
                ]);
            }
        }

        return $results;
    }
}
