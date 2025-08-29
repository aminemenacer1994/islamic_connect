<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class StripeWebhookController extends Controller
{
    public function handleWebhook(Request $request)
    {
        $payload = $request->getContent();
        $endpoint_secret = env('STRIPE_WEBHOOK_SECRET');
        $sig_header = $request->header('Stripe-Signature');

        try {
            $event = \Stripe\Webhook::constructEvent($payload, $sig_header, $endpoint_secret);
        } catch (\UnexpectedValueException $e) {
            Log::error('Invalid payload: ' . $e->getMessage());
            return response('Invalid payload', 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            Log::error('Invalid signature: ' . $e->getMessage());
            return response('Invalid signature', 400);
        }

        Log::info('Stripe webhook received: ' . $event['type']);

        // Handle the event
        switch ($event['type']) {
            case 'checkout.session.completed':
                $this->handleCheckoutCompleted($event['data']['object']);
                break;
            case 'invoice.payment_succeeded':
                $this->handlePaymentSucceeded($event['data']['object']);
                break;
            case 'customer.subscription.created':
                $this->handleSubscriptionCreated($event['data']['object']);
                break;
            case 'customer.subscription.updated':
                $this->handleSubscriptionUpdated($event['data']['object']);
                break;
            case 'customer.subscription.deleted':
                $this->handleSubscriptionDeleted($event['data']['object']);
                break;
            case 'invoice.payment_failed':
                $this->handlePaymentFailed($event['data']['object']);
                break;
            default:
                Log::info('Unhandled event type: ' . $event['type']);
        }

        return response('Webhook handled', 200);
    }

    private function handleCheckoutCompleted($session)
    {
        Log::info('Processing checkout completed', ['session_id' => $session['id']]);
        
        try {
            \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
            
            // Get customer details
            $customer_email = $session['customer_details']['email'] ?? null;
            
            if (!$customer_email) {
                Log::error('No customer email in checkout session');
                return;
            }

            $user = User::where('email', $customer_email)->first();
            
            if (!$user) {
                Log::error('User not found for email: ' . $customer_email);
                return;
            }

            // If this is a subscription checkout, get the subscription
            if ($session['mode'] === 'subscription' && isset($session['subscription'])) {
                $subscription = \Stripe\Subscription::retrieve($session['subscription']);
                
                $user->update([
                    'subscription_status' => 'active',
                    'stripe_customer_id' => $session['customer'],
                    'stripe_subscription_id' => $subscription['id'],
                    'subscription_ends_at' => Carbon::createFromTimestamp($subscription['current_period_end']),
                ]);
                
                Log::info('User subscription activated', ['user_id' => $user->id]);
            } else {
                // One-time payment
                $user->update([
                    'subscription_status' => 'active',
                    'stripe_customer_id' => $session['customer'],
                    'subscription_ends_at' => Carbon::now()->addMonth(), // Adjust based on your needs
                ]);
                
                Log::info('User one-time payment processed', ['user_id' => $user->id]);
            }
            
        } catch (\Exception $e) {
            Log::error('Error processing checkout completed: ' . $e->getMessage());
        }
    }

    private function handlePaymentSucceeded($invoice)
    {
        Log::info('Processing payment succeeded', ['invoice_id' => $invoice['id']]);
        
        try {
            \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
            
            if (isset($invoice['subscription'])) {
                $subscription = \Stripe\Subscription::retrieve($invoice['subscription']);
                $customer = \Stripe\Customer::retrieve($subscription['customer']);
                
                $user = User::where('stripe_customer_id', $customer['id'])
                           ->orWhere('email', $customer['email'])
                           ->first();
                
                if ($user) {
                    $user->update([
                        'subscription_status' => 'active',
                        'stripe_customer_id' => $customer['id'],
                        'stripe_subscription_id' => $subscription['id'],
                        'subscription_ends_at' => Carbon::createFromTimestamp($subscription['current_period_end']),
                    ]);
                    
                    Log::info('User subscription renewed', ['user_id' => $user->id]);
                }
            }
        } catch (\Exception $e) {
            Log::error('Error processing payment succeeded: ' . $e->getMessage());
        }
    }

    private function handleSubscriptionCreated($subscription)
    {
        Log::info('Processing subscription created', ['subscription_id' => $subscription['id']]);
        $this->updateUserSubscription($subscription, 'active');
    }

    private function handleSubscriptionUpdated($subscription)
    {
        Log::info('Processing subscription updated', ['subscription_id' => $subscription['id']]);
        $status = $subscription['status'] === 'active' ? 'active' : $subscription['status'];
        $this->updateUserSubscription($subscription, $status);
    }

    private function handleSubscriptionDeleted($subscription)
    {
        Log::info('Processing subscription deleted', ['subscription_id' => $subscription['id']]);
        $this->updateUserSubscription($subscription, 'cancelled');
    }

    private function handlePaymentFailed($invoice)
    {
        Log::info('Processing payment failed', ['invoice_id' => $invoice['id']]);
        
        try {
            \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
            
            if (isset($invoice['subscription'])) {
                $subscription = \Stripe\Subscription::retrieve($invoice['subscription']);
                $customer = \Stripe\Customer::retrieve($subscription['customer']);
                
                $user = User::where('stripe_customer_id', $customer['id'])
                           ->orWhere('email', $customer['email'])
                           ->first();
                
                if ($user) {
                    $user->update(['subscription_status' => 'past_due']);
                    Log::info('User subscription marked as past due', ['user_id' => $user->id]);
                }
            }
        } catch (\Exception $e) {
            Log::error('Error processing payment failed: ' . $e->getMessage());
        }
    }

    private function updateUserSubscription($subscription, $status)
    {
        try {
            \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
            $customer = \Stripe\Customer::retrieve($subscription['customer']);
            
            $user = User::where('stripe_customer_id', $customer['id'])
                       ->orWhere('email', $customer['email'])
                       ->first();
            
            if ($user) {
                $updateData = [
                    'subscription_status' => $status,
                    'stripe_customer_id' => $customer['id'],
                    'stripe_subscription_id' => $subscription['id'],
                ];
                
                if ($status === 'active') {
                    $updateData['subscription_ends_at'] = Carbon::createFromTimestamp($subscription['current_period_end']);
                }
                
                $user->update($updateData);
                Log::info('User subscription updated', ['user_id' => $user->id, 'status' => $status]);
            }
        } catch (\Exception $e) {
            Log::error('Error updating user subscription: ' . $e->getMessage());
        }
    }
}