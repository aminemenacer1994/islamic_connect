<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ayah;

class AyahSeeder extends Seeder
{
    public function run()
    {
        Ayah::truncate(); // Clear the ayahs table

        $csvFilePath = base_path("database/data/csv/ayat.csv");
        if (!file_exists($csvFilePath)) {
            echo "CSV file not found at path: $csvFilePath";
            return;
        }

        $csvFile = fopen($csvFilePath, "r");
        $isHeader = true;

        $baseAudioUrl = "https://cdn.islamic.network/quran/audio/128/ar.alafasy/";
        $audioCounter = 1; // Start global audio counter

        while (($data = fgetcsv($csvFile, 2000, ",")) !== false) {
            // Skip header row
            if ($isHeader) {
                $isHeader = false;
                continue;
            }

            if (count($data) === 4) {
                $surahId = (int) $data[0];
                $ayahId = (int) $data[1];
                $ayahText = mb_convert_encoding(trim($data[3]), 'UTF-8', 'auto');

                // Force generate audio link sequentially
                $audioLink = $baseAudioUrl . $audioCounter . ".mp3";

                // Create the ayah record
                Ayah::create([
                    "surah_id" => $surahId,
                    "ayah_id" => $ayahId,
                    "audio_links" => $audioLink,
                    "ayah_text" => $ayahText,
                ]);

                $audioCounter++; // Increment for the next ayah
            } else {
                echo "Invalid row format: " . implode(",", $data) . PHP_EOL;
            }
        }

        fclose($csvFile);
    }
}
