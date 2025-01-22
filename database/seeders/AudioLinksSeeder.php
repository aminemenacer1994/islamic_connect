<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

use League\Csv\Writer;

class AudioLinksSeeder extends Seeder
{
    public function run()
    {
        // Retrieve audio URLs from the API
        $audioUrls = [];
        for ($i = 1; $i <= 6236; $i++) {
            try {
                $response = Http::get("https://cdn.islamic.network/quran/audio/64/ar.alafasy/{$i}.mp3");
                
                if ($response->successful()) {
                    // Get the URL from the response's effective URL
                    $audioUrls[] = [$response->effectiveUri()];
                } else {
                    $this->command->error("Failed to fetch audio file {$i}");
                }
            } catch (\Exception $e) {
                $this->command->error("Error fetching audio file {$i}: " . $e->getMessage());
            }
        }

        // Write audio URLs to CSV file
        $csv = Writer::createFromString('');
        $csv->insertAll($audioUrls);
        Storage::put('audio_urls.csv', $csv->getContent());
    }
}

