@extends('layouts.app')
@section('content')
@include('partials.sidebar')
<div class="container-fluid content-with-sidebar">
    <feedback-component></feedback-component>
    {{-- @include('layouts.footer') --}}
</div>
@endsection
