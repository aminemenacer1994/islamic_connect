@extends('layouts.app')
@section('title', 'Islamic Connect Subscription Success')
@section('content')
<div class="container py-4">
    <h1>Success!</h1>
    <p>{{ session('message') }}</p>
    <p><a class="btn btn-primary" href="{{ route('subscribe') }}">Back to Subscribe</a></p>
</div>
@endsection