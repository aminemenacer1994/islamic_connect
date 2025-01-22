@extends('layouts.app')
@section('content')
 <div id="app" >
  <surah-list-component :initialSurahs="surahs" :initialSurah="surah"></surah-list-component>
  <div>
{{-- @include('layouts.footer') --}}
@endsection

