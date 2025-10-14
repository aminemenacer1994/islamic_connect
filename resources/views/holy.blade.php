@extends('layouts.app')
@section('content')
<div id="app">
    <holy-component
        :is-authenticated="@json(auth()->check())"
        :is-subscribed="@json(optional(auth()->user())->subscribed('premium'))"
    ></holy-component>
    {{-- @include('layouts.footer') --}}

<div>
@endsection
