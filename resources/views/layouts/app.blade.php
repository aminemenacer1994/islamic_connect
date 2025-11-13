<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @php
        $canonicalUrl = trim($__env->yieldContent('canonical', url()->current()));
        $metaTitle = trim($__env->yieldContent('meta_title', 'Islamic Connect – Quran'));
        $metaDescription = trim(
            $__env->yieldContent(
                'meta_description',
                'Islamic Connect offers Quran recitations, Islamic media, and accessibility tools to support Muslims worldwide.'
            )
        );
        $metaImage = trim($__env->yieldContent('meta_image', asset('images/logo_main.png')));
        $metaType = trim($__env->yieldContent('meta_type', 'website'));
        $socialProfiles = [
            'https://www.facebook.com/profile.php?id=61560313385599',
            'https://x.com/islamiconnect24',
            'https://www.linkedin.com/company/islamic-connect/',
            'https://www.instagram.com/islamicconnect24/',
        ];
        $locale = str_replace('_', '-', app()->getLocale());
    @endphp
    <title>@yield('title', $metaTitle)</title>
    <link rel="canonical" href="{{ $canonicalUrl }}">
    <meta name="description" content="{{ $metaDescription }}">
    <meta property="og:site_name" content="Islamic Connect">
    <meta property="og:type" content="{{ $metaType }}">
    <meta property="og:title" content="{{ $metaTitle }}">
    <meta property="og:description" content="{{ $metaDescription }}">
    <meta property="og:url" content="{{ $canonicalUrl }}">
    <meta property="og:image" content="{{ $metaImage }}">
    <meta property="og:image:alt" content="{{ $metaTitle }}">
    <meta property="og:locale" content="{{ $locale }}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@islamiconnect24">
    <meta name="twitter:title" content="{{ $metaTitle }}">
    <meta name="twitter:description" content="{{ $metaDescription }}">
    <meta name="twitter:image" content="{{ $metaImage }}">
    <meta name="twitter:image:alt" content="{{ $metaTitle }}">
    @stack('seo')

    <!-- CSS Assets -->
    <!-- Vendor CSS first -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/css/adminlte.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <!-- App CSS last so it overrides vendor defaults -->
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <link rel="icon" type="image/png" sizes="256x256" href="{{ asset('images/logo_black.png') }}">
    <link rel="icon" type="image/png" sizes="256x256" href="{{ asset('images/logo_black.png') }}" media="(prefers-color-scheme: light)">
    <link rel="icon" type="image/png" sizes="256x256" href="{{ asset('images/logo_white.png') }}" media="(prefers-color-scheme: dark)">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Analytics -->
    <!-- <script>
        // Immediately check localStorage and apply dark mode if needed
        (function() {
            if (localStorage.getItem('darkMode') === 'true' || 
                (!localStorage.getItem('darkMode') && 
                window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark-mode');
            }
        })();
    </script> -->
    <meta name="stripe-key" content="{{ config('services.stripe.key') }}">
    <script src="https://js.stripe.com/v3/"></script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-QWLL07EBX9"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-QWLL07EBX9');
    </script>
    @yield('critical')
    @stack('critical')
    @php
        $structuredData = [
            '@context' => 'https://schema.org',
            '@graph' => [
                [
                    '@type' => 'Organization',
                    '@id' => $canonicalUrl . '#organization',
                    'name' => 'Islamic Connect',
                    'url' => $canonicalUrl,
                    'logo' => asset('images/logo_main.png'),
                    'sameAs' => $socialProfiles,
                ],
                [
                    '@type' => 'WebSite',
                    '@id' => $canonicalUrl,
                    'name' => 'Islamic Connect',
                    'url' => $canonicalUrl,
                    'description' => $metaDescription,
                    'publisher' => ['@id' => $canonicalUrl . '#organization'],
                    'potentialAction' => [
                        '@type' => 'SearchAction',
                        'target' => url('/search-translations') . '?query={search_term_string}',
                        'query-input' => 'required name=search_term_string',
                    ],
                    'inLanguage' => $locale,
                ],
                [
                    '@type' => 'WebPage',
                    '@id' => $canonicalUrl . '#webpage',
                    'url' => $canonicalUrl,
                    'name' => $metaTitle,
                    'description' => $metaDescription,
                    'isPartOf' => ['@id' => $canonicalUrl],
                    'inLanguage' => $locale,
                ],
            ],
        ];
    @endphp
    <script type="application/ld+json">
        {!! json_encode($structuredData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}
    </script>
    @stack('structured-data')

    <style>
        :root {
            --brand-teal-600: #0b806f;
            /* primary brand (passes 4.5:1 on white with white text 7+:1 on teal bg) */
            --brand-teal-700: #0b5d4b;
            /* darker for hover/active */
            --brand-teal-800: #094c3f;
            --neutral-900: #212529;
            /* default body text for contrast */
            --neutral-700: #495057;
            /* muted text with AA on white */
            --surface: #ffffff;
            --surface-2: #f7f7f8;
            --border: #e6e8eb;
            --shadow-sm: 0 1px 2px rgba(0, 0, 0, .06);
            --shadow-md: 0 6px 18px rgba(0, 0, 0, .10);
            --radius: 12px;
            /* Bootstrap color overrides */
            --bs-primary: #0b806f;
            --bs-primary-rgb: 11, 128, 111;
            --bs-success: #13a27f;
            --bs-success-rgb: 19, 162, 127;
            --bs-info: #0ea5e9;
            --bs-warning: #f59e0b;
            --bs-danger: #ef4444;
        }



        .nav-link {
            color: var(--neutral-900);
            /* High contrast on light bg */
        }

        .nav-link:hover {
            color: var(--brand-teal-700);
            /* darker teal for 4.5:1 contrast */
            transition: color 0.3s ease;
        }

        /* Ensure navbar links maintain sufficient contrast on .navbar-light */
        .navbar-light .navbar-nav .nav-link {
            color: var(--neutral-900) !important;
        }

        .navbar-light .navbar-nav .nav-link:focus,
        .navbar-light .navbar-nav .nav-link:hover {
            color: var(--brand-teal-700) !important;
        }

        .navbar-light .navbar-nav .nav-link.active,
        .navbar-light .navbar-nav .show>.nav-link {
            color: var(--brand-teal-700) !important;
        }

        .button-36:hover {
            box-shadow: rgba(80, 63, 205, 0.5) 0 1px 30px;
            transition-duration: .1s;
        }

        @media (min-width: 768px) {
            .button-36 {
                padding: 0 2.6rem;
            }
        }

        @media (min-width: 768px) {
            .button-64 {
                font-size: 24px;
                min-width: 196px;
            }
        }

        .nav-link {
            text-decoration: none;
        }

        body {
            padding-top: 70px;
        }

        /* Page shell */
        .app-shell {
            display: flex;
            gap: 20px
        }

        .content-area {
            flex: 1;
            min-width: 0
        }

        .page-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin: 12px 0 10px
        }

        .page-title {
            font-weight: 700;
            letter-spacing: .2px
        }

        .count-chip {
            background: var(--surface-2);
            border: 1px solid var(--border);
            padding: 6px 10px;
            border-radius: 999px;
            font-weight: 600;
            color: var(--brand-teal-700)
        }

        .card-lite {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            box-shadow: var(--shadow-sm);
            transition: transform .12s ease, box-shadow .12s ease
        }

        .card-lite:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md)
        }

        .grid-3 {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 18px
        }

        @media (max-width: 992px) {
            .grid-3 {
                grid-template-columns: repeat(2, minmax(0, 1fr))
            }
        }

        @media (max-width: 576px) {
            .grid-3 {
                grid-template-columns: 1fr
            }
        }

        /* Refined sidebar */
        .vc-sidebar {
            position: sticky;
            top: var(--navbar-h);
            left: 0px;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, .06)
        }

        .vc-sidebar .sidebar-header {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px 12px 14px;
            border-bottom: 1px solid var(--border);
            margin-bottom: 12px
        }

        .vc-sidebar .sidebar-header .brand {
            font-weight: 700;
            letter-spacing: .2px
        }

        .vc-sidebar .nav-link {
            display: flex;
            align-items: center;
            gap: 12px;
            color: var(--neutral-900);
            border-radius: 12px;
            padding: 12px 14px;
            font-weight: 600
        }

        .vc-sidebar .nav-link .label {
            opacity: .9
        }

        .vc-sidebar .nav-link:hover {
            background: var(--surface-2)
        }

        .vc-sidebar .nav-link.active {
            background: #d1f4d0;
            color: #228B22; /* forest green */
            box-shadow: 0 3px 0 #0b5d4b33 inset
        }

        .vc-sidebar .nav-link.active .label {
            color: #228B22; /* ensure text is forest green */
        }

        .vc-sidebar .nav-link.active .bi {
            color: #228B22; /* match icon to forest green */
        }

        .vc-sidebar .bi {
            font-size: 1.15rem;
            color: #687076
        }

        /* Fixed sidebar layout option */
        :root {
            /* Keep this in sync with actual navbar height */
            --navbar-h: 88px;
            --sidebar-w: 320px;
        }

        /* Tablet tweaks */
        @media (max-width: 991.98px) {
            :root { --navbar-h: 64px; }
            body { padding-top: 64px; }
            .navbar-brand img { max-width: 160px; height: auto; }
            .page-header { flex-wrap: wrap; gap: 8px; }
            .page-header > * { flex: 1 1 auto; }
            .grid-3 { gap: 14px; }
            .nav-pills, .nav-tabs { flex-wrap: wrap; row-gap: 6px; }
            .nav-pills .nav-link, .nav-tabs .nav-link { white-space: nowrap; }
        }

        /* Mobile tweaks */
        @media (max-width: 575.98px) {
            :root { --navbar-h: 56px; }
            body { padding-top: 56px; }
            .navbar-brand img { max-width: 250px; height: auto; }
            .content-area { padding-inline: 8px; }
            .grid-3 { gap: 12px; }
            .page-header { align-items: stretch; }
            .page-title { font-size: 1.1rem; }
            .count-chip { padding: 4px 8px; font-size: .9rem; }
        }

        .fixed-sidebar {
            position: fixed !important;
            top: var(--navbar-h);
            left: 0;
            width: var(--sidebar-w);
            height: calc(100vh - var(--navbar-h) - 10px);
            overflow: auto;
            /* Keep below navbar (Bootstrap fixed-top ~1030) */
            z-index: 1020;
        }

        .content-with-sidebar {
            position: relative;
            margin-left: var(--sidebar-w);
            max-width: calc(100% - var(--sidebar-w) - 24px);
            padding: 0 16px 24px; /* counteract .row negative margins and add breathing room */
        }

        @media (max-width: 991.98px) {
            /* Off-canvas behavior for the sidebar on tablets/phones */
            .fixed-sidebar {
                position: fixed !important;
                top: var(--navbar-h);
                left: 0;
                width: min(88vw, var(--sidebar-w));
                height: calc(100vh - var(--navbar-h));
                transform: translateX(-100%);
                transition: transform .3s ease;
                z-index: 1045; /* above content, below navbar */
            }

            .fixed-sidebar.active {
                transform: translateX(0);
            }

            .sidebar-backdrop {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, .4);
                opacity: 0;
                visibility: hidden;
                transition: opacity .3s ease, visibility .3s ease;
                z-index: 1040;
            }

            .sidebar-backdrop.active {
                opacity: 1;
                visibility: visible;
            }

            .content-with-sidebar {
                margin-left: 0;
                max-width: 100%;
                padding-left: 12px;
                padding-right: 12px;
            }

            /* Prevent page scroll while sidebar is open */
            body.sidebar-open {
                overflow: hidden;
            }
        }

        /* Screen-reader utilities */
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        .sr-only-focusable:active,
        .sr-only-focusable:focus {
            position: static;
            width: auto;
            height: auto;
            margin: 0;
            overflow: visible;
            clip: auto;
            white-space: normal;
        }

        /* Skip link */
        .skip-to-content {
            position: absolute;
            top: -40px;
            left: 8px;
            background: #fff;
            color: #000;
            padding: 8px 12px;
            z-index: 10000;
            border-radius: 6px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .skip-to-content:focus {
            top: 8px;
        }

        /* Focus visibility */
        :focus-visible {
            outline: 3px solid #0b5d4b;
            /* higher contrast focus outline */
            outline-offset: 2px;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.001ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.001ms !important;
                scroll-behavior: auto !important;
            }
        }

        /* Class-driven reduced motion (user preference) */
        .reduced-motion * {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
            scroll-behavior: auto !important;
        }

        /* High contrast mode */
        .high-contrast body {
            background-color: #ffffff !important;
            color: #000000 !important;
        }

        .high-contrast a,
        .high-contrast .nav-link {
            color: #004085 !important;
        }

        .high-contrast a:focus-visible,
        .high-contrast button:focus-visible,
        .high-contrast [role="button"]:focus-visible {
            outline: 3px solid #000 !important;
        }

        .high-contrast .btn-primary {
            background-color: #0d6efd !important;
            border-color: #0d6efd !important;
            color: #fff !important;
        }

        .a11y-toggle {
            position: fixed;
            right: 16px;
            bottom: 16px;
            z-index: 1100;
        }

        .a11y-panel {
            position: fixed;
            right: 16px;
            bottom: 64px;
            width: 280px;
            max-width: 90vw;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, .2);
            z-index: 1100;
        }

        .a11y-panel header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 12px;
            border-bottom: 1px solid #e5e7eb;
        }

        .a11y-panel .content {
            padding: 12px;
        }

        .a11y-panel[hidden] {
            display: none;
        }

        /* Custom Styles */
        .custom-nav {
            display: flex;
            direction: rtl;
            /* Right-to-left scrolling direction */
            overflow-x: auto;
            /* Enable horizontal scrolling */
            overflow-y: hidden;
            /* Prevent vertical scrolling */
            max-width: 100%;
            /* Adjust to the container's width */
            white-space: nowrap;
            /* Prevent items from wrapping to next line */
            background-color: rgba(0, 0, 0, 0.21);
            /* Light background color */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            /* Medium shadow */
            padding: 10px;
            /* Adjust padding for spacing */
            gap: 15px;
            /* Space between items */
            margin: 0;
            border-radius: 8px;
            /* Rounded corners for aesthetic */
            height: 60px;
            /* Adjust height for proper alignment */
            scrollbar-width: thin;
            /* Thin scrollbar for Firefox */
            -ms-overflow-style: none;
            /* Remove scrollbar for IE and Edge */
        }

        /* Custom scrollbar for WebKit browsers (Chrome, Safari) */
        .custom-nav::-webkit-scrollbar {
            height: 8px;
            /* Horizontal scrollbar height */
        }

        .custom-nav::-webkit-scrollbar-thumb {
            background-color: #cccccc;
            border-radius: 4px;
        }

        .nav-item {
            display: inline-block;
            /* Ensure items are displayed in a row */
            font-size: 15px;
        }

        .nav-link {
            display: inline-block;
            text-align: center;
            padding: 5px 10px;
            font-size: 15px;
        }

        .responsive-nav {
            display: flex;
            flex-wrap: wrap;
            /* Allow wrapping on smaller screens */
            justify-content: center;
            /* Center the links */
            list-style: none;
            /* Remove bullet points */
            padding: 0;
            margin: 0;
        }

        .responsive-nav .nav-item {
            margin: 5px;
            /* Add some spacing between items */
        }

        .responsive-nav .nav-link {
            padding: 10px 15px;
            /* Adjust padding as needed */
            text-decoration: none;
            /* Remove underlines from links */
            color: #333;
            /* Set link color */
            border-radius: 5px;
            /* Add rounded corners (optional) */
        }

        .responsive-nav .nav-link:hover {
            background-color: #f0f0f0;
            /* Add hover effect (optional) */
        }

        /* Media query for smaller screens (e.g., mobile) */
        @media (max-width: 768px) {
            .responsive-nav {
                flex-direction: column;
                /* Stack links vertically */
                align-items: center;
                /* Center links horizontally */
            }

            .responsive-nav .nav-item {
                width: 100%;
                /* Make each item take full width */
                text-align: center;
                /* Center text within items */
                margin: 5px 0;
                /* Adjust margin for vertical spacing */
            }
        }

        .nav-link.active {
            font-weight: 600;
            color: var(--brand-teal-700);
            /* High-contrast highlight */
            border-bottom: 2px solid var(--brand-teal-700);
            /* Optional underline */
            transition: color 0.3s ease, border-bottom 0.3s ease;
        }

        /* --- Navbar link normalization (desktop/tablet) --- */
        @media (min-width: 768px) {
            /* Use flex gap for even spacing instead of mixed ml/pl utilities */
            .navbar .navbar-nav { gap: 2rem; align-items: center; }

            /* Remove item-level top margins that misalign baselines */
            .navbar .navbar-nav .nav-item { margin-top: 0 !important; }

            /* Uniform link box so underline doesn’t shift layout */
            .navbar .navbar-nav .nav-link {
                display: inline-flex;
                align-items: center;
                padding: .75rem 0 !important; /* vertical rhythm, no left/right padding */
                margin: 0 !important;          /* neutralize ml-* from markup */
                border-bottom: 2px solid transparent; /* reserve space for active underline */
            }
        }

        /* Improve placeholder contrast (AA on white) */
        ::placeholder {
            color: #6b7280;
            opacity: 1;
        }

        :-ms-input-placeholder {
            color: #6b7280;
        }

        ::-ms-input-placeholder {
            color: #6b7280;
        }

        /* Uniform alignment for collapsed mobile menu */
        @media (max-width: 767.98px) {
            .navbar-collapse .navbar-nav .nav-item {
                margin-left: 0 !important;
                padding-left: 0 !important;
                /* neutralize any pl-* utilities on li (e.g., Login) */
            }

            .navbar-collapse .navbar-nav .nav-link {
                margin-left: 0 !important;
                /* neutralize any ml-* utilities */
                padding-left: 1.25rem !important;
                /* consistent indent */
            }

            /* Ensure user dropdown toggle aligns identically */
            .navbar-collapse .navbar-nav .dropdown,
            .navbar-collapse .navbar-nav .dropdown-toggle {
                margin-left: 0 !important;
            }

            .navbar-collapse .navbar-nav .dropdown-toggle .bi {
                margin-right: .5rem;
                /* breathing room between icon and name */
            }

            /* Make sure the hamburger stays above the expanded menu on iOS Safari */
            .navbar .navbar-toggler {
                position: relative;
                z-index: 1060;
                /* above collapse content */
            }

            .navbar .navbar-collapse {
                position: relative;
                z-index: 1000;
            }
        }
        
        /* User dropdown: tidy spacing between name and caret */
        .navbar .dropdown-toggle {
            display: inline-flex;
            align-items: center;
            gap: 0; /* no extra gap now that icon is removed */
        }
        .navbar .dropdown-toggle::after { margin-left: .35rem; }

        /* Keep same treatment inside collapsed menu */
        .navbar-collapse .navbar-nav .dropdown-toggle {
            display: inline-flex;
            align-items: center;
            gap: 0;
        }
        
        /* Admin mobile switcher visibility rules */
        @media (max-width: 991.98px) {
            body.has-admin-sidebar .navbar-toggler { display: none !important; }
            body.has-admin-sidebar #admin-mobile-switcher { display: block !important; }
        }
    </style>
</head>

<body>
    <a class="skip-to-content" href="#main-content">Skip to main content</a>
    <div>
        <!-- Navbar -->
        <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top shadow-lg py-1" role="navigation" aria-label="Primary">
            <div class="container-fluid">
                <a class="navbar-brand" href="/welcome" data-path="/welcome" aria-label="Home">
                    <img
                        src="/images/logo_main.png"
                        width="300"
                        height="200"
                        alt="Islamic Connect Logo"
                        loading="lazy"
                        height="auto"
                        class="img-fluid">
                </a>

                

                <button id="navbarToggler" class="navbar-toggler" type="button"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav justify-content-end pr-4 flex-grow-1" aria-label="Primary menu">
                        <li class="nav-item mt-2">
                            <a class="nav-link pt-2 ml-3" href="/" data-path="/" data-nav-item="primary">Home</a>
                        </li>


                        <li class="nav-item mt-2">
                            <a class="nav-link ml-3 pt-2 pl-3" href="/holy" data-path="/holy" data-nav-item="primary">Quran Portal</a>
                        </li>

                        <li class="nav-item mt-2">
                            <a class="nav-link ml-3 pt-2 pl-3" href="/media" data-path="/media" data-nav-item="primary">Media Center</a>
                        </li>

                        <li class="nav-item mt-2">
                            <a class="nav-link ml-3 pt-2 pl-3" href="/knowledge" data-path="/knowledge" data-nav-item="primary">Islamic Knowledge</a>
                        </li>

                        <li class="nav-item mt-2">
                            <a class="nav-link ml-3 pt-2 pl-3" href="/toolkit" data-path="/toolkit" data-nav-item="primary">Utility Toolkit</a>
                        </li>

                        <li class="nav-item mt-2">
                            <a class="nav-link ml-3 pt-2 pl-3" href="/services" data-path="/services" data-nav-item="primary">Services</a>
                        </li>

                        <li class="nav-item mt-2">
                            <a class="nav-link ml-3 pt-2 pl-3" href="/subscribe" data-path="/subscribe" data-nav-item="primary">Packages</a>
                        </li>

                        <li class="nav-item mt-2">
                            <a class="nav-link pt-2 ml-3 pl-3" href="/support" data-path="/support" data-nav-item="primary">Donations</a>
                        </li>

                        <!-- <li class="nav-item mt-2">
                            <a class="nav-link pt-2 ml-3 pl-3" href="/bookmarks" data-path="/bookmarks" data-nav-item="primary">Bookmarks</a>
                        </li> -->

                        @guest
                        @if (Route::has('login'))
                        <li class="nav-item  pl-3 mt-2">
                            <a class="nav-link pt-2" href="{{ route('login') }}" data-path="/login" data-nav-item="primary">{{ __('Login') }}</a>
                        </li>
                        @endif
                        <!-- @if (Route::has('register'))
                    <li class="nav-item display-6 pl-3 mt-2">
                        <h6><a class="nav-link pt-2" href="{{ route('register') }}" data-path="/register"><b style="color:black">{{ __('Register') }}</b></a></h6>
                    </li>
                    @endif -->
                        @else
                        <li class="nav-item dropdown pl-3 mt-2">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle pt-2" href="#" role="button"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="User menu" data-nav-item="primary" v-pre>
                                {{ Auth::user()->name }}
                            </a>
                            <div class="dropdown-menu dropdown-menu-end" role="menu" aria-labelledby="navbarDropdown">
                                <!-- <a class="dropdown-item" role="menuitem" href="/bookmarks">Bookmarks</a>
                                <a class="dropdown-item" role="menuitem" href="/notes">Notes & Reflections</a> -->
                                <a class="dropdown-item" role="menuitem" href="/profile">Profile</a>
                                <a class="dropdown-item" role="menuitem" href="{{ route('logout') }}"
                                    onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                    {{ __('Logout') }}
                                </a>
                                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                    @csrf
                                </form>
                            </div>
                        </li>
                        @endguest
                        <!-- <li class="pl-4 pb-2 pt-3"> 
                        <button class="button-36" role="button">
                            <span>
                                <strong>
                                    <a href="/pricing" style="color: white; text-decoration: none; cursor:pointer">Try Premium</a>
                                </strong>
                            </span>
                        </button>
                    </li> -->
                    </ul>
                </div>
            </div>
        </nav>
        
        <!-- Admin mobile section switcher (full-width below navbar) -->
        <div id="admin-mobile-switcher" class="d-md-none bg-white border-bottom shadow-sm" style="display:none;">
            <div class="container-fluid py-2 px-3">
                <select id="adminSectionSelect" class="form-select mt-3" aria-label="Go to section">
                    <option value="" disabled selected>Go to…</option>
                </select>
            </div>
        </div>
        <!-- Sidebar Backdrop for mobile off-canvas -->
        <div id="sidebar-backdrop" class="sidebar-backdrop" aria-hidden="true"></div>
        <!-- Main Content -->
        <main id="main-content" role="main" tabindex="-1">
            @hasSection('page_h1')
            @yield('page_h1')
            @else
            <h1 class="sr-only" id="page-title">@yield('title', 'Islamic Connect')</h1>
            @endif
            <div id="app">
                @yield('content')
            </div>
        </main>
    </div>

    <!-- Scripts -->
    <script defer src="{{ mix('js/manifest.js') }}"></script>
    <script defer src="{{ mix('js/vendor.js') }}"></script>
    <script defer src="{{ mix('js/app.js') }}"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // No theme toggle (removed on request)
            const navLinks = document.querySelectorAll('ul[aria-label="Primary menu"] a.nav-link');
            // Ensure hamburger toggler controls the collapse reliably
            try {
                const toggler = document.getElementById('navbarToggler') || document.querySelector('.navbar-toggler');
                const collapseEl = document.getElementById('navbarSupportedContent');
                const sidebarEl = document.getElementById('tablet-sidebar');
                const sidebarBackdrop = document.getElementById('sidebar-backdrop');
                // Create Bootstrap collapse controller if available (for desktop top-nav)
                let bsCollapse = null;
                if (collapseEl && window.bootstrap) {
                    bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false });
                }

                // If an admin sidebar exists, enhance mobile UX with a section dropdown
                if (sidebarEl) {
                    document.body.classList.add('has-admin-sidebar');
                    const switcherWrap = document.getElementById('admin-mobile-switcher');
                    const selectEl = document.getElementById('adminSectionSelect');
                    if (switcherWrap && selectEl) {
                        const links = Array.from(sidebarEl.querySelectorAll('a.nav-link'))
                          .map(a => ({ href: a.getAttribute('href'), label: a.textContent.trim() }))
                          .filter(x => x.href && x.label);
                        if (links.length) {
                            // Populate options
                            selectEl.innerHTML = '<option value="" disabled>Go to…</option>' +
                              links.map(l => `<option value="${l.href}">${l.label}</option>`).join('');
                            // Select current
                            const cur = window.location.pathname.replace(/\/+$/, '') || '/';
                            let match = links.find(l => cur === new URL(l.href, window.location.origin).pathname);
                            if (!match) match = links.find(l => cur.startsWith(new URL(l.href, window.location.origin).pathname + '/'));
                            if (match) selectEl.value = match.href;
                            // Show widget
                            switcherWrap.style.display = 'block';
                            // Navigate on change
                            selectEl.addEventListener('change', (e) => {
                                const url = e.target.value;
                                if (url) window.location.assign(url);
                            });
                        }
                    }
                }

                    const setExpanded = (expanded) => {
                        if (toggler) {
                            toggler.classList.toggle('collapsed', !expanded);
                            toggler.setAttribute('aria-expanded', expanded ? 'true' : 'false');
                        }
                    };
                    // Helper to toggle sidebar on small screens
                    const toggleSidebarMobile = () => {
                        if (!sidebarEl) return false;
                        const isSmall = window.matchMedia('(max-width: 991.98px)').matches;
                        if (!isSmall) return false;
                        const willShow = !sidebarEl.classList.contains('active');
                        sidebarEl.classList.toggle('active', willShow);
                        if (sidebarBackdrop) sidebarBackdrop.classList.toggle('active', willShow);
                        document.body.classList.toggle('sidebar-open', willShow);
                        // Keep hamburger aria-expanded in sync
                        setExpanded(willShow);
                        return true;
                    };

                    // Toggle open/close when pressing the burger
                    if (toggler) {
                        toggler.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // If we have a sidebar, prefer toggling it on small screens
                            if (toggleSidebarMobile()) return;
                            if (bsCollapse && collapseEl) {
                                const isShown = collapseEl.classList.contains('show');
                                isShown ? bsCollapse.hide() : bsCollapse.show();
                            }
                        }, {
                            passive: true
                        });
                    }

                    // Backdrop click closes sidebar on mobile
                    if (sidebarBackdrop) {
                        sidebarBackdrop.addEventListener('click', () => {
                            if (sidebarEl?.classList.contains('active')) {
                                sidebarEl.classList.remove('active');
                                sidebarBackdrop.classList.remove('active');
                                setExpanded(false);
                            }
                        });
                    }

                    // Close sidebar when a sidebar link is clicked (mobile)
                    if (sidebarEl) {
                        sidebarEl.querySelectorAll('a.nav-link').forEach(a => {
                            a.addEventListener('click', () => {
                                if (window.matchMedia('(max-width: 991.98px)').matches) {
                                    sidebarEl.classList.remove('active');
                                    if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
                                    setExpanded(false);
                                    document.body.classList.remove('sidebar-open');
                                }
                            });
                        });
                    }

                    // ESC key closes the sidebar on mobile
                    document.addEventListener('keydown', (ev) => {
                        if (ev.key === 'Escape' && sidebarEl?.classList.contains('active')) {
                            sidebarEl.classList.remove('active');
                            if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
                            document.body.classList.remove('sidebar-open');
                            setExpanded(false);
                        }
                    });

                    // Close the menu only for plain nav links (not dropdown toggles)
                    if (collapseEl) {
                        collapseEl.querySelectorAll('a.nav-link:not(.dropdown-toggle), .dropdown-item').forEach(a => {
                            a.addEventListener('click', () => {
                                if (window.innerWidth < 768 && bsCollapse) {
                                    bsCollapse.hide();
                                }
                            });
                        });
                        if (window.bootstrap && bsCollapse) {
                            collapseEl.addEventListener('shown.bs.collapse', () => setExpanded(true));
                            collapseEl.addEventListener('hidden.bs.collapse', () => setExpanded(false));
                        }
                    }
                
                } catch (_) {
                    /* ignore */ }

            // Highlight the active link based strictly on current URL
            // Normalize trailing slashes and choose the longest matching data-path prefix
            const normalize = (p) => {
                if (!p) return '/';
                try {
                    p = p.trim();
                } catch (_) {}
                if (p.length > 1 && p.endsWith('/')) p = p.replace(/\/+$/, '');
                return p || '/';
            };
            const pathNow = normalize(window.location.pathname);

            // Build a deterministic alias map and prefer the longest matching key
            const aliasMap = {
                // Home
                '/': '/',
                '/home': '/',
                '/welcome': '/',
                // Quran portal (user-specified)
                '/holy': '/holy',
                '/quran': '/holy',
                '/surat': '/holy',
                '/history': '/holy',
                // Media center (user-specified)
                '/media': '/media',
                '/content': '/media',
                '/streaming': '/media',
                '/radio': '/media',
                '/gallery': '/media',
                '/video': '/media',
                // Knowledge (user-specified)
                '/knowledge': '/knowledge',
                '/mission': '/knowledge',
                '/name': '/knowledge',
                '/guide': '/knowledge',
                '/read': '/knowledge',
                '/books': '/knowledge',
                '/boos': '/knowledge',
                // Toolkit (user-specified)
                '/toolkit': '/toolkit',
                '/qibla': '/toolkit',
                '/prayer': '/toolkit',
                '/dua': '/toolkit',
                '/zakat': '/toolkit',
                '/date': '/toolkit',
                '/umrah': '/toolkit',
                '/calendar': '/toolkit',
                // Services (user-specified)
                '/services': '/services',
                '/mosque': '/services',
                '/shop': '/services',
                '/school': '/services',
                '/support': '/services',
                // Other existing mappings kept sensible
                '/store': '/services',
                '/finance': '/services',
                // Packages
                '/subscribe': '/subscribe',
                '/packages': '/subscribe',
                '/pricing': '/subscribe',
                '/bookmarks': '/bookmarks',
            };

            const aliasKeys = Object.keys(aliasMap);
            let effectivePath = (() => {
                // longest key that equals or is a prefix of current path
                const match = aliasKeys
                    .map(k => normalize(k))
                    .filter(k => pathNow === k || pathNow.startsWith(k + '/'))
                    .sort((a, b) => b.length - a.length)[0];
                return match ? normalize(aliasMap[match]) : pathNow;
            })();

            const links = Array.from(navLinks).filter(a => a.dataset && typeof a.dataset.path === 'string');
            const candidates = links.map(a => normalize(a.dataset.path));

            // 1) Try group target exact
            let best = candidates.find(p => p === effectivePath);
            // 2) Try exact path
            if (!best) best = candidates.find(p => p === pathNow);
            // 3) Try longest prefix of current path
            if (!best) {
                const pref = candidates
                    .filter(p => p !== '/' && (pathNow === p || pathNow.startsWith(p + '/')))
                    .sort((a, b) => b.length - a.length)[0];
                best = pref || undefined;
            }
            links.forEach(a => {
                const ap = normalize(a.dataset.path);
                const isActive = !!best && ap === best;
                a.classList.toggle('active', isActive);
                if (isActive) a.setAttribute('aria-current', 'page');
                else a.removeAttribute('aria-current');
            });

            // Keyboard navigation across top-level menu items (Left/Right)
            const menuItems = Array.from(document.querySelectorAll('[data-nav-item="primary"]'));
            const menubar = document.querySelector('ul[aria-label="Primary menu"]');
            if (menubar && menuItems.length) {
                menubar.addEventListener('keydown', (e) => {
                    const currentIndex = menuItems.indexOf(document.activeElement);
                    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                        e.preventDefault();
                        let nextIndex = currentIndex;
                        if (e.key === 'ArrowRight') nextIndex = (currentIndex + 1 + menuItems.length) % menuItems.length;
                        if (e.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
                        menuItems[nextIndex].focus();
                    }
                });
            }

            // Sync dropdown aria-expanded and support Enter/Space
            const dropdownToggle = document.getElementById('navbarDropdown');
            if (dropdownToggle) {
                dropdownToggle.addEventListener('shown.bs.dropdown', () => dropdownToggle.setAttribute('aria-expanded', 'true'));
                dropdownToggle.addEventListener('hidden.bs.dropdown', () => dropdownToggle.setAttribute('aria-expanded', 'false'));
                dropdownToggle.addEventListener('keydown', (e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        dropdownToggle.click();
                    }
                    if (e.key === 'Escape') {
                        dropdownToggle.setAttribute('aria-expanded', 'false');
                        dropdownToggle.focus();
                    }
                });
            }

            // Initialize Accessibility preferences
            const root = document.documentElement;
            const highContrast = localStorage.getItem('a11y_high_contrast') === 'true';
            const reducedMotion = localStorage.getItem('a11y_reduced_motion') === 'true';
            root.classList.toggle('high-contrast', highContrast);
            root.classList.toggle('reduced-motion', reducedMotion);

            // Wire up panel toggles if present
            const hcToggle = document.getElementById('a11yHighContrast');
            const rmToggle = document.getElementById('a11yReducedMotion');
            if (hcToggle) {
                hcToggle.checked = highContrast;
                hcToggle.addEventListener('change', () => {
                    root.classList.toggle('high-contrast', hcToggle.checked);
                    localStorage.setItem('a11y_high_contrast', hcToggle.checked);
                });
            }
            if (rmToggle) {
                rmToggle.checked = reducedMotion;
                rmToggle.addEventListener('change', () => {
                    root.classList.toggle('reduced-motion', rmToggle.checked);
                    localStorage.setItem('a11y_reduced_motion', rmToggle.checked);
                });
            }

            // Toggle panel visibility
            const panel = document.getElementById('a11yPanel');
            const openBtn = document.getElementById('a11yOpen');
            const closeBtn = document.getElementById('a11yClose');
            if (openBtn && panel) {
                openBtn.addEventListener('click', () => {
                    panel.hidden = false;
                    panel.querySelector('h3')?.focus();
                });
            }
            if (closeBtn && panel) {
                closeBtn.addEventListener('click', () => {
                    panel.hidden = true;
                    openBtn.focus();
                });
            }
        });
    </script>


    @if (app()->environment('local'))
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.2/axe.min.js" integrity="sha512-y+Q+1e8p91bQm9b5wz9mKZ9WgSJND0bKx9D6o1XyJQPUWq2wYtGPB+8v8N+Zm0g5oY4KZq2rJb6z5m9q5y0kYQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
        window.addEventListener('load', function() {
            if (window.axe) {
                axe.run().then(results => {
                    if (results && results.violations && results.violations.length) {
                        // Log concise output for devs
                        console.group('[axe] Accessibility issues');
                        results.violations.forEach(v => console.warn(v.id, v.impact, v.description, v.nodes));
                        console.groupEnd();
                    }
                }).catch(e => console.warn('axe scan failed', e));
            }
        });
    </script>
    @endif

</body>

</html>