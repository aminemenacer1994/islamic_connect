@extends('layouts.app')
@section('title', 'Islamic Connect — Subscribe')
@section('content')
<div>
    <script>
      window.appConfig = Object.assign({}, window.appConfig || {}, {
        stripePrices: {
          monthly: @json(config('services.stripe.prices.monthly')),
          yearly: @json(config('services.stripe.prices.yearly')),
        }
      });
    </script>
    <subscription-component></subscription-component>
    {{-- @include('layouts.footer') --}}
    

<div>
@endsection
