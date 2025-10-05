<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MediaController extends Controller
{
    public function index()
    {
        return view('media');
    }

    public function getUser()
    {
        if (Auth::check()) {
            return response()->json(Auth::user());
        }
        return response()->json(null, 401);
    }

    public function getSubscriptionStatus()
    {
        if (!Auth::check()) {
            return response()->json([
                'is_subscribed' => false,
                'subscription' => null
            ], 401);
        }

        $user = Auth::user();
        $subscription = $user->subscription('premium'); // Changed from 'default' to 'premium'
        
        return response()->json([
            'is_subscribed' => $user->subscribed('premium'),
            'subscription' => $subscription ?: null,
        ]);
    }
}