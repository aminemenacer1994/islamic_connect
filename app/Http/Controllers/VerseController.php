<?php

// app/Http/Controllers/VerseController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ayah;
use App\Models\Information;

class VerseController extends Controller
{
    public function getVerses()
    {
        // Fetch all verses from the Ayah model
        $verses = Ayah::all();
        return response()->json(['verses' => $verses]);
    }

    public function getTranslations()
    {
        // Fetch all translations from the Information model
        $translations = Information::select('ayah_id', 'translation')->get();
        return response()->json(['translations' => $translations]);
    }
}
