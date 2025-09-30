<?php

use App\Http\Controllers\SubscriptionController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DebugController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/debug/subscription', [DebugController::class, 'subscriptionDebug']);
// });