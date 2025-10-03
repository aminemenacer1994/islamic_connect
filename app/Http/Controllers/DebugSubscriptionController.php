<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SubscriptionDebugController extends Controller
{
    public function debugSubscription(Request $request)
    {
        $user = auth()->user();
        
        if (!$user) {
            return response()->json(['error' => 'Not authenticated'], 401);
        }

        // Detailed debug information
        $debug = [
            'user_id' => $user->id,
            'user_email' => $user->email,
            'stripe_id' => $user->stripe_id,
            'has_stripe_id' => !empty($user->stripe_id),
            'subscribed_default' => $user->subscribed('default'),
            'on_trial' => $user->onTrial('default'),
            'has_subscription_model' => $user->subscription('default') ? true : false,
        ];

        // If subscription exists, get more details
        if ($user->subscription('default')) {
            $subscription = $user->subscription('default');
            $debug['subscription_details'] = [
                'stripe_status' => $subscription->stripe_status,
                'stripe_id' => $subscription->stripe_id,
                'ends_at' => $subscription->ends_at,
                'trial_ends_at' => $subscription->trial_ends_at,
                'on_grace_period' => $subscription->onGracePeriod(),
                'cancelled' => $subscription->cancelled(),
                'valid' => $subscription->valid(),
                'active' => $subscription->active(),
            ];
        }

        // Get all subscriptions for this user
        $debug['all_subscriptions'] = $user->subscriptions()->get()->map(function($sub) {
            return [
                'id' => $sub->id,
                'name' => $sub->name,
                'stripe_status' => $sub->stripe_status,
                'stripe_id' => $sub->stripe_id,
                'ends_at' => $sub->ends_at,
                'trial_ends_at' => $sub->trial_ends_at,
            ];
        });

        return response()->json($debug);
    }

    public function forceSyncWithStripe(Request $request)
    {
        $user = auth()->user();
        
        if (!$user || !$user->stripe_id) {
            return response()->json(['error' => 'No Stripe customer found'], 400);
        }

        try {
            // Force sync with Stripe
            $user->syncStripeStatus();
            $user->refresh();

            return response()->json([
                'message' => 'Sync completed',
                'subscribed' => $user->subscribed('default'),
                'subscription_details' => $user->subscription('default') ? [
                    'status' => $user->subscription('default')->stripe_status,
                    'ends_at' => $user->subscription('default')->ends_at,
                ] : null
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Sync failed: ' . $e->getMessage()
            ], 500);
        }
    }
}

?>