<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Cashier\Http\Controllers\WebhookController as CashierWebhookController;

class WebhookController extends CashierWebhookController
{
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

        // Check if subscription already exists
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
                \Log::error('No price ID found in subscription');
                return;
            }

            // Create subscription record manually
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
        \Log::info('Customer subscription updated webhook', [
            'subscription_id' => $payload['data']['object']['id'],
            'status' => $payload['data']['object']['status'],
        ]);

        // Let Cashier handle this
        return parent::handleCustomerSubscriptionUpdated($payload);
    }

    /**
     * Handle customer subscription deleted.
     */
    protected function handleCustomerSubscriptionDeleted(array $payload)
    {
        \Log::info('Customer subscription deleted webhook', [
            'subscription_id' => $payload['data']['object']['id'],
        ]);

        // Let Cashier handle this
        return parent::handleCustomerSubscriptionDeleted($payload);
    }
}