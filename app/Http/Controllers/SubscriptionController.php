<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Carbon\Carbon;

class SubscriptionController extends Controller
{
    public function show()
    {
        return view('subscribe');
    }

    public function getUser()
    {
        if (Auth::check()) {
            return response()->json(Auth::user());
        }

        return response()->json(['error' => 'You must be logged in to proceed. Please sign in to continue.'], 401);
    }

    public function success(Request $request)
    {
        $user = auth()->user();

        if (!$user) {
            Log::error('Success callback: No authenticated user');
            return redirect('/subscribe')->with('error', 'User not found.');
        }

        $sessionId = $request->query('session_id');

        if (!$sessionId) {
            Log::error('Success callback: No session_id provided');
            return redirect('/subscribe?error=1');
        }

        try {
            Stripe::setApiKey(config('services.stripe.secret'));

            $session = \Stripe\Checkout\Session::retrieve([
                'id' => $sessionId,
                'expand' => ['subscription']
            ]);

            Log::info('Stripe session retrieved', [
                'session_id' => $sessionId,
                'subscription' => $session->subscription,
                'customer' => $session->customer,
                'payment_status' => $session->payment_status,
                'user_id' => $user->id
            ]);

            if (!$session->subscription) {
                Log::error('No subscription in session');
                return redirect('/subscribe?error=1');
            }

            // Get the full subscription object
            if (is_string($session->subscription)) {
                $stripeSubscription = \Stripe\Subscription::retrieve($session->subscription);
            } else {
                $stripeSubscription = $session->subscription;
            }

            Log::info('Creating subscription record', [
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

            Log::info('Subscription record created', ['id' => $subscription->id]);

            return redirect('/subscribe?success=1');
        } catch (\Exception $e) {
            Log::error('Error in success callback', [
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
            Log::error('Webhook signature verification failed: ' . $e->getMessage());
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        Log::info('Webhook received: ' . $event->type);

        switch ($event->type) {
            case 'checkout.session.completed':
                $session = $event->data->object;
                $this->handleCheckoutSessionCompleted($session);
                if (isset($session->mode) && $session->mode === 'payment') {
                    $this->recordOneTimePaymentFromSession($session);
                }
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

            case 'payment_intent.succeeded':
                $intent = $event->data->object;
                $this->recordPaymentIntent($intent, 'succeeded');
                break;

            case 'payment_intent.payment_failed':
                $intent = $event->data->object;
                $this->recordPaymentIntent($intent, 'failed');
                break;

            case 'charge.refunded':
                $charge = $event->data->object;
                $this->recordChargeRefund($charge);
                break;
        }

        return response()->json(['status' => 'success']);
    }

    protected function handleCheckoutSessionCompleted($session)
    {
        Log::info('Checkout completed', ['session_id' => $session->id]);

        $user = \App\Models\User::where('stripe_id', $session->customer)->first();

        if ($user && $session->subscription) {
            Log::info('Creating subscription for user: ' . $user->id);

            $user->subscriptions()->updateOrCreate(
                ['stripe_id' => $session->subscription],
                [
                    'name' => 'premium',
                    'stripe_status' => 'active',
                    'stripe_price' => $session->line_items->data[0]->price->id ?? null,
                    'quantity' => 1,
                    'trial_ends_at' => null,
                    'ends_at' => null,
                ]
            );
        }
    }

    protected function handleSubscriptionUpdated($subscription)
    {
        $user = \App\Models\User::where('stripe_id', $subscription->customer)->first();

        if ($user) {
            Log::info('Updating subscription for user: ' . $user->id);

            $user->subscriptions()->updateOrCreate(
                ['stripe_id' => $subscription->id],
                [
                    'name' => 'premium',
                    'stripe_status' => $subscription->status,
                    'stripe_price' => $subscription->items->data[0]->price->id ?? null,
                    'quantity' => $subscription->items->data[0]->quantity ?? 1,
                    'trial_ends_at' => $subscription->trial_end
                        ? Carbon::createFromTimestamp($subscription->trial_end)
                        : null,
                    'ends_at' => $subscription->cancel_at
                        ? Carbon::createFromTimestamp($subscription->cancel_at)
                        : null,
                ]
            );
        }
    }

    protected function handleSubscriptionDeleted($subscription)
    {
        $user = \App\Models\User::where('stripe_id', $subscription->customer)->first();

        if ($user) {
            Log::info('Subscription cancelled for user: ' . $user->id);

            $dbSubscription = $user->subscriptions()
                ->where('stripe_id', $subscription->id)
                ->first();

            if ($dbSubscription) {
                $dbSubscription->update([
                    'stripe_status' => 'canceled',
                    'ends_at' => now(),
                ]);
            }
        }
    }

    public function createSubscription(Request $request)
    {
        $allowedPrices = array_filter([
            config('services.stripe.prices.monthly') ?: 'price_1SKJCyGsDD2PdzHqUEaWiQkG',
            config('services.stripe.prices.yearly') ?: 'price_1SKJCyGsDD2PdzHq4qsR1TRh',
        ]);

        $request->validate([
            'price_lookup_key' => 'required|string|in:' . implode(',', $allowedPrices),
        ]);

        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'message' => 'Please create an account to subscribe.',
                'errors' => ['auth' => ['You must be logged in to subscribe.']]
            ], 401);
        }

        Log::info('Creating subscription for user: ' . $user->id . ' with price: ' . $request->price_lookup_key);

        try {
            Stripe::setApiKey(config('services.stripe.secret'));

            Log::info('Stripe API Key set');

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

            Log::info('Checkout session created: ' . $checkoutSession->id);

            return response()->json(['redirect' => $checkoutSession->url]);
        } catch (\Exception $e) {
            Log::error('Subscription error: ' . $e->getMessage());

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

        // Super admin is always treated as subscribed
        if ($user->isAdmin()) {
            return response()->json([
                'is_subscribed' => true,
                'plan' => 'admin',
                'ends_at' => null,
            ]);
        }

        $subscription = $user->subscription('premium');

        if ($subscription && ($subscription->active() || $subscription->onGracePeriod())) {
            try {
                $stripeSubscription = $subscription->asStripeSubscription();

                // Determine ends_at based on cancellation status
                $endsAt = null;

                if ($stripeSubscription->cancel_at) {
                    $endsAt = Carbon::createFromTimestamp($stripeSubscription->cancel_at);
                } elseif ($subscription->ends_at) {
                    $endsAt = Carbon::parse($subscription->ends_at);
                }

                return response()->json([
                    'is_subscribed' => true,
                    'plan' => $subscription->stripe_price,
                    'ends_at' => $endsAt ? $endsAt->toIso8601String() : null,
                ]);
            } catch (\Exception $e) {
                Log::error('Error fetching Stripe subscription: ' . $e->getMessage());
            }
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
            return response()->json([
                'success' => false,
                'message' => 'You must be logged in to proceed. Please sign in to continue.'
            ], 401);
        }

        $subscription = $user->subscription('premium');

        if (!$subscription) {
            return response()->json([
                'success' => false,
                'message' => 'No subscription found'
            ], 404);
        }

        if (!$subscription->active()) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot cancel an already canceled subscription'
            ], 400);
        }

        try {
            // Cancel immediately on Stripe and locally (no grace period)
            // This reflects as "canceled" right away on Stripe dashboard
            $subscription->cancelNow();

            // Refresh subscription instance to read updated timestamps
            $subscription->refresh();

            return response()->json([
                'success' => true,
                'ends_at' => optional($subscription->ends_at)->toIso8601String(),
                'state' => 'canceled_now',
                'message' => 'Subscription cancelled immediately.'
            ]);
        } catch (\Exception $e) {
            Log::error('Error cancelling subscription: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Error cancelling subscription: ' . $e->getMessage()
            ], 500);
        }
    }

    public function addPaymentMethod(Request $request)
    {
        $request->validate([
            'payment_method' => 'required|string',
            'cardholder_name' => 'required|string',
        ]);

        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'You must be logged in to proceed. Please sign in to continue.',
            ], 401);
        }

        try {
            $user->addPaymentMethod($request->payment_method);
            $user->updateDefaultPaymentMethod($request->payment_method);

            return response()->json([
                'success' => true,
                'message' => 'Payment method added successfully',
            ]);
        } catch (\Exception $e) {
            Log::error('Error adding payment method: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Error adding payment method: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mirror a one-time Checkout payment into the local payment table.
     */
    protected function recordOneTimePaymentFromSession($session): void
    {
        try {
            $piId = is_string($session->payment_intent) ? $session->payment_intent : (isset($session->payment_intent->id) ? $session->payment_intent->id : null);
            $amount = null;
            $currency = null;
            $paymentMethod = 'card';
            $receiptUrl = null;

            if (is_object($session->payment_intent)) {
                $amount = $session->payment_intent->amount_received ?? $session->payment_intent->amount ?? null;
                $currency = $session->payment_intent->currency ?? null;
                if (!empty($session->payment_intent->charges->data)) {
                    $charge = $session->payment_intent->charges->data[0];
                    $paymentMethod = $charge->payment_method_details->type ?? $paymentMethod;
                    $receiptUrl = $charge->receipt_url ?? null;
                }
            }

            \App\Models\Payment::updateOrCreate(
                [ 'stripe_checkout_session_id' => $session->id ],
                [
                    'name' => 'Stripe Payment',
                    'description' => 'Checkout payment',
                    'payment_method' => $paymentMethod ?? 'card',
                    'currency' => strtoupper($currency ?? 'GBP'),
                    'amount' => $amount !== null ? (string) $amount : null,
                    'status' => $session->payment_status ?? 'processing',
                    'date' => now()->toDateTimeString(),
                    'provider' => 'stripe',
                    'stripe_payment_intent_id' => $piId,
                    'receipt_url' => $receiptUrl,
                    'metadata' => json_encode([
                        'mode' => $session->mode ?? null,
                        'customer' => $session->customer ?? null,
                    ]),
                ]
            );
        } catch (\Throwable $e) {
            \Log::error('Failed recording Checkout payment', ['error' => $e->getMessage()]);
        }
    }

    /**
     * Mirror PaymentIntent status and details into local payment table.
     */
    protected function recordPaymentIntent($intent, string $mappedStatus): void
    {
        try {
            $amount = $intent->amount_received ?? $intent->amount ?? null;
            $currency = $intent->currency ?? 'gbp';
            $paymentMethod = isset($intent->payment_method) ? (is_object($intent->payment_method) ? ($intent->payment_method->type ?? 'card') : 'card') : 'card';
            $receiptUrl = null;
            if (!empty($intent->charges->data)) {
                $charge = $intent->charges->data[0];
                $paymentMethod = $charge->payment_method_details->type ?? $paymentMethod;
                $receiptUrl = $charge->receipt_url ?? null;
            }

            \App\Models\Payment::updateOrCreate(
                [ 'stripe_payment_intent_id' => $intent->id ],
                [
                    'name' => 'Stripe Payment',
                    'description' => $intent->description ?? 'Payment Intent',
                    'payment_method' => $paymentMethod,
                    'currency' => strtoupper($currency),
                    'amount' => $amount !== null ? (string) $amount : null,
                    'status' => $mappedStatus,
                    'date' => now()->toDateTimeString(),
                    'provider' => 'stripe',
                    'receipt_url' => $receiptUrl,
                    'metadata' => json_encode([
                        'customer' => $intent->customer ?? null,
                        'latest_charge' => isset($charge) ? $charge->id : null,
                    ]),
                ]
            );
        } catch (\Throwable $e) {
            \Log::error('Failed recording PaymentIntent', ['error' => $e->getMessage()]);
        }
    }

    /**
     * Reflect refunds (full or partial) from a Charge object.
     */
    protected function recordChargeRefund($charge): void
    {
        try {
            $refunded = (bool)($charge->refunded ?? false);
            $amount = $charge->amount ?? null;
            $amountRefunded = $charge->amount_refunded ?? 0;
            $status = $refunded && $amountRefunded >= ($amount ?? 0)
                ? 'refunded'
                : 'partial_refund';

            // Link by PaymentIntent when possible
            $intentId = is_string($charge->payment_intent)
                ? $charge->payment_intent
                : (isset($charge->payment_intent->id) ? $charge->payment_intent->id : null);

            $attributes = [
                'name' => 'Stripe Refund',
                'description' => 'Charge refunded',
                'payment_method' => $charge->payment_method_details->type ?? 'card',
                'currency' => strtoupper($charge->currency ?? 'GBP'),
                'amount' => $amount !== null ? (string) $amount : null,
                'status' => $status,
                'date' => now()->toDateTimeString(),
                'provider' => 'stripe',
                'receipt_url' => $charge->receipt_url ?? null,
                'metadata' => json_encode([
                    'charge_id' => $charge->id ?? null,
                    'amount_refunded' => $amountRefunded,
                    'payment_intent' => $intentId,
                ]),
            ];

            if ($intentId) {
                \App\Models\Payment::updateOrCreate(
                    ['stripe_payment_intent_id' => $intentId],
                    $attributes
                );
            } else {
                // Fallback: upsert by receipt URL or create new row
                \App\Models\Payment::updateOrCreate(
                    ['receipt_url' => $charge->receipt_url ?? null],
                    $attributes
                );
            }
        } catch (\Throwable $e) {
            \Log::error('Failed recording refund', ['error' => $e->getMessage()]);
        }
    }
}
