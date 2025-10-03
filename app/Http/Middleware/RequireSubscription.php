<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RequireSubscription
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        if (!$user || !$user->subscribed('default')) {
            return redirect('/')->with('error', 'Subscription required to access this content.');
        }

        return $next($request);
    }
}
