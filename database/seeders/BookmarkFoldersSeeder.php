<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\Folder;
use App\Models\Bookmark;
use App\Models\Ayah;
use App\Models\User;

class BookmarkFoldersSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        $preferredOwnerEmail = env('SEED_OWNER_EMAIL', env('SUPERADMIN_EMAIL'));
        $owner = null;

        if ($preferredOwnerEmail) {
            $owner = User::where('email', $preferredOwnerEmail)->first();
        }

        if (!$owner) {
            $owner = User::where('role', 'admin')->orderBy('id')->first();
        }

        if (!$owner) {
            $owner = User::orderByDesc('id')->first();
        }

        if (!$owner) {
            return;
        }

        $folderDefinitions = [
            ['name' => 'Daily Reflections', 'icon' => 'bi bi-sun', 'color' => 'warning', 'bookmark_count' => 4],
            ['name' => 'Ayahs For Growth', 'icon' => 'bi bi-leaf', 'color' => 'success', 'bookmark_count' => 4],
            ['name' => 'Guided Duas', 'icon' => 'bi bi-heart', 'color' => 'danger', 'bookmark_count' => 4],
            ['name' => 'Study Highlights', 'icon' => 'bi bi-bookmark-star', 'color' => 'info', 'bookmark_count' => 4],
        ];

        $totalBookmarks = array_sum(array_column($folderDefinitions, 'bookmark_count'));

        $ayahs = Ayah::with('surah')
            ->orderBy('surah_id')
            ->orderBy('ayah_id')
            ->take(max(16, $totalBookmarks))
            ->get();

        if ($ayahs->isEmpty()) {
            return;
        }

        $ayahs = $ayahs->shuffle();

        foreach ($folderDefinitions as $definition) {
            $folder = Folder::updateOrCreate(
                [
                    'user_id' => $owner->id,
                    'name' => $definition['name'],
                ],
                [
                    'icon' => $definition['icon'],
                    'color' => $definition['color'],
                    'is_smart' => false,
                ]
            );

            $selectedAyahs = $ayahs->splice(0, $definition['bookmark_count']);
            if ($selectedAyahs->isEmpty()) {
                continue;
            }

            $bookmarkIds = [];
            foreach ($selectedAyahs as $ayah) {
                $bookmark = Bookmark::firstOrNew([
                    'user_id' => $owner->id,
                    'surah_number' => $ayah->surah_id,
                    'ayah_number' => $ayah->ayah_id,
                ]);

                $needsSave = !$bookmark->exists || empty($bookmark->ayah_id) || empty($bookmark->ayah_verse_en);
                if ($needsSave) {
                    $surahName = $ayah->surah?->name_en ?? "Surah {$ayah->surah_id}";

                    $bookmark->fill([
                        'ayah_id' => $ayah->id,
                        'ayah_num' => $ayah->ayah_id,
                        'surah_name' => $surahName,
                        'ayah_verse_ar' => $ayah->ayah_text,
                        'ayah_verse_en' => $faker->realText(rand(120, 220)),
                        'title' => "{$surahName} ayah {$ayah->ayah_id}",
                    ]);
                    $bookmark->save();
                }

                $bookmarkIds[] = $bookmark->id;
            }

            if (!empty($bookmarkIds)) {
                $folder->bookmarks()->syncWithoutDetaching($bookmarkIds);
            }
        }
    }
}
