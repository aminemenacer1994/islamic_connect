<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Cashier\Cashier;
use Stripe\Checkout\Session;

class SubscriptionController extends Controller
{
    
    public function createCheckoutSession(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $intended = $request->input('intended', '/content');

        try {
            $checkout = Session::create([
                'customer' => $user->stripe_id,
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price' => 'price_1Ry9j2Iol4Q5wn4O7bE9kvbZ',
                    'quantity' => 1,
                ]],
                'mode' => 'subscription',
                'success_url' => route('checkout-return') . '?session_id={CHECKOUT_SESSION_ID}&intended=' . urlencode($intended),
                'cancel_url' => route('home'),
            ]);

            return response()->json(['id' => $checkout->id]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function handleCheckoutReturn(Request $request)
    {
        $sessionId = $request->query('session_id');
        if ($sessionId) {
            $session = Cashier::stripe()->checkout->sessions->retrieve($sessionId);
            if ($session->payment_status === 'paid') {
                return redirect()->route('home')->with('success', 'Subscription successful!');
            }
        }
        return redirect()->route('home')->with('error', 'Subscription failed.');
    }

    public function getSubscriptionStatus(Request $request)
    {
        $user = $request->user();
        return response()->json(['subscribed' => $user ? $user->subscribed('default') : false]);
    }
}