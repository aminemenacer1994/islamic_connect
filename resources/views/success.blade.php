@extends('layouts.app')
@section('title', 'Islamic Connect — Payment Success')
@section('content')
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #228B22 0%, #1a6b1a 100%);
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .success-container {
            background: white;
            padding: 3rem;
            border-radius: 12px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 500px;
        }
        .success-icon {
            font-size: 4rem;
            color: #10b981;
            margin-bottom: 1rem;
        }
        h1 {
            color: #1f2937;
            margin-bottom: 1rem;
        }
        p {
            color: #4b5563;
            margin-bottom: 2rem;
        }
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f4f6;
            border-top: 4px solid #006b5f;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
    <div class="success-container">
        <div class="success-icon">✓</div>
        <h1>Payment Successful!</h1>
        <p>Thank you for your subscription. You will be redirected to the homepage shortly.</p>
        <div class="loading-spinner"></div>
    </div>

    <script>
        setTimeout(function() {
            window.location.href = '/home';
        }, 5000);
    </script>
@endsection
