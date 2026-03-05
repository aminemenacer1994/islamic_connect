<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RevertController extends Controller
{
    public function index()
    {
        return response()
            ->view('revert')
            ->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
            ->header('Pragma', 'no-cache')
            ->header('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
    }
}
