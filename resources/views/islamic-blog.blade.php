@extends('layouts.app')
@section('title', 'Islamic Connect Library')
@section('meta_title', 'Islamic Connect Library | Islamic Article Reader')
@section('meta_description', 'Browse Islamic articles with search, summaries, listening tools, print support, and recently viewed history in Islamic Connect Library.')
@section('canonical', url('/islamic-blog'))
@section('page_h1')
@endsection
@section('content')
<div>
    <islamic-blog-component></islamic-blog-component>
</div>
@endsection
