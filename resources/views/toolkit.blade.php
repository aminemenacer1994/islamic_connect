@extends('layouts.app')
@section('content')
<div id="app">
    <toolkit-component
        :is-authenticated="@json(auth()->check())"
        :is-subscribed="@json(optional(auth()->user())->subscribed('premium'))"
    ></toolkit-component>
<div>
    {{-- @include('layouts.footer') --}}
@endsection
