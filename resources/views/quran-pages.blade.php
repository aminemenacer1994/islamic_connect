@extends('layouts.app')

@section('title', 'Quran Page Viewer - Islamic Connect')

@section('meta')
<meta name="description" content="Browse all 604 pages of the Holy Quran with our beautiful page-by-page viewer. Navigate easily through the complete Mushaf with high-quality images.">
<meta name="keywords" content="Quran, Quran pages, Mushaf, Holy Quran, Islamic, Quran viewer, Quran images">
<meta property="og:title" content="Quran Page Viewer - Islamic Connect">
<meta property="og:description" content="Browse all 604 pages of the Holy Quran with our beautiful page-by-page viewer.">
<meta property="og:type" content="website">
@endsection

@section('content')
<quran-pages-component></quran-pages-component>
@endsection
