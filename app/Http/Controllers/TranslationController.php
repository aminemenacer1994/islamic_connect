<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TranslationAhmedAli;
use App\Models\TranslationAhmedRaza;
use Illuminate\Support\Facades\Log;

class TranslationController extends Controller
{
    
    public function fetchAhmedRazaTranslation($id)
    {
        Log::info("Fetching Ahmed Raza translation for Ayah ID: $id");
        $translation = TranslationAhmedRaza::where('ayah_id', $id)->first();
        if ($translation) {
            return response()->json($translation->translation_ahmed_raza);
        }
        return response()->json(['error' => 'Translation not found'], 404);
    }
}
