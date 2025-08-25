@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Subscription Canceled</div>
                <div class="card-body">
                    <h1>Subscription Canceled</h1>
                    <p>Your payment was canceled. Please try again if you wish to complete the subscription.</p>
                    <a href="{{ route('home') }}" class="btn btn-primary">Return to Home</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
