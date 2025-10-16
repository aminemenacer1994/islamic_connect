@extends('layouts.app')

@section('critical')
    <!-- Critical CSS + LCP Preload for welcome -->
    <link rel="preload" as="image" href="/images/qenew.png" fetchpriority="high">
    <style>
      /* Reserve space for hero and reduce layout shifts */
      .jumbotron{margin-bottom:0}
      .carousel{contain: content}
      .carousel-item>img{display:block;width:100%;height:auto;aspect-ratio:16/9}
      /* Reduce expensive animations for users preferring reduced motion */
      @media (prefers-reduced-motion: reduce){
        [style*="animation:"]{animation:none !important}
        .carousel{scroll-behavior:auto}
      }
    </style>
@endsection

@section('content')
    <homepage-component></homepage-component>
    {{-- @include('layouts.footer') --}}
@endsection
