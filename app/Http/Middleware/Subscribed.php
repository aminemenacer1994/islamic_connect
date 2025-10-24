<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Subscribed
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check() && (Auth::user()->isAdmin() || Auth::user()->subscribed('premium'))) {
            return $next($request);
        }

        return redirect('/subscribe')->with('error', 'You need an active subscription to access this content.');
    }
}
