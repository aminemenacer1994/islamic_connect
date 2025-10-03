<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        return view('subscribe', ['user' => $user]);
    }

    public function createSubscription(Request $request)
    {
        $request->validate([
            'price_lookup_key' => 'required|string|in:price_1SDrmPGsDD2PdzHqTgawcJZd,price_1SDrmPGsDD2PdzHqDOScwoI2,price_1SDrmPGsDD2PdzHqvk1SOoT3',
        ]);

        $user = Auth::user();
        \Log::info('Creating subscription for user: ' . $user->id . ' with price: ' . $request->price_lookup_key);

        try {
            $checkout = $user->newSubscription('premium', $request->price_lookup_key)->checkout([
                'success_url' => route('subscribe.success') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('subscribe.cancel'),
            ]);

            return redirect()->away($checkout->url);
        } catch (\Exception $e) {
            \Log::error('Subscription error: ' . $e->getMessage());
            return redirect()->back()->with('message', 'Error: ' . $e->getMessage());
        }
    }

    public function success()
    {
        return view('subscribe-success')->with('message', 'Subscription successful!');
    }

    public function cancel(Request $request)
    {
        $user = Auth::user();
        if ($user->subscription('premium')) {
            $user->subscription('premium')->cancel();
            return redirect()->route('subscribe')->with('message', 'Subscription cancelled.');
        }
        return redirect()->route('subscribe')->with('message', 'No active subscription to cancel.');
    }

    public function subscriptionStatus()
    {
        $user = Auth::user();
        $isSubscribed = $user->subscribed('premium');
        $subscription = $user->subscription('premium');

        return response()->json([
            'is_subscribed' => $isSubscribed,
            'plan' => $subscription?->stripe_price ?? 'free',
            'ends_at' => optional($subscription)->ends_at?->toDateString(),
        ]);
    }

    public function cancelSubscription(Request $request)
    {
        $user = Auth::user();
        $subscription = $user->subscription('premium');

        if ($subscription) {
            $subscription->cancel();
            return response()->json([
                'success' => true,
                'message' => 'Subscription cancelled.',
                'ends_at' => $subscription->ends_at->toDateString(),
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'No active subscription to cancel.',
        ], 400);
    }

    public function addPaymentMethod(Request $request)
    {
        $request->validate([
            'payment_method' => 'required|string',
            'cardholder_name' => 'required|string',
        ]);

        $user = Auth::user();
        $user->addPaymentMethod($request->payment_method);
        $user->setDefaultPaymentMethod($request->payment_method);

        return response()->json([
            'success' => true,
            'message' => 'Payment method added!',
        ]);
    }
}