@extends('layouts.app')

@section('title', 'Shared Folder')
@section('meta_title', 'Shared Quran Folder')
@section('meta_description', 'Read shared Quran bookmarks in a calm, distraction-free view.')

@section('content')
    <shared-folder-view token="{{ $token }}"></shared-folder-view>
@endsection
