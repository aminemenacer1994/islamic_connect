@extends('layouts.app')

@section('content')
@include('partials.sidebar')
<div class="container-fluid content-with-sidebar">
    <pins-component></pins-component>
</div>
@endsection
