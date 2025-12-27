@extends('layouts.app')

@section('title', 'Page Not Found Islamic Connect')
@section('meta_title', '404 | Islamic Connect')
@section('meta_description', 'The page you requested could not be found. Explore our Quran, media, and toolkit pages to continue your journey with Islamic Connect.')
@section('page_h1')
<section class="container py-5 text-center">
    <h1 class="display-4 fw-bold">404 Page Not Found</h1>
    <p class="lead text-muted my-4">
        We cannot find the page you were looking for. It may have moved, been renamed, or never existed.
    </p>
    <p class="text-muted mb-4">
        Use the links below to continue exploring the Quran, Islamic knowledge, and tools we build for you.
    </p>
    <div class="d-flex flex-wrap justify-content-center gap-2 mb-3">
        <a href="/" class="btn btn-teal rounded-pill px-4 py-2">Home</a>
        <a href="/surat" class="btn btn-outline-dark rounded-pill px-4 py-2">Quran Explorer</a>
        <a href="/media" class="btn btn-outline-dark rounded-pill px-4 py-2">Media Center</a>
    </div>
    <div class="text-center">
        <a href="/contact" class="text-decoration-none">Report this issue</a>
    </div>
</section>
@endsection

@section('content')
<div class="container">
    <section class="row justify-content-center py-5">
        <div class="col-lg-8 text-center">
            <p class="text-muted mb-4">
                If nothing above helps, try searching for what you need using the search field in the navigation
                or contact our team for assistance.
            </p>
            <div class="d-flex justify-content-center">
                <form action="/search" method="GET" class="d-flex w-100 gap-2">
                    <input type="search" name="query" class="form-control rounded-pill" placeholder="Search Islamic Connect">
                    <button type="submit" class="btn btn-teal rounded-pill px-4">Search</button>
                </form>
            </div>
        </div>
    </section>
</div>
@endsection