@extends('layouts.app')

@section('title', 'Islamic Connect — Quran & Dua Hub')
@section('meta_title', 'Islamic Connect — Quran & Dua Hub')
@section('meta_description', 'Islamic Connect unites Quran study, dua guidance, and accessible community tools so believers everywhere learn, listen, and serve.')
@section('meta_image', asset('images/qenew.png'))
@push('seo')
    <meta name="keywords" content="accessible Quran tools, dua library, Islamic learning, Quran recitation, scholar tafsir, dua guidance">
    <meta property="article:section" content="Quran & Dua hub">
@endpush
@push('critical')
    <link rel="preload" href="{{ asset('images/banner-photo-800.avif') }}" as="image" type="image/avif">
    <style id="critical-hero">
        :root {
            color-scheme: light;
        }
        body {
            margin: 0;
            font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            background: #fefefe;
        }
        .hero-title {
            font-size: clamp(2.5rem, 5vw, 3.9rem);
            letter-spacing: -0.01em;
            color: #0f4c4c;
        }
        .hero-subtitle p {
            font-size: 1rem;
            margin: 0;
            color: #1f3b45;
        }
        .hero-badge {
            display: inline-flex;
            align-items: center;
            border-radius: 999px;
            font-weight: 600;
            font-size: 0.85rem;
            background: rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(15, 76, 76, 0.1);
        }
        .hero-controls {
            flex-wrap: wrap;
            gap: 0.6rem;
        }
        .btn-teal {
            color: #fff;
            background: #00c4b4;
            border: none;
        }
    </style>
@endpush
@push('structured-data')
    @php
        $homeBreadcrumb = [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => [
                ['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => url('/')],
                ['@type' => 'ListItem', 'position' => 2, 'name' => 'Quran Portal', 'item' => url('/quran')],
                ['@type' => 'ListItem', 'position' => 3, 'name' => 'Dua Library', 'item' => url('/dua')],
            ],
        ];
        $homeHighlights = [
            '@context' => 'https://schema.org',
            '@type' => 'ItemList',
            'name' => 'Islamic Connect Highlights',
            'url' => url('/'),
            'itemListOrder' => 'Descending',
            'itemListElement' => [
                [
                    '@type' => 'ListItem',
                    'position' => 1,
                    'item' => [
                        '@type' => 'CreativeWork',
                        '@id' => url('/quran'),
                        'name' => 'Interactive Quran Explorer',
                        'description' => 'Read, listen, and memorize the Quran with translations, tafsir, and AI study notes.',
                    ],
                ],
                [
                    '@type' => 'ListItem',
                    'position' => 2,
                    'item' => [
                        '@type' => 'CreativeWork',
                        '@id' => url('/dua'),
                        'name' => 'Verified Dua Collection',
                        'description' => 'Access dua libraries curated by scholars with audio, transliteration, and usage notes.',
                    ],
                ],
                [
                    '@type' => 'ListItem',
                    'position' => 3,
                    'item' => [
                        '@type' => 'CreativeWork',
                        '@id' => url('/content'),
                        'name' => 'Community Knowledge Center',
                        'description' => 'Podcasts, articles, and impact stories that connect Quran clarity to modern life.',
                    ],
                ],
            ],
        ];
    @endphp
    <script type="application/ld+json">
        {!! json_encode($homeBreadcrumb, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}
    </script>
    <script type="application/ld+json">
        {!! json_encode($homeHighlights, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}
    </script>
@endpush
@section('page_h1')
    @include('partials.home-seo-heading')
@endsection
@section('suppress_layout_h1')
@endsection

@section('content')
    <homepage-component></homepage-component>
@endsection
