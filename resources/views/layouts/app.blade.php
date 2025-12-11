<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @php
        $appUrl = rtrim(config('app.url') ?? url('/'), '/');
        $path = trim(request()->path(), '/');
        $defaultCanonical = $appUrl . ($path ? "/{$path}" : '');
        $canonicalUrl = trim($__env->yieldContent('canonical', $defaultCanonical));
        $metaTitle = trim($__env->yieldContent('meta_title', 'Islamic Connect, Accessible Quran & Community Tools'));
        $metaDescription = trim(
            $__env->yieldContent(
                'meta_description',
                'Islamic Connect delivers accessible Quran study, dua guidance, and community tools for Muslims seeking clarity and service.'
            )
        );
        $metaImage = trim($__env->yieldContent('meta_image', asset('images/logo_black.png')));
        $metaType = trim($__env->yieldContent('meta_type', 'website'));
        $socialProfiles = [
            'https://www.facebook.com/profile.php?id=61560313385599',
            'https://x.com/islamiconnect24',
            'https://www.linkedin.com/company/islamic-connect/',
            'https://www.instagram.com/islamicconnect24/',
        ];
        $shouldNoIndexSubscribe = str_starts_with($path, 'subscribe');
        $metaRobots = $shouldNoIndexSubscribe ? 'noindex,follow' : 'index,follow';
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
    <meta name="robots" content="{{ $metaRobots }}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@islamiconnect24">
    <meta name="twitter:title" content="{{ $metaTitle }}">
    <meta name="twitter:description" content="{{ $metaDescription }}">
    <meta name="twitter:image" content="{{ $metaImage }}">
    <meta name="twitter:image:alt" content="{{ $metaTitle }}">
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
    <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>
    <link rel="preconnect" href="https://www.google-analytics.com" crossorigin>
    <link rel="preconnect" href="https://connect.facebook.net" crossorigin>
    <link rel="preconnect" href="https://js.stripe.com" crossorigin>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet';">
    <noscript>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
    </noscript>
    @stack('seo')

    <!-- CSS Assets -->
    <!-- Vendor CSS first -->
    <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" as="style" onload="this.onload=null;this.rel='stylesheet';" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <noscript>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    </noscript>
    <link rel="preload" href="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/css/adminlte.min.css" as="style" onload="this.onload=null;this.rel='stylesheet';">
    <noscript>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/css/adminlte.min.css">
    </noscript>
    <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" as="style" onload="this.onload=null;this.rel='stylesheet';">
    <noscript>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    </noscript>
    <!-- App CSS last so it overrides vendor defaults -->
    <link rel="preload" href="{{ mix('css/app.css') }}" as="style" onload="this.onload=null;this.rel='stylesheet';">
    <link rel="preload" href="{{ mix('css/layout.css') }}" as="style" onload="this.onload=null;this.rel='stylesheet';">
    <link rel="preload" href="{{ asset('css/vue-styles.css') }}" as="style" onload="this.onload=null;this.rel='stylesheet';">
    <noscript>
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">
        <link rel="stylesheet" href="{{ mix('css/layout.css') }}">
        <link rel="stylesheet" href="{{ asset('css/vue-styles.css') }}">
    </noscript>
    <link rel="icon" type="image/png" sizes="256x256" href="{{ asset('images/logo_main.png') }}">
    <link rel="icon" type="image/png" sizes="256x256" href="{{ asset('images/logo_black.png') }}" media="(prefers-color-scheme: light)">
    <link rel="icon" type="image/png" sizes="256x256" href="{{ asset('images/logo_white.png') }}" media="(prefers-color-scheme: dark)">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('images/logo_black.png') }}">
    <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" as="style" onload="this.onload=null;this.rel='stylesheet';">
    <noscript>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    </noscript>
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
                    'logo' => asset('images/logo_black.png'),
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
    @php($facebookPixelId = config('services.facebook_pixel.pixel_id'))
    @if($facebookPixelId)
        <script>
            !function(f,b,e,v,n,t,s){
                if(f.fbq) return;
                n=f.fbq=function(){
                    n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments);
                };
                if(!f._fbq) f._fbq=n;
                n.push=n;
                n.loaded=!0;
                n.version='2.0';
                n.queue=[];
                t=b.createElement(e);
                t.async=!0;
                t.src=v;
                s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s);
            }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '{{ $facebookPixelId }}');
            fbq('track', 'PageView');
        </script>
        <noscript>
            <img height="1" width="1" style="display:none"
                 src="https://www.facebook.com/tr?id={{ $facebookPixelId }}&ev=PageView&noscript=1" />
        </noscript>
    @endif

    <style>
        body {
            padding-top: calc(3.5rem + 1rem);
            background: linear-gradient(180deg, #fdfefe 0%, #f4f6fb 40%, #e9eef7 100%);
        }

        @media (max-width: 768px) {
            body {
                padding-top: calc(4.25rem + 1rem);
            }
        }
    </style>

</head>

<body>
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
                            <a class="nav-link pt-2 ml-3" href="/" data-path="/" data-nav-item="primary"><b>Home</b></a>
                        </li>
                        <!-- <li class="nav-item mt-2">
                            <button class="button-33" role="button" type="button" onclick="window.location.href='/revert'">Reverts corner</button>
                        </li>
                        <li class="nav-item mt-2">
                            <button class="button-33" role="button" type="button" onclick="window.location.href='/muslim'">Discover Islam</button>
                        </li> -->

                        <!-- From Uiverse.io by Spacious74 --> 
                        

                        <button class="button" type="button" onclick="window.location.href='/revert'" data-path="/revert" data-nav-item="primary">
                        <svg
                                viewBox="0 0 24 24"
                                height="24"
                                width="24"
                                class="mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                data-path="/revert" data-nav-item="primary"
                            >
                                <g fill="none">
                                <path
                                    d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"
                                ></path>
                                <path
                                    d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM11 6.094l-.806 2.36a6 6 0 0 1-3.49 3.649l-.25.091l-2.36.806l2.36.806a6 6 0 0 1 3.649 3.49l.091.25l.806 2.36l.806-2.36a6 6 0 0 1 3.49-3.649l.25-.09l2.36-.807l-2.36-.806a6 6 0 0 1-3.649-3.49l-.09-.25zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2"
                                    fill="currentColor"
                                ></path>
                                </g>
                            </svg>
                            Reverts Corner
                            <div class="hoverEffect" data-path="/revert" data-nav-item="primary">
                                <div></div>
                            </div>
                        </button>

                        <!-- <button class="button" type="button" onclick="window.location.href='/muslim'">
                        <svg
                                viewBox="0 0 24 24"
                                height="24"
                                width="24"
                                class="mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g fill="none">
                                <path
                                    d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"
                                ></path>
                                <path
                                    d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM11 6.094l-.806 2.36a6 6 0 0 1-3.49 3.649l-.25.091l-2.36.806l2.36.806a6 6 0 0 1 3.649 3.49l.091.25l.806 2.36l.806-2.36a6 6 0 0 1 3.49-3.649l.25-.09l2.36-.807l-2.36-.806a6 6 0 0 1-3.649-3.49l-.09-.25zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2"
                                    fill="currentColor"
                                ></path>
                                </g>
                            </svg>
                            Discover Islam
                            <div class="hoverEffect">
                                <div></div>
                            </div>
                        </button> -->


                        <!-- <li class="nav-item mt-2">
                            <a class="nav-link pt-2 ml-3 button-91" href="/muslim" data-path="/muslim" data-nav-item="primary">Non-Muslim zone</a>
                        </li>
                       
                        <li class="nav-item mt-2">
                            <a class="nav-link pt-2 ml-3" href="/revert" data-path="/revert" data-nav-item="primary">Reverts corner</a>
                        </li> -->

                        <li class="nav-item mt-2">
                            <a class="nav-link ml-3 pt-2 pl-3" href="/holy" data-path="/holy" data-nav-item="primary"><b>Quran Portal</b></a>
                        </li>

                        <li class="nav-item mt-2">
                            <a class="nav-link ml-3 pt-2 pl-3" href="/media" data-path="/media" data-nav-item="primary"><b>Media Center</b></a>
                        </li>

                        <li class="nav-item mt-2">
                            <a class="nav-link ml-3 pt-2 pl-3" href="/knowledge" data-path="/knowledge" data-nav-item="primary"><b>Islamic Knowledge</b></a>
                        </li>

                        <li class="nav-item mt-2">
                            <a class="nav-link ml-3 pt-2 pl-3" href="/toolkit" data-path="/toolkit" data-nav-item="primary"><b>Utility Toolkit</b></a>
                        </li>

                        <li class="nav-item mt-2">
                            <a class="nav-link ml-3 pt-2 pl-3" href="/services" data-path="/services" data-nav-item="primary"><b>Services</b></a>
                        </li>

                        <!-- <li class="nav-item mt-2">
                            <a class="nav-link ml-3 pt-2 pl-3" href="/subscribe" data-path="/subscribe" data-nav-item="primary">Packages</a>
                        </li> -->

                        <!-- <li class="nav-item mt-2">
                            <a class="nav-link pt-2 ml-3 pl-3" href="/support" data-path="/support" data-nav-item="primary">Donations</a>
                        </li> -->

                        <!-- <li class="nav-item mt-2">
                            <a class="nav-link pt-2 ml-3 pl-3" href="/about" data-path="/about" data-nav-item="primary">About Us</a>
                        </li> -->

                        <!-- @guest -->
                        <!-- @if (Route::has('login'))
                        <li class="nav-item  pl-3 mt-2">
                            <a class="nav-link pt-2" href="{{ route('login') }}" data-path="/login" data-nav-item="primary">{{ __('Login') }}</a>
                        </li>
                        @endif -->
                        <!-- @if (Route::has('register'))
                    <li class="nav-item display-6 pl-3 mt-2">
                        <h6><a class="nav-link pt-2" href="{{ route('register') }}" data-path="/register"><b style="color:black">{{ __('Register') }}</b></a></h6>
                    </li>
                    @endif -->
                        <!-- @else
                        <li class="nav-item dropdown pl-3 mt-2">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle pt-2" href="#" role="button"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="User menu" data-nav-item="primary" v-pre>
                                {{ Auth::user()->name }}
                            </a>
                            <div class="dropdown-menu dropdown-menu-end" role="menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" role="menuitem" href="/bookmarks">Bookmarks</a>
                                <a class="dropdown-item" role="menuitem" href="/notes">Notes & Reflections</a> 
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
                        @endguest -->
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
            @unless(View::hasSection('suppress_layout_h1'))
                <h1 class="sr-only" id="page-title">@yield('title', 'Islamic Connect')</h1>
            @endunless
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
                '/revert': '/',
                '/welcome': '/',
                // Quran portal (user-specified)
                '/holy': '/holy',
                '/quran': '/holy',
                '/surat': '/holy',
                '/history': '/holy',
                '/about': '/about',
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
                '/muslim': '/muslim',
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


    <script defer src="https://js.stripe.com/v3/"></script>

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
<!-- HTML !-->

</html>
<style>
/* From Uiverse.io by Wendell47 */ 
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border: 0;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  transition: all 0.02s;
  font-weight: bold;
  cursor: pointer;
  color: rgb(37, 37, 37);
  z-index: 0;
  box-shadow: 0 0px 7px -5px rgba(0, 0, 0, 0.5);
}

.button:hover {
  background: rgb(193, 228, 248);
  color: rgb(33, 0, 85);
}

.button:active {
  transform: scale(0.97);
}

.hoverEffect {
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.hoverEffect div {
  background: rgb(222, 0, 75);
  background: linear-gradient(
    90deg,
    rgba(222, 0, 75, 1) 0%,
    rgba(191, 70, 255, 1) 49%,
    rgba(0, 212, 255, 1) 100%
  );
  border-radius: 40rem;
  width: 10rem;
  height: 10rem;
  transition: 0.4s;
  filter: blur(20px);
  animation: effect infinite 3s linear;
  opacity: 0.5;
}

.button:hover .hoverEffect div {
  width: 8rem;
  height: 8rem;
}

@keyframes effect {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

    
    /* From Uiverse.io by Spacious74 */ 
.flex {
  display: flex;
  align-items: center;
  gap: 5px;
}
.outer-cont {
  padding: 12px 20px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  background: linear-gradient(90deg, #5bfcc4, #f593e4, #71a4f0);
  border-radius: 12px;
  color: #fff;
  transition: all 0.3s ease;
  box-shadow:
    inset 0px 0px 5px #ffffffa9,
    inset 0px 35px 30px #000,
    0px 5px 10px #000000cc;
  text-shadow: 1px 1px 1px #000;
}
.outer-cont::before {
  content: "";
  position: absolute;
  inset: 0;
  margin: auto;
  border-radius: 12px;
  filter: blur(0);
  z-index: -1;
  box-shadow: none;
  background: conic-gradient(
    #00000000 80deg,
    #40baf7,
    #f34ad7,
    #5bfcc4,
    #00000000 280deg
  );
  transition: all 0.3s ease;
}
.outer-cont:hover::before {
  filter: blur(15px);
}
.outer-cont:active::before {
  filter: blur(5px);
  transform: translateY(1px);
}
.outer-cont:active {
  box-shadow:
    inset 0px 0px 5px #ffffffa9,
    inset 0px 35px 30px #000;
  margin-top: 3px;
}

/* CSS */
.button-33 {
  background-color: #0b806f;
  border-radius: 11px;
  color: white;
  border: 2px solid rgba(194, 251, 215, 0.14);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  font-weight: 500;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-33:hover {
  transform: scale(1.05);
  box-shadow: rgba(0, 0, 0, 0.42) 0 1px 3px 0 ;
  outline: none;
}

.button-33::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 65%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.button-33:hover::after {
  opacity: 1;
  animation: lightPulse 0.6s ease-out;
}

@keyframes lightPulse {
  from {
    transform: scale(0.8);
    opacity: 0.6;
  }
  to {
    transform: scale(1.3);
    opacity: 0;
  }
}


</style>
