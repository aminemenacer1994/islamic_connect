@extends('layouts.app')
@section('title', 'Islamic Connect — Dashboard')
@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-md-2">
            @include('partials.sidebar')
        </div>
        <div class="col-md-10">
            <dashboard-component></dashboard-component>
            {{-- @include('layouts.footer') --}}
        </div>
    </div>
</div>
@endsection
