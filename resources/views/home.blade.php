@extends('layouts.app')

@section('title', 'Islamic Connect | Explore Quran, Knowledge & Accessible Tools Hub for Modern Muslims')
@section('meta_title', 'Islamic Connect | Explore Quran, Islamic Knowledge & Accessible Tools for Modern Muslims')
@section('meta_description', 'Islamic Connect is the Quran and knowledge hub delivering accessible media, dua wisdom, and adaptive study tools that empower Muslims across the globe with responsive spiritual insights.')
@section('meta_image', asset('images/qenew.png'))
@section('page_h1')
    @include('partials.home-seo-heading')
@endsection
@section('suppress_layout_h1')
@endsection

@section('content')
    <homepage-component></homepage-component>
@endsection
