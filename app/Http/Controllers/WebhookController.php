<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Cashier\WebhookController as CashierWebhookController;

class WebhookController extends CashierWebhookController
{
    public function handleWebhook(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $event = null;

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload, $sigHeader, config('services.stripe.webhook_secret')
            );
        } catch (\Exception $e) {
            \Log::error('Webhook error: ' . $e->getMessage() . ', Payload: ' . $payload);
            return response('Webhook signature failed', 400);
        }

        \Log::info('Webhook received: ' . $event->type . ', Data: ' . json_encode($event->data->object));

        if (in_array($event->type, ['checkout.session.completed', 'customer.subscription.created', 'customer.subscription.updated'])) {
            $data = $event->data->object;
            $user = \App\Models\User::where('stripe_id', $data->customer)->first();
            if (!$user) {
                \Log::warning('No user found for customer ID: ' . ($data->customer ?? 'Unknown'));
                $user = \App\Models\User::where('email', $data->customer_email ?? '')->first();
                if ($user) {
                    \Log::info('Found user by email: ' . $user->email . ', Setting stripe_id: ' . $data->customer);
                    $user->stripe_id = $data->customer;
                    $user->save();
                } else {
                    \Log::error('No user found for email: ' . ($data->customer_email ?? 'N/A'));
                    return response('User not found', 404);
                }
            }

            $subscriptionId = $data->subscription ?? (isset($data->latest_invoice) && $data->latest_invoice ? $data->latest_invoice->subscription : null) ?? $data->id;
            if ($subscriptionId) {
                $user->syncStripeSubscription($subscriptionId);
                \Log::info('Synced subscription for user ID: ' . $user->id . ', Plan: ' . ($data->price->id ?? 'Unknown') . ', Ends at: ' . ($user->subscription('premium')->ends_at ?? 'N/A'));
            } else {
                \Log::error('No subscription ID found in event data');
            }
        }

        return response('Webhook processed', 200);
    }
}