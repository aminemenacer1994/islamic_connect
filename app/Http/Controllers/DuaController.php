<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Dua;


class DuaController extends Controller
{
    public function index()
    {
        return view('dua');
    }
}
