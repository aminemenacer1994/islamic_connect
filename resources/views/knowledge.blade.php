@extends('layouts.app')
@section('title', 'Islamic Connect — Knowledge')
@section('content')
<div>
    <knowledge-component
        :is-authenticated="@json(auth()->check())"
        :is-subscribed="@json(optional(auth()->user())->subscribed('premium'))"
    ></knowledge-component>
<div>
    {{-- @include('layouts.footer') --}}
@endsection
