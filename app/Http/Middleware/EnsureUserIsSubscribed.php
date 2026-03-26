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
        
        \Log::info('Subscription middleware check', [
            'user_id' => $user?->id,
            'has_subscription' => $user?->subscribed('premium'),
            'path' => $request->path()
        ]);

        if (!$user) {
            return redirect()
                ->guest(route('login'))
                ->with('error', 'Please log in to access this content.');
        }

        if ($user->isAdmin()) {
            return $next($request);
        }

        if (!$user->subscribed('premium')) {
            return redirect('/subscribe')->with('error', 'This content requires an active subscription.');
        }

        return $next($request);
    }
}
