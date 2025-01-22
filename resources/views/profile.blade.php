@extends('layouts.app')
@section('content')
<div id="app" class="container-fluid">
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
