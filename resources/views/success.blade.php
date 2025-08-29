<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Subscription Success - Islamic Connect</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
    <div class="container py-4">
        <div class="alert alert-success text-center">
            <h4>Subscription Successful!</h4>
            <p>Your subscription has been activated. You can now access premium content.</p>
            <a href="{{ session('intended', '/media') }}" class="btn btn-primary">Go to {{ session('intended') == '/content' ? 'Podcasts' : 'Streaming' }}</a>
        </div>
    </div>
    <script>
        // Pass flash data to Vue
        window.Laravel = {
            success: {!! json_encode(session('success')) !!},
            subscribed: {!! json_encode(session('subscribed')) !!}
        };
    </script>
</body>
</html>