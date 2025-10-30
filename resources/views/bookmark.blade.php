@extends('layouts.app')

@section('content')
@include('partials.sidebar')
<div class="container-fluid content-with-sidebar">
    <bookmark-component></bookmark-component>
    {{-- @include('layouts.footer') --}}
</div>
@endsection
