<?php

namespace Database\Seeders; // Ensure this is at the top

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class NoteSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 15) as $index) {
            DB::table('notes')->insert([
                'surah_name' => $faker->firstNameMale(),
                'ayah_notes' => $faker->realText($maxNbChars = 200, $indexSize = 2),
            ]);
        }
    }
}

