<?php

namespace App\Services;

use Illuminate\Support\Str;

class IslamicEmbeddingService
{
    private const DIMENSIONS = 192;

    /**
     * @param array<int, string> $terms
     * @return array<int, float>
     */
    public function embed(string $text, array $terms = []): array
    {
        $weights = [];
        $tokens = $this->tokenize($text);

        foreach ($terms as $term) {
            $tokens = array_merge($tokens, $this->tokenize($term));
        }

        foreach ($tokens as $token) {
            $this->addWeightedFeature($weights, $token, 1.0);

            $length = strlen($token);
            if ($length >= 5) {
                for ($index = 0; $index <= $length - 3; $index++) {
                    $this->addWeightedFeature($weights, 'tri:' . substr($token, $index, 3), 0.35);
                }
            }
        }

        ksort($weights);

        return $this->normalize($weights);
    }

    /**
     * @param array<int, float> $left
     * @param array<int, float> $right
     */
    public function cosineSimilarity(array $left, array $right): float
    {
        if (empty($left) || empty($right)) {
            return 0.0;
        }

        $score = 0.0;

        if (count($left) > count($right)) {
            [$left, $right] = [$right, $left];
        }

        foreach ($left as $index => $weight) {
            if (isset($right[$index])) {
                $score += ((float) $weight) * ((float) $right[$index]);
            }
        }

        return max(0.0, min(1.0, $score));
    }

    /**
     * @return array<int, string>
     */
    protected function tokenize(string $text): array
    {
        $normalized = Str::lower($text);
        $normalized = preg_replace('/[^a-z0-9\s]/', ' ', $normalized);
        $normalized = preg_replace('/\s+/', ' ', (string) $normalized);
        $normalized = trim((string) $normalized);

        if ($normalized === '') {
            return [];
        }

        $tokens = preg_split('/\s+/', $normalized) ?: [];
        $tokens = array_values(array_filter($tokens, fn (string $token): bool => strlen($token) >= 2));

        return array_slice($tokens, 0, 200);
    }

    /**
     * @param array<int, float> $weights
     */
    protected function addWeightedFeature(array &$weights, string $feature, float $weight): void
    {
        $index = abs(crc32($feature)) % self::DIMENSIONS;
        $weights[$index] = ($weights[$index] ?? 0.0) + $weight;
    }

    /**
     * @param array<int, float> $weights
     * @return array<int, float>
     */
    protected function normalize(array $weights): array
    {
        $magnitude = 0.0;
        foreach ($weights as $weight) {
            $magnitude += $weight * $weight;
        }

        if ($magnitude <= 0.0) {
            return [];
        }

        $magnitude = sqrt($magnitude);
        foreach ($weights as $index => $weight) {
            $weights[$index] = round($weight / $magnitude, 6);
        }

        return $weights;
    }
}
