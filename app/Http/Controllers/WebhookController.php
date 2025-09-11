<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Webhook;
use Illuminate\Support\Facades\Log;

class WebhookController extends Controller
{
    public function handleWebhook(Request $request)
    {
        // Retrieve the raw body and signature header
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $endpointSecret = env('STRIPE_WEBHOOK_SECRET', 'we_1S1c7DGsDD2PdzHqipskWSy5'); // From .env

        try {
            $event = Webhook::constructEvent(
                $payload,
                $sigHeader,
                $endpointSecret
            );
        } catch (\Exception $e) {
            Log::error('Stripe Webhook Error: ' . $e->getMessage());
            return response()->json(['error' => 'Webhook signature verification failed'], 400);
        }

        // Log the event for debugging
        Log::info('Received webhook event', ['type' => $event->type, 'data' => $event->data->object]);

        // Handle the event
        switch ($event->type) {
            case 'payment_method.created':
                $paymentMethod = $event->data->object;
                Log::info('Payment method created', [
                    'id' => $paymentMethod->id,
                    'last4' => $paymentMethod->card->last4,
                    'brand' => $paymentMethod->card->brand,
                    'email' => $paymentMethod->billing_details->email
                ]);
                // Store in database (optional)
                // \App\Models\PaymentMethod::create([
                //     'stripe_id' => $paymentMethod->id,
                //     'last4' => $paymentMethod->card->last4,
                //     'brand' => $paymentMethod->card->brand,
                //     'email' => $paymentMethod->billing_details->email,
                // ]);
                break;

            case 'checkout.session.completed':
                $session = $event->data->object;
                Log::info('Checkout session completed', ['session_id' => $session->id]);
                // Add logic for successful payment
                break;

            default:
                Log::info('Unhandled webhook event', ['type' => $event->type]);
        }

        return response()->json(['status' => 'success'], 200);
    }
}