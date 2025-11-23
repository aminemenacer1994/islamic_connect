@extends('layouts.app')
@section('title', 'Islamic Connect — Dua Library')
@section('meta_title', 'Islamic Connect — Dua Library')
@section('meta_description', 'Browse dua collections for travel, healing, gratitude, and everyday moments with authentic narrations and audio recitations.')
@section('meta_image', asset('images/banner-photo-800.webp'))
@section('canonical', url('/dua'))

@push('seo')
    <meta name="keywords" content="dua library, supplications, daily duas, authentic duas, Islamic prayer, dua audio">
    <meta property="article:section" content="Dua Library">
@endpush

@push('structured-data')
    @php
        $duaCollection = [
            '@context' => 'https://schema.org',
            '@type' => 'CollectionPage',
            'name' => 'Dua Library',
            'url' => url('/dua'),
            'description' => 'Curated dua collections with transliterations, audio recitation, and scholar notes for every occasion.',
            'hasPart' => [
                ['@type' => 'CreativeWork', 'name' => 'Healing & Wellbeing Duas', 'url' => url('/dua#healing')],
                ['@type' => 'CreativeWork', 'name' => 'Journey & Travel Duas', 'url' => url('/dua#travel')],
                ['@type' => 'CreativeWork', 'name' => 'Gratitude & Dhikr', 'url' => url('/dua#gratitude')],
            ],
            'audience' => [
                '@type' => 'Audience',
                'audienceType' => 'People seeking authentic duʿāʾ and spiritual guidance',
            ],
        ];
        $duaBreadcrumb = [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => [
                ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => url('/')],
                ['@type' => 'ListItem', 'position' => 2, 'name' => 'Dua Library', 'item' => url('/dua')],
            ],
        ];
    @endphp
    <script type="application/ld+json">
        {!! json_encode($duaCollection, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}
    </script>
    <script type="application/ld+json">
        {!! json_encode($duaBreadcrumb, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}
    </script>
@endpush

@section('content')
    <dua-component></dua-component>
    {{-- @include('layouts.footer') --}}
@endsection
