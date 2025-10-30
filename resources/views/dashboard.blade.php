@extends('layouts.app')
@section('title', 'Islamic Connect — Dashboard')
@section('content')
@include('partials.sidebar')
<div class="container-fluid content-with-sidebar">
    <dashboard-component></dashboard-component>
    {{-- @include('layouts.footer') --}}
</div>
@endsection
