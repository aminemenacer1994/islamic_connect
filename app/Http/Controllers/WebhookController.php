<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Cashier\Http\Controllers\WebhookController as CashierWebhookController;
use Stripe\Webhook;
use Stripe\Exception\SignatureVerificationException;

class WebhookController extends CashierWebhookController
{
    /**
     * Handle incoming Stripe webhook.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function handleWebhook(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('stripe-signature');
        $endpointSecret = env('STRIPE_WEBHOOK_SECRET');

        // Log raw payload and signature for debugging
        \Log::debug('Received webhook', [
            'payload' => $payload,
            'signature' => $sigHeader,
        ]);

        try {
            $event = Webhook::constructEvent($payload, $sigHeader, $endpointSecret);
        } catch (SignatureVerificationException $e) {
            \Log::error('Webhook signature verification failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['error' => 'Invalid webhook signature'], 403);
        } catch (\Exception $e) {
            \Log::error('Webhook processing error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['error' => 'Webhook processing failed'], 400);
        }

        // Handle the event
        try {
            $method = $this->getWebhookHandlerMethod($event->type);
            if (method_exists($this, $method)) {
                $this->$method($event->data->toArray());
            } else {
                \Log::info('Unhandled webhook event', ['type' => $event->type]);
            }
        } catch (\Exception $e) {
            \Log::error('Error handling webhook event', [
                'type' => $event->type,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['error' => 'Event processing failed'], 500);
        }

        return response()->json(['received' => true], 200);
    }

    /**
     * Convert event type to handler method name.
     *
     * @param  string  $eventType
     * @return string
     */
    protected function getWebhookHandlerMethod($eventType)
    {
        $method = 'handle' . str_replace('.', '', str_replace('_', ' ', ucwords(str_replace('.', '_', $eventType), '_')));
        return $method;
    }

    /**
     * Handle checkout session completed.
     */
    protected function handleCheckoutSessionCompleted(array $payload)
    {
        $session = $payload['data']['object'];

        \Log::info('Checkout session completed', [
            'session_id' => $session['id'],
            'customer' => $session['customer'] ?? 'none',
            'subscription' => $session['subscription'] ?? 'none',
            'customer_email' => $session['customer_email'] ?? 'none',
        ]);

        // Find user by stripe_id or email
        $user = \App\Models\User::where('stripe_id', $session['customer'])->first();

        if (!$user && isset($session['customer_email'])) {
            $user = \App\Models\User::where('email', $session['customer_email'])->first();
            if ($user) {
                $user->stripe_id = $session['customer'];
                $user->save();
                \Log::info('Linked user to Stripe customer', ['user_id' => $user->id]);
            }
        }

        if (!$user) {
            \Log::error('User not found for checkout session', ['session' => $session['id']]);
            return;
        }

        // If there's a subscription, it will be handled by handleCustomerSubscriptionCreated
        \Log::info('User found, waiting for subscription webhook', ['user_id' => $user->id]);

        // Notify frontend (e.g., via broadcast)
        $this->notifyFrontend($user, $session['subscription'] ?? null);
    }

    /**
     * Handle customer subscription created.
     */
    protected function handleCustomerSubscriptionCreated(array $payload)
    {
        $stripeSubscription = $payload['data']['object'];

        \Log::info('Customer subscription created webhook', [
            'subscription_id' => $stripeSubscription['id'],
            'customer' => $stripeSubscription['customer'],
            'status' => $stripeSubscription['status'],
            'items' => $stripeSubscription['items']['data'] ?? [],
        ]);

        $user = \App\Models\User::where('stripe_id', $stripeSubscription['customer'])->first();

        if (!$user) {
            \Log::error('User not found for subscription', ['customer_id' => $stripeSubscription['customer']]);
            return;
        }

        // Check if subscription already exists to prevent duplicates
        $existingSubscription = $user->subscriptions()
            ->where('stripe_id', $stripeSubscription['id'])
            ->first();

        if ($existingSubscription) {
            \Log::info('Subscription already exists', ['subscription_id' => $stripeSubscription['id']]);
            return;
        }

        try {
            // Get the price ID from the subscription items
            $priceId = $stripeSubscription['items']['data'][0]['price']['id'] ?? null;

            if (!$priceId) {
                \Log::error('No price ID found in subscription', ['subscription_id' => $stripeSubscription['id']]);
                return;
            }

            // Create subscription record
            $subscription = $user->subscriptions()->create([
                'name' => 'premium',
                'stripe_id' => $stripeSubscription['id'],
                'stripe_status' => $stripeSubscription['status'],
                'stripe_price' => $priceId,
                'quantity' => 1,
                'trial_ends_at' => $stripeSubscription['trial_end']
                    ? \Carbon\Carbon::createFromTimestamp($stripeSubscription['trial_end'])
                    : null,
                'ends_at' => null,
            ]);

            // Create subscription item
            $subscription->items()->create([
                'stripe_id' => $stripeSubscription['items']['data'][0]['id'],
                'stripe_product' => $stripeSubscription['items']['data'][0]['price']['product'],
                'stripe_price' => $priceId,
                'quantity' => 1,
            ]);

            \Log::info('Subscription created successfully', [
                'user_id' => $user->id,
                'subscription_id' => $subscription->id,
                'stripe_id' => $stripeSubscription['id'],
                'price' => $priceId,
            ]);

            // Notify frontend
            $this->notifyFrontend($user, $stripeSubscription['id']);

        } catch (\Exception $e) {
            \Log::error('Failed to create subscription', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
        }
    }

    /**
     * Handle customer subscription updated.
     */
    protected function handleCustomerSubscriptionUpdated(array $payload)
    {
        $stripeSubscription = $payload['data']['object'];

        \Log::info('Customer subscription updated webhook', [
            'subscription_id' => $stripeSubscription['id'],
            'status' => $stripeSubscription['status'],
        ]);

        // Let Cashier handle updates
        parent::handleCustomerSubscriptionUpdated($payload);

        // Find user and notify frontend
        $user = \App\Models\User::where('stripe_id', $stripeSubscription['customer'])->first();
        if ($user) {
            $this->notifyFrontend($user, $stripeSubscription['id']);
        }
    }

    /**
     * Handle customer subscription deleted.
     */
    protected function handleCustomerSubscriptionDeleted(array $payload)
    {
        $stripeSubscription = $payload['data']['object'];

        \Log::info('Customer subscription deleted webhook', [
            'subscription_id' => $stripeSubscription['id'],
        ]);

        // Let Cashier handle deletion
        parent::handleCustomerSubscriptionDeleted($payload);

        // Find user and notify frontend
        $user = \App\Models\User::where('stripe_id', $stripeSubscription['customer'])->first();
        if ($user) {
            $this->notifyFrontend($user, null);
        }
    }

    /**
     * Notify frontend of subscription status change (e.g., via broadcast).
     *
     * @param  \App\Models\User  $user
     * @param  string|null  $subscriptionId
     * @return void
     */
    protected function notifyFrontend($user, $subscriptionId)
    {
        // Example: Broadcast to Laravel Echo (if using WebSockets)
        try {
            \Illuminate\Support\Facades\Broadcast::event(
                new \App\Events\SubscriptionUpdated($user->id, $subscriptionId)
            );
            \Log::info('Broadcasted subscription update', [
                'user_id' => $user->id,
                'subscription_id' => $subscriptionId,
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to broadcast subscription update', [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
            ]);
        }

        // Alternatively, update a status table or flag for polling
        // Example: $user->update(['subscription_status' => $subscriptionId ? 'active' : 'inactive']);
    }
}