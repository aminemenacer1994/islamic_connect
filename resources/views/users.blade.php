@extends('layouts.app')
@section('title', 'Islamic Connect — Users')
@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-md-2">
            @include('partials.sidebar')
        </div>
        <div class="col-md-10">
            <users-component :information="information"></users-component>
            {{-- @include('layouts.footer') --}}
        </div>
    </div>
</div>
@endsection
