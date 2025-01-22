@extends('layouts.app')

@section('content')
<div id="app">
  <div class="container">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="translation-tab" data-toggle="tab" href="#translation" role="tab" aria-controls="translation" aria-selected="true">Translation</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="tafseer-tab" data-toggle="tab" href="#tafseer" role="tab" aria-controls="tafseer" aria-selected="false">Tafseer</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="transliteration-tab" data-toggle="tab" href="#transliteration" role="tab" aria-controls="transliteration" aria-selected="false">Transliteration</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="translation" role="tabpanel" aria-labelledby="translation-tab">
        <translation :information="information" :show-alert-text="showAlertText" :show-alert="showAlert" :show-error-alert="showErrorAlert" :show-alert-text-note="showAlertTextNote"></translation>
      </div>
      <div class="tab-pane fade" id="tafseer" role="tabpanel" aria-labelledby="tafseer-tab">
        <tafseer :information="information" :tafseer="tafseer" :show-alert-text="showAlertText" :show-alert="showAlert" :show-error-alert="showErrorAlert"></tafseer>
      </div>
      <div class="tab-pane fade" id="transliteration" role="tabpanel" aria-labelledby="transliteration-tab">
        <transliteration :information="information" :show-alert-text="showAlertText" :show-alert="showAlert" :show-error-alert="showErrorAlert"></transliteration>
      </div>
    </div>
    <note-modal></note-modal>
  </div>
</div>
@endsection

@section('scripts')
<script src="{{ mix('js/app.js') }}"></script>
@endsection
