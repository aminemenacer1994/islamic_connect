<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Successful</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            text-align: center;
        }
    </style>
</head>
<body>
    <div>
        <h1>Thank You for Your Donation!</h1>
        @if(isset($verified) && $verified)
            <p>Your payment has been verified.</p>
            @if(isset($amount))
                <p>Amount: <strong>
                    @php
                        $amt = is_numeric($amount) ? number_format($amount/100, 2) : null;
                    @endphp
                    £{{ $amt }}
                </strong></p>
            @endif
            
        @else
            <p>
                {{ $message ?? 'Payment completed. We are finalizing verification.' }}
            </p>
        @endif
        <p><a href="{{ url('/support') }}">Return to Support</a></p>
        <p id="redirect-note" aria-live="polite">Redirecting to Support…</p>
    </div>
    <script defer>
        // Always redirect to Support after a brief, snappy delay
        setTimeout(function () {
            window.location = "{{ url('/support') }}";
        }, 1500);
    </script>
</body>
</html>
