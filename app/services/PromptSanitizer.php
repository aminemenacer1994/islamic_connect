<?php

namespace App\Services;

use Illuminate\Support\Str;

class PromptSanitizer
{
    /**
     * Remove potentially dangerous characters, strip HTML, and cap the length.
     */
    public function sanitize(string $input, int $maxLength = 1200): string
    {
        $clean = preg_replace('#<script[^>]*?>.*?</script>#is', ' ', $input);
        $clean = strip_tags($clean);
        $clean = preg_replace('/[`~|\{\}\[\]\^<>]/', ' ', $clean);
        $clean = preg_replace('/\s+/', ' ', $clean);
        $clean = trim($clean);
        return Str::limit($clean, $maxLength, '');
    }

    /**
     * Heuristics to detect attempts at injection or instruction overrides.
     */
    public function containsInjection(string $input): bool
    {
        $patterns = [
            '/\<\/?script/i',
            '/\brm\s+-rf\b/i',
            '/\bexec\b/i',
            '/\bshutdown\b/i',
            '/\bdrop\b/i',
            '/\btruncate\b/i',
            '/\bcurl\b/i',
            '/\bwget\b/i',
            '/\bbase64_decode\b/i',
            '/\bsystem\b/i',
        ];

        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $input)) {
                return true;
            }
        }

        return false;
    }
}
