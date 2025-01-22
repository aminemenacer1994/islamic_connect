<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Information; // Replace with your model namespace
use Illuminate\Support\Facades\Storage;

class Mp3Seeder extends Seeder
{
    public function run()
    {
        $mp3Files = Storage::files('public/music');

        foreach ($mp3Files as $mp3File) {
            $filePath = str_replace('public/', '', $mp3File);

            Information::create([

                'audio' => $filePath,
            ]);
        }
    }
}
