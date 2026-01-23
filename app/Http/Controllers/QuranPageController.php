<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuranPageController extends Controller
{
    /**
     * Display the Quran page viewer.
     */
    public function index()
    {
        return view('quran-pages');
    }

    /**
     * Get metadata for a specific Quran page.
     * 
     * @param int $pageNumber Page number (1-604)
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPageMetadata($pageNumber)
    {
        // Validate page number
        $pageNumber = (int) $pageNumber;
        
        if ($pageNumber < 1 || $pageNumber > 604) {
            return response()->json([
                'error' => 'Invalid page number. Must be between 1 and 604.'
            ], 400);
        }

        // Fetch page data from Al Quran Cloud API
        try {
            $response = file_get_contents("https://api.alquran.cloud/v1/page/{$pageNumber}");
            $data = json_decode($response, true);

            if ($data['code'] !== 200) {
                return response()->json([
                    'error' => 'Failed to fetch page data from API.'
                ], 500);
            }

            // Extract relevant metadata
            $pageData = $data['data'];
            $ayahs = $pageData['ayahs'];
            
            // Get unique surahs on this page
            $surahs = [];
            $surahsMap = [];
            foreach ($ayahs as $ayah) {
                $surahNumber = $ayah['surah']['number'];
                if (!isset($surahsMap[$surahNumber])) {
                    $surahsMap[$surahNumber] = [
                        'number' => $surahNumber,
                        'name' => $ayah['surah']['name'],
                        'englishName' => $ayah['surah']['englishName'],
                        'englishNameTranslation' => $ayah['surah']['englishNameTranslation'],
                        'revelationType' => $ayah['surah']['revelationType'],
                        'numberOfAyahs' => $ayah['surah']['numberOfAyahs'],
                    ];
                }
            }
            $surahs = array_values($surahsMap);

            // Get juz number from first ayah
            $juz = $ayahs[0]['juz'] ?? null;
            
            // Format ayahs for frontend
            $formattedAyahs = array_map(function($ayah) {
                return [
                    'number' => $ayah['number'],
                    'text' => $ayah['text'],
                    'numberInSurah' => $ayah['numberInSurah'],
                    'surahNumber' => $ayah['surah']['number'],
                ];
            }, $ayahs);
            
            return response()->json([
                'pageNumber' => $pageNumber,
                'juz' => $juz,
                'surahs' => $surahs,
                'ayahs' => $formattedAyahs,
                'ayahCount' => count($ayahs),
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch page metadata: ' . $e->getMessage()
            ], 500);
        }
    }
}
