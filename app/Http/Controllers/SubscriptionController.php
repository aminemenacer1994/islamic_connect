<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Cashier\Cashier;
use Stripe\Checkout\Session;
use Illuminate\Support\Facades\Log;
use Stripe\Stripe;
use Exception;

class SubscriptionController extends Controller
{
    /**
     * Create a Stripe checkout session
     */
    public function createCheckoutSession(Request $request)
    {
        Log::info('=== STRIPE CHECKOUT DEBUG START ===');
        
        try {
            $user = auth()->user();
            Log::info('User check', [
                'authenticated' => !is_null($user),
                'user_id' => $user ? $user->id : null,
                'stripe_id' => $user ? $user->stripe_id : null
            ]);
            
            if (!$user) {
                Log::error('User not authenticated');
                return response()->json(['error' => 'Not authenticated'], 401);
            }

            $stripeSecret = config('services.stripe.secret');
            Log::info('Stripe config check', [
                'secret_configured' => !empty($stripeSecret),
                'secret_length' => strlen($stripeSecret ?? ''),
                'secret_starts_with' => substr($stripeSecret ?? '', 0, 7),
                'config_app_env' => config('app.env')
            ]);
            
            if (empty($stripeSecret)) {
                Log::error('Stripe secret not configured');
                return response()->json(['error' => 'Stripe not configured'], 500);
            }

            Log::info('Setting Stripe API key...');
            \Stripe\Stripe::setApiKey($stripeSecret);
            Log::info('Stripe API key set successfully');

            Log::info('Testing Stripe API connection...');
            try {
                $testConnection = \Stripe\Customer::all(['limit' => 1]);
                Log::info('Stripe API connection successful');
            } catch (\Exception $apiError) {
                Log::error('Stripe API connection failed', ['error' => $apiError->getMessage()]);
                return response()->json(['error' => 'Stripe API connection failed: ' . $apiError->getMessage()], 500);
            }

            if (!$user->stripe_id) {
                Log::info('Creating Stripe customer for user...');
                try {
                    $customer = $user->createAsStripeCustomer();
                    Log::info('Stripe customer created', ['stripe_id' => $customer->id]);
                } catch (\Exception $customerError) {
                    Log::error('Failed to create Stripe customer', ['error' => $customerError->getMessage()]);
                    return response()->json(['error' => 'Failed to create customer: ' . $customerError->getMessage()], 500);
                }
            }

            Log::info('Creating Stripe checkout session...');
            $sessionData = [
                'customer' => $user->stripe_id,
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price' => 'price_1Ry9j2Iol4Q5wn4O7bE9kvbZ',
                    'quantity' => 1,
                ]],
                'mode' => 'subscription',
                'success_url' => route('checkout-return') . '?session_id={CHECKOUT_SESSION_ID}&intended=' . urlencode($request->input('intended', '/media')),
                'cancel_url' => url('/media'),
            ];
            
            Log::info('Session data prepared', $sessionData);
            
            $session = \Stripe\Checkout\Session::create($sessionData);
            
            Log::info('Checkout session created successfully', [
                'session_id' => $session->id,
                'session_url' => $session->url
            ]);
            
            Log::info('=== STRIPE CHECKOUT DEBUG END (SUCCESS) ===');
            
            return response()->json(['checkout_url' => $session->url]);
            
        } catch (\Exception $e) {
            Log::error('=== STRIPE CHECKOUT DEBUG END (ERROR) ===', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json(['error' => 'Checkout failed: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Handle successful checkout return - Verify payment and sync subscription
     */
    public function handleCheckoutReturn(Request $request)
    {
        $sessionId = $request->query('session_id');
        $intended = $request->query('intended', '/media');
        
        Log::info('Checkout return handler started', [
            'session_id' => $sessionId,
            'intended' => $intended,
            'user_id' => auth()->id(),
            'user_authenticated' => auth()->check()
        ]);

        if (!$sessionId) {
            Log::warning('No session ID provided to checkout return');
            return redirect('/media')->with('error', 'Invalid checkout session.');
        }

        $user = auth()->user();
        if (!$user) {
            Log::error('User not authenticated during checkout return');
            return redirect('/login')->with('error', 'Please log in to complete your subscription.');
        }

        try {
            $session = Cashier::stripe()->checkout->sessions->retrieve($sessionId, [
                'expand' => ['subscription', 'subscription.items', 'customer']
            ]);
            
            Log::info('Retrieved Stripe session', [
                'session_id' => $sessionId,
                'payment_status' => $session->payment_status,
                'customer' => $session->customer->id ?? 'none',
                'subscription_id' => $session->subscription->id ?? 'none',
                'subscription_status' => $session->subscription->status ?? 'none'
            ]);
            
            if ($session->payment_status === 'paid' && $session->subscription) {
                if (in_array($session->subscription->status, ['active', 'trialing'])) {
                    $localSubscription = $this->syncSubscriptionFromStripe($user, $session->subscription);
                    
                    if ($localSubscription) {
                        Log::info('Subscription successfully synced', [
                            'user_id' => $user->id,
                            'session_id' => $sessionId,
                            'local_subscription_id' => $localSubscription->id,
                            'stripe_subscription_id' => $session->subscription->id
                        ]);
                        
                        $user->refresh(); // Reload user data
                        if ($user->subscribed('default')) {
                            Log::info('User subscription verified active', [
                                'user_id' => $user->id,
                                'subscription_active' => true
                            ]);
                            
                            // Use session flash to signal success
                            session()->reflash();
                            return redirect($intended)
                                ->with('success', 'Subscription activated successfully!')
                                ->with('subscribed', true);
                        } else {
                            Log::error('Subscription sync failed - user not showing as subscribed', [
                                'user_id' => $user->id,
                                'session_id' => $sessionId
                            ]);
                            return redirect('/media')->with('error', 'Subscription sync failed. Please contact support.');
                        }
                    } else {
                        Log::error('Failed to sync subscription to database', [
                            'user_id' => $user->id,
                            'session_id' => $sessionId
                        ]);
                        return redirect('/media')->with('error', 'Payment successful but subscription sync failed. Please contact support.');
                    }
                } else {
                    Log::warning('Subscription created but not active', [
                        'session_id' => $sessionId,
                        'subscription_status' => $session->subscription->status
                    ]);
                    return redirect('/media')->with('error', 'Subscription created but not yet active. Please check your email or contact support.');
                }
            } else {
                Log::warning('Payment not completed or no subscription created', [
                    'session_id' => $sessionId,
                    'payment_status' => $session->payment_status,
                    'has_subscription' => !empty($session->subscription)
                ]);
                
                return redirect('/media')->with('error', 'Payment was not completed successfully. Please try again.');
            }
        } catch (Exception $e) {
            Log::error('Checkout return error', [
                'session_id' => $sessionId,
                'user_id' => $user->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return redirect('/media')->with('error', 'There was an issue verifying your subscription. If you were charged, please contact support with session ID: ' . $sessionId);
        }
    }

    /**
     * Manually sync subscription from Stripe without webhooks
     */
    private function syncSubscriptionFromStripe($user, $stripeSubscription)
    {
        try {
            if (is_string($stripeSubscription)) {
                $stripeSubscription = Cashier::stripe()->subscriptions->retrieve($stripeSubscription, [
                    'expand' => ['items.data.price']
                ]);
            }

            Log::info('Syncing subscription from Stripe', [
                'user_id' => $user->id,
                'stripe_subscription_id' => $stripeSubscription->id,
                'status' => $stripeSubscription->status,
                'current_period_start' => $stripeSubscription->current_period_start,
                'current_period_end' => $stripeSubscription->current_period_end
            ]);

            $existingSubscription = $user->subscriptions()
                ->where('stripe_id', $stripeSubscription->id)
                ->first();

            if ($existingSubscription) {
                Log::info('Subscription already exists, updating', [
                    'subscription_id' => $existingSubscription->id,
                    'current_status' => $existingSubscription->stripe_status,
                    'new_status' => $stripeSubscription->status
                ]);
                
                $existingSubscription->update([
                    'stripe_status' => $stripeSubscription->status,
                    'quantity' => $stripeSubscription->items->data[0]->quantity ?? 1,
                    'ends_at' => $stripeSubscription->status === 'canceled' ? 
                        \Carbon\Carbon::createFromTimestamp($stripeSubscription->current_period_end) : null,
                ]);
                
                return $existingSubscription;
            }

            $subscription = $user->subscriptions()->create([
                'name' => 'default',
                'stripe_id' => $stripeSubscription->id,
                'stripe_status' => $stripeSubscription->status,
                'stripe_price' => $stripeSubscription->items->data[0]->price->id,
                'quantity' => $stripeSubscription->items->data[0]->quantity ?? 1,
                'trial_ends_at' => $stripeSubscription->trial_end ? 
                    \Carbon\Carbon::createFromTimestamp($stripeSubscription->trial_end) : null,
                'ends_at' => $stripeSubscription->status === 'canceled' ? 
                    \Carbon\Carbon::createFromTimestamp($stripeSubscription->current_period_end) : null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($stripeSubscription->items->data as $item) {
                $subscription->items()->create([
                    'stripe_id' => $item->id,
                    'stripe_product' => $item->price->product,
                    'stripe_price' => $item->price->id,
                    'quantity' => $item->quantity,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            Log::info('New subscription created successfully', [
                'subscription_id' => $subscription->id,
                'stripe_id' => $subscription->stripe_id,
                'status' => $subscription->stripe_status,
                'user_subscribed' => $user->subscribed('default')
            ]);

            return $subscription;

        } catch (Exception $e) {
            Log::error('Error syncing subscription from Stripe', [
                'user_id' => $user->id,
                'stripe_subscription_id' => is_object($stripeSubscription) ? $stripeSubscription->id : $stripeSubscription,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    /**
     * Get user subscription status with detailed info
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
            $user->syncStripeStatus(); // Force sync from Stripe
            $user->refresh();
            $subscribed = $user->subscribed('default');
            
            $subscriptionInfo = null;
            if ($subscribed) {
                $subscription = $user->subscription('default');
                $subscriptionInfo = [
                    'active' => $subscription->valid(),
                    'on_trial' => $subscription->onTrial(),
                    'canceled' => $subscription->canceled(),
                    'ends_at' => $subscription->ends_at ? $subscription->ends_at->toDateString() : null,
                    'trial_ends_at' => $subscription->trial_ends_at ? $subscription->trial_ends_at->toDateString() : null,
                    'stripe_status' => $subscription->stripe_status,
                    'current_period_end' => $subscription->asStripeSubscription()->current_period_end ?? null,
                ];
            }
            
            Log::info('Subscription status checked', [
                'user_id' => $user->id,
                'subscribed' => $subscribed,
                'subscription_info' => $subscriptionInfo
            ]);
            
            return response()->json([
                'subscribed' => $subscribed,
                'user_authenticated' => true,
                'subscription_info' => $subscriptionInfo
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching subscription status', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'subscribed' => false,
                'user_authenticated' => true,
                'error' => 'Unable to verify subscription status'
            ], 500);
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
            
            Log::info('Subscription cancelled by user', [
                'user_id' => $user->id
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'Subscription cancelled. You will retain access until the end of your billing period.'
            ]);
        } catch (Exception $e) {
            Log::error('Error cancelling subscription', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
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
            
            Log::info('Subscription resumed by user', [
                'user_id' => $user->id
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'Subscription resumed successfully!'
            ]);
        } catch (Exception $e) {
            Log::error('Error resuming subscription', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
            return response()->json(['error' => 'Failed to resume subscription'], 500);
        }
    }
}