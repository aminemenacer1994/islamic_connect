<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Laravel\Cashier\WebhookController as CashierWebhookController;

class WebhookController extends CashierWebhookController
{
    public function handleWebhook(Request $request)
    {
        Log::info('Webhook received', [
            'payload' => $request->all(),
            'signature' => $request->header('Stripe-Signature'),
            'ip' => $request->ip(),
        ]);

        try {
            $payload = $request->getContent();
            $sigHeader = $request->header('Stripe-Signature');
            $event = \Stripe\Webhook::constructEvent(
                $payload, $sigHeader, config('services.stripe.webhook_secret')
            );

            Log::info('Webhook event processed', ['type' => $event->type]);
            switch ($event->type) {
                case 'checkout.session.completed':
                    $this->handleCheckoutSessionCompleted($event);
                    break;
                case 'customer.subscription.updated':
                case 'customer.subscription.deleted':
                    $this->handleCustomerSubscriptionUpdated($event);
                    break;
                default:
                    Log::info('Unhandled event', ['type' => $event->type]);
                    break;
            }
            return response()->json(['status' => 'success'], 200);
        } catch (\UnexpectedValueException $e) {
            Log::error('Invalid payload', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Invalid payload'], 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            Log::error('Invalid signature', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Invalid signature'], 400);
        } catch (\Exception $e) {
            Log::error('Webhook error', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    protected function handleCheckoutSessionCompleted($event)
    {
        $session = $event->data->object;
        $user = \App\Models\User::where('stripe_id', $session->customer)->first();
        if ($user) {
            $user->syncStripeSubscription();
            event(new \App\Events\SubscriptionUpdated($user->id, $user->subscription->stripe_id));
            Log::info('Checkout completed', ['user_id' => $user->id, 'session_id' => $session->id]);
        }
    }

    protected function handleCustomerSubscriptionUpdated($event)
    {
        $subscription = $event->data->object;
        $user = \App\Models\User::where('stripe_id', $subscription->customer)->first();
        if ($user) {
            $user->syncStripeSubscription();
            event(new \App\Events\SubscriptionUpdated($user->id, $subscription->status === 'active' ? $subscription->id : null));
            Log::info('Subscription updated', ['user_id' => $user->id, 'status' => $subscription->status]);
        }
    }
}