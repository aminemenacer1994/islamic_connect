@extends('layouts.app')
@section('title', 'Islamic Connect Shop')
@section('meta_title', 'Islamic Connect Shop | Islamic Books, Knowledge & Media Products')
@section('meta_description', 'Discover our curated collection of Islamic books, educational materials, media content, and products. Support your Islamic knowledge journey with quality resources from Islamic Connect.')
@section('meta_type', 'website')
@section('canonical', url('/shop'))

@push('structured-data')
<script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Store",
        "name": "Islamic Connect Shop",
        "description": "Islamic books, educational materials, media content, and products",
        "url": "{{ url('/shop') }}",
        "image": "{{ asset('images/logo_main.png') }}",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
        },
        "sameAs": [
            "https://www.facebook.com/profile.php?id=61560313385599",
            "https://x.com/islamiconnect24",
            "https://www.linkedin.com/company/islamic-connect/",
            "https://www.instagram.com/islamicconnect24/"
        ]
    }
</script>
@endpush
@section('content')
<div>
    <shop-component></shop-component>
    <div>
        {{-- @include('layouts.footer') --}}
        @endsection