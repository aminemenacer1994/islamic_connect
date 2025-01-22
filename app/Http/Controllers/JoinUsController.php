<?php

namespace App\Http\Controllers;

use App\Models\JoinUs;
use Illuminate\Http\Request;

class JoinUsController extends Controller
{
    public function index()
    {
        return view('join_us');
    }

    public function submitMail(Request $request)
    {
        $this->validate($request, [
            'name',
            'email',
        ]);

        $join_us = new JoinUs();

        $join_us->name = $request->name;
        $join_us->email = $request->email;
        $join_us->save();
    }
}
