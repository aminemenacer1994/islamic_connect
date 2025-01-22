<?php

namespace App\Http\Controllers;

use App\Models\Correction;
use Illuminate\Http\Request;

class CorrectionController extends Controller
{

    public function index()
    {
        return view('correction');
    }

    public function getCorrections()
    {
        $correction = Correction::orderBy('id', 'desc')->get();
        return $correction;
    }

    public function submit(Request $request)
    {
        $this->validate($request, [
            'added_notes' => 'required|string',
            'rating' => 'integer|min:1|max:5'
        ]);

        $correction = new Correction();
        $correction->added_notes = $request->added_notes;
        $correction->rating = $request->rating; // Add this line
        $correction->save();
    }

    public function deleteCorrections($id)
    {
        $correction = Correction::findOrFail($id);
        $correction->delete();
        return response()->json([
            'message' => 'Correction deleted successfully'
        ]);
    }
}
