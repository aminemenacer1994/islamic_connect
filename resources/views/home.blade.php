@extends('layouts.app')

@section('title', 'Islamic Connect — Quran, Knowledge & Accessible Tools Hub')
@section('meta_title', 'Islamic Connect — Explore Quran, Islamic Knowledge & Accessible Tools')
@section('meta_description', 'Islamic Connect delivers Quran recitations, scholar-led lessons, and accessible tools so Muslims worldwide can learn and stay inspired daily.')
@section('meta_image', asset('images/qenew.png'))
@section('page_h1')
@endsection
@section('suppress_layout_h1')
@endsection

@section('content')
    <homepage-component></homepage-component>
@endsection
