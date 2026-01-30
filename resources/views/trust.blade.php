@extends('layouts.app')

@section('title', 'Trust & Disclaimer')

@section('content')
<section class="py-5">
    <div class="container">
        <div class="bg-white rounded-4 shadow-sm p-5">
            <h1 class="mb-3 fw-bold">Trust &amp; Educational Intent</h1>
            <p class="lead text-muted">
                Noor is designed as an Islamic AI companion that curates content from respected public Islamic
                resources. The guidance shared is rooted in Quranic verses, authenticated Hadith, and devotional dua
                collections, but it should always remain under the guidance of qualified scholars.
            </p>
            <p>
                The assistant is intentionally limited to educational and spiritual discussion. It will not issue fatwas,
                provide legal rulings, or replace the nuanced judgement of a living scholar.
            </p>
            <p>
                If your question needs a definitive ruling, consult a trusted local scholar, imam, or a mufti who can
                evaluate the full context, your personal circumstances, and the prevailing school of thought relevant to
                your situation.
            </p>
            <p>
                Using Noor implies acceptance of these boundaries. The assistant logs conversations per session to help
                you continue meaningful reflection, and the underlying APIs are only leveraged to surface publicly
                accessible Islamic knowledge without exposing any secret keys.
            </p>
            <a href="/" class="btn btn-outline-primary mt-3">Return to Noor</a>
        </div>
    </div>
</section>
@endsection
