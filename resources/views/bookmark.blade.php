@extends('layouts.app')

@section('content')
@include('partials.sidebar')
<div class="container-fluid content-with-sidebar">
    <bookmark-manager></bookmark-manager>
    {{-- @include('layouts.footer') --}}
</div>
@endsection
