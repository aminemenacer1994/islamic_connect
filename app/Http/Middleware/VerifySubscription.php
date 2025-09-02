<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Stripe\Exception\ApiErrorException;

class VerifySubscription
{
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();
        
        if (!$user) {
            Log::info('Subscription middleware: User not authenticated', [
                'route' => $request->route() ? $request->route()->getName() : 'unknown',
                'path' => $request->path(),
                'url' => $request->fullUrl()
            ]);
            
            return $request->expectsJson()
                ? response()->json(['error' => 'Authentication required'], 401)
                : redirect('/login')->with('error', 'Please log in to access this content.');
        }

        Log::info('Subscription middleware: Checking subscription for authenticated user', [
            'user_id' => $user->id,
            'stripe_id' => $user->stripe_id,
            'route' => $request->route() ? $request->route()->getName() : 'unknown',
            'path' => $request->path()
        ]);

        // Force sync with Stripe only if user has stripe_id
        if ($user->stripe_id) {
            try {
                Log::info('Subscription middleware: Syncing with Stripe', ['user_id' => $user->id]);
                $user->syncStripeCustomerDetails(); // Replace syncStripeStatus
                $user->refresh();
                Log::info('Subscription middleware: Stripe sync completed', [
                    'user_id' => $user->id,
                    'subscribed_after_sync' => $user->subscribed('default')
                ]);
            } catch (ApiErrorException $e) {
                if (str_contains($e->getMessage(), 'No such customer')) {
                    $user->stripe_id = null;
                    $user->save();
                    Log::warning('Cleared invalid stripe_id in middleware', [
                        'user_id' => $user->id,
                        'error' => $e->getMessage()
                    ]);
                } else {
                    Log::error('Failed to sync Stripe status in middleware', [
                        'user_id' => $user->id,
                        'error' => $e->getMessage()
                    ]);
                    // Continue execution to avoid blocking
                }
            } catch (\Exception $e) {
                Log::error('Unexpected error in middleware sync', [
                    'user_id' => $user->id,
                    'error' => $e->getMessage()
                ]);
                // Continue execution
            }
        } else {
            Log::warning('Subscription middleware: User has no Stripe ID', [
                'user_id' => $user->id
            ]);
        }

        // Check if user has active subscription
        $isSubscribed = $user->subscribed('default');
        
        Log::info('Subscription middleware: Subscription check result', [
            'user_id' => $user->id,
            'is_subscribed' => $isSubscribed,
            'subscriptions_count' => $user->subscriptions()->count()
        ]);

        if (!$isSubscribed) {
            Log::warning('Subscription middleware: User not subscribed - blocking access', [
                'user_id' => $user->id,
                'route' => $request->route() ? $request->route()->getName() : 'unknown',
                'path' => $request->path(),
                'has_stripe_id' => !empty($user->stripe_id),
                'all_subscriptions' => $user->subscriptions()->get(['name', 'stripe_status', 'ends_at'])->toArray()
            ]);
            
            return $request->expectsJson()
                ? response()->json([
                    'error' => 'Subscription required',
                    'subscription_required' => true,
                    'redirect_url' => '/media?subscribe=true',
                    'debug_info' => config('app.debug') ? [
                        'user_stripe_id' => $user->stripe_id,
                        'subscriptions_count' => $user->subscriptions()->count()
                    ] : null
                ], 403)
                : redirect('/media?subscribe=true&intended=' . urlencode($request->fullUrl()))
                    ->with('error', 'A subscription is required to access this content.');
        }

        $subscription = $user->subscription('default');
        
        if ($subscription && !$subscription->valid()) {
            Log::warning('Subscription middleware: Subscription not valid', [
                'user_id' => $user->id,
                'subscription_status' => $subscription->stripe_status,
                'ends_at' => $subscription->ends_at,
                'on_grace_period' => $subscription->onGracePeriod(),
                'cancelled' => $subscription->cancelled(),
                'route' => $request->route() ? $request->route()->getName() : 'unknown'
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
            'subscription_status' => $subscription ? $subscription->stripe_status : 'no_default_subscription',
            'route' => $request->route() ? $request->route()->getName() : 'unknown'
        ]);

        return $next($request);
    }
}