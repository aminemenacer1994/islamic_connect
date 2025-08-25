<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserIsSubscribed
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if (!$user) {
            // User not authenticated
            return redirect()->route('login')->with('error', 'Please log in to access this content.');
        }

        if (!$user->subscribed('default')) {
            // User not subscribed
            if ($request->expectsJson()) {
                return response()->json([
                    'error' => 'Subscription required',
                    'message' => 'This content requires an active subscription.'
                ], 403);
            }

            return redirect()->route('media-center')->with('error', 'This content requires an active subscription.');
        }

        return $next($request);
    }
}
