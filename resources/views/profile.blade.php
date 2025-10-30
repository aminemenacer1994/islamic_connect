@extends('layouts.app')
@section('title', 'Islamic Connect — Profile')
@section('content')
@include('partials.sidebar')
<div class="container-fluid content-with-sidebar">
    <profile-component :user="{{ Auth::user() }}"></profile-component>
</div>
@endsection
