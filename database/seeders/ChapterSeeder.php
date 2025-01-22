<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Chapter;


class ChapterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Chapter::truncate();

        $csvFile = fopen(base_path("database/data/ahadith/hadith_chapter.csv"), "r");

        $firstline = true;
        $i = 0;
        while (($data = fgetcsv($csvFile, 2000, ",")) !== FALSE) {
            if (!$firstline) {
                // Check if the required keys exist in the $data array
                if (count($data) >= 3) {
                    Chapter::create([
                        'imam_id' => $data[0],
                        'chapter_id' => $data[1],
                        'chapter_text' => $data[2],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
            $firstline = false;
        }

        fclose($csvFile);
    }
}
