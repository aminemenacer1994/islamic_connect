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

        // Use the same deterministic owner strategy as NoteSeeder
        $owner = User::where('email', env('SEED_OWNER_EMAIL', env('SUPERADMIN_EMAIL')))->first()
            ?? User::orderByDesc('id')->first();

        if (!$owner) {
            return; // no users to attach bookmarks to
        }

        foreach (range(1, 30) as $index) {
            DB::table('bookmarks')->insert([
                'user_id' => (int) $owner->id,
                'surah_name' => $faker->firstNameMale(),
                'ayah_num' => $faker->numberBetween(1, 286),
                'ayah_verse_ar' => $faker->realText(rand(100, 200)),
                'ayah_verse_en' => $faker->realText(rand(100, 200)),
                'created_at' => Carbon::now()->subDays(rand(0, 90)),
                'updated_at' => Carbon::now()->subDays(rand(0, 90)),
            ]);
        }
    }
}
