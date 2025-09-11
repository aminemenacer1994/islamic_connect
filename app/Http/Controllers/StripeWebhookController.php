<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Laravel\Cashier\Http\Controllers\WebhookController as CashierController;

class StripeWebhookController extends CashierController
{
    /**
     * Handle invoice payment succeeded.
     */
    public function handleInvoicePaymentSucceeded($payload)
    {
        Log::info('Invoice payment succeeded webhook received', [
            'invoice_id' => $payload['data']['object']['id'],
            'customer_id' => $payload['data']['object']['customer'],
            'subscription_id' => $payload['data']['object']['subscription']
        ]);

        return parent::handleInvoicePaymentSucceeded($payload);
    }

    /**
     * Handle customer subscription created.
     */
    public function handleCustomerSubscriptionCreated($payload)
    {
        Log::info('Customer subscription created webhook received', [
            'subscription_id' => $payload['data']['object']['id'],
            'customer_id' => $payload['data']['object']['customer'],
            'status' => $payload['data']['object']['status']
        ]);

        return parent::handleCustomerSubscriptionCreated($payload);
    }

    /**
     * Handle customer subscription updated.
     */
    public function handleCustomerSubscriptionUpdated($payload)
    {
        Log::info('Customer subscription updated webhook received', [
            'subscription_id' => $payload['data']['object']['id'],
            'customer_id' => $payload['data']['object']['customer'],
            'status' => $payload['data']['object']['status']
        ]);

        return parent::handleCustomerSubscriptionUpdated($payload);
    }

    /**
     * Handle checkout session completed.
     */
    public function handleCheckoutSessionCompleted($payload)
    {
        Log::info('Checkout session completed webhook received', [
            'session_id' => $payload['data']['object']['id'],
            'customer_id' => $payload['data']['object']['customer'],
            'subscription_id' => $payload['data']['object']['subscription'],
            'payment_status' => $payload['data']['object']['payment_status']
        ]);

        // The parent Cashier controller should handle the subscription creation
        // But we can add custom logic here if needed
        
        return response('Webhook handled', 200);
    }
}