<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubscriptionController;


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/subscription-status', function () {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['subscribed' => false], 401);
        }
        return response()->json(['subscribed' => $user->subscribed('default')]);
    });

    // Route::post('/create-checkout-session', [\App\Http\Controllers\SubscriptionController::class, 'createCheckoutSession']);
});

Route::middleware('auth:sanctum')->post('/create-checkout-session', [SubscriptionController::class, 'createCheckoutSession'])->name('create-checkout-session');
