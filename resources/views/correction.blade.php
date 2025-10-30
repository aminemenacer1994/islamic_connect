@extends('layouts.app')
@section('content')
@include('partials.sidebar')
<div class="container-fluid content-with-sidebar">
    <correction-component></correction-component>
    {{-- @include('layouts.footer') --}}
</div>
@endsection
