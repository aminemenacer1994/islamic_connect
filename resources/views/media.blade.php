@extends('layouts.app')
@section('title', 'Islamic Connect Media Center')
@section('content')
<div>
    <media-component
        :is-authenticated="@json(auth()->check())"
        :is-subscribed="@json(optional(auth()->user())->hasPremiumAccess() ?? false)"></media-component>
    <div>
        {{-- @include('layouts.footer') --}}
        @endsection