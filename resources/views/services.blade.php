@extends('layouts.app')
@section('title', 'Islamic Connect — Services')
@section('content')
<div>
    <services-component
        :is-authenticated="@json(auth()->check())"
        :is-subscribed="@json(optional(auth()->user())->hasPremiumAccess() ?? false)"
    ></services-component>
    <payment-methods-component></payment-methods-component>
<div>
    {{-- @include('layouts.footer') --}}
@endsection
