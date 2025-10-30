@extends('layouts.app')
@section('content')
@include('partials.sidebar')
<div class="container-fluid content-with-sidebar">
    <mailing_list-component></mailing_list-component>
    {{-- @include('layouts.footer') --}}
</div>
@endsection
