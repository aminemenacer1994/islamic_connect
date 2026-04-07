<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hajj;

class HajjController extends Controller
{
    public function index()
    {
        return view('hajj');
    }
}
