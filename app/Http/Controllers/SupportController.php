<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Stripe\Checkout\Session;
use Stripe\Stripe;

class SupportController extends Controller
{
    public function index()
    {
        return view('support');
    }
    
    public function insights()
    {
        return response()->json($this->buildDonationInsights());
    }

    public function createCheckoutSession(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $priceId = config('services.stripe.donation_price_id') ?? config('services.stripe.price_id');

        // If a price ID is configured, amount is optional and ignored
        if ($priceId) {
            $unitAmount = null;
            $amount = null;
        } else {
            // Validate amount (GBP) — accept decimals, min £1
            $validated = $request->validate([
                'amount' => 'required|numeric|min:1|max:100000',
            ]);
            // Normalize to two decimals then to integer pence
            $amount = round((float) $validated['amount'], 2);
            $unitAmount = (int) round($amount * 100);
        }

        try {
            Log::info('Creating Stripe Checkout donation session', [
                'amount_gbp' => $amount,
                'unit_amount' => $unitAmount,
            ]);

            $params = [
                'payment_method_types' => ['card'],
                'line_items' => [],
                'mode' => 'payment',
                // Include session ID so we can verify on success
                'success_url' => url('/donation/success') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => url('/donation/cancel'),
                'metadata' => [
                    'source' => 'support_page',
                    'app' => config('app.name'),
                ],
            ];

            if ($priceId) {
                $params['line_items'][] = [
                    'price' => $priceId,
                    'quantity' => 1,
                ];
                Log::info('Using fixed Stripe price for donation', ['price_id' => $priceId]);
            } else {
                $params['line_items'][] = [
                    'price_data' => [
                        'currency' => 'gbp',
                        'product_data' => [ 'name' => 'Donation' ],
                        'unit_amount' => $unitAmount,
                    ],
                    'quantity' => 1,
                ];
            }

            $session = Session::create($params);

            Log::info('Stripe Checkout donation session created', [
                'session_id' => $session->id,
                'payment_intent' => $session->payment_intent ?? null,
            ]);

            return response()->json(['id' => $session->id]);

        } catch (\Exception $e) {
            Log::error('Failed to create Stripe Checkout session', [
                'error' => $e->getMessage(),
            ]);
            return response()->json(['error' => 'Unable to start payment at the moment. Please try again.'], 400);
        }
    }

    public function success(Request $request)
    {
        $sessionId = $request->query('session_id');
        $defaultInsights = $this->buildDonationInsights();
        if (!$sessionId) {
            return view('donation.success', [
                'verified' => false,
                'message' => 'Missing session ID. If you completed payment, it will still be processed.',
                'goal' => $defaultInsights['goal'],
                'goalProgress' => $defaultInsights['progress'],
                'totalRaised' => $defaultInsights['totalRaised'],
                'donorCount' => $defaultInsights['donorCount'],
            ]);
        }

        Stripe::setApiKey(config('services.stripe.secret'));
        try {
            $session = Session::retrieve([
                'id' => $sessionId,
                'expand' => ['payment_intent', 'line_items'],
            ]);

            $pi = $session->payment_intent;
            $status = is_object($pi) ? ($pi->status ?? null) : null;
            $amount = is_object($pi) ? ($pi->amount_received ?? $pi->amount ?? null) : null;
            $currency = is_object($pi) ? ($pi->currency ?? 'gbp') : 'gbp';

            Log::info('Donation success verified', [
                'session_id' => $sessionId,
                'payment_intent' => is_object($pi) ? $pi->id : $session->payment_intent,
                'status' => $status,
                'amount' => $amount,
            ]);

            $insights = $this->buildDonationInsights();

            $amountValue = is_numeric($amount) ? round(((float) $amount) / 100, 2) : 0;
            $this->recordDonationFromSession($session, $status, $currency, $amountValue);

            return view('donation.success', [
                'verified' => in_array($status, ['succeeded', 'requires_capture']),
                'status' => $status,
                'amount' => $amount,
                'currency' => strtoupper($currency),
                'payment_intent_id' => is_object($pi) ? $pi->id : $session->payment_intent,
                'session_id' => $sessionId,
                'goal' => $insights['goal'],
                'goalProgress' => $insights['progress'],
                'totalRaised' => $insights['totalRaised'],
                'donorCount' => $insights['donorCount'],
            ]);
        } catch (\Exception $e) {
            Log::error('Failed verifying donation success', [
                'session_id' => $sessionId,
                'error' => $e->getMessage(),
            ]);
            return view('donation.success', [
                'verified' => false,
                'message' => 'We could not verify your payment yet. Please check your email for the receipt or contact support.',
                'goal' => $defaultInsights['goal'],
                'goalProgress' => $defaultInsights['progress'],
                'totalRaised' => $defaultInsights['totalRaised'],
                'donorCount' => $defaultInsights['donorCount'],
            ]);
        }
    }

    protected function buildDonationInsights(): array
    {
        $goal = (float) config('donation.goal', 15000);
        $presetAmounts = collect(config('donation.preset_amounts', [10, 25, 50, 100]))
            ->filter(fn ($value) => is_numeric($value) && $value > 0)
            ->map(fn ($value) => (int) round($value))
            ->unique()
            ->sort()
            ->values()
            ->all();

        $donations = Donation::where('payment_status', 'succeeded')
            ->orderBy('created_at', 'desc')
            ->get();

        $totalRaised = $donations->sum(fn ($donation) => (float) $donation->amount);
        $count = $donations->count();
        $average = $count ? ($totalRaised / $count) : 0;

        $recentDonations = $donations->take(3)->map(fn ($donation) => [
            'id' => $donation->id,
            'label' => trim("{$donation->firstname} {$donation->lastname}"),
            'amount' => round((float) $donation->amount, 2),
            'timeAgo' => $donation->created_at->diffForHumans(),
        ]);

        $lastDonation = $recentDonations->first();

        $suggestedAmounts = collect($presetAmounts);
        if ($average > 0) {
            $suggestedAmounts->push(max(1, round($average)));
        }
        if ($lastDonation) {
            $suggestedAmounts->push(max(1, round($lastDonation['amount'] * 1.1)));
        }

        $suggestedAmounts = $suggestedAmounts->map(fn ($value) => (int) max(1, round($value)))
            ->unique()
            ->sort()
            ->values()
            ->all();

        $progress = $goal > 0 ? round(min(100, ($totalRaised / $goal) * 100), 1) : 0;

        return [
            'goal' => round($goal, 2),
            'totalRaised' => round($totalRaised, 2),
            'progress' => $progress,
            'presetAmounts' => $presetAmounts,
            'averageDonation' => round($average, 2),
            'recentDonations' => $recentDonations->all(),
            'suggestedAmounts' => $suggestedAmounts,
            'donorCount' => $count,
            'lastDonation' => $lastDonation,
        ];
    }

    protected function recordDonationFromSession(Session $session, ?string $status, ?string $currency, float $amount): void
    {
        try {
            $customer = $session->customer_details ?? null;
            $name = trim((string) data_get($customer, 'name', ''));
            $nameParts = preg_split('/\s+/', $name, 2, PREG_SPLIT_NO_EMPTY);
            $firstname = $nameParts[0] ?? 'Supporter';
            $lastname = $nameParts[1] ?? ($nameParts[0] ?? 'Supporter');
            $email = data_get($customer, 'email', $session->customer_email);
            $country = data_get($customer, 'address.country', 'Unknown');

            $amountString = number_format($amount, 2, '.', '');
            $currency = strtoupper($currency ?? 'GBP');

            $recentDuplicate = Donation::where('email', $email)
                ->where('amount', $amountString)
                ->where('currency', $currency)
                ->where('payment_status', $status)
                ->where('created_at', '>=', now()->subMinutes(5))
                ->exists();

            if ($recentDuplicate) {
                return;
            }

            Donation::create([
                'firstname' => $firstname,
                'lastname' => $lastname,
                'email' => $email ?? 'support@islamicconnect.org',
                'country' => $country ?? 'Unknown',
                'amount' => $amountString,
                'currency' => $currency,
                'payment_status' => $status ?? 'pending',
            ]);
        } catch (\Exception $e) {
            Log::warning('Unable to persist donation data', [
                'error' => $e->getMessage(),
                'session_id' => $session->id,
            ]);
        }
    }
}
