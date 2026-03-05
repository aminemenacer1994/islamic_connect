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
     *     dua: array|null,
     *     local_faq: array|null
     * }  $content
     */
    public function format(array $content): array
    {
        $evidence = [];
        $references = [];
        $question = trim((string) ($content['question'] ?? ''));
        $sourceCount = 0;

        if (!empty($content['quran']) && is_array($content['quran'])) {
            $referenceLabel = trim((string) ($content['quran']['reference'] ?? 'Quran'));
            $quranSnippet = $this->snippet((string) ($content['quran']['text'] ?? ''), 320);
            if ($quranSnippet !== '') {
                $evidence[] = $quranSnippet;
                $sourceCount++;
            }
            $this->pushReference($references, $referenceLabel, (string) ($content['quran']['url'] ?? ''));
        }

        if (!empty($content['hadith']) && is_array($content['hadith'])) {
            $referenceLabel = trim((string) ($content['hadith']['reference'] ?? 'Hadith'));
            $hadithSnippet = $this->snippet((string) ($content['hadith']['text'] ?? ''), 300);
            if ($hadithSnippet !== '') {
                $evidence[] = $hadithSnippet;
                $sourceCount++;
            }
            $this->pushReference($references, $referenceLabel, (string) ($content['hadith']['url'] ?? ''));
        }

        if (!empty($content['articles']) && is_array($content['articles'])) {
            $article = $content['articles'][0] ?? null;
            if (is_array($article)) {
                $title = trim((string) ($article['title'] ?? 'IslamHouse insight'));
                $description = $this->snippet((string) ($article['description'] ?? ''), 220);
                if ($description !== '') {
                    $evidence[] = $description;
                    $sourceCount++;
                }
                $this->pushReference($references, $title, (string) ($article['url'] ?? ''));
            }
        }

        $finalMessage = '';
        if ($sourceCount === 0) {
            $sections = [
                $question !== ''
                    ? "I cannot verify a source-backed answer for \"{$question}\" right now."
                    : 'I cannot verify a source-backed answer right now.',
                'Ask a narrower Quran or Hadith question and try again.',
            ];
            $finalMessage = implode("\n\n", $sections);
        } else {
            $primary = trim((string) ($evidence[0] ?? ''));
            $supporting = trim((string) ($evidence[1] ?? ''));
            $finalMessage = $this->buildConversationalAnswer($primary, $supporting);
        }

        $shortSummary = Str::limit($finalMessage, 160, '...');

        return [
            'message' => $finalMessage,
            'summary' => [],
            'short_summary' => $shortSummary,
            'references' => array_values($references),
        ];
    }

    protected function buildConversationalAnswer(string $primary, string $supporting = ''): string
    {
        if ($primary === '') {
            return 'I could not produce a reliable answer text from the available sources.';
        }

        $message = $primary;
        if ($supporting !== '') {
            $message .= "\n\nAlso: {$supporting}";
        }

        return $message;
    }

    protected function snippet(?string $text, int $limit = 240): string
    {
        $normalized = preg_replace('/\s+/', ' ', trim((string) $text));
        if ($normalized === '') {
            return '';
        }

        return Str::limit($normalized, $limit, '...');
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
