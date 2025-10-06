@extends('layouts.app')
@section('content')
<div id="app">
    <subscription-component></subscription-component>
    {{-- @include('layouts.footer') --}}
    <!-- @if (session('error'))
        <script>
            window.flashError = '{{ session('error') }}';
        </script>
    @endif
    @if (session('success'))
        <script>
            window.flashSuccess = '{{ session('success') }}';
        </script>
    @endif -->

<div>
@endsection
