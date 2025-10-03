<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HadithController extends Controller
{
    public function index()
    {
        return view('hadith');
    }
}
