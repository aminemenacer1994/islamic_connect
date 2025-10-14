@extends('layouts.app')
@section('content')
<div id="app">
    <services-component
        :is-authenticated="@json(auth()->check())"
        :is-subscribed="@json(optional(auth()->user())->subscribed('premium'))"
    ></services-component>
<div>
    {{-- @include('layouts.footer') --}}
@endsection
