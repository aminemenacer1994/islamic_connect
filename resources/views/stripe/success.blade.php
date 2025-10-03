@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Payment Successful</div>
                <div class="card-body text-center">
                    <div class="success-icon mb-3">
                        <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
                    </div>
                    <h1 class="text-success">Payment Successful!</h1>
                    <p class="lead">Your subscription was successful.</p>
                    <p>You will be redirected to the homepage shortly.</p>
                    <div class="spinner-border text-primary mt-3" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
setTimeout(function() {
    window.location.href = '{{ route("home") }}';
}, 5000);
</script>
@endsection
