<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class IslamicEvidenceService
{
    protected $islamHouseKey;

    public function __construct()
    {
        $this->islamHouseKey = env('ISLAMHOUSE_KEY', config('services.islamhouse.key', 'paV29H2gm56kvLP'));
    }

    public function getEvidence(string $query): array
    {
        $normalized = $this->normalizeQuery($query);
        $islamHouse = $this->searchIslamHouse($normalized);

        if (!empty($islamHouse)) {
            return [
                'source' => 'IslamHouse',
                'confidence' => 75,
                'badge' => 'IslamHouse Source',
                'answer' => 'Verified source found from IslamHouse.',
                'islamhouse' => $islamHouse,
            ];
        }

        return [
            'source' => null,
            'confidence' => 0,
            'badge' => 'No Verified Source',
            'answer' => 'I could not find a verified IslamHouse source for this question. Allah knows best.',
            'islamhouse' => [],
        ];
    }

    private function normalizeQuery(string $query): array
    {
        $normalized = strtolower(trim($query));
        $stripped = str_replace([
            'what do scholars say about',
            'is it allowed',
            'is it haram',
            'is it halal',
        ], '', $normalized);

        $keywords = preg_split('/[\s\-]+/', preg_replace('/[^a-z0-9\s\-]/', ' ', $stripped) ?: '') ?: [];
        $keywords = array_values(array_unique(array_filter($keywords, fn ($keyword) => strlen(trim((string) $keyword)) >= 3)));

        $queries = [$normalized, trim($stripped), implode(' ', array_slice($keywords, 0, 4))];

        foreach (array_slice($keywords, 0, 3) as $keyword) {
            $queries[] = $keyword;
            $queries[] = "{$keyword} ruling";
            $queries[] = "is {$keyword} haram";
            $queries[] = "islam {$keyword}";
            $queries[] = "fatwa {$keyword}";
        }

        return array_values(array_unique(array_filter(array_map('trim', $queries))));
    }

    private function searchIslamHouse(array $queries): array
    {
        $results = [];

        foreach ($queries as $q) {
            $response = Http::get('https://api3.islamhouse.com/v3/items', [
                'key' => $this->islamHouseKey,
                'lang' => 'en',
                'flang' => 'en',
                'slang' => 'showall',
                'type' => 'showall',
                'limit' => 20,
                'search' => trim($q),
            ]);

            $data = $response->json();
            Log::info('ISLAMHOUSE_RAW', [
                'status' => $response->status(),
                'response' => $data,
            ]);

            $items = $data['items'] ?? $data['data']['items'] ?? $data['data'] ?? [];

            if (is_array($items) && !empty($items)) {
                $results = array_merge($results, array_values(array_filter($items, 'is_array')));
            }
        }

        return $results;
    }
}
