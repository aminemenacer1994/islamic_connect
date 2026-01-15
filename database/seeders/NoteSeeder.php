<?php

namespace Database\Seeders; // Ensure this is at the top

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
use App\Models\Surah;
use App\Models\Ayah;
use App\Models\Translation;
use Carbon\Carbon;


class NoteSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Pick a single owner so seeded notes appear in the current admin UI.
        $preferredEmail = env('SEED_OWNER_EMAIL', env('SUPERADMIN_EMAIL'));
        $owner = null;

        if ($preferredEmail) {
            $owner = User::where('email', $preferredEmail)->first();
        }

        $superAdminCandidate = User::whereIn('email', ['eazmm@hotmail.com', 'admin@example.com'])
            ->orderBy('id')
            ->first();

        $owner = $owner
            ?? $superAdminCandidate
            ?? User::where('role', 'admin')->orderBy('id')->first()
            ?? User::orderByDesc('id')->first();

        if (!$owner) {
            return;
        }

        $surahPool = Surah::all();
        if ($surahPool->isEmpty()) {
            return;
        }

        $subjects = [
            "Gratitude for divine guidance",
            "Patience strengthened through the verse",
            "A reminder to stand firm in prayer",
            "Commitment to the lesson",
            "Needs energy to act on mercy",
            "Seeking comfort amid uncertainty",
            "Reflecting on mercy and forgiveness",
            "Daily wakeup to do better",
        ];

        $messages = [
            "Today I asked Allah to keep me steady when life feels heavy, just like this verse promises patience.",
            "I can implement this by showing patience with my family today.",
            "My trust in Allah grows every time I read this passage and let it guide my choices.",
            "Let this verse guide the way I handle challenges and extend mercy to others.",
            "This reminded me to pause and thank Allah for His mercy.",
            "I will write this verse on my mirror so I remember compassion every morning.",
            "This promises that ease follows hardship; I saved it for the next difficult moment.",
            "I can hear the reminder to stay humble and to keep giving when I read this.",
        ];

        $hasTranslationTable = Schema::hasTable('translations');

        foreach (range(1, 30) as $index) {
            $surah = $surahPool->random();
            $ayah = Ayah::where('surah_id', $surah->id)->inRandomOrder()->first();
            $ayahNumber = $ayah ? (int) $ayah->ayah_id : $faker->numberBetween(1, 10);
            $arabic = $ayah ? $ayah->ayah_text : $faker->sentence(10);
            $translation = '';
            if ($ayah) {
                $fromTranslation = null;
                if ($hasTranslationTable) {
                    $fromTranslation = Translation::where('ayah_id', $ayah->id)
                        ->where('language', 'en')
                        ->inRandomOrder()
                        ->value('translation_text');
                }
                $translation = $fromTranslation ?: $faker->sentence(12);
            } else {
                $translation = $faker->sentence(12);
            }

            $subject = $faker->randomElement($subjects);
            $message = $faker->randomElement($messages);
            $visibility = $faker->randomElement(['public', 'public', 'private']);

            $payload = [
                'user_id' => (int) $owner->id,
                'surah_name' => sprintf('%d - %s', $surah->id, $surah->name_en),
                'ayah_num' => (string) $ayahNumber,
                'ayah_info' => $subject,
                'ayah_verse_ar' => $arabic,
                'ayah_verse_en' => $translation,
                'ayah_notes' => $message,
                'visibility_option' => $visibility,
                'is_speech_to_text' => false,
                'created_at' => Carbon::now()->subDays(rand(0, 90)),
                'updated_at' => Carbon::now()->subDays(rand(0, 90)),
            ];
            if (Schema::hasColumn('notes', 'option')) {
                $payload['option'] = $visibility === 'private' ? 1 : 0;
            }
            DB::table('notes')->insert($payload);
        }
    }
}
