@extends('layouts.app')
@section('content')
<div id="app" class="container-fluid">
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

