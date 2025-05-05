<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MosqueController extends Controller
{
    public function index()
    {
        return view('mosque');
    }
}
