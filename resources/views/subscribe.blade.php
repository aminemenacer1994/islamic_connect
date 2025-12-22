@extends('layouts.app')
<!-- @section('suppress_layout_h1', true)
@section('title', 'Subscribe & Support Islamic Connect — Premium Access')
@section('meta_description', 'Unlock premium Qur’an recitations, curated content, and compassionate tools by subscribing to Islamic Connect today.')
@section('canonical', url()->current()) -->
@section('content')
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
