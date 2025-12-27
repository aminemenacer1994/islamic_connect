@extends('layouts.app')
@section('title', 'Islamic Connect Subscription Canceled')
@section('content')
<div class="container py-4">
    <h1>Cancelled</h1>
    <p>{{ session('message') }}</p>
    <p><a class="btn btn-primary" href="{{ route('subscribe') }}">Try Again</a></p>
</div>
@endsection