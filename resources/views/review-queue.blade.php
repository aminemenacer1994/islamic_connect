@extends('layouts.app')
@section('title', 'My Review Queue')
@section('meta_title', 'My Quran Review Queue')
@section('meta_description', 'Review and practice Quran verses you marked as difficult during memorisation.')
@section('canonical', url('/review-queue'))
@section('content')
<div>
    <review-queue-component></review-queue-component>
</div>
@endsection
