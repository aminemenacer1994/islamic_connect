<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AthkarController extends Controller
{
    public function index()
    {
       return view ('athkar');
    }
}
