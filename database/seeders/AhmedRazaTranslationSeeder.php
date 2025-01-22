<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\TranslationAhmedRaza;

class AhmedRazaTranslationSeeder extends Seeder
{
    public function run()
    {
        $directory = database_path('data/translations');
        $markdownFiles = File::files($directory);

        if (empty($markdownFiles)) {
            dd('No files found in directory.');
        }

        $quranInfoArray = [];

        foreach ($markdownFiles as $file) {
            $fileContents = File::get($file->getPathname());
            $filename = $file->getFilename();

            if (strpos($fileContents, '-->') !== false) {
                list($metadata, $content) = explode('-->', $fileContents, 2);
            } else {
                $content = $fileContents;
            }

            if (empty($content)) {
                dd("Content could not be split correctly in file $filename.");
            }

            preg_match_all('/# (\d+)\s*([\s\S]*?)(?=# \d+|\z)/', $content, $matches, PREG_SET_ORDER);

            if (empty($matches)) {
                dd("No matches found in file $filename.");
            }

            foreach ($matches as $match) {
                $verseNumber = $match[1];
                $verseContent = trim($match[2]);
                $columnName = '';

                if (str_contains($filename, "translation_ahmed")) {
                    $columnName = "translation_ahmed";
                }

                if (!empty($columnName)) {
                    $quranInfoArray[$verseNumber][$columnName] = $verseContent;
                }
            }
        }

        foreach ($quranInfoArray as $ayah => $quranInfo) {
            echo "Inserting Ayah ID: $ayah with translation: " . ($quranInfo['translation_ahmed'] ?? 'null') . "\n";

            TranslationAhmedRaza::updateOrCreate(
                ['ayah_id' => $ayah],
                ['translation_ahmed_raza' => $quranInfo['translation_ahmed'] ?? null]
            );
        }
    }
}
