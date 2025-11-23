<?php

namespace App\Http\Controllers;

use App\Models\AboutUsSection;

class AboutController extends Controller
{
    public function index()
    {
        $sections = AboutUsSection::orderBy('order')->get();

        return view('about', compact('sections'));
    }
}
