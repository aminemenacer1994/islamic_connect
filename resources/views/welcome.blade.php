@extends('layouts.app')

@section('title', 'Islamic Connect — Connecting You to Islamic Knowledge')
@section('meta_title', 'Islamic Connect — Explore Quran, Islamic Knowledge & Accessible Tools')
@section('meta_description', 'Discover Quran recitations, Islamic knowledge, media content, and accessible tools that support Muslims worldwide. Explore the Holy Quran, Islamic content, and AI-powered spiritual tools on Islamic Connect.')
@section('meta_image', asset('images/qenew.png'))

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

@section('page_h1')
{{-- Primary H1 provided within Vue component hero --}}
@endsection
