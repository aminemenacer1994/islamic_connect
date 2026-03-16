@extends('layouts.app')
@section('title', 'Islamic Connect Quran Portal')
@section('meta_title', 'Islamic Connect Quran Portal')
@section('meta_description', 'Explore the Quran with synced translations, tafsir, and audio so every verse stays accessible, contextual, and meaningful.')
@section('meta_image', asset('images/banner-photo-1200.avif'))
@section('canonical', url('/quran'))

@push('seo')
<meta name="keywords" content="Quran portal, Quran translations, tafsir, Quran recitation, Arabic Quran online">
<meta property="article:section" content="Quran Portal">
@endpush

@push('structured-data')
@php
$quranPage = [
'@context' => 'https://schema.org',
'@type' => 'CollectionPage',
'name' => 'Quran Portal',
'url' => url('/quran'),
'description' => 'The Islamic Connect Quran portal pairs recitations, translations, grammar notes, and tafsir for every surah.',
'mainEntity' => [
'@type' => 'WebPageElement',
'name' => 'Interactive Quran Explorer',
'description' => 'Locate verses, listen to recitation, and follow commentary within one performant tool.',
],
'inLanguage' => 'en-US',
'audience' => [
'@type' => 'Audience',
'audienceType' => 'Quran learners and scholars',
],
];
$quranBreadcrumb = [
'@context' => 'https://schema.org',
'@type' => 'BreadcrumbList',
'itemListElement' => [
['@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => url('/')],
['@type' => 'ListItem', 'position' => 2, 'name' => 'Quran Portal', 'item' => url('/quran')],
],
];
@endphp
<script type="application/ld+json">
    {
        !!json_encode($quranPage, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!
    }
</script>
<script type="application/ld+json">
    {
        !!json_encode($quranBreadcrumb, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!
    }
</script>
@endpush

@section('content')
<div class="ps-md-3">
    <quran-component></quran-component>
</div>
@endsection
