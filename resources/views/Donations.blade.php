@extends('layouts.app')
@section('content')
@include('partials.sidebar')
<div class="container-fluid content-with-sidebar">
    <donations-component></donations-component>
    {{-- @include('layouts.footer') --}}
</div>
@endsection
