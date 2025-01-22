<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Imam;


class ImamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Imam::truncate();

        $csvFile = fopen(base_path("database/data/ahadith/hadith_imam.csv"), "r");

        $firstline = true;
        while (($data = fgetcsv($csvFile, 2000, ",")) !== FALSE) {
            if (!$firstline) {
                Imam::create([
                    "id" => $data['0'],
                    "imam_name" => $data['1'],
                ]);
            }
            $firstline = false;
        }

        fclose($csvFile);
    }
}
