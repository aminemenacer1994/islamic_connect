<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\RamadanUkContentService;
use Illuminate\Http\Request;

class RamadanUkController extends Controller
{
    public function show(Request $request, RamadanUkContentService $service)
    {
        return response()->json($service->build($request));
    }

    public function prayerTimes(Request $request, RamadanUkContentService $service)
    {
        return response()->json($service->prayerTimes($request));
    }
}
