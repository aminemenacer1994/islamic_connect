@extends('layouts.app')

@section('content')
@include('partials.sidebar')
<div class="container-fluid content-with-sidebar">
    <collection-component></collection-component>
    {{-- @include('layouts.footer') --}}
</div>
@endsection
