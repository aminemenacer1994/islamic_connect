<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Subscription Cancelled - Islamic Connect</title>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h1>Cancelled</h1>
        <p>{{ session('message') }}</p>
        <a href="{{ route('subscribe') }}">Try Again</a>
    </div>
</body>
</html>