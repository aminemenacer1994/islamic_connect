<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Cashier\Cashier;
use Stripe\Checkout\Session;
use Stripe\Stripe;
use Illuminate\Support\Facades\Log;
use Exception;

class DebugSubscriptionController extends Controller
{
    /**
     * Test Stripe configuration
     */
    public function testStripeConfig()
    {
        return response()->json([
            'stripe_key_from_config' => config('services.stripe.key') ? 'Present' : 'Missing',
            'stripe_secret_from_config' => config('services.stripe.secret') ? 'Present' : 'Missing',
            'stripe_key_length' => strlen(config('services.stripe.key') ?? ''),
            'stripe_secret_length' => strlen(config('services.stripe.secret') ?? ''),
            'stripe_key_starts_with' => substr(config('services.stripe.key') ?? '', 0, 7),
            'stripe_secret_starts_with' => substr(config('services.stripe.secret') ?? '', 0, 7),
            'env_app_env' => config('app.env'),
            'cashier_model' => config('services.stripe.model'),
        ]);
    }

    /**
     * Debug checkout session creation
     */
    public function createCheckoutSessionDebug(Request $request)
    {
        $debugInfo = [];
        
        try {
            // Step 1: Check user authentication
            $user = auth()->user();
            $debugInfo['user_authenticated'] = !is_null($user);
            $debugInfo['user_id'] = $user ? $user->id : null;
            $debugInfo['user_stripe_id'] = $user ? $user->stripe_id : null;
            
            if (!$user) {
                return response()->json(['error' => 'User not authenticated', 'debug' => $debugInfo], 401);
            }

            // Step 2: Check Stripe configuration
            $stripeSecret = config('services.stripe.secret');
            $debugInfo['stripe_secret_configured'] = !empty($stripeSecret);
            $debugInfo['stripe_secret_length'] = strlen($stripeSecret ?? '');
            $debugInfo['stripe_secret_prefix'] = substr($stripeSecret ?? '', 0, 7);
            
            if (empty($stripeSecret)) {
                return response()->json(['error' => 'Stripe secret key not configured', 'debug' => $debugInfo], 500);
            }

            // Step 3: Set API key and test connection
            Stripe::setApiKey($stripeSecret);
            $debugInfo['stripe_api_key_set'] = true;
            
            // Test API connection
            try {
                $testCustomer = \Stripe\Customer::all(['limit' => 1]);
                $debugInfo['stripe_api_connection'] = 'Success';
            } catch (\Exception $apiTest) {
                $debugInfo['stripe_api_connection'] = 'Failed: ' . $apiTest->getMessage();
                return response()->json(['error' => 'Stripe API connection failed', 'debug' => $debugInfo], 500);
            }

            // Step 4: Ensure user has Stripe customer
            if (!$user->stripe_id) {
                try {
                    $stripeCustomer = $user->createAsStripeCustomer();
                    $debugInfo['stripe_customer_created'] = true;
                    $debugInfo['new_stripe_id'] = $stripeCustomer->id;
                } catch (\Exception $customerError) {
                    $debugInfo['stripe_customer_creation_error'] = $customerError->getMessage();
                    return response()->json(['error' => 'Failed to create Stripe customer', 'debug' => $debugInfo], 500);
                }
            } else {
                $debugInfo['existing_stripe_id'] = $user->stripe_id;
            }

            // Step 5: Create checkout session
            $sessionData = [
                'customer' => $user->stripe_id,
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price' => 'price_1Ry9j2Iol4Q5wn4O7bE9kvbZ',
                    'quantity' => 1,
                ]],
                'mode' => 'subscription',
                'success_url' => route('checkout-return') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => url('/'),
            ];
            
            $debugInfo['session_data'] = $sessionData;
            
            $session = Session::create($sessionData);
            
            $debugInfo['session_created'] = true;
            $debugInfo['session_id'] = $session->id;
            $debugInfo['session_url'] = $session->url;

            return response()->json([
                'success' => true,
                'checkout_url' => $session->url,
                'session_id' => $session->id,
                'debug' => $debugInfo
            ]);

        } catch (\Exception $e) {
            $debugInfo['final_error'] = $e->getMessage();
            $debugInfo['error_trace'] = $e->getTraceAsString();
            
            Log::error('Debug checkout session creation failed', $debugInfo);
            
            return response()->json([
                'error' => $e->getMessage(),
                'debug' => $debugInfo
            ], 500);
        }
    }

    /**
     * Show debug form
     */
    public function debugCheckoutSession()
    {
        return view('debug-checkout');
    }
}