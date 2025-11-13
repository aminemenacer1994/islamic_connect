@extends('layouts.app')
@section('title', 'Islamic Connect — Quran Explorer')
@section('meta_title', 'Islamic Connect — Explore All 114 Surahs of the Holy Quran')
@section('meta_description', 'Browse and explore all 114 surahs of the Holy Quran. Read verses, translations, and listen to beautiful recitations with tafseer explanations. Access comprehensive Islamic knowledge and content.')
@section('meta_image', asset('images/qenew.png'))
@section('canonical', url('/surat'))
@section('page_h1')
@endsection
@section('content')
<div>
    <surat-component></surat-component>
    {{-- @include('layouts.footer') --}}

<div>
@endsection
