<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Illuminate\Support\Facades\Log;

class SubscriptionController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        return view('subscribe');
    }

    public function getUser()
    {
        if (Auth::check()) {
            return response()->json(Auth::user());
        }
        return response()->json(['error' => 'Unauthenticated'], 401);
    }

    public function success(Request $request)
    {
        $user = auth()->user();
        
        if (!$user) {
            \Log::error('Success callback: No authenticated user');
            return redirect('/')->with('error', 'User not found.');
        }

        $sessionId = $request->query('session_id');
        
        if (!$sessionId) {
            \Log::error('Success callback: No session_id provided');
            return redirect('/subscribe?error=1');
        }

        try {
            \Stripe\Stripe::setApiKey(config('services.stripe.secret'));
            
            $session = \Stripe\Checkout\Session::retrieve([
                'id' => $sessionId,
                'expand' => ['subscription']
            ]);
            
            \Log::info('Stripe session retrieved', [
                'session_id' => $sessionId,
                'subscription' => $session->subscription,
                'customer' => $session->customer,
                'payment_status' => $session->payment_status,
                'user_id' => $user->id
            ]);
            
            if (!$session->subscription) {
                \Log::error('No subscription in session');
                return redirect('/subscribe?error=1');
            }
            
            // Get the full subscription object
            if (is_string($session->subscription)) {
                $stripeSubscription = \Stripe\Subscription::retrieve($session->subscription);
            } else {
                $stripeSubscription = $session->subscription;
            }
            
            \Log::info('Creating subscription record', [
                'stripe_id' => $stripeSubscription->id,
                'status' => $stripeSubscription->status,
                'price' => $stripeSubscription->items->data[0]->price->id
            ]);
            
            // Create or update subscription
            $subscription = $user->subscriptions()->updateOrCreate(
                ['stripe_id' => $stripeSubscription->id],
                [
                    'name' => 'premium',
                    'stripe_status' => $stripeSubscription->status,
                    'stripe_price' => $stripeSubscription->items->data[0]->price->id,
                    'quantity' => 1,
                    'trial_ends_at' => null,
                    'ends_at' => null,
                ]
            );
            
            \Log::info('Subscription record created', ['id' => $subscription->id]);
            
            return redirect('/subscribe?success=1');
            
        } catch (\Exception $e) {
            \Log::error('Error in success callback', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return redirect('/subscribe?error=1');
        }
    }

    public function handleWebhook(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $webhookSecret = config('services.stripe.webhook_secret');

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sigHeader,
                $webhookSecret
            );
        } catch (\Exception $e) {
            \Log::error('Webhook signature verification failed: ' . $e->getMessage());
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        \Log::info('Webhook received: ' . $event->type);

        // Handle the event
        switch ($event->type) {
            case 'checkout.session.completed':
                $session = $event->data->object;
                $this->handleCheckoutSessionCompleted($session);
                break;
                
            case 'customer.subscription.created':
            case 'customer.subscription.updated':
                $subscription = $event->data->object;
                $this->handleSubscriptionUpdated($subscription);
                break;
                
            case 'customer.subscription.deleted':
                $subscription = $event->data->object;
                $this->handleSubscriptionDeleted($subscription);
                break;
        }

        return response()->json(['status' => 'success']);
    }

    protected function handleCheckoutSessionCompleted($session)
    {
        \Log::info('Checkout completed', ['session_id' => $session->id]);
        
        // Find user by customer ID
        $user = \App\Models\User::where('stripe_id', $session->customer)->first();
        
        if ($user && $session->subscription) {
            \Log::info('Creating subscription for user: ' . $user->id);
            
            // Laravel Cashier will handle this automatically if set up correctly
            // But you can manually sync if needed
            $user->subscriptions()->updateOrCreate(
                ['stripe_id' => $session->subscription],
                [
                    'name' => 'premium',
                    'stripe_status' => 'active',
                    'stripe_price' => $session->line_items->data[0]->price->id ?? null,
                ]
            );
        }
    }

    protected function handleSubscriptionUpdated($subscription)
    {
        $user = \App\Models\User::where('stripe_id', $subscription->customer)->first();
        
        if ($user) {
            \Log::info('Updating subscription for user: ' . $user->id);
            
            $user->subscriptions()->updateOrCreate(
                ['stripe_id' => $subscription->id],
                [
                    'stripe_status' => $subscription->status,
                    'stripe_price' => $subscription->items->data[0]->price->id ?? null,
                    'quantity' => $subscription->items->data[0]->quantity ?? 1,
                    'trial_ends_at' => $subscription->trial_end ? \Carbon\Carbon::createFromTimestamp($subscription->trial_end) : null,
                    'ends_at' => $subscription->cancel_at ? \Carbon\Carbon::createFromTimestamp($subscription->cancel_at) : null,
                ]
            );
        }
    }

    protected function handleSubscriptionDeleted($subscription)
    {
        $user = \App\Models\User::where('stripe_id', $subscription->customer)->first();
        
        if ($user) {
            \Log::info('Subscription cancelled for user: ' . $user->id);
            
            $user->subscriptions()
                ->where('stripe_id', $subscription->id)
                ->update(['stripe_status' => 'canceled']);
        }
    }

    public function createSubscription(Request $request)
    {
        $request->validate([
            'price_lookup_key' => 'required|string|in:price_1SDrmPGsDD2PdzHqTgawcJZd,price_1SDrmPGsDD2PdzHqDOScwoI2,price_1SDrmPGsDD2PdzHqvk1SOoT3',
        ]);

        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'message' => 'Please create an account to subscribe.',
                'errors' => ['auth' => ['You must be logged in to subscribe.']]
            ], 401); // Changed from 422 to 401
        }

        \Log::info('Creating subscription for user: ' . $user->id . ' with price: ' . $request->price_lookup_key);

        try {
            Stripe::setApiKey(config('services.stripe.secret'));
            
            // Add more logging
            \Log::info('Stripe API Key set');
            
            $checkoutSession = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price' => $request->price_lookup_key,
                    'quantity' => 1,
                ]],
                'mode' => 'subscription',
                'success_url' => route('subscribe.success') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('subscribe') . '?cancelled=1',
                'customer' => $user->createOrGetStripeCustomer()->id,
            ]);

            \Log::info('Checkout session created: ' . $checkoutSession->id);

            return response()->json(['redirect' => $checkoutSession->url]);
        } catch (\Exception $e) {
            \Log::error('Subscription error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error processing subscription: ' . $e->getMessage(), 
                'errors' => ['stripe' => [$e->getMessage()]]
            ], 422);
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
        
        if ($subscription) {
            $stripeSubscription = $subscription->asStripeSubscription();
            $endsAt = $stripeSubscription->cancel_at 
                ? \Carbon\Carbon::createFromTimestamp($stripeSubscription->cancel_at) 
                : ($stripeSubscription->current_period_end 
                    ? \Carbon\Carbon::createFromTimestamp($stripeSubscription->current_period_end) 
                    : null);
            $isSubscribed = $subscription->active() || $subscription->onGracePeriod();
            return response()->json([
                'is_subscribed' => $isSubscribed,
                'plan' => $subscription->stripe_price,
                'ends_at' => $endsAt ? $endsAt->toIso8601String() : null,
            ]);
        }
        
        return response()->json([
            'is_subscribed' => false,
            'plan' => 'free',
            'ends_at' => null,
        ]);
    }


    public function cancelSubscription(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
        }

        $subscription = $user->subscription('premium');
        if ($subscription && $subscription->active()) {
            $subscription->cancel();
            $stripeSubscription = $subscription->asStripeSubscription();
            $endsAt = \Carbon\Carbon::createFromTimestamp($stripeSubscription->current_period_end)->toIso8601String();
            $subscription->ends_at = $endsAt;
            $subscription->save();

            return response()->json([
                'success' => true,
                'ends_at' => $endsAt,
            ]);
        }

        return response()->json(['success' => false, 'message' => 'No active subscription to cancel']);
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