<?php

use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AIController;
use App\Http\Controllers\DebugController;
use App\Http\Controllers\Api\RamadanUkController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/debug/subscription', [DebugController::class, 'subscriptionDebug']);
// });

Route::post('/ai/ask', [AIController::class, 'ask']);
Route::get('/ramadan/uk', [RamadanUkController::class, 'show']);
Route::get('/ramadan/uk/prayer-times', [RamadanUkController::class, 'prayerTimes']);
