<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\StripeClient;
use Stripe\PaymentIntent;
use Illuminate\Support\Str;
use Stripe\Stripe as StripeGateway;
use Exception;

class CharityController extends Controller
{
    public function index()
    {
        return view('charity');
    }

    public function initiatePayment(Request $request)
    {

        $paymentIntent = null;
        
        StripeGateway::setApiKey('sk_test_51OhWyICJwy2NXBn16E2cUdudCq7XSdvJV9FpLq7LxWTrooUS9oi6wgYW6HY7zwpgP4qSXkOjPjxYhoSgphVgAvkW006dFAQZ2q');

        try {

            $request->validate([
                'amount' => 'required|numeric|min:1',
                'currency' => 'required|string|in:usd', // Adjust currency as needed
            ]);

            $paymentIntent = PaymentIntent::create([
                'amount' => $request->amount * 100, // Convert to cents
                'currency' => $request->currency,
                'automatic_payment_methods' => [
                    'enabled' => true,
                ],
            ]);

            return response()->json([
                'client_secret' => $paymentIntent->client_secret,
                'public_key' => config('services.stripe.key'),
            ]);

        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

    }


    public function completePayment(Request $request)
    {
        $stripe = new StripeClient('sk_test_51OhWyICJwy2NXBn16E2cUdudCq7XSdvJV9FpLq7LxWTrooUS9oi6wgYW6HY7zwpgP4qSXkOjPjxYhoSgphVgAvkW006dFAQZ2q');

        // Retrieve the payment intent ID from the request or any other source
        $paymentIntentId = $request->input('PAYMENT_INTENT_ID');

        try {
            // Use the retrieved payment intent ID
            $paymentDetail = $stripe->paymentIntents->retrieve($paymentIntentId);

            if ($paymentDetail->status != 'succeeded') {
                // Handle the case where the payment is not succeeded
                // You might want to throw an exception or return an error response
            }

            // Complete the payment
            // Perform any additional actions here
        } catch (Exception $e) {
            // Handle exceptions, log errors, or throw a specific error response
        }

    }

    public function failPayment(Request $request)
    {
        // Log the failed payment if you wish
    }
}
