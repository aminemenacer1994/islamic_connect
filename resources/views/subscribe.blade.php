@if (!$user->subscribed('premium'))
    <form method="POST" action="{{ route('subscribe') }}" class="subscription-form">
        @csrf
        <select name="price_lookup_key" required>
            <option value="price_1SDrmPGsDD2PdzHqTgawcJZd">Premium Monthly (£1.99)</option>
            <option value="price_1SDrmPGsDD2PdzHqDOScwoI2">Premium Yearly (£18)</option>
            <option value="price_1SDrmPGsDD2PdzHqvk1SOoT3">Premium Lifetime (£25)</option>
        </select>
        <button type="submit">Subscribe</button>
    </form>
@else
    @php
        $subscription = $user->subscription('premium');
        $planDetails = [
            'price_1SDrmPGsDD2PdzHqTgawcJZd' => 'Monthly (£1.99)',
            'price_1SDrmPGsDD2PdzHqDOScwoI2' => 'Yearly (£18)',
            'price_1SDrmPGsDD2PdzHqvk1SOoT3' => 'Lifetime (£25)',
        ];
        $planName = $subscription?->stripe_price ? ($planDetails[$subscription->stripe_price] ?? 'Unknown') : 'free';
    @endphp
    <div class="subscription-details">
        <p>Debug: Subscribed = {{ $user->subscribed('premium') ? 'Yes' : 'No' }}, Stripe Price = {{ $subscription?->stripe_price ?? 'None' }}</p>
        <p>You’re on the {{ $planName }} plan! Ends: {{ $subscription?->ends_at?->toDateString() ?? 'Never' }}</p>
        <form method="POST" action="{{ route('cancel') }}" class="cancel-form">
            @csrf
            <button type="submit">Cancel Subscription</button>
        </form>
    </div>
@endif