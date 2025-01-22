<?php

namespace Database\Seeders;

use App\models\Surah;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use NunoMaduro\Collision\Adapters\Phpunit\State;
use Illuminate\Support\Facades\DB;


class SurahSeeder extends Seeder
{
    public function run()
    {
        Surah::truncate();

        $csvFile = fopen(base_path("database/data/csv/surat.csv"), "r");

        $firstline = true;
        while (($data = fgetcsv($csvFile, 2000, ",")) !== FALSE) {
            if (!$firstline) {
                Surah::create([
                    "id" => $data[0],
                    "name_en" => $data[1],
                    "juz_id" => $data[3],
                    "name_ar" => $data[2],
                    "text" => $data[4],
                ]);
            }
            $firstline = false;
        }

        fclose($csvFile);
    }
}
