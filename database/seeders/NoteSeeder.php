<?php

namespace Database\Seeders; // Ensure this is at the top

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Carbon\Carbon;


class NoteSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Pick a single, deterministic owner for all seeded notes so
        // the signed-in user actually sees data in the UI.
        // Priority: SEED_OWNER_EMAIL -> SUPERADMIN_EMAIL -> latest user
        $owner = User::where('email', env('SEED_OWNER_EMAIL', env('SUPERADMIN_EMAIL')))->first()
            ?? User::orderByDesc('id')->first();

        if (!$owner) {
            return; // no users to attach notes to
        }

        foreach (range(1, 30) as $index) {
            DB::table('notes')->insert([
                'user_id' => (int) $owner->id,
                'surah_name' => $faker->firstNameMale(),
                'ayah_notes' => $faker->realText(rand(100, 200)),
                'created_at' => Carbon::now()->subDays(rand(0, 90)),
                'updated_at' => Carbon::now()->subDays(rand(0, 90)),
            ]);
        }
    }
}
