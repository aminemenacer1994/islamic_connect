@extends('layouts.app')
@section('title', 'Islamic Connect — Payment')
@section('content')
@include('partials.sidebar')
<div class="container-fluid content-with-sidebar">
    <payment-component></payment-component>
    {{-- @include('layouts.footer') --}}
</div>
@endsection
