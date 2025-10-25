@extends('layouts.app')
@section('title', 'Islamic Connect — Quran Portal')
@section('content')
<div>
    <holy-component
        :is-authenticated="@json(auth()->check())"
        :is-subscribed="@json(optional(auth()->user())->subscribed('premium'))"
    ></holy-component>
    {{-- @include('layouts.footer') --}}

<div>
@endsection
