<?php

namespace App\Services;

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
        $references = [];
        $question = trim((string) ($content['question'] ?? ''));
        $quranSnippet = '';

        if (!empty($content['quran']) && is_array($content['quran'])) {
            $referenceLabel = trim((string) ($content['quran']['reference'] ?? 'Quran'));
            $quranSnippet = $this->snippet((string) ($content['quran']['text'] ?? ''), 900);
            $this->pushReference($references, $referenceLabel, (string) ($content['quran']['url'] ?? ''));
        }

        $finalMessage = '';
        if ($quranSnippet === '') {
            $sections = [
                $question !== ''
                    ? "I cannot verify a source-backed answer for \"{$question}\" right now."
                    : 'I cannot verify a source-backed answer right now.',
                'Ask a narrower Quran question and try again.',
            ];
            $finalMessage = implode("\n\n", $sections);
        } else {
            $finalMessage = $this->buildConversationalAnswer($quranSnippet);
        }

        $shortSummary = $this->snippet($finalMessage, 160);

        return [
            'message' => $finalMessage,
            'summary' => [],
            'short_summary' => $shortSummary,
            'references' => array_values($references),
        ];
    }

    protected function buildConversationalAnswer(string $primary): string
    {
        if ($primary === '') {
            return 'I could not produce a reliable answer text from the available sources.';
        }

        return $primary;
    }

    protected function snippet(?string $text, int $limit = 240): string
    {
        $normalized = preg_replace('/\s+/', ' ', trim((string) $text));
        if ($normalized === '') {
            return '';
        }

        if (mb_strlen($normalized) <= $limit) {
            return $normalized;
        }

        $trimmed = trim(mb_substr($normalized, 0, $limit));
        $sentenceEnd = max(
            (int) mb_strrpos($trimmed, '.'),
            (int) mb_strrpos($trimmed, '!'),
            (int) mb_strrpos($trimmed, '?')
        );
        if ($sentenceEnd > (int) ($limit * 0.45)) {
            $trimmed = trim(mb_substr($trimmed, 0, $sentenceEnd + 1));
        }

        return rtrim($trimmed, ",;: \t\n\r\0\x0B");
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
