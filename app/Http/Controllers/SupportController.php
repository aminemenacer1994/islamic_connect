<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class SupportController extends Controller
{
    public function index()
    {
        return view('support');
    }
    
    public function createCheckoutSession(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $priceId = config('services.stripe.donation_price_id') ?? config('services.stripe.price_id');

        // If a price ID is configured, amount is optional and ignored
        if ($priceId) {
            $unitAmount = null;
            $amount = null;
        } else {
            // Validate amount (GBP) — accept decimals, min £1
            $validated = $request->validate([
                'amount' => 'required|numeric|min:1|max:100000',
            ]);
            // Normalize to two decimals then to integer pence
            $amount = round((float) $validated['amount'], 2);
            $unitAmount = (int) round($amount * 100);
        }

        try {
            Log::info('Creating Stripe Checkout donation session', [
                'amount_gbp' => $amount,
                'unit_amount' => $unitAmount,
            ]);

            $params = [
                'payment_method_types' => ['card'],
                'line_items' => [],
                'mode' => 'payment',
                // Include session ID so we can verify on success
                'success_url' => url('/donation/success') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => url('/donation/cancel'),
                'metadata' => [
                    'source' => 'support_page',
                    'app' => config('app.name'),
                ],
            ];

            if ($priceId) {
                $params['line_items'][] = [
                    'price' => $priceId,
                    'quantity' => 1,
                ];
                Log::info('Using fixed Stripe price for donation', ['price_id' => $priceId]);
            } else {
                $params['line_items'][] = [
                    'price_data' => [
                        'currency' => 'gbp',
                        'product_data' => [ 'name' => 'Donation' ],
                        'unit_amount' => $unitAmount,
                    ],
                    'quantity' => 1,
                ];
            }

            $session = Session::create($params);

            Log::info('Stripe Checkout donation session created', [
                'session_id' => $session->id,
                'payment_intent' => $session->payment_intent ?? null,
            ]);

            return response()->json(['id' => $session->id]);

        } catch (\Exception $e) {
            Log::error('Failed to create Stripe Checkout session', [
                'error' => $e->getMessage(),
            ]);
            return response()->json(['error' => 'Unable to start payment at the moment. Please try again.'], 400);
        }
    }

    public function success(Request $request)
    {
        $sessionId = $request->query('session_id');
        if (!$sessionId) {
            return view('donation.success', [
                'verified' => false,
                'message' => 'Missing session ID. If you completed payment, it will still be processed.',
            ]);
        }

        Stripe::setApiKey(config('services.stripe.secret'));
        try {
            $session = Session::retrieve([
                'id' => $sessionId,
                'expand' => ['payment_intent', 'line_items'],
            ]);

            $pi = $session->payment_intent;
            $status = is_object($pi) ? ($pi->status ?? null) : null;
            $amount = is_object($pi) ? ($pi->amount_received ?? $pi->amount ?? null) : null;
            $currency = is_object($pi) ? ($pi->currency ?? 'gbp') : 'gbp';

            Log::info('Donation success verified', [
                'session_id' => $sessionId,
                'payment_intent' => is_object($pi) ? $pi->id : $session->payment_intent,
                'status' => $status,
                'amount' => $amount,
            ]);

            return view('donation.success', [
                'verified' => in_array($status, ['succeeded', 'requires_capture']),
                'status' => $status,
                'amount' => $amount,
                'currency' => strtoupper($currency),
                'payment_intent_id' => is_object($pi) ? $pi->id : $session->payment_intent,
                'session_id' => $sessionId,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed verifying donation success', [
                'session_id' => $sessionId,
                'error' => $e->getMessage(),
            ]);
            return view('donation.success', [
                'verified' => false,
                'message' => 'We could not verify your payment yet. Please check your email for the receipt or contact support.',
            ]);
        }
    }
}
