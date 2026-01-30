<?php

namespace App\Services;

use Illuminate\Support\Str;

class AIResponseFormatter
{
    /**
     * @param  array{
     *     question: string,
     *     articles: array|null,
     *     quran: array|null,
     *     hadith: array|null,
     *     dua: array|null
     * }  $content
     */
    public function format(array $content): array
    {
        $sections = [];
        $summaryBullets = [];
        $references = [];
        $question = trim($content['question'] ?? '');
        $headline = $question ? "Regarding “{$question}”" : 'Regarding your question';
        $sections[] = "{$headline}. Noor gathered the following trusted references.";
        if ($question) {
            $summaryBullets[] = "Focus on “{$question}” while you reflect on these references.";
        }

        if ($content['articles']) {
            $article = $content['articles'][0];
            $title = $article['title'] ?? 'IslamHouse insight';
            $description = $article['description'] ?? 'Helpful guidance from IslamHouse.';
            $shortDescription = Str::limit(trim($description), 220, '…');
            $sections[] = "IslamHouse article “{$title}” highlights: " . trim($description);
            if ($shortDescription) {
                $summaryBullets[] = "IslamHouse: “{$shortDescription}”";
            }
            $this->pushReference($references, $title, $article['url'] ?? '');
        }

        if ($content['quran']) {
            $text = $content['quran']['text'] ?? '';
            $referenceLabel = $content['quran']['reference'] ?? 'Quran';
            $sections[] = "Quran reminder ({$referenceLabel}): " . trim($text);
            if ($text) {
                $summaryBullets[] = "Reflect on {$referenceLabel}.";
            }
            $this->pushReference($references, $referenceLabel, $content['quran']['url'] ?? '');
        }

        if ($content['hadith']) {
            $referenceLabel = $content['hadith']['reference'] ?? 'Prophetic guidance';
            $text = $content['hadith']['text'] ?? '';
            $sections[] = "{$referenceLabel} says: " . trim($text);
            if ($text) {
                $summaryBullets[] = "Hadith reference: {$referenceLabel}.";
            }
            $this->pushReference($references, $referenceLabel, $content['hadith']['url'] ?? '');
        }

        if ($content['dua']) {
            $title = $content['dua']['reference'] ?? 'Recommended Dua';
            $duaText = $content['dua']['text'] ?? $content['dua']['translation'] ?? '';
            $sections[] = "{$title} – " . trim($duaText);
            if ($duaText) {
                $summaryBullets[] = "Recite the dua titled “{$title}”.";
            }
            $this->pushReference($references, $title, $content['dua']['url'] ?? '');
        }

        if (empty($sections)) {
            $sections[] = 'The Islamic content APIs were not reachable right now. Please try again in a few moments.';
            $summaryBullets[] = 'Awaiting refreshed content from trusted sources.';
        }

        $finalMessage = implode("\n\n", array_filter($sections));
        $finalSummary = array_unique(array_filter($summaryBullets));
        if (empty($finalSummary)) {
            $finalSummary = ['Guidance compiled using the trusted Islamic APIs.'];
        }

        $shortSummary = implode(' · ', array_slice($finalSummary, 0, 2));

        return [
            'message' => $finalMessage,
            'summary' => array_values($finalSummary),
            'short_summary' => $shortSummary,
            'references' => array_values($references),
        ];
    }

    /**
     * @param array<string,string> $reference
     */
    protected function pushReference(array &$list, string $label, string $url): void
    {
        $label = trim($label);
        if (!$label) {
            return;
        }

        $reference = [
            'label' => $label,
            'url' => $this->normalizeUrl($url),
        ];

        foreach ($list as $existing) {
            if (isset($existing['label']) && $existing['label'] === $label && $existing['url'] === $reference['url']) {
                return;
            }
        }

        $list[] = $reference;
    }

    protected function normalizeUrl(?string $url): ?string
    {
        $url = trim((string) $url);
        if ($url === '') {
            return null;
        }
        if (str_starts_with($url, 'http://') || str_starts_with($url, 'https://')) {
            return $url;
        }
        if (str_starts_with($url, '//')) {
            return "https:{$url}";
        }
        return null;
    }
}
