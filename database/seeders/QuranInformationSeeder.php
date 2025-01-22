<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\Information;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use App\MarkdownContent;

class QuranInformationSeeder extends Seeder
{
    public function run()
    {
        // Directory where your Markdown files are stored
        $directory = '././database/data/dataForInformationModel';

        // Get all Markdown files from the directory
        $markdownFiles = File::files($directory);
        $quranInfoArray = [];

        foreach ($markdownFiles as $file) {
            // Read the file content
            $fileContents = File::get($file->getPathname());
            $filename = $file->getFilename();



            // Separate metadata and content
            list($metadata, $content) = explode('-->', $fileContents, 2);

            // Extract verses (lines starting with '#')
            preg_match_all('/# (\d+)\s*([\s\S]*?)(?=# \d+|\z)/', $content, $matches, PREG_SET_ORDER);

            foreach ($matches as $match) {
                $verseNumber = $match[1];
                $verseContent = trim($match[2]);

                if (str_contains($filename, "tafsir")) {
                    $columnName = "tafseer";
                } elseif (str_contains($filename, "translation")) {
                    $columnName = "translation";
                } elseif (str_contains($filename, "transliteration")) {
                    $columnName = "transliteration";
                }
                else {
                    $columnName =  "information";
                };

                $quranInfoArray[$verseNumber][$columnName] = $verseContent;
            }
        }
        foreach ($quranInfoArray as $ayah => $quranInfo) {
            $quranInfo['ayah_id'] = $ayah;

            Information::create($quranInfo); 
        }
    }
}
