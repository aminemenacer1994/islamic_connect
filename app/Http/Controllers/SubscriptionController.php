<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        return view('subscribe');
    }


    public function createSubscription(Request $request)
    {
        $request->validate([
            'price_lookup_key' => 'required|string|in:price_1SDrmPGsDD2PdzHqTgawcJZd,price_1SDrmPGsDD2PdzHqDOScwoI2,price_1SDrmPGsDD2PdzHqvk1SOoT3',
        ]);

        $user = Auth::user();
        \Log::info('Creating subscription for user: ' . $user->id . ' with price: ' . $request->price_lookup_key);

        try {
            $checkout = $user->newSubscription('premium', $request->price_lookup_key)->checkout([
                'success_url' => route('subscribe') . '?success=1',
                'cancel_url' => route('subscribe') . '?cancelled=1',
            ]);

            return redirect()->away($checkout->url);
        } catch (\Exception $e) {
            \Log::error('Subscription error: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Error: ' . $e->getMessage()]);
        }
    }

    public function subscriptionStatus()
    {
        $user = Auth::user();
        
        if (!$user) {
            return response()->json([
                'is_subscribed' => false,
                'plan' => 'free',
                'ends_at' => null
            ], 401);
        }
        
        $subscription = $user->subscription('premium');
        
        // If subscription is cancelled (has ends_at), allow resubscribing
        if ($subscription && $subscription->ends_at) {
            return response()->json([
                'is_subscribed' => false,
                'plan' => 'free',
                'ends_at' => $subscription->ends_at->toDateString(),
                'current_subscription' => [
                    'plan' => $subscription->stripe_price,
                    'ends_at' => $subscription->ends_at->toDateString()
                ]
            ]);
        }
        
        $isSubscribed = $user->subscribed('premium');

        return response()->json([
            'is_subscribed' => $isSubscribed,
            'plan' => $subscription?->stripe_price ?? 'free',
            'ends_at' => optional($subscription)->ends_at?->toDateString(),
        ]);
    }

    

    public function success(Request $request)
    {
        $user = Auth::user();
        $sessionId = $request->query('session_id');

        if ($sessionId) {
            try {
                // Explicitly set the Stripe API key
                \Stripe\Stripe::setApiKey(config('services.stripe.secret'));

                // Retrieve the checkout session from Stripe
                $session = \Stripe\Checkout\Session::retrieve($sessionId, [
                    'expand' => ['customer'],
                ]);

                // Ensure the user is linked to the Stripe customer
                if (!$user->stripe_id) {
                    $user->stripe_id = $session->customer;
                    $user->save();
                    \Log::info('Linked user to Stripe customer: ' . $user->id, [
                        'customer_id' => $session->customer,
                    ]);
                }

                // Check if the subscription exists
                $subscription = $user->subscription('premium');
                if ($subscription) {
                    \Log::info('Subscription found for user: ' . $user->id, [
                        'subscription_id' => $subscription->stripe_id,
                        'stripe_price' => $subscription->stripe_price,
                    ]);
                } else {
                    \Log::info('Subscription not yet synced for user: ' . $user->id, [
                        'session_id' => $sessionId,
                    ]);
                    // Note: Webhook will handle subscription creation
                }

                return redirect()->route('subscribe')->with('message', 'Subscription successful! Please wait a moment for the subscription to activate.');
            } catch (\Exception $e) {
                \Log::error('Error processing checkout session: ' . $e->getMessage());
                return redirect()->route('subscribe')->with('message', 'Error verifying subscription: ' . $e->getMessage());
            }
        }

        return redirect()->route('subscribe')->with('message', 'No session ID provided.');
    }

    public function cancelSubscription(Request $request)
    {
        $user = Auth::user();
        $subscription = $user->subscription('premium');

        if ($subscription) {
            $subscription->cancel();
            
            // Refresh to get updated ends_at
            $subscription = $subscription->fresh();
            
            return response()->json([
                'success' => true,
                'message' => 'Subscription cancelled.',
                'ends_at' => $subscription->ends_at ? $subscription->ends_at->toDateString() : null,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'No active subscription to cancel.',
        ], 400);
    }

    
    

    public function addPaymentMethod(Request $request)
    {
        $request->validate([
            'payment_method' => 'required|string',
            'cardholder_name' => 'required|string',
        ]);

        $user = Auth::user();
        $user->addPaymentMethod($request->payment_method);
        $user->setDefaultPaymentMethod($request->payment_method);

        return response()->json([
            'success' => true,
            'message' => 'Payment method added!',
        ]);
    }
}