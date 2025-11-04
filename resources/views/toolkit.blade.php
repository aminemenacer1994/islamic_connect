@extends('layouts.app')
@section('content')
<div>
    <toolkit-component
        :is-authenticated="@json(auth()->check())"
        :is-subscribed="@json(optional(auth()->user())->hasPremiumAccess() ?? false)"
    ></toolkit-component>
<div>
    {{-- @include('layouts.footer') --}}
@endsection
