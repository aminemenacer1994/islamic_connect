<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class VerifySubscription
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
        $user = auth()->user();
        
        if (!$user) {
            Log::info('Subscription middleware: User not authenticated', [
                'route' => $request->route()->getName(),
                'path' => $request->path()
            ]);
            
            return $request->expectsJson()
                ? response()->json(['error' => 'Authentication required'], 401)
                : redirect('/login')->with('error', 'Please log in to access this content.');
        }

        // Force sync with Stripe
        try {
            $user->syncStripeStatus();
            $user->refresh();
        } catch (\Exception $e) {
            Log::error('Failed to sync Stripe status in middleware', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
        }

        if (!$user->subscribed('default')) {
            Log::info('Subscription middleware: User not subscribed', [
                'user_id' => $user->id,
                'route' => $request->route()->getName(),
                'path' => $request->path(),
                'subscriptions' => $user->subscriptions->toArray()
            ]);
            
            return $request->expectsJson()
                ? response()->json([
                    'error' => 'Subscription required',
                    'subscription_required' => true,
                    'redirect_url' => '/media?subscribe=true'
                ], 403)
                : redirect('/media?subscribe=true&intended=' . urlencode($request->fullUrl()))
                    ->with('error', 'A subscription is required to access this content.');
        }

        $subscription = $user->subscription('default');
        if (!$subscription->valid()) {
            Log::warning('Subscription middleware: Subscription not valid', [
                'user_id' => $user->id,
                'subscription_status' => $subscription->stripe_status,
                'ends_at' => $subscription->ends_at,
                'route' => $request->route()->getName()
            ]);
            
            return $request->expectsJson()
                ? response()->json([
                    'error' => 'Subscription expired or invalid',
                    'subscription_expired' => true,
                    'redirect_url' => '/media?renew=true'
                ], 403)
                : redirect('/media?renew=true')
                    ->with('error', 'Your subscription has expired. Please renew to continue accessing premium content.');
        }

        Log::info('Subscription middleware: Access granted', [
            'user_id' => $user->id,
            'subscription_status' => $subscription->stripe_status,
            'route' => $request->route()->getName()
        ]);

        return $next($request);
    }
}