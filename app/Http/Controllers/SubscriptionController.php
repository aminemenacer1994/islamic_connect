<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Stripe\Exception\ApiErrorException;

class SubscriptionController extends Controller
{
    public function getSubscriptionStatus(Request $request)
    {
        try {
            $user = auth()->user();
            
            if (!$user) {
                Log::info('Subscription status check - user not authenticated');
                return response()->json([
                    'subscribed' => false,
                    'subscription_info' => null,
                    'user' => null,
                    'message' => 'User not authenticated'
                ], 401);
            }

            Log::info('Checking subscription status for user', [
                'user_id' => $user->id,
                'stripe_id' => $user->stripe_id,
                'debug' => $request->get('debug', false)
            ]);

            // Force sync with Stripe if user has stripe_id
            if ($user->stripe_id) {
                try {
                    $user->syncStripeCustomerDetails();
                    $user->refresh();
                    Log::info('Synced Stripe customer details', ['user_id' => $user->id]);
                } catch (ApiErrorException $e) {
                    if (str_contains($e->getMessage(), 'No such customer')) {
                        $user->stripe_id = null;
                        $user->save();
                        Log::warning('Cleared invalid stripe_id for user', [
                            'user_id' => $user->id,
                            'stripe_id' => $user->stripe_id,
                            'error' => $e->getMessage()
                        ]);
                    } else {
                        Log::error('Failed to sync Stripe status', [
                            'user_id' => $user->id,
                            'error' => $e->getMessage()
                        ]);
                        throw $e;
                    }
                }
            }

            $hasActiveSubscription = $user->subscribed('default');
            $subscription = $user->subscription('default');

            Log::info('Subscription check results', [
                'user_id' => $user->id,
                'has_active_subscription' => $hasActiveSubscription,
                'subscription_exists' => !!$subscription,
                'subscription_id' => $subscription ? $subscription->id : null,
                'stripe_status' => $subscription ? $subscription->stripe_status : null
            ]);

            $subscriptionInfo = null;
            if ($hasActiveSubscription && $subscription) {
                $subscriptionInfo = [
                    'active' => true,
                    'status' => $subscription->stripe_status,
                    'ends_at' => $subscription->ends_at,
                    'on_trial' => $subscription->onTrial(),
                    'trial_ends_at' => $subscription->trial_ends_at,
                    'cancelled' => $subscription->cancelled(),
                    'on_grace_period' => $subscription->onGracePeriod(),
                    'valid' => $subscription->valid(),
                ];
            }

            $response = [
                'subscribed' => $hasActiveSubscription,
                'subscription_info' => $subscriptionInfo,
                'user' => [
                    'id' => $user->id,
                    'email' => $user->email,
                    'name' => $user->name,
                    'has_payment_method' => $user->hasDefaultPaymentMethod(),
                    'stripe_id' => $user->stripe_id,
                ]
            ];

            // Add debug info if requested
            if ($request->get('debug')) {
                $response['debug'] = [
                    'all_subscriptions' => $user->subscriptions()->get()->toArray(),
                    'stripe_customer_exists' => !!$user->stripe_id,
                    'raw_subscribed_check' => $hasActiveSubscription,
                ];
            }

            Log::info('Returning subscription status', $response);
            return response()->json($response);

        } catch (\Exception $e) {
            Log::error('Error fetching subscription status: ' . $e->getMessage(), [
                'user_id' => $user->id ?? null,
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'subscribed' => false,
                'subscription_info' => null,
                'user' => null,
                'message' => 'Error fetching subscription status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function createCheckoutSession(Request $request)
    {
        try {
            $user = auth()->user();
            
            if (!$user) {
                return response()->json(['error' => 'User not authenticated'], 401);
            }

            $priceId = $request->input('price_id', env('STRIPE_PRICE_ID'));
            $successUrl = $request->input('success_url', url('/subscription/success'));
            $cancelUrl = $request->input('cancel_url', url('/subscription/cancel'));
            
            if (!$priceId) {
                return response()->json([
                    'success' => false,
                    'error' => 'No price ID provided'
                ], 400);
            }

            // Check for invalid stripe_id before creating checkout session
            if ($user->stripe_id) {
                try {
                    $user->syncStripeCustomerDetails();
                    $user->refresh();
                } catch (ApiErrorException $e) {
                    if (str_contains($e->getMessage(), 'No such customer')) {
                        $user->stripe_id = null;
                        $user->save();
                        Log::warning('Cleared invalid stripe_id before checkout', [
                            'user_id' => $user->id,
                            'stripe_id' => $user->stripe_id,
                            'error' => $e->getMessage()
                        ]);
                    } else {
                        Log::error('Failed to sync Stripe status before checkout', [
                            'user_id' => $user->id,
                            'error' => $e->getMessage()
                        ]);
                        throw $e;
                    }
                }
            }

            // Create base checkout options
            $checkoutOptions = [
                'success_url' => $successUrl . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => $cancelUrl,
            ];

            // FIXED: Only add customer_email if user doesn't have a stripe_id
            // Laravel Cashier will automatically handle existing customers
            if (!$user->stripe_id) {
                $checkoutOptions['customer_email'] = $user->email;
                Log::info('Adding customer_email for new customer', [
                    'user_id' => $user->id,
                    'email' => $user->email
                ]);
            } else {
                Log::info('Using existing Stripe customer', [
                    'user_id' => $user->id,
                    'stripe_id' => $user->stripe_id
                ]);
            }

            // Create the subscription builder
            $subscriptionBuilder = $user->newSubscription('default', $priceId);

            // Create checkout session
            $checkout = $subscriptionBuilder->checkout($checkoutOptions);

            Log::info('Checkout session created successfully', [
                'user_id' => $user->id,
                'session_id' => $checkout->id,
                'has_stripe_id' => !!$user->stripe_id
            ]);

            return response()->json([
                'success' => true,
                'checkout_url' => $checkout->url,
                'session_id' => $checkout->id
            ]);

        } catch (\Exception $e) {
            Log::error('Checkout error: ' . $e->getMessage(), [
                'user_id' => $user->id ?? null,
                'price_id' => $priceId ?? null,
                'has_stripe_id' => $user->stripe_id ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'success' => false,
                'error' => 'Failed to create checkout session',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getSubscriptionConfig()
    {
        return response()->json([
            'price_id' => env('STRIPE_PRICE_ID'),
            'currency' => 'gbp',
            'amount' => 499
        ]);
    }

    public function handleSuccessfulPayment(Request $request)
    {
        try {
            $sessionId = $request->query('session_id');
            $intended = $request->query('intended', '/media');
            
            if (!$sessionId) {
                Log::error('Invalid session ID in handleSuccessfulPayment', ['session_id' => $sessionId]);
                return view('success')->with([
                    'error' => 'Invalid session',
                    'intended' => $intended
                ]);
            }

            $user = auth()->user();
            
            if (!$user) {
                Log::error('User not authenticated in handleSuccessfulPayment');
                return view('success')->with([
                    'error' => 'Please log in',
                    'intended' => $intended
                ]);
            }

            if ($user->stripe_id) {
                try {
                    $user->syncStripeCustomerDetails();
                    $user->refresh();
                } catch (ApiErrorException $e) {
                    if (str_contains($e->getMessage(), 'No such customer')) {
                        $user->stripe_id = null;
                        $user->save();
                        Log::warning('Cleared invalid stripe_id for user', [
                            'user_id' => $user->id,
                            'stripe_id' => $user->stripe_id,
                            'error' => $e->getMessage()
                        ]);
                    } else {
                        Log::error('Failed to sync Stripe status', [
                            'user_id' => $user->id,
                            'error' => $e->getMessage()
                        ]);
                        throw $e;
                    }
                }
            }

            Log::info('Rendering subscription-success view', [
                'user_id' => $user->id,
                'session_id' => $sessionId,
                'intended' => $intended
            ]);

            // Render the success page with flash data
            return view('subscription-success')->with([
                'success' => 'Subscription activated successfully!',
                'subscribed' => true,
                'intended' => $intended
            ]);

        } catch (\Exception $e) {
            Log::error('Error handling successful payment: ' . $e->getMessage(), [
                'user_id' => $user->id ?? null,
                'session_id' => $sessionId ?? null
            ]);
            return view('success')->with([
                'error' => 'Something went wrong. Please contact support.',
                'intended' => $intended
            ]);
        }
    }

    public function handleCancelledPayment(Request $request)
    {
        return redirect('/media')->with('info', 'Payment was cancelled. You can try again anytime.');
    }
}