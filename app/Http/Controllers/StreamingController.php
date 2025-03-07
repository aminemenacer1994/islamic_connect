<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Streaming;

class StreamingController extends Controller
{
    public function index()
    {
        return view('streaming');
    }
}
