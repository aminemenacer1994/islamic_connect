<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\User;

class BookmarkSeeder extends Seeder
{
    
    public function run()
    {
        $faker = Faker::create();
        foreach (range(1, 30) as $index) {
            // Pick a random existing user id (fallback to 1 if none)
            $userId = User::query()->inRandomOrder()->value('id') ?? 1;
            DB::table('bookmarks')->insert([
                'user_id' => $userId,
                'surah_name' => $faker->firstNameMale(),
                'ayah_num' => $faker->randomDigit, 
                'ayah_verse_ar' => $faker->realText(rand(100, 200)), // Random date within the last 30 days
                'ayah_verse_en' => $faker->realText(rand(100, 200)), // Random date within the last 30 days
                'created_at' => Carbon::now()->subDays(rand(0, 90)), // Random date within the last 30 days
                'updated_at' => Carbon::now()->subDays(rand(0, 90)), // Random date within the last 30 days
            ]);
        }
    }
}
