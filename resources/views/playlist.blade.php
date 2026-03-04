@extends('layouts.app')

@section('content')
@include('partials.sidebar')
<div class="container-fluid content-with-sidebar">
    <playlist-component></playlist-component>
</div>
@endsection
