@extends('layouts.app')
@section('suppress_layout_h1', true)
@section('title', 'Subscribe & Support Islamic Connect — Premium Access')
@section('meta_description', 'Unlock premium Qur’an recitations, curated content, and compassionate tools by subscribing to Islamic Connect today.')
@section('canonical', url()->current())
@section('content')
<div class="subscription-page">
    <script>
      window.appConfig = Object.assign({}, window.appConfig || {}, {
        stripePrices: {
          monthly: @json(config('services.stripe.prices.monthly')),
          yearly: @json(config('services.stripe.prices.yearly')),
        }
      });
    </script>
    <subscription-component></subscription-component>
    <section class="subscription-rich-copy mt-5">
        <div class="container">
            <h2>Why your subscription matters</h2>
            <p>
                Every subscription you activate sustains the Qur’an-learning ecosystem we have carefully built. Because
                your contribution keeps the lights on, our knowledge team can continue crafting new lessons, devotional
                explainers, and translated commentaries that are hosted on the <a href="/knowledge" title="Explore Islamic knowledge">Knowledge Library</a>.
                That same financial cushion lets us expand peer-led study groups, send compassionate aid through the <a href="/support" title="Support Islamic Connect">Support Page</a>,
                and pilot AI-guided reflection tools that help you stay grounded in the Sunnah even when life feels busy.
            </p>
            <h3>Curated recitations &amp; media for every mood</h3>
            <p>
                The subscription unlocks playlists, tafsir, and multimedia journeys in the <a href="/media" title="Access Islamic media">Islamic Media Room</a>,
                so you can choose the narrator or scholar that matches your pace. We master each recording to keep the audio clear,
                the translations accurate, and the story-oriented explanations warm, so your commute, inbox break, or evening routine
                becomes a moment to reconnect. Your recurring gift also lets us secure licenses for niche reciters, sustain the
                creative teams writing new short films, and invest in the streaming infrastructure that keeps those files loading
                faster when you open the app on mobile.
            </p>
            <h3>Accessibility, trust, and responsive care</h3>
            <p>
                We measure success in minutes saved—minutes you do not spend struggling with a broken script. The subscription
                revenue buys inclusive tooling such as closed captions, narrated summaries, and screen-reader optimizations.
                Our technical team responds to every <a href="/faq" title="Frequently asked questions">FAQ</a> submission, and the support hub
                routes urgent clarification requests to the correct scholar so you never feel ignored. That same stability allows
                us to keep the site lean on JavaScript, update security certificates, and keep the response time sharp for you
                and the family members you invite.
            </p>
            <h3>Strengthening community with every plan</h3>
            <p>
                Every plan also buys time for our community managers to host virtual salons, produce ethics workshops, and
                gather impact reports about the refugee literacy initiatives highlighted on the <a href="/volunteer" title="Volunteer with Islamic Connect">Volunteer</a>
                and <a href="/contact" title="Contact Islamic Connect">Contact</a> pages. Those conversations guide us on where to
                re-invest the funds—whether toward scholarship matching, live Q&amp;A nights, or new language translations that bring
                the Qur’an closer to non-Arabic speakers. Because the subscription model depends on your trust, we publish that data
                publicly and open the door for you to weigh in through the same links.
            </p>
            <h3>Spiritual depth, practical generosity</h3>
            <p>
                Premium donors also receive guided supplications, curated du‘a lists, and reminders triggered by the new tools on
                the <a href="/dua" title="Explore dua resources">dua collection</a>. When the zakat season arrives, subscribers benefit from
                context about eligibility, the difference between gold and silver nisab, and links back to the <a href="/zakat" title="Learn about Zakat">Zakat</a> calculator,
                making your fiqh decisions easier and more intentional. Sharing this subscription with loved ones multiplies those
                blessings, because every paid account unlocks a family sharing tier and keeps the curated roadmap accessible for children.
            </p>
            <h3>Join the movement—stay connected</h3>
            <p>
                We are humbled whenever you choose one of the plans listed above. The recurring payments mean we can print new booklets,
                subsidize travel for scholars, and host inclusive events where the dua is always answered in the name of unity.
                While you explore the checkout options, remember the most profound returns are spiritual: a calmer heart, a disciplined
                routine, and the joy of supporting a platform that is proud to serve <a href="/subscribe" title="Revisit the subscription page">Muslims everywhere</a>.
                Your subscription keeps that work alive.
            </p>
        </div>
    </section>
</div>
@endsection
