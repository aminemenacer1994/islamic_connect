<?php

use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AIController;
use App\Http\Controllers\DebugController;
use App\Http\Controllers\Api\RamadanUkController;
use App\Http\Controllers\Api\RssProxyController;
use App\Http\Controllers\Api\PexelsController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/debug/subscription', [DebugController::class, 'subscriptionDebug']);
// });

Route::post('/ai/ask', [AIController::class, 'ask'])
    ->withoutMiddleware('auth:sanctum');
Route::post('/ai/batch-verify', [AIController::class, 'batchVerify'])
    ->withoutMiddleware('auth:sanctum');
Route::post('/ai/report', [AIController::class, 'report'])
    ->withoutMiddleware('auth:sanctum');
Route::get('/ramadan/uk', [RamadanUkController::class, 'show'])
    ->withoutMiddleware('auth:sanctum');
Route::get('/ramadan/uk/prayer-times', [RamadanUkController::class, 'prayerTimes'])
    ->withoutMiddleware('auth:sanctum');
Route::get('/rss', [RssProxyController::class, 'show'])
    ->withoutMiddleware('auth:sanctum');

Route::get('/pexels/search', [PexelsController::class, 'search'])
    ->withoutMiddleware('auth:sanctum');
