@extends('layouts.app')
@section('title', 'Islamic Connect — Profile')
@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-md-2">
            @include('partials.sidebar')
        </div>
        <div class="col-md-10">
            <profile-component :user="{{ Auth::user() }}"></profile-component>
        </div>
    </div>
</div>
@endsection
