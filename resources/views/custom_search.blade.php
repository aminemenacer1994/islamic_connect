@extends('layouts.app')
@section('content')
 <div id="app" style="padding-left: 30px">
  <custom-surah-selection :customSurahs="customSurahs" v-model="surah"></custom-surah-selection>
 <div>
{{-- @include('layouts.footer') --}}
@endsection

