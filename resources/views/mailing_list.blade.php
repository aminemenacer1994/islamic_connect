@extends('layouts.app')
@section('content')
<div id="app" class="container-fluid">
    <div class="row">
        <div class="col-md-2">
            @include('partials.sidebar')
        </div>
        <div class="col-md-10">
            <mailing_list-component></mailing_list-component>
            {{-- @include('layouts.footer') --}}
        </div>
    </div>
</div>
@endsection

