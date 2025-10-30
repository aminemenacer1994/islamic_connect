@extends('layouts.app')
@section('title', 'Islamic Connect — Users')
@section('content')
@include('partials.sidebar')
<div class="container-fluid content-with-sidebar">
    <users-component :information="information"></users-component>
    {{-- @include('layouts.footer') --}}
</div>
@endsection
