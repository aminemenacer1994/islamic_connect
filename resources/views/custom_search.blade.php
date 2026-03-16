@extends('layouts.app')
@section('content')
 <div class="ps-md-4">
  <custom-surah-selection :customSurahs="customSurahs" v-model="surah"></custom-surah-selection>
 </div>
{{-- @include('layouts.footer') --}}
@endsection
