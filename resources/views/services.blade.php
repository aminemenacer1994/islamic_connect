@extends('layouts.app')
@section('content')
<div>
    <services-component
        :is-authenticated="@json(auth()->check())"
        :is-subscribed="@json(optional(auth()->user())->subscribed('premium'))"
    ></services-component>
    <payment-methods-component></payment-methods-component>
<div>
    {{-- @include('layouts.footer') --}}
@endsection
