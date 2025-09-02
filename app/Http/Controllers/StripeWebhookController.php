<?php

namespace App\Http\Controllers;

use Laravel\Cashier\Http\Controllers\WebhookController as BaseWebhookController;
use Illuminate\Support\Facades\Log;

class StripeWebhookController extends BaseWebhookController
{
    protected function handleCustomerDeleted(array $payload)
    {
        $user = \App\Models\User::where('stripe_id', $payload['data']['object']['id'])->first();
        if ($user) {
            $user->stripe_id = null;
            $user->save();
            Log::info('Cleared stripe_id due to customer deletion', ['user_id' => $user->id]);
        }
        return response('Webhook handled', 200);
    }
}