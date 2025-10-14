@extends('layouts.app')
@section('content')
<div id="app">
    <media-component
        :is-authenticated="@json(auth()->check())"
        :is-subscribed="@json(optional(auth()->user())->subscribed('premium'))"
    ></media-component>
<div>
    {{-- @include('layouts.footer') --}}
@endsection
