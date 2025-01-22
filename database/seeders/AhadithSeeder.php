<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AhadithSeeder extends Seeder
{
    public function run()
    {
        $csvFilePath = base_path('database/data/ahadith/hadith_ahadith.csv');
        $file = fopen($csvFilePath, 'r');

        // Skip header row
        fgetcsv($file, 1000, ' ');

        while (($data = fgetcsv($file, 1000, '|')) !== false) {
            // Check if the necessary indices exist in the array
            if (count($data) >= 4) {
                $imam_id = (int)$data[0];
                $chapter_id = (int)$data[1];
                $hadith_ar = mb_convert_encoding($data[2] ?? '', 'UTF-8');
                $hadith_en = mb_convert_encoding($data[3] ?? '', 'UTF-8');
                
                try {
                    // Insert data into the database
                    // dd($data);
                    DB::table('ahadith')->insert([
                        'imam_id' => $imam_id,
                        'chapter_id' => $chapter_id,
                        'hadith_ar' => $hadith_ar,
                        'hadith_en' => $hadith_en,
                    ]);
                } catch (\Exception $e) {
                    // Log or handle the SQL exception
                    // You can add logging or other error handling here
                }
            } else {
                // Log or handle the case where the indices are missing
                // You may want to skip this row or log an error
            }
        }

    }
}