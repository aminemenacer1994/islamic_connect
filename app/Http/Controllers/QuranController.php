<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class QuranController extends Controller
{
    public function index()
    {
        return view('quran');
    }
}
