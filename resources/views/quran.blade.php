@extends('layouts.app')
@section('meta_image', asset('images/qenew.png'))
@section('canonical', url('/quran'))

@section('content')
<div style="padding-left: 20px">
    <quran-component></quran-component>
<div>
{{-- @include('layouts.footer') --}}
@endsection
