@extends('layouts.app')
@section('title', 'Islamic Connect AI Reports')
@section('content')
@include('partials.sidebar')
<div class="container-fluid content-with-sidebar">
    <ai-reports-component></ai-reports-component>
</div>
@endsection
