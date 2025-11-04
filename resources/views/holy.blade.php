@extends('layouts.app')
@section('title', 'Islamic Connect — Quran Portal')
@section('content')
<div>
    <holy-component
        :is-authenticated="@json(auth()->check())"
        :is-subscribed="@json(optional(auth()->user())->hasPremiumAccess() ?? false)"
    ></holy-component>
    {{-- @include('layouts.footer') --}}

<div>
@endsection
