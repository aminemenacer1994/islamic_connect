@extends('layouts.app')
<div class="subscription-page">
  <script>
    window.appConfig = Object.assign({}, window.appConfig || {}, {
      stripePrices: {
        monthly: @json(config('services.stripe.prices.monthly')),
        yearly: @json(config('services.stripe.prices.yearly')),
      }
    });
  </script>
  <subscription-component></subscription-component>
</div>
@endsection
