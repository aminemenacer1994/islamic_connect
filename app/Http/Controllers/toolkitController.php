<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

class ToolkitController extends Controller
{
    public function index()
    {
       return view ('toolkit');
    }
}
