<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Cashier\Cashier;
use Stripe\Checkout\Session;
use Illuminate\Support\Facades\Log;

class SubscriptionController extends Controller
{
    /**
     * Create a Stripe checkout session
     */
    public function createCheckoutSession(Request $request)
    {
        // Log the request method for debugging
        Log::info('Checkout session request', [
            'method' => $request->method(),
            'user_id' => auth()->id(),
            'intended' => $request->input('intended')
        ]);

        $user = $request->user();

        if (!$user) {
            Log::warning('Unauthenticated checkout attempt');
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        // Ensure user has a Stripe customer ID
        if (!$user->stripe_id) {
            try {
                $user->createAsStripeCustomer();
                Log::info('Created Stripe customer for user', ['user_id' => $user->id]);
            } catch (\Exception $e) {
                Log::error('Error creating Stripe customer: ' . $e->getMessage());
                return response()->json(['error' => 'Failed to create customer profile'], 500);
            }
        }

        $intended = $request->input('intended', '/content');

        try {
            $checkout = Session::create([
                'customer' => $user->stripe_id,
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price' => 'price_1Ry9j2Iol4Q5wn4O7bE9kvbZ', // Your Stripe price ID
                    'quantity' => 1,
                ]],
                'mode' => 'subscription',
                'success_url' => route('checkout-return') . '?session_id={CHECKOUT_SESSION_ID}&intended=' . urlencode($intended),
                'cancel_url' => route('home') . '?cancelled=true',
                'metadata' => [
                    'user_id' => $user->id,
                    'intended_route' => $intended,
                ],
                'subscription_data' => [
                    'metadata' => [
                        'user_id' => $user->id,
                    ],
                ],
            ]);

            Log::info('Stripe checkout session created', [
                'session_id' => $checkout->id,
                'user_id' => $user->id
            ]);

            return response()->json(['id' => $checkout->id]);
        } catch (\Exception $e) {
            Log::error('Stripe checkout error: ' . $e->getMessage(), [
                'user_id' => $user->id,
                'intended' => $intended,
                'error' => $e->getMessage()
            ]);
            return response()->json(['error' => 'Failed to create checkout session. Please try again.'], 500);
        }
    }

    /**
     * Handle successful checkout return
     */
    public function handleCheckoutReturn(Request $request)
    {
        $sessionId = $request->query('session_id');
        $intended = $request->query('intended', '/');
        
        if ($sessionId) {
            try {
                $session = Cashier::stripe()->checkout->sessions->retrieve($sessionId);
                
                if ($session->payment_status === 'paid') {
                    // Optionally verify the subscription was created
                    $user = auth()->user();
                    if ($user && $user->subscribed('default')) {
                        return redirect($intended)->with('success', 'Subscription activated! Welcome to premium content.');
                    }
                    
                    return redirect()->route('home')->with('success', 'Subscription successful! Your premium access is being activated.');
                }
            } catch (\Exception $e) {
                Log::error('Checkout return error: ' . $e->getMessage());
            }
        }
        
        return redirect()->route('home')->with('error', 'There was an issue with your subscription. Please contact support if you were charged.');
    }

    /**
     * Get user subscription status
     */
    public function getSubscriptionStatus(Request $request)
    {
        $user = $request->user();
        
        if (!$user) {
            return response()->json([
                'subscribed' => false,
                'user_authenticated' => false
            ]);
        }

        try {
            $subscribed = $user->subscribed('default');
            
            // Get additional subscription info if subscribed
            $subscriptionInfo = null;
            if ($subscribed) {
                $subscription = $user->subscription('default');
                $subscriptionInfo = [
                    'active' => $subscription->active(),
                    'on_trial' => $subscription->onTrial(),
                    'ends_at' => $subscription->ends_at ? $subscription->ends_at->toDateString() : null,
                    'trial_ends_at' => $subscription->trial_ends_at ? $subscription->trial_ends_at->toDateString() : null,
                ];
            }
            
            return response()->json([
                'subscribed' => $subscribed,
                'user_authenticated' => true,
                'subscription_info' => $subscriptionInfo
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching subscription status: ' . $e->getMessage(), [
                'user_id' => $user->id
            ]);
            
            return response()->json([
                'subscribed' => false,
                'user_authenticated' => true,
                'error' => 'Unable to verify subscription status'
            ]);
        }
    }

    /**
     * Cancel subscription
     */
    public function cancelSubscription(Request $request)
    {
        $user = $request->user();
        
        if (!$user || !$user->subscribed('default')) {
            return response()->json(['error' => 'No active subscription found'], 404);
        }

        try {
            $user->subscription('default')->cancel();
            
            return response()->json([
                'success' => true,
                'message' => 'Subscription cancelled. You will retain access until the end of your billing period.'
            ]);
        } catch (\Exception $e) {
            Log::error('Error cancelling subscription: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to cancel subscription'], 500);
        }
    }

    /**
     * Resume subscription
     */
    public function resumeSubscription(Request $request)
    {
        $user = $request->user();
        
        if (!$user || !$user->subscription('default')) {
            return response()->json(['error' => 'No subscription found'], 404);
        }

        try {
            $user->subscription('default')->resume();
            
            return response()->json([
                'success' => true,
                'message' => 'Subscription resumed successfully!'
            ]);
        } catch (\Exception $e) {
            Log::error('Error resuming subscription: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to resume subscription'], 500);
        }
    }
}