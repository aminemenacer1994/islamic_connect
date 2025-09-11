<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Laravel\Cashier\Subscription;

class DebugController extends Controller
{
    public function subscriptionDebug(Request $request)
    {
        try {
            $user = auth()->user();
            
            if (!$user) {
                return response()->json([
                    'error' => 'User not authenticated'
                ], 401);
            }

            // Get all subscriptions for this user
            $subscriptions = $user->subscriptions()
                ->with('items')
                ->get()
                ->map(function ($subscription) {
                    return [
                        'id' => $subscription->id,
                        'user_id' => $subscription->user_id,
                        'name' => $subscription->name,
                        'stripe_id' => $subscription->stripe_id,
                        'stripe_status' => $subscription->stripe_status,
                        'stripe_price' => $subscription->stripe_price,
                        'quantity' => $subscription->quantity,
                        'trial_ends_at' => $subscription->trial_ends_at,
                        'ends_at' => $subscription->ends_at,
                        'created_at' => $subscription->created_at,
                        'updated_at' => $subscription->updated_at,
                        'items' => $subscription->items->toArray(),
                        'methods' => [
                            'active' => $subscription->active(),
                            'cancelled' => $subscription->cancelled(),
                            'ended' => $subscription->ended(),
                            'on_grace_period' => $subscription->onGracePeriod(),
                            'on_trial' => $subscription->onTrial(),
                            'past_due' => $subscription->pastDue(),
                            'valid' => $subscription->valid(),
                        ]
                    ];
                });

            // Check various subscription methods
            $subscriptionChecks = [
                'subscribed_default' => $user->subscribed('default'),
                'subscribed_any' => $user->subscribed(),
                'has_default_payment_method' => $user->hasDefaultPaymentMethod(),
                'stripe_id' => $user->stripe_id,
            ];

            // Get the default subscription if it exists
            $defaultSubscription = $user->subscription('default');
            if ($defaultSubscription) {
                $subscriptionChecks['default_subscription'] = [
                    'id' => $defaultSubscription->id,
                    'stripe_status' => $defaultSubscription->stripe_status,
                    'valid' => $defaultSubscription->valid(),
                    'active' => $defaultSubscription->active(),
                ];
            }

            // Check if there are any webhook events for this user
            $recentWebhooks = \DB::table('failed_jobs')
                ->where('created_at', '>', now()->subHours(24))
                ->get();

            Log::info('Debug subscription check', [
                'user_id' => $user->id,
                'subscriptions_count' => $subscriptions->count(),
                'subscription_checks' => $subscriptionChecks
            ]);

            return response()->json([
                'user' => [
                    'id' => $user->id,
                    'email' => $user->email,
                    'stripe_id' => $user->stripe_id,
                    'created_at' => $user->created_at,
                ],
                'subscriptions' => $subscriptions,
                'checks' => $subscriptionChecks,
                'recent_failed_jobs' => $recentWebhooks->count(),
                'environment' => [
                    'app_env' => config('app.env'),
                    'stripe_key_set' => !empty(config('cashier.key')),
                    'stripe_secret_set' => !empty(config('cashier.secret')),
                ],
                'debug_time' => now()->toISOString()
            ]);

        } catch (\Exception $e) {
            Log::error('Debug subscription error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => 'Debug failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function debugPage()
    {
        return view('debug-subscription');
    }
}