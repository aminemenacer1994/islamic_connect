<?php

namespace App\Http\Controllers;

use App\Models\Surah;
use App\Models\Ayah;
use App\Models\Information;
use App\Models\Tafseer;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SurahController extends Controller
{
    // Simplify retrieval of all surahs
    public function getSurat()
    {
        return response()->json(Surah::all());
    }

    // Fetch ayahs for a given Surah
    public function getAudioAyat($id)
    {
        $ayahs = Ayah::where('surah_id', $id)->get();

        if ($ayahs->isEmpty()) {
            return response()->json(['message' => 'No ayahs found for this surah'], 404);
        }

        return response()->json($ayahs);
    }

    // Get ayahs by Surah
    public function getAyahsBySurah($surahId)
    {
        $surah = Surah::with('ayahs')->find($surahId);

        return $surah ? response()->json($surah->ayahs) : response()->json(['error' => 'Surah not found'], 404);
    }

    // Get translation and transliteration for a Surah
    public function getTranslationBySurah($surahId)
    {
        $surah = Surah::with('ayahs')->find($surahId);

        if (!$surah) {
            return response()->json(['error' => 'Surah not found'], 404);
        }

        return response()->json([
            'translation' => $surah->translation ?? null,
            'transliteration' => $surah->transliteration ?? null,
            'ayahs' => $surah->ayahs,
        ]);
    }

    // Get translations for a specific Ayah
    public function getTranslationsForAyah($ayahId)
    {
        $ayah = Ayah::with('translations')->find($ayahId);

        return $ayah ? response()->json($ayah->translations) : response()->json(['message' => 'Ayah not found'], 404);
    }

    // Get specific translation for an Ayah
    public function getTranslationByAyah($ayahId)
    {
        $ayah = Ayah::find($ayahId);

        if (!$ayah) {
            return response()->json(['message' => 'Ayah not found'], 404);
        }

        return response()->json($ayah->translations);
    }

    // Get Ayahs by Surah ID
    public function getAyat(Request $request)
    {
        return response()->json(Ayah::where('surah_id', $request->surah_id)->get());
    }

    // Get Information for a specific Ayah
    public function getInformations(Request $request)
    {
        return response()->json(Information::with('ayah.surah')->where('ayah_id', $request->id)->first());
    }

    // Get Tafseer for a specific ayah with a public scholarly API first, then local fallback.
    public function getTafseers(Request $request, $id)
    {
        $detailed = $request->boolean('detailed', false);
        $language = strtolower(trim((string) $request->query('lang', '')));
        $requestedTafsirKey = trim((string) $request->query('tafsir_key', ''));
        [$surahNumber, $ayahNumber] = $this->resolveAyahCoordinates((string) $id);
        $reference = $this->buildReferenceLabel((string) $id, $surahNumber, $ayahNumber);

        $payload = null;
        if ($language === 'en' || $requestedTafsirKey !== '') {
            $payload = $this->fetchTafsirFromQuranEnc(
                $surahNumber,
                $ayahNumber,
                $reference,
                $requestedTafsirKey !== '' ? $requestedTafsirKey : null
            );
        } else {
            $payload = $this->fetchPublicScholarlyTafsir($surahNumber, $ayahNumber, $reference);
        }

        if (!$payload && $language !== 'en' && $requestedTafsirKey === '') {
            $payload = $this->fetchLocalTafsirFallback((string) $id, $reference);
        }

        if (!$payload) {
            if ($detailed) {
                return response()->json([
                    'text' => null,
                    'source' => 'Unavailable',
                    'proof' => 'No trusted tafsir source returned data for this ayah.',
                    'reference' => $reference,
                    'provider' => 'none',
                ], 404);
            }

            return response()->json(null);
        }

        return $detailed
            ? response()->json($payload)
            : response()->json($payload['text'] ?? null);
    }

    protected function resolveAyahCoordinates(string $id): array
    {
        if (str_contains($id, ':')) {
            [$surahRaw, $ayahRaw] = array_pad(explode(':', $id, 2), 2, null);
            return [(int) $surahRaw, (int) $ayahRaw];
        }

        if (!ctype_digit($id)) {
            return [0, 0];
        }

        $ayah = Ayah::query()
            ->select(['id', 'surah_id', 'ayah_id'])
            ->find((int) $id);

        if (!$ayah) {
            return [0, 0];
        }

        return [(int) $ayah->surah_id, (int) $ayah->ayah_id];
    }

    protected function buildReferenceLabel(string $id, int $surahNumber, int $ayahNumber): string
    {
        if ($surahNumber > 0 && $ayahNumber > 0) {
            return "Surah {$surahNumber}, Ayah {$ayahNumber}";
        }

        return ctype_digit($id) ? "Ayah #{$id}" : "Verse {$id}";
    }

    protected function fetchPublicScholarlyTafsir(int $surahNumber, int $ayahNumber, string $reference): ?array
    {
        if ($surahNumber <= 0 || $ayahNumber <= 0) {
            return null;
        }

        $verseKey = "{$surahNumber}:{$ayahNumber}";

        $fromQuranCom = $this->fetchTafsirFromQuranCom($verseKey, $reference);
        if ($fromQuranCom) {
            return $fromQuranCom;
        }

        return $this->fetchTafsirFromQuranEnc($surahNumber, $ayahNumber, $reference);
    }

    protected function fetchTafsirFromQuranCom(string $verseKey, string $reference): ?array
    {
        $baseUrl = rtrim((string) config('services.quran_com.base', 'https://api.quran.com/api/v4'), '/');
        if ($baseUrl === '') {
            return null;
        }

        $resourceIds = $this->resolveQuranComTafsirResourceIds();
        if (empty($resourceIds)) {
            $resourceIds = [169, 168];
        }

        foreach ($resourceIds as $resourceId) {
            foreach ($this->buildQuranComTafsirTargets($baseUrl, $resourceId, $verseKey) as $target) {
                try {
                    $response = Http::acceptJson()
                        ->timeout(8)
                        ->retry(1, 400)
                        ->get($target['url'], $target['query']);

                    if (!$response->successful()) {
                        continue;
                    }

                    $payload = $response->json();
                    if (!is_array($payload)) {
                        continue;
                    }

                    $text = $this->extractTafsirTextFromPayload($payload);
                    if ($text === '') {
                        continue;
                    }

                    $sourceTitle = $this->extractTafsirSourceFromPayload($payload);
                    if ($sourceTitle === '') {
                        $sourceTitle = "Scholarly tafsir resource {$resourceId}";
                    }

                    return [
                        'text' => $text,
                        'source' => $sourceTitle,
                        'proof' => "Matched on verse key {$verseKey} from a public scholarly tafsir feed.",
                        'reference' => $reference,
                        'provider' => 'public_scholarly_tafsir',
                        'resource' => (string) $resourceId,
                    ];
                } catch (\Throwable $exception) {
                    Log::warning('Quran tafsir fetch failed for target', [
                        'verse_key' => $verseKey,
                        'resource_id' => $resourceId,
                        'url' => $target['url'],
                        'error' => $exception->getMessage(),
                    ]);
                }
            }
        }

        return null;
    }

    protected function buildQuranComTafsirTargets(string $baseUrl, int $resourceId, string $verseKey): array
    {
        $encodedKey = rawurlencode($verseKey);

        return [
            [
                'url' => "{$baseUrl}/quran/tafsirs/{$resourceId}",
                'query' => ['verse_key' => $verseKey],
            ],
            [
                'url' => "{$baseUrl}/tafsirs/{$resourceId}/by_ayah/{$encodedKey}",
                'query' => [],
            ],
            [
                'url' => "{$baseUrl}/tafsirs/{$resourceId}",
                'query' => ['verse_key' => $verseKey],
            ],
        ];
    }

    protected function fetchTafsirFromQuranEnc(
        int $surahNumber,
        int $ayahNumber,
        string $reference,
        ?string $requestedTafsirKey = null
    ): ?array
    {
        $baseUrl = rtrim((string) config('services.quranenc.base', 'https://quranenc.com/api/v1'), '/');
        $tafsirKey = trim((string) (
            $requestedTafsirKey !== null && $requestedTafsirKey !== ''
                ? $requestedTafsirKey
                : config('services.quranenc.tafsir_key', 'english_mokhtasar')
        ));

        if ($baseUrl === '' || $tafsirKey === '') {
            return null;
        }

        $url = "{$baseUrl}/translation/aya/{$tafsirKey}/{$surahNumber}/{$ayahNumber}";

        try {
            $response = Http::acceptJson()->timeout(8)->retry(1, 400)->get($url);
            if (!$response->successful()) {
                return null;
            }

            $payload = $response->json();
            if (!is_array($payload)) {
                return null;
            }

            $result = Arr::get($payload, 'result');
            if (!is_array($result)) {
                return null;
            }

            $text = trim((string) (
                Arr::get($result, 'translation')
                ?? Arr::get($result, 'text')
                ?? Arr::get($result, 'tafsir')
                ?? ''
            ));

            $text = $this->normalizeTafsirText($text);
            if ($text === '') {
                return null;
            }

            return [
                'text' => $text,
                'source' => $this->humanizeTafsirKey($tafsirKey),
                'proof' => "Matched on Surah {$surahNumber}, Ayah {$ayahNumber} from a public scholarly tafsir feed.",
                'reference' => $reference,
                'provider' => 'public_scholarly_tafsir',
                'resource' => $tafsirKey,
                'language' => 'en',
            ];
        } catch (\Throwable $exception) {
            Log::warning('QuranEnc tafsir fetch failed', [
                'surah' => $surahNumber,
                'ayah' => $ayahNumber,
                'tafsir_key' => $tafsirKey,
                'error' => $exception->getMessage(),
            ]);

            return null;
        }
    }

    protected function fetchLocalTafsirFallback(string $id, string $reference): ?array
    {
        $record = Tafseer::query()
            ->where('ayah_id', $id)
            ->orderByDesc('id')
            ->first();

        if (!$record && ctype_digit($id)) {
            $record = Tafseer::find((int) $id);
        }

        if (!$record) {
            return null;
        }

        $text = $this->normalizeTafsirText((string) ($record->tafseer ?? ''));
        if ($text === '') {
            return null;
        }

        return [
            'text' => $text,
            'source' => 'Archived tafsir fallback',
            'proof' => 'Used fallback because public scholarly tafsir feeds were unavailable for this ayah.',
            'reference' => $reference,
            'provider' => 'local_fallback',
            'resource' => (string) $record->id,
        ];
    }

    protected function resolveQuranComTafsirResourceIds(): array
    {
        $configured = config('services.quran_com.tafsir_resource_ids', '169,168');

        if (is_string($configured)) {
            $configured = explode(',', $configured);
        }

        if (!is_array($configured)) {
            return [];
        }

        $ids = [];
        foreach ($configured as $value) {
            $id = (int) trim((string) $value);
            if ($id > 0) {
                $ids[] = $id;
            }
        }

        return array_values(array_unique($ids));
    }

    protected function extractTafsirTextFromPayload(array $payload): string
    {
        $directCandidates = [
            Arr::get($payload, 'tafsir.text'),
            Arr::get($payload, 'tafsir.body'),
            Arr::get($payload, 'tafsir.content'),
            Arr::get($payload, 'result.text'),
            Arr::get($payload, 'result.body'),
            Arr::get($payload, 'result.content'),
            Arr::get($payload, 'text'),
            Arr::get($payload, 'body'),
            Arr::get($payload, 'content'),
        ];

        foreach ($directCandidates as $candidate) {
            if (is_string($candidate) && trim($candidate) !== '') {
                return $this->normalizeTafsirText($candidate);
            }
        }

        $listCandidates = [
            Arr::get($payload, 'tafsirs'),
            Arr::get($payload, 'results'),
            Arr::get($payload, 'data'),
        ];

        foreach ($listCandidates as $items) {
            if (!is_array($items)) {
                continue;
            }

            foreach ($items as $entry) {
                if (!is_array($entry)) {
                    continue;
                }

                foreach (['text', 'body', 'content', 'tafsir'] as $field) {
                    $value = Arr::get($entry, $field);
                    if (is_string($value) && trim($value) !== '') {
                        return $this->normalizeTafsirText($value);
                    }
                }
            }
        }

        $tafsirObject = Arr::get($payload, 'tafsir');
        if (is_string($tafsirObject) && trim($tafsirObject) !== '') {
            return $this->normalizeTafsirText($tafsirObject);
        }

        return '';
    }

    protected function extractTafsirSourceFromPayload(array $payload): string
    {
        $candidates = [
            Arr::get($payload, 'tafsir.resource_name'),
            Arr::get($payload, 'tafsir.name'),
            Arr::get($payload, 'resource_name'),
            Arr::get($payload, 'name'),
            Arr::get($payload, 'tafsirs.0.resource_name'),
            Arr::get($payload, 'tafsirs.0.name'),
            Arr::get($payload, 'result.resource_name'),
            Arr::get($payload, 'result.name'),
        ];

        foreach ($candidates as $candidate) {
            if (is_string($candidate) && trim($candidate) !== '') {
                return trim($candidate);
            }
        }

        return '';
    }

    protected function humanizeTafsirKey(string $tafsirKey): string
    {
        $trimmed = trim($tafsirKey);
        if ($trimmed === '') {
            return 'Scholarly tafsir source';
        }

        if ($trimmed === 'english_mokhtasar') {
            return 'Al-Mukhtasar Tafsir (English)';
        }

        return ucwords(str_replace(['_', '-'], ' ', $trimmed));
    }

    protected function normalizeTafsirText(string $text): string
    {
        $normalized = html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $normalized = preg_replace('/<br\s*\/?>/i', "\n", $normalized);
        $normalized = preg_replace('/<\/p>/i', "\n\n", $normalized);
        $normalized = strip_tags((string) $normalized);
        $normalized = preg_replace("/\r\n?/", "\n", (string) $normalized);
        $normalized = preg_replace("/[ \t]+/", " ", (string) $normalized);
        $normalized = preg_replace("/\n{3,}/", "\n\n", (string) $normalized);

        return trim((string) $normalized);
    }

    public function searchTranslations(Request $request)
    {
        $query = trim($request->input('query'));

        // Return empty response if the query is not provided or too short
        if (empty($query) || strlen($query) < 2) {
            return response()->json(['results' => [], 'suggestions' => []]);
        }

        // Query translations that contain the search term
        $results = Information::where('translation', 'LIKE', '%' . $query . '%')
            ->with(['ayah.surah']) // Eager load related ayah and surah
            ->get();

        // Generate unique suggestions by matching words that contain the query
        $suggestions = $results
            ->pluck('translation') // Extract translations
            ->flatMap(function ($translation) use ($query) {
                preg_match_all('/\b\w*' . preg_quote($query, '/') . '\w*\b/i', $translation, $matches);
                return $matches[0]; // Extract matching words
            })
            ->unique() // Remove duplicates
            ->values(); // Re-index the collection

        return response()->json([
            'results' => $results,
            'suggestions' => $suggestions,
        ]);
    }


}
