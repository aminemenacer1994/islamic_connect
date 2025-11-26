<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Donation Acknowledged</title>
    <style>
        :root {
            color-scheme: light dark;
        }
        body {
            margin: 0;
            min-height: 100vh;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: radial-gradient(circle at top, #122b3f 0%, #0c1824 55%, #060b12 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            color: #0f172a;
        }
        .success-shell {
            max-width: 540px;
            width: 100%;
        }
        .success-card {
            background: #ffffff;
            border-radius: 24px;
            padding: 2.5rem;
            box-shadow: 0 30px 80px rgba(8, 17, 32, 0.5);
            text-align: center;
        }
        .success-card h1 {
            margin-bottom: 0.5rem;
            font-size: 2.25rem;
            color: #0f172a;
        }
        .success-card .subtext {
            margin-bottom: 1.5rem;
            color: #475467;
        }
        .status-message {
            color: #0f172a;
            margin-bottom: 0.3rem;
            font-weight: 600;
        }
        .lead-message {
            font-size: 1rem;
            color: #475467;
            margin-bottom: 1.25rem;
        }
        .donation-amount {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
        }
        .progress-wrapper {
            margin-bottom: 1.5rem;
        }
        .progress-track {
            width: 100%;
            height: 12px;
            border-radius: 999px;
            background: #e2e8f0;
            overflow: hidden;
        }
        .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #1a5f7a, #235170);
            transition: width 0.4s ease;
        }
        .progress-labels {
            display: flex;
            justify-content: space-between;
            margin-top: 0.5rem;
            font-size: 0.85rem;
            color: #475467;
        }
        .metric-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        .metric-grid div {
            background: #f8fafc;
            padding: 1rem;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
        }
        .metric-value {
            margin: 0;
            font-size: 1.35rem;
            font-weight: 700;
            color: #0f172a;
        }
        .metric-label {
            margin: 0;
            font-size: 0.85rem;
            color: #64748b;
        }
        .email-note {
            font-size: 0.9rem;
            color: #475467;
            margin-bottom: 1.25rem;
        }
        .return-link {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            background: #1a5f7a;
            color: #ffffff;
            text-decoration: none;
            padding: 0.85rem 1.5rem;
            border-radius: 999px;
            font-weight: 600;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .return-link:hover {
            transform: translateY(-1px);
            box-shadow: 0 8px 20px rgba(26, 95, 122, 0.35);
        }
    </style>
</head>
<body>
    @php
        $totalRaisedValue = $totalRaised ?? 0;
        $goalValue = $goal ?? 0;
        $remaining = max(0, $goalValue - $totalRaisedValue);
        $progressValue = min(100, max(0, $goalProgress ?? 0));
    @endphp
    <div class="success-shell">
        <div class="success-card">
            <p class="subtext">Islamic Connect · Global Islamic education</p>
            <h1>Thank You for Your Donation!</h1>
            @if(isset($verified) && $verified)
                <p class="status-message">Payment Verified ✔️</p>
                <p class="lead-message">Your contribution keeps Qur'anic content and Hadith tools accessible worldwide.</p>
                @if(isset($amount))
                    @php
                        $amt = is_numeric($amount) ? number_format($amount/100, 2) : '0.00';
                    @endphp
                    <p class="donation-amount">Donation received: £{{ $amt }}</p>
                @endif
            @else
                <p class="status-message text-warning">{{ $message ?? 'Payment completed. We are finalizing verification.' }}</p>
                <p class="lead-message">If the payment was successful you will receive an email confirmation shortly.</p>
            @endif
            <div class="progress-wrapper">
                <div class="progress-track">
                    <span class="progress-bar" style="width: {{ $progressValue }}%;"></span>
                </div>
                <div class="progress-labels">
                    <span>Progress: {{ number_format($progressValue, 1) }}%</span>
                    <span>Goal: £{{ number_format($goalValue, 2) }}</span>
                </div>
            </div>
            <div class="metric-grid">
                <div>
                    <p class="metric-value">£{{ number_format($totalRaisedValue, 2) }}</p>
                    <p class="metric-label">Total raised</p>
                </div>
                <div>
                    <p class="metric-value">{{ $donorCount ?? 0 }}</p>
                    <p class="metric-label">Supporters</p>
                </div>
                <div>
                    <p class="metric-value">£{{ number_format($remaining, 2) }}</p>
                    <p class="metric-label">To reach goal</p>
                </div>
            </div>
            <p class="email-note">Confirmation and receipt are on the way to the email tied to your Stripe session.</p>
            <a href="{{ url('/support') }}" class="return-link">
                ← Return to Support
            </a>
        </div>
    </div>
</body>
</html>
