@extends('layouts.app')
@section('title', 'Islamic Connect About')
@section('content')
<about-us-component :sections='@json($sections ?? [])'></about-us-component>
@endsection