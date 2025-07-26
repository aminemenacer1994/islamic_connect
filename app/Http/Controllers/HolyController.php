<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HolyController extends Controller
{
    public function index()
    {
        return view('holy');
    }
}
