<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Stripe\Stripe;

class PaymentController extends Controller
{
    public function index()
    {
        return view('payment');
    }

    public function getPayments()
    {
        $payments = Payment::orderBy('id', 'desc')->get()->map(function ($p) {
            $amountMinor = is_numeric($p->amount) ? (int) $p->amount : null;
            $amountMajor = $amountMinor !== null ? number_format($amountMinor / 100, 2) : null;

            $meta = [];
            try { $meta = is_array($p->metadata) ? $p->metadata : (json_decode($p->metadata, true) ?: []); } catch (\Throwable $e) {}

            return [
                'id' => $p->id,
                'name' => $p->name,
                'description' => $p->description,
                'payment_method' => $p->payment_method,
                'currency' => strtoupper((string) $p->currency),
                'amount' => $amountMajor,
                'status' => $p->status,
                'date' => $p->date,
                'provider' => $p->provider,
                'receipt_url' => $p->receipt_url,
                'stripe_payment_intent_id' => $p->stripe_payment_intent_id,
                'stripe_checkout_session_id' => $p->stripe_checkout_session_id,
                'customer' => $meta['customer'] ?? ($meta['customer_email'] ?? null),
                'amount_refunded' => isset($meta['amount_refunded']) ? number_format(($meta['amount_refunded'] / 100), 2) : null,
                'raw_currency' => $p->currency,
            ];
        });

        return response()->json($payments);
    }

    /**
     * Fetch recent transactions directly from Stripe (charges),
     * shaped similar to the Stripe Dashboard Transactions list.
     */
    public function getStripeTransactions(Request $request)
    {
        try {
            $secret = config('services.stripe.secret');
            if (!$secret) {
                return response()->json([
                    'error' => 'Stripe secret missing. Set STRIPE_SECRET in .env.'
                ], 422);
            }
            Stripe::setApiKey($secret);

            $limit = (int) min(max((int) $request->query('limit', 100), 1), 100);
            $startingAfter = $request->query('starting_after');

            $params = [ 'limit' => $limit ];
            if ($startingAfter) $params['starting_after'] = $startingAfter;

            $charges = \Stripe\Charge::all($params);

            $data = collect($charges->data)->map(function ($c) {
                $pm = $c->payment_method_details->card ?? null;
                $refunded = (bool) ($c->refunded ?? false);
                $refunds = $c->refunds->data ?? [];
                $refundCreated = !empty($refunds) ? ($refunds[0]->created ?? null) : null;
                $declineCode = $c->outcome->reason ?? ($c->failure_code ?? null);

                return [
                    'id' => $c->id,
                    'amount' => number_format(($c->amount ?? 0) / 100, 2),
                    'currency' => strtoupper($c->currency ?? 'GBP'),
                    'status' => $refunded ? 'refunded' : ($c->status ?? 'unknown'),
                    'payment_method' => $pm ? strtoupper(($pm->brand ?? 'CARD')) . ' •••• ' . ($pm->last4 ?? '----') : ($c->payment_method_details->type ?? 'card'),
                    'description' => $c->description ?? ($c->payment_intent ?? ''),
                    'customer' => $c->billing_details->email ?? null,
                    'date' => isset($c->created) ? date('Y-m-d H:i:s', $c->created) : null,
                    'refunded_date' => $refundCreated ? date('Y-m-d H:i:s', $refundCreated) : null,
                    'decline_code' => $declineCode,
                    'payment_intent' => $c->payment_intent ?? null,
                    'receipt_url' => $c->receipt_url ?? null,
                ];
            })->values();

            return response()->json([
                'data' => $data,
                'has_more' => (bool) ($charges->has_more ?? false),
                'last_id' => optional($charges->data)->last()->id ?? null,
            ]);
        } catch (\Throwable $e) {
            Log::error('Stripe transactions fetch failed', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Unable to fetch Stripe transactions', 'detail' => $e->getMessage()], 500);
        }
    }
}
