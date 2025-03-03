<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Guide;

class GuideController extends Controller
{
    public function index()
    {
        return view('guide');
    }
}
