<?php

namespace App\Http\Controllers;

use App\Models\Ahadith;
use Illuminate\Http\Request;
use App\Models\Imam;
use App\Models\Chapter;



class AhadithController extends Controller
{
    public function index()
    {
        return view('ahadith');
    }

    public function getImams()
    {
        $imam = Imam::get();
        return response()->json($imam);
    }

    public function getChapters(Request $request)
    {

        $chapter = Chapter::with('imam')->where('imam_id', $request->imam_id)->get();

        return response()->json($chapter);
    }

    public function getAhadiths(Request $request)
    {
        $ahadith = Ahadith::with('chapter')->where('chapter_id', $request->chapterId)
                                           ->get();
        return response()->json($ahadith);
    }


    public function search(Request $request)
    {
        $ahadith = Ahadith::with('chapter')->where('hadith_en', 'LIKE', "%{$request->hadith_en}%")->get();
        return response()->json($ahadith);
    }

    
}
