<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Content;


class ReadController extends Controller
{
    public function index()
    {
        return view('read');
    }
}
