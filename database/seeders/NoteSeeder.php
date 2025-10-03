<?php

namespace Database\Seeders; // Ensure this is at the top

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class NoteSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 30) as $index) {
            DB::table('notes')->insert([
                'surah_name' => $faker->firstNameMale(),
                'ayah_notes' => $faker->realText(rand(100, 200)), // Random length between 30 to 50 characters
                'created_at' => Carbon::now()->subDays(rand(0, 90)), // Random date within the last 30 days
                'updated_at' => Carbon::now()->subDays(rand(0, 90)), // Random date within the last 30 days
            ]);
        }
    }
}

