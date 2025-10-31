@extends('layouts.app')
@section('content')
@include('partials.sidebar')
<div class="container-fluid content-with-sidebar">
    <mailing-list-component></mailing-list-component>
    {{-- @include('layouts.footer') --}}
</div>
@endsection
