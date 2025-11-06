@extends('layouts.app')

@section('title', 'Islamic Connect — Home')
@section('meta_title', 'Islamic Connect — Explore Quran, Media, and Accessible Tools')
@section('meta_description', 'Explore Islamic Connect for Quran recitations, Islamic media, smart study tools, and accessibility resources designed to support Muslims around the world.')
@section('meta_image', asset('images/qenew.png'))

@section('content')
    <homepage-component></homepage-component>
    {{-- @include('layouts.footer') --}}
@endsection
