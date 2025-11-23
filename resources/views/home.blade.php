@extends('layouts.app')

@section('title', 'Islamic Connect — Quran & Dua Hub')
@section('meta_title', 'Islamic Connect — Quran & Dua Hub')
@section('meta_description', 'Islamic Connect unites Quran study, dua guidance, and accessible community tools so believers everywhere learn, listen, and serve.')
@section('meta_image', asset('images/qenew.png'))
@section('page_h1')
    @include('partials.home-seo-heading')
@endsection
@section('suppress_layout_h1')
@endsection

@section('content')
    <homepage-component></homepage-component>
@endsection
