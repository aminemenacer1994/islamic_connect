<?php

namespace Database\Seeders;

use App\models\Juz;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use NunoMaduro\Collision\Adapters\Phpunit\State;
use Illuminate\Support\Facades\DB;


class JuzSeeder extends Seeder
{
    public function run()
    {
      Juz::truncate();
  
        $csvFile = fopen(base_path("database/data/csv/juz.csv"), "r");
  
        $firstline = true;
        while (($data = fgetcsv($csvFile, 2000, ",")) !== FALSE) {
            if (!$firstline) {
                Juz::create([
                  "juz_id" => $data['0'],
                ]);    
            }
            $firstline = false;
        }
   
        fclose($csvFile);
    }
}
