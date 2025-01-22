<?php

namespace App\Http\Controllers;

use App\Models\Surah;
use App\Models\Ayah;
use App\Models\Information;
use App\Models\Tafseer;
use Illuminate\Http\Request;

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

    // Get Tafseer for a specific ID
    public function getTafseers($id)
    {
        return response()->json(Tafseer::find($id)->tafseer ?? null);
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
