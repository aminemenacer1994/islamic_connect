<?php

namespace Database\Seeders;

use App\Models\Tafseer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TafseerSeeder extends Seeder
{
    
    public function run()
    {
       
        Tafseer::truncate();
  
        $csvFile = fopen(base_path("database/data/csv/tafseer.csv"), "r");
  
        $firstline = true;
        while (($data = fgetcsv($csvFile, 2000, ",")) !== FALSE) {
            if (!$firstline) {
                // Check if the required keys exist in the $data array
                if (array_key_exists('0', $data) && array_key_exists('1', $data)) {
                    Tafseer::create([
                        "ayah_id" => $data['0'],
                        "tafseer" => $data['1']
                    ]);
                } else {
                    // Handle the case where the required keys are not present
                    // You may log an error, skip the entry, or handle it in a way that makes sense for your application
                    // For example, you can use continue; to skip to the next iteration of the loop
                    // continue;
                }
            }
            $firstline = false;
        }
   
        fclose($csvFile);
    }
    
}
