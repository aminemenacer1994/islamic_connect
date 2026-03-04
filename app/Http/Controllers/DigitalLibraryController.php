<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DigitalLibraryController extends Controller
{
    public function index()
    {
        return view('digital-library');
    }
}
