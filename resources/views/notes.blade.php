@extends('layouts.app')

@section('content')
@include('partials.sidebar')
<div class="container-fluid content-with-sidebar">
    <notes-component ></notes-component>
    {{-- @include('layouts.footer') --}}
</div>
@endsection
