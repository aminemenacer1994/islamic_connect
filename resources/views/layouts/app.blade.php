<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @php
        $appUrl = rtrim(config('app.url') ?? url('/'), '/');
	        $path = trim(request()->path(), '/');
	        $isSuratRoute = request()->is('surat*');
	        $isHomeRoute = ($path === '' || request()->is('home') || request()->is('welcome'));
	        $isRadioRoute = request()->is('radio*');
	        $isContentRoute = request()->is('content');
	        $isDigitalLibraryRoute = request()->is('digital-library');
	        $isDuaRoute = request()->is('dua');
	        $isSeerahRoute = request()->is('mission') || request()->is('seerah');
	        $isAuthRoute = request()->is('login') || request()->is('register');
	        $hasThemeToggle = ($isSuratRoute || $isHomeRoute || $isRadioRoute || $isContentRoute || $isDigitalLibraryRoute || $isDuaRoute || $isSeerahRoute || $isAuthRoute);
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
    @auth
        <meta name="user" content="{{ auth()->id() }}">
    @else
        <meta name="user" content="">
    @endauth
    <script>
        window.Laravel = window.Laravel || {};
        window.Laravel.userId = {{ auth()->id() ? (int) auth()->id() : 'null' }};
        window.Laravel.user = {!! auth()->user() ? json_encode(['id' => auth()->id()]) : 'null' !!};
    </script>
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
    <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>
    <link rel="preconnect" href="https://www.google-analytics.com" crossorigin>
    <link rel="preconnect" href="https://connect.facebook.net" crossorigin>
    <link rel="preconnect" href="https://js.stripe.com" crossorigin>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet';">
    <noscript>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap">
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
    @php
        $appCssMix = mix('css/app.css');
        $layoutCssMix = mix('css/layout.css');
        $manifestJsMix = mix('js/manifest.js');
        $vendorJsMix = mix('js/vendor.js');
        $appJsMix = mix('js/app.js');

        $appCssHref = $appCssMix . (str_contains($appCssMix, '?') ? '&' : '?') . 'v=' . @filemtime(public_path('css/app.css'));
        $layoutCssHref = $layoutCssMix . (str_contains($layoutCssMix, '?') ? '&' : '?') . 'v=' . @filemtime(public_path('css/layout.css'));
        $manifestJsSrc = $manifestJsMix . (str_contains($manifestJsMix, '?') ? '&' : '?') . 'v=' . @filemtime(public_path('js/manifest.js'));
        $vendorJsSrc = $vendorJsMix . (str_contains($vendorJsMix, '?') ? '&' : '?') . 'v=' . @filemtime(public_path('js/vendor.js'));
        $appJsSrc = $appJsMix . (str_contains($appJsMix, '?') ? '&' : '?') . 'v=' . @filemtime(public_path('js/app.js'));
    @endphp
    <link rel="preload" href="{{ $appCssHref }}" as="style" onload="this.onload=null;this.rel='stylesheet';">
    <link rel="preload" href="{{ $layoutCssHref }}" as="style" onload="this.onload=null;this.rel='stylesheet';">
    <link rel="preload" href="{{ asset('css/vue-styles.css') }}" as="style" onload="this.onload=null;this.rel='stylesheet';">
    <noscript>
        <link rel="stylesheet" href="{{ $appCssHref }}">
        <link rel="stylesheet" href="{{ $layoutCssHref }}">
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
    <script>
        (function() {
            try {
	                var isSuratRoute = {{ $isSuratRoute ? 'true' : 'false' }};
	                var isHomeRoute = {{ $isHomeRoute ? 'true' : 'false' }};
	                var isRadioRoute = {{ $isRadioRoute ? 'true' : 'false' }};
	                var isContentRoute = {{ $isContentRoute ? 'true' : 'false' }};
	                var isDigitalLibraryRoute = {{ $isDigitalLibraryRoute ? 'true' : 'false' }};
	                var isDuaRoute = {{ $isDuaRoute ? 'true' : 'false' }};
	                var isSeerahRoute = {{ $isSeerahRoute ? 'true' : 'false' }};
	                var isAuthRoute = {{ $isAuthRoute ? 'true' : 'false' }};
	                if (!isSuratRoute && !isHomeRoute && !isRadioRoute && !isContentRoute && !isDigitalLibraryRoute && !isDuaRoute && !isSeerahRoute && !isAuthRoute) return;

                var storedSuratTheme = isSuratRoute ? localStorage.getItem('suratThemeMode') : null;
                var storedRadioTheme = isRadioRoute ? localStorage.getItem('radioThemeMode') : null;
                // Canonical theme key across routes: `darkMode` when present.
                // Other keys (`suratThemeMode`, `radioThemeMode`) are treated as legacy/fallback.
                var storedDarkMode = localStorage.getItem('darkMode');
                var prefersDark = false;
                try {
                    if (
                        typeof window.matchMedia === 'function' &&
                        window.matchMedia('(prefers-color-scheme: dark)').matches
                    ) {
                        prefersDark = !storedDarkMode && !storedSuratTheme && !storedRadioTheme;
                    }
                } catch (e) {}

	                var isDark = false;
	                if (storedDarkMode !== null && storedDarkMode !== undefined && storedDarkMode !== '') {
	                    isDark = storedDarkMode === 'true';
	                } else if (storedSuratTheme) {
	                    isDark = storedSuratTheme === 'dark';
	                } else if (storedRadioTheme) {
	                    isDark = storedRadioTheme === 'dark';
	                } else {
	                    isDark = prefersDark;
	                }
                var theme = isDark ? 'dark' : 'light';
                var root = document.documentElement;

                root.classList.toggle('dark-mode', isDark);
                root.setAttribute('data-bs-theme', theme);
                root.setAttribute('data-theme', theme);
                root.style.colorScheme = theme;

	                // Keep storage keys aligned so `/surat` and `/radio` can't drift into an "opposite" theme.
	                // Do not overwrite preferences on auth pages (we force dark visuals there).
	                if (!isAuthRoute) {
	                    try { localStorage.setItem('darkMode', String(isDark)); } catch (e) {}
	                    try { localStorage.setItem('suratThemeMode', theme); } catch (e) {}
	                    try { localStorage.setItem('radioThemeMode', theme); } catch (e) {}
	                }
            } catch (e) {}
        })();
    </script>
    <script>
        (function() {
            try {
                var stack = localStorage.getItem('suratSelectedFontStack');
                var id = localStorage.getItem('suratSelectedFont');
                var map = {
                    'qpc-hafs': "'UthmanicHafs', 'Noto Naskh Arabic', 'Amiri', serif",
                    'uthmani': "'UthmanicHafs', 'Scheherazade New', 'Amiri', serif",
                    'indopak': "'IndoPak', 'Noto Nastaliq Urdu', 'Lateef', 'Amiri', serif",
                    'tajweed-mushaf': "'UthmanicHafs', 'Scheherazade New', 'Amiri', serif"
                };
                var resolved = stack || map[id] || '';
                if (resolved) {
                    document.documentElement.style.setProperty('--ic-quran-arabic-font', resolved);
                }
            } catch (e) {}
        })();
    </script>
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
    <style>
        /* Critical runtime override for Surat memorisation controls */
        .surat-premium .memorisation-inline-action--play {
            background: linear-gradient(135deg, #0f766e, #0b5f53) !important;
            border: 1px solid #065f46 !important;
            color: #ecfdf5 !important;
            box-shadow: 0 12px 26px rgba(6, 95, 70, 0.32) !important;
            font-weight: 800 !important;
        }
        .surat-premium .memorisation-inline-action--play i,
        .surat-premium .memorisation-inline-action--play span {
            color: #ecfdf5 !important;
        }
        .surat-premium .memorisation-inline-action--play:hover,
        .surat-premium .memorisation-inline-action--play:focus-visible {
            background: linear-gradient(135deg, #0b5f53, #084e45) !important;
            border-color: #047857 !important;
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25), 0 14px 30px rgba(6, 95, 70, 0.35) !important;
        }
        .surat-premium .memorisation-icon-text-action--hifdhplan {
            background: linear-gradient(135deg, rgba(15, 118, 110, 0.28), rgba(15, 118, 110, 0.14)) !important;
            border: 1px solid #0b5f53 !important;
            box-shadow: 0 10px 20px rgba(8, 79, 68, 0.2) !important;
        }
        .surat-premium .memorisation-icon-text-action--hifdhplan .memorisation-icon-text-label,
        .surat-premium .memorisation-icon-text-action--hifdhplan i,
        .surat-premium .memorisation-icon-text-action--hifdhplan .memorisation-icon-text-state {
            color: #083b33 !important;
            font-weight: 800 !important;
        }
        .surat-premium .memorisation-icon-text-action--hifdhplan:hover,
        .surat-premium .memorisation-icon-text-action--hifdhplan:focus-visible {
            background: linear-gradient(135deg, rgba(15, 118, 110, 0.36), rgba(15, 118, 110, 0.2)) !important;
            border-color: #065f46 !important;
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2), 0 12px 24px rgba(8, 79, 68, 0.22) !important;
        }
        .surat-premium .memorisation-inline-action:hover,
        .surat-premium .memorisation-inline-action:focus-visible,
        .surat-premium .memorisation-feature-row--feature-panel .memorisation-icon-text-action:hover,
        .surat-premium .memorisation-feature-row--feature-panel .memorisation-icon-text-action:focus-visible {
            border-color: rgba(8, 79, 68, 0.46) !important;
            box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.18), 0 10px 18px rgba(8, 79, 68, 0.14) !important;
        }
    </style>
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
            padding-top: calc(var(--navbar-h) + 0.75rem);
            /* background: linear-gradient(180deg, #fdfefe 0%, #f4f6fb 40%, #e9eef7 100%); */
        }

        main#main-content,
        #app {
            width: 100%;
            max-width: 100%;
            min-width: 0;
        }

	        .navbar > .container-fluid {
	            align-items: center;
	            gap: 0.75rem;
	            padding-inline: clamp(0.9rem, 3vw, 1.5rem);
	        }

	        /* Keep navbar fixed across all pages (some page CSS overrides were unfixing it). */
	        .navbar.fixed-top {
	            position: fixed !important;
	            top: 0;
	            left: 0;
	            right: 0;
	            width: 100%;
	            z-index: 1090 !important;
	        }

	        .navbar .navbar-brand {
	            flex: 0 1 auto;
	            margin-right: auto;
	            min-width: 0;
	        }

	        .navbar .navbar-brand.surat-brand-lockup {
	            --surat-brand-height: 42px;
	            display: inline-flex;
	            align-items: center;
	            gap: 0.55rem;
	            min-height: var(--surat-brand-height);
	            padding-top: 4px;
	            padding-bottom: 2px;
	            line-height: 0;
	            max-width: min(300px, 42vw);
	            overflow: visible;
	        }

        .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon-stack {
            position: relative;
            flex: 0 0 auto;
            height: var(--surat-brand-height);
            aspect-ratio: 751 / 770;
        }

        .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon {
            position: absolute;
            inset: 0;
            width: 100% !important;
            height: 100% !important;
            max-width: none !important;
            object-fit: contain;
            transition: opacity 0.18s ease;
        }

        .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon--dark {
            opacity: 0;
        }

        .navbar .navbar-brand.surat-brand-lockup .surat-brand-wordmark {
            position: relative;
            flex: 0 1 auto;
            height: var(--surat-brand-height);
            aspect-ratio: 3177 / 449;
            overflow: visible;
            min-width: 0;
            width: auto;
            max-width: min(250px, calc(100vw - 150px));
        }

        .navbar .navbar-brand.surat-brand-lockup .surat-brand-wordmark-img {
            position: relative;
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            object-fit: contain;
            transform: none;
        }

        @media (max-width: 1199.98px) {
            .navbar .navbar-brand.surat-brand-lockup {
                --surat-brand-height: 40px;
            }
            .navbar .navbar-brand.surat-brand-lockup .surat-brand-wordmark {
                max-width: min(238px, calc(100vw - 150px));
            }
        }

        @media (max-width: 991.98px) {
            .navbar .navbar-brand.surat-brand-lockup {
                --surat-brand-height: 38px;
                max-width: min(270px, 62vw);
            }
            .navbar .navbar-brand.surat-brand-lockup .surat-brand-wordmark {
                max-width: min(220px, calc(100vw - 150px));
            }
        }

        .navbar .navbar-toggler {
            flex-shrink: 0;
        }

        .navbar {
            background-color: transparent !important;
            border: none;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
        }

        .navbar.navbar-transparent {
            background: transparent !important;
            background-image: none !important;
        }

        .navbar.navbar-transparent .navbar-brand,
        .navbar.navbar-transparent .nav-link,
        .navbar.navbar-transparent .navbar-toggler {
            color: #121212 !important;
        }

        .navbar.navbar-transparent .navbar-nav .nav-link,
        .navbar.navbar-transparent .navbar-nav .nav-link:focus-visible,
        .navbar.navbar-transparent .navbar-nav .nav-link:active,
        .navbar.navbar-transparent .navbar-nav .nav-link:visited,
        .navbar.navbar-transparent .navbar-nav .nav-link:hover {
            color: #121212 !important;
            background: transparent !important;
            box-shadow: none !important;
        }

        @media (max-width: 768px) {
            /* Keep mobile menu readable instead of blending into page content */
            :root {
                --navbar-h: 74px;
            }

            .navbar.navbar-transparent {
                background: rgba(255, 255, 255, 0.94) !important;
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
            }

            .navbar.navbar-transparent.fixed-top {
                padding-block: 0.3rem !important;
            }

            .navbar > .container-fluid {
                gap: 0.7rem;
                padding-inline: 0.9rem;
                min-height: 64px;
            }

            .navbar .navbar-brand {
                display: inline-flex;
                align-items: center;
                min-height: 56px;
            }

            .navbar .navbar-brand.surat-brand-lockup {
                --surat-brand-height: 46px;
            }

            .navbar .navbar-brand:not(.surat-brand-lockup) img {
                width: auto !important;
                height: 46px !important;
                max-width: min(224px, 66vw) !important;
            }

            .navbar .navbar-toggler {
                min-width: 58px !important;
                min-height: 58px !important;
                padding: 0.74rem !important;
                border-radius: 18px !important;
                border: 1px solid rgba(15, 23, 42, 0.12) !important;
                background: rgba(255, 255, 255, 0.96) !important;
                box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08) !important;
            }

            .navbar .navbar-toggler-icon {
                width: 1.9rem !important;
                height: 1.9rem !important;
                background-size: 1.9rem 1.9rem !important;
            }

            .navbar.navbar-transparent .navbar-collapse.show,
            .navbar.navbar-transparent .navbar-collapse.collapsing {
                margin-top: 0.5rem;
                padding: 0.5rem 0.25rem;
                border-radius: 14px;
                background: rgba(255, 255, 255, 0.98) !important;
                border: 1px solid rgba(15, 23, 42, 0.12);
                box-shadow: 0 16px 34px rgba(15, 23, 42, 0.18);
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
            }

            .navbar.navbar-transparent .navbar-collapse .nav-link {
                color: #0f172a !important;
                font-weight: 600;
            }

            .navbar.navbar-transparent .navbar-collapse .dropdown-menu {
                background: #ffffff;
                border: 1px solid rgba(15, 23, 42, 0.14);
                box-shadow: 0 14px 28px rgba(15, 23, 42, 0.16);
                position: static;
                width: 100%;
                margin-top: 0.35rem;
            }
        }

        @media (max-width: 575.98px) {
            :root {
                --navbar-h: 76px;
            }

            .navbar > .container-fluid {
                min-height: 66px;
            }

            .navbar .navbar-brand.surat-brand-lockup {
                --surat-brand-height: 36px;
                max-width: min(248px, 62vw);
            }

            .navbar .navbar-brand.surat-brand-lockup .surat-brand-wordmark {
                max-width: min(202px, calc(100vw - 132px));
            }

            .navbar .navbar-brand:not(.surat-brand-lockup) img {
                height: 48px !important;
                max-width: min(232px, 68vw) !important;
            }

            .navbar .navbar-toggler {
                min-width: 60px !important;
                min-height: 60px !important;
                padding: 0.78rem !important;
            }

            .navbar .navbar-toggler-icon {
                width: 2rem !important;
                height: 2rem !important;
                background-size: 2rem 2rem !important;
            }
        }

        body.surat-page-shell-dark .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon--light {
            opacity: 0;
        }

        body.surat-page-shell-dark .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon--dark {
            opacity: 1;
        }

	        body.surat-page-shell-dark .navbar .navbar-brand.surat-brand-lockup .surat-brand-wordmark-img {
	            filter: brightness(0) invert(1);
	        }

	        body.radio-route-page.dark-mode,
	        body.radio-route-page.dark-mode main#main-content,
	        body.radio-route-page.dark-mode #app,
	        body.content-route-page.dark-mode,
	        body.content-route-page.dark-mode main#main-content,
	        body.content-route-page.dark-mode #app,
	        body.digital-library-route-page.dark-mode,
	        body.digital-library-route-page.dark-mode main#main-content,
	        body.digital-library-route-page.dark-mode #app,
	        body.dua-route-page.dark-mode,
	        body.dua-route-page.dark-mode main#main-content,
	        body.dua-route-page.dark-mode #app,
	        body.seerah-route-page.dark-mode,
	        body.seerah-route-page.dark-mode main#main-content,
	        body.seerah-route-page.dark-mode #app {
	            background: #232529 !important;
	        }

	        body.radio-route-page.dark-mode,
	        body.content-route-page.dark-mode,
	        body.digital-library-route-page.dark-mode,
	        body.dua-route-page.dark-mode,
	        body.seerah-route-page.dark-mode {
	            --bs-body-bg: #232529;
	            --bs-body-color: #ffffff;
	        }

	        .global-theme-toggle {
	            --ic-toggle-bg: #ffffff;
	            --ic-toggle-fg: #232529;
	            --ic-toggle-active: #232529;
	            --ic-toggle-active-fg: #ffffff;
	            display: inline-flex;
	            align-items: center;
	            justify-content: center;
	            border-radius: 999px !important;
	            padding: 0.25rem !important;
	            min-height: 40px;
	            border: 1px solid rgba(15, 23, 42, 0.18) !important;
	            background: var(--ic-toggle-bg) !important;
	            color: var(--ic-toggle-fg) !important;
	            box-shadow: none !important;
	            cursor: pointer;
	            touch-action: manipulation;
	            user-select: none;
	            white-space: nowrap;
	            position: relative;
	            overflow: hidden;
	            transition: background 160ms ease, border-color 160ms ease;
	        }

	        .global-theme-toggle:focus-visible {
	            outline: 3px solid rgba(13, 182, 145, 0.35);
	            outline-offset: 2px;
	        }

	        /* Segmented control layout */
	        .global-theme-toggle .global-theme-toggle__segments {
	            position: relative;
	            display: grid;
	            grid-template-columns: 1fr 1fr;
	            align-items: center;
	            gap: 0;
	            width: 88px;
	            height: 34px;
	            border-radius: 999px;
	            background: transparent;
	        }

	        .global-theme-toggle .global-theme-toggle__indicator {
	            position: absolute;
	            inset: 0 auto 0 0;
	            width: 50%;
	            border-radius: 999px;
	            background: var(--ic-toggle-active);
	            transform: translateX(0%);
	            transition: transform 160ms ease;
	        }

	        .global-theme-toggle.is-dark .global-theme-toggle__indicator {
	            transform: translateX(100%);
	        }

	        html.theme-transitioning body,
	        html.theme-transitioning main#main-content,
	        html.theme-transitioning #app,
	        html.theme-transitioning .navbar,
	        html.theme-transitioning .navbar .navbar-collapse,
	        html.theme-transitioning .navbar .dropdown-menu,
	        html.theme-transitioning .navbar .dropdown-item,
	        html.theme-transitioning .navbar .nav-link,
	        html.theme-transitioning .navbar .navbar-toggler,
	        html.theme-transitioning .global-theme-toggle,
	        html.theme-transitioning .global-theme-toggle .global-theme-toggle__indicator,
	        html.theme-transitioning .global-theme-toggle .global-theme-toggle__segment,
	        html.theme-transitioning .surat-brand-icon,
	        html.theme-transitioning .surat-brand-wordmark-img,
	        html.theme-transitioning .ic-home,
	        html.theme-transitioning .ic-home *,
	        html.theme-transitioning .radio-page,
	        html.theme-transitioning .radio-page *,
	        html.theme-transitioning .digital-library-page,
	        html.theme-transitioning .digital-library-page *,
	        html.theme-transitioning .dua-shell,
	        html.theme-transitioning .dua-shell *,
	        html.theme-transitioning .mission-shell,
	        html.theme-transitioning .mission-shell *,
	        html.theme-transitioning .podcast-page,
	        html.theme-transitioning .podcast-page * {
	            transition:
	                background-color 240ms ease,
	                background 240ms ease,
	                color 220ms ease,
	                border-color 220ms ease,
	                box-shadow 240ms ease,
	                filter 240ms ease,
	                opacity 220ms ease !important;
	        }

	        html.theme-transitioning .global-theme-toggle .global-theme-toggle__indicator {
	            transition: transform 220ms ease, background-color 220ms ease, background 220ms ease !important;
	        }

	        @media (prefers-reduced-motion: reduce) {
	            html.theme-transitioning body,
	            html.theme-transitioning main#main-content,
	            html.theme-transitioning #app,
	            html.theme-transitioning .navbar,
	            html.theme-transitioning .navbar .navbar-collapse,
	            html.theme-transitioning .navbar .dropdown-menu,
	            html.theme-transitioning .navbar .dropdown-item,
	            html.theme-transitioning .navbar .nav-link,
	            html.theme-transitioning .navbar .navbar-toggler,
	            html.theme-transitioning .global-theme-toggle,
	            html.theme-transitioning .global-theme-toggle .global-theme-toggle__indicator,
	            html.theme-transitioning .global-theme-toggle .global-theme-toggle__segment,
	            html.theme-transitioning .surat-brand-icon,
	            html.theme-transitioning .surat-brand-wordmark-img,
	            html.theme-transitioning .ic-home,
	            html.theme-transitioning .ic-home *,
	            html.theme-transitioning .radio-page,
	            html.theme-transitioning .radio-page *,
	            html.theme-transitioning .digital-library-page,
	            html.theme-transitioning .digital-library-page *,
	            html.theme-transitioning .dua-shell,
	            html.theme-transitioning .dua-shell *,
	            html.theme-transitioning .mission-shell,
	            html.theme-transitioning .mission-shell *,
	            html.theme-transitioning .podcast-page,
	            html.theme-transitioning .podcast-page *,
	            .global-theme-toggle,
	            .global-theme-toggle .global-theme-toggle__indicator {
	                transition: none !important;
	            }
	        }

	        .global-theme-toggle .global-theme-toggle__segment {
	            position: relative;
	            z-index: 1;
	            display: inline-flex;
	            align-items: center;
	            justify-content: center;
	            font-weight: 700;
	            font-size: 0.92rem;
	            color: var(--ic-toggle-fg);
	            line-height: 1;
	            padding-inline: 0.4rem;
	        }

	        .global-theme-toggle .global-theme-toggle__segment i {
	            font-size: 0.98rem;
	            line-height: 1;
	        }

	        .global-theme-toggle:not(.is-dark) .global-theme-toggle__segment--light {
	            color: var(--ic-toggle-active-fg);
	        }
	        .global-theme-toggle.is-dark .global-theme-toggle__segment--dark {
	            color: var(--ic-toggle-active-fg);
	        }

	        /* Navbar dark pages: keep control readable on #232529 background */
	        body.home-route-page.dark-mode .global-theme-toggle,
	        body.radio-route-page.dark-mode .global-theme-toggle,
	        body.content-route-page.dark-mode .global-theme-toggle,
	        body.digital-library-route-page.dark-mode .global-theme-toggle,
	        body.dua-route-page.dark-mode .global-theme-toggle,
	        body.seerah-route-page.dark-mode .global-theme-toggle,
	        body.surat-page-shell-dark .global-theme-toggle {
	            border-color: rgba(255, 255, 255, 0.14) !important;
	        }

	        body.content-route-page.dark-mode .global-theme-toggle,
	        body.digital-library-route-page.dark-mode .global-theme-toggle,
	        body.dua-route-page.dark-mode .global-theme-toggle,
	        body.seerah-route-page.dark-mode .global-theme-toggle {
	            --ic-toggle-bg: rgba(255, 255, 255, 0.04);
	            --ic-toggle-fg: #ffffff;
	            --ic-toggle-active: #ffffff;
	            --ic-toggle-active-fg: #232529;
	            background: rgba(255, 255, 255, 0.04) !important;
	        }

	        /* Surat: hide internal theme toggles (use navbar toggle only) */
	        body.surat-route-page .advanced-quran-mobile-theme-btn,
	        body.surat-route-page .quran-toolbar-btn-theme-compact,
	        body.surat-route-page .sidebar-theme-toggle {
	            display: none !important;
	        }

	        /* Home/Radio: hide page-level theme toggles (use navbar toggle only) */
	        body.home-route-page .ic-theme-toggle,
	        body.radio-route-page .radio-theme-btn {
	            display: none !important;
	        }

	        /* Auth (/login, /register): scoped theme support */
	        body.auth-route-page {
	            --auth-bg: #ffffff;
	            --auth-fg: #232529;
	            --auth-card: #ffffff;
	            --auth-border: rgba(15, 23, 42, 0.12);
	        }

	        body.auth-route-page.dark-mode {
	            --auth-bg: #232529;
	            --auth-fg: #ffffff;
	            --auth-card: #232529;
	            --auth-border: rgba(255, 255, 255, 0.12);
	        }

	        body.auth-route-page,
	        body.auth-route-page main#main-content,
	        body.auth-route-page #app {
	            background: var(--auth-bg) !important;
	            color: var(--auth-fg) !important;
	        }

	        body.auth-route-page .navbar,
	        body.auth-route-page .navbar.navbar-transparent {
	            background: var(--auth-bg) !important;
	            box-shadow: none !important;
	            backdrop-filter: none !important;
	            -webkit-backdrop-filter: none !important;
	            border-bottom: 1px solid var(--auth-border) !important;
	        }

	        body.auth-route-page .navbar .navbar-brand,
	        body.auth-route-page .navbar .nav-link,
	        body.auth-route-page .navbar .navbar-toggler {
	            color: var(--auth-fg) !important;
	        }

	        body.auth-route-page.dark-mode .navbar .navbar-nav .nav-link,
	        body.auth-route-page.dark-mode .navbar .navbar-nav .nav-link:visited,
	        body.auth-route-page.dark-mode .navbar .navbar-nav .nav-link:hover,
	        body.auth-route-page.dark-mode .navbar .navbar-nav .nav-link:focus-visible,
	        body.auth-route-page.dark-mode .navbar .navbar-nav .nav-link:active {
	            color: #ffffff !important;
	            background: transparent !important;
	            box-shadow: none !important;
	        }

	        body.auth-route-page.dark-mode .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon--light {
	            opacity: 0;
	        }
	        body.auth-route-page.dark-mode .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon--dark {
	            opacity: 1;
	        }
	        body.auth-route-page.dark-mode .navbar .navbar-brand.surat-brand-lockup .surat-brand-wordmark-img {
	            filter: brightness(0) invert(1);
	        }

	        body.auth-route-page:not(.dark-mode) .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon--light {
	            opacity: 1;
	        }
	        body.auth-route-page:not(.dark-mode) .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon--dark {
	            opacity: 0;
	        }
	        body.auth-route-page:not(.dark-mode) .navbar .navbar-brand.surat-brand-lockup .surat-brand-wordmark-img {
	            filter: none;
	        }

	        body.auth-route-page .navbar .navbar-brand.surat-brand-lockup {
	            --surat-brand-height: 44px;
	        }
	        body.auth-route-page .navbar .navbar-brand img {
	            height: 34px !important;
	            max-width: min(220px, 54vw) !important;
	        }
	        body.auth-route-page .navbar .navbar-brand.surat-brand-lockup .surat-brand-wordmark-img {
	            height: 32px !important;
	            width: auto !important;
	        }
	        body.auth-route-page .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon {
	            height: 34px !important;
	            width: auto !important;
	        }

	        body.auth-route-page .auth-page,
	        body.auth-route-page .auth-card,
	        body.auth-route-page .auth-card__footer,
	        body.auth-route-page .divider,
	        body.auth-route-page .social-btn {
	            background: var(--auth-card) !important;
	        }

	        body.auth-route-page.dark-mode .auth-page__glow {
	            display: none !important;
	        }

	        body.auth-route-page #app .auth-title,
	        body.auth-route-page #app .form-label,
	        body.auth-route-page #app .form-check-label,
	        body.auth-route-page #app .divider span,
	        body.auth-route-page #app .auth-switch-label,
	        body.auth-route-page #app .auth-switch-link,
	        body.auth-route-page #app .forgot-password-link,
	        body.auth-route-page #app .social-btn,
	        body.auth-route-page #app .social-btn i,
	        body.auth-route-page #app p,
	        body.auth-route-page #app span,
	        body.auth-route-page #app small {
	            color: var(--auth-fg) !important;
	        }

	        body.auth-route-page.dark-mode #app .form-control,
	        body.auth-route-page.dark-mode #app .form-check-input {
	            background: #232529 !important;
	            color: #ffffff !important;
	            border-color: rgba(255, 255, 255, 0.14) !important;
	            box-shadow: none !important;
	        }

	        body.auth-route-page.dark-mode #app .form-control::placeholder {
	            color: rgba(255, 255, 255, 0.65) !important;
	        }

	        body.auth-route-page.dark-mode #app .auth-card {
	            border: 1px solid rgba(255, 255, 255, 0.12) !important;
	            box-shadow: none !important;
	        }

	        body.home-route-page.dark-mode .navbar.navbar-transparent,
	        body.radio-route-page.dark-mode .navbar.navbar-transparent,
	        body.content-route-page.dark-mode .navbar.navbar-transparent,
	        body.digital-library-route-page.dark-mode .navbar.navbar-transparent,
	        body.dua-route-page.dark-mode .navbar.navbar-transparent,
	        body.seerah-route-page.dark-mode .navbar.navbar-transparent {
	            background: #232529 !important;
	            backdrop-filter: none !important;
	            -webkit-backdrop-filter: none !important;
            box-shadow: none !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
        }

        body.home-route-page.dark-mode .navbar.navbar-transparent .navbar-brand,
        body.home-route-page.dark-mode .navbar.navbar-transparent .nav-link,
        body.home-route-page.dark-mode .navbar.navbar-transparent .navbar-toggler,
        body.radio-route-page.dark-mode .navbar.navbar-transparent .navbar-brand,
        body.radio-route-page.dark-mode .navbar.navbar-transparent .nav-link,
        body.radio-route-page.dark-mode .navbar.navbar-transparent .navbar-toggler,
        body.content-route-page.dark-mode .navbar.navbar-transparent .navbar-brand,
        body.content-route-page.dark-mode .navbar.navbar-transparent .nav-link,
        body.content-route-page.dark-mode .navbar.navbar-transparent .navbar-toggler,
        body.digital-library-route-page.dark-mode .navbar.navbar-transparent .navbar-brand,
        body.digital-library-route-page.dark-mode .navbar.navbar-transparent .nav-link,
        body.digital-library-route-page.dark-mode .navbar.navbar-transparent .navbar-toggler,
        body.dua-route-page.dark-mode .navbar.navbar-transparent .navbar-brand,
        body.dua-route-page.dark-mode .navbar.navbar-transparent .nav-link,
        body.dua-route-page.dark-mode .navbar.navbar-transparent .navbar-toggler,
        body.seerah-route-page.dark-mode .navbar.navbar-transparent .navbar-brand,
        body.seerah-route-page.dark-mode .navbar.navbar-transparent .nav-link,
        body.seerah-route-page.dark-mode .navbar.navbar-transparent .navbar-toggler {
            color: #ffffff !important;
        }

        body.home-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link,
        body.home-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:focus-visible,
        body.home-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:active,
        body.home-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:visited,
        body.home-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:hover,
        body.radio-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link,
        body.radio-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:focus-visible,
        body.radio-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:active,
        body.radio-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:visited,
        body.radio-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:hover,
        body.content-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link,
        body.content-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:focus-visible,
        body.content-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:active,
        body.content-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:visited,
        body.content-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:hover,
        body.digital-library-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link,
        body.digital-library-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:focus-visible,
        body.digital-library-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:active,
        body.digital-library-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:visited,
        body.digital-library-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:hover,
        body.dua-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link,
        body.dua-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:focus-visible,
        body.dua-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:active,
        body.dua-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:visited,
        body.dua-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:hover,
        body.seerah-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link,
        body.seerah-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:focus-visible,
        body.seerah-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:active,
        body.seerah-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:visited,
        body.seerah-route-page.dark-mode .navbar.navbar-transparent .navbar-nav .nav-link:hover {
            color: #ffffff !important;
            background: transparent !important;
            box-shadow: none !important;
        }

        body.home-route-page.dark-mode .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon--light,
        body.radio-route-page.dark-mode .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon--light,
        body.content-route-page.dark-mode .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon--light,
        body.digital-library-route-page.dark-mode .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon--light,
        body.dua-route-page.dark-mode .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon--light,
        body.seerah-route-page.dark-mode .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon--light {
            opacity: 0;
        }

        body.home-route-page.dark-mode .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon--dark,
        body.radio-route-page.dark-mode .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon--dark,
        body.content-route-page.dark-mode .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon--dark,
        body.digital-library-route-page.dark-mode .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon--dark,
        body.dua-route-page.dark-mode .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon--dark,
        body.seerah-route-page.dark-mode .navbar .navbar-brand.surat-brand-lockup .surat-brand-icon--dark {
            opacity: 1;
        }

        body.home-route-page.dark-mode .navbar .navbar-brand.surat-brand-lockup .surat-brand-wordmark-img,
        body.radio-route-page.dark-mode .navbar .navbar-brand.surat-brand-lockup .surat-brand-wordmark-img,
        body.content-route-page.dark-mode .navbar .navbar-brand.surat-brand-lockup .surat-brand-wordmark-img,
        body.digital-library-route-page.dark-mode .navbar .navbar-brand.surat-brand-lockup .surat-brand-wordmark-img,
        body.dua-route-page.dark-mode .navbar .navbar-brand.surat-brand-lockup .surat-brand-wordmark-img,
        body.seerah-route-page.dark-mode .navbar .navbar-brand.surat-brand-lockup .surat-brand-wordmark-img {
            filter: brightness(0) invert(1);
        }

        body.home-route-page.dark-mode .navbar .navbar-toggler,
        body.radio-route-page.dark-mode .navbar .navbar-toggler,
        body.content-route-page.dark-mode .navbar .navbar-toggler,
        body.digital-library-route-page.dark-mode .navbar .navbar-toggler,
        body.dua-route-page.dark-mode .navbar .navbar-toggler,
        body.seerah-route-page.dark-mode .navbar .navbar-toggler {
            border-color: rgba(255, 255, 255, 0.14) !important;
            background: #232529 !important;
            box-shadow: none !important;
        }

        body.home-route-page.dark-mode .navbar .navbar-toggler-icon,
        body.radio-route-page.dark-mode .navbar .navbar-toggler-icon,
        body.content-route-page.dark-mode .navbar .navbar-toggler-icon,
        body.digital-library-route-page.dark-mode .navbar .navbar-toggler-icon,
        body.dua-route-page.dark-mode .navbar .navbar-toggler-icon,
        body.seerah-route-page.dark-mode .navbar .navbar-toggler-icon {
            filter: brightness(0) invert(1);
        }

        body.home-route-page.dark-mode .navbar .dropdown-menu,
        body.radio-route-page.dark-mode .navbar .dropdown-menu,
        body.content-route-page.dark-mode .navbar .dropdown-menu,
        body.digital-library-route-page.dark-mode .navbar .dropdown-menu,
        body.dua-route-page.dark-mode .navbar .dropdown-menu,
        body.seerah-route-page.dark-mode .navbar .dropdown-menu {
            background: #232529 !important;
            border-color: rgba(255, 255, 255, 0.12) !important;
            box-shadow: none !important;
        }

        body.home-route-page.dark-mode .navbar .dropdown-item,
        body.radio-route-page.dark-mode .navbar .dropdown-item,
        body.content-route-page.dark-mode .navbar .dropdown-item,
        body.digital-library-route-page.dark-mode .navbar .dropdown-item,
        body.dua-route-page.dark-mode .navbar .dropdown-item,
        body.seerah-route-page.dark-mode .navbar .dropdown-item {
            color: #ffffff !important;
        }

        body.home-route-page.dark-mode .navbar .dropdown-item:hover,
        body.home-route-page.dark-mode .navbar .dropdown-item:focus-visible,
        body.radio-route-page.dark-mode .navbar .dropdown-item:hover,
        body.radio-route-page.dark-mode .navbar .dropdown-item:focus-visible,
        body.content-route-page.dark-mode .navbar .dropdown-item:hover,
        body.content-route-page.dark-mode .navbar .dropdown-item:focus-visible,
        body.digital-library-route-page.dark-mode .navbar .dropdown-item:hover,
        body.digital-library-route-page.dark-mode .navbar .dropdown-item:focus-visible,
        body.dua-route-page.dark-mode .navbar .dropdown-item:hover,
        body.dua-route-page.dark-mode .navbar .dropdown-item:focus-visible,
        body.seerah-route-page.dark-mode .navbar .dropdown-item:hover,
        body.seerah-route-page.dark-mode .navbar .dropdown-item:focus-visible {
            background: rgba(255, 255, 255, 0.06) !important;
        }

	        @media (max-width: 768px) {
	            .navbar .navbar-collapse #globalThemeToggle {
	                width: 100%;
	                max-width: 168px;
	                margin-left: 1rem;
	            }

            body.home-route-page.dark-mode .navbar.navbar-transparent,
            body.radio-route-page.dark-mode .navbar.navbar-transparent,
            body.content-route-page.dark-mode .navbar.navbar-transparent,
            body.digital-library-route-page.dark-mode .navbar.navbar-transparent,
            body.dua-route-page.dark-mode .navbar.navbar-transparent,
            body.seerah-route-page.dark-mode .navbar.navbar-transparent {
                background: #232529 !important;
            }

            body.home-route-page.dark-mode .navbar.navbar-transparent .navbar-collapse.show,
            body.home-route-page.dark-mode .navbar.navbar-transparent .navbar-collapse.collapsing,
            body.radio-route-page.dark-mode .navbar.navbar-transparent .navbar-collapse.show,
            body.radio-route-page.dark-mode .navbar.navbar-transparent .navbar-collapse.collapsing,
            body.content-route-page.dark-mode .navbar.navbar-transparent .navbar-collapse.show,
            body.content-route-page.dark-mode .navbar.navbar-transparent .navbar-collapse.collapsing,
            body.digital-library-route-page.dark-mode .navbar.navbar-transparent .navbar-collapse.show,
            body.digital-library-route-page.dark-mode .navbar.navbar-transparent .navbar-collapse.collapsing,
            body.dua-route-page.dark-mode .navbar.navbar-transparent .navbar-collapse.show,
            body.dua-route-page.dark-mode .navbar.navbar-transparent .navbar-collapse.collapsing,
            body.seerah-route-page.dark-mode .navbar.navbar-transparent .navbar-collapse.show,
            body.seerah-route-page.dark-mode .navbar.navbar-transparent .navbar-collapse.collapsing {
                background: #232529 !important;
                border-color: rgba(255, 255, 255, 0.12) !important;
                box-shadow: none !important;
            }

            body.dua-route-page.dark-mode .navbar.navbar-transparent .navbar-collapse.show,
            body.dua-route-page.dark-mode .navbar.navbar-transparent .navbar-collapse.collapsing {
                background: #232529 !important;
                border-color: rgba(255, 255, 255, 0.12) !important;
                box-shadow: none !important;
            }

            body.home-route-page.dark-mode .navbar.navbar-transparent .navbar-collapse .nav-link,
            body.radio-route-page.dark-mode .navbar.navbar-transparent .navbar-collapse .nav-link,
            body.content-route-page.dark-mode .navbar.navbar-transparent .navbar-collapse .nav-link,
            body.digital-library-route-page.dark-mode .navbar.navbar-transparent .navbar-collapse .nav-link,
            body.dua-route-page.dark-mode .navbar.navbar-transparent .navbar-collapse .nav-link,
            body.seerah-route-page.dark-mode .navbar.navbar-transparent .navbar-collapse .nav-link {
                color: #ffffff !important;
            }
        }

        @media (max-width: 1199.98px) {
            body.surat-route-page .navbar.surat-navbar-tablet {
                isolation: isolate;
                z-index: 1085 !important;
            }

            body.surat-route-page .navbar.surat-navbar-tablet.navbar-transparent {
                background: rgba(255, 255, 255, 0.96) !important;
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
            }

            body.surat-route-page .navbar.surat-navbar-tablet.fixed-top {
                padding-block: 0.28rem !important;
            }

            body.surat-route-page .navbar.surat-navbar-tablet > .container-fluid {
                gap: 0.7rem;
                padding-inline: 0.95rem;
                min-height: 66px;
            }

            body.surat-route-page .navbar.surat-navbar-tablet .navbar-brand {
                display: inline-flex;
                align-items: center;
                min-height: 52px;
                margin-right: auto;
            }

            body.surat-route-page .navbar.surat-navbar-tablet .navbar-brand.surat-brand-lockup {
                --surat-brand-height: 42px;
                gap: 0.55rem;
            }

            body.surat-route-page .navbar.surat-navbar-tablet .navbar-brand.surat-brand-lockup .surat-brand-wordmark {
                max-width: min(250px, 46vw);
            }

            body.surat-route-page .navbar.surat-navbar-tablet .navbar-toggler {
                min-width: 54px !important;
                min-height: 54px !important;
                padding: 0.68rem !important;
                border-radius: 16px !important;
                border: 1px solid rgba(15, 23, 42, 0.12) !important;
                background: rgba(255, 255, 255, 0.96) !important;
                box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08) !important;
                display: inline-flex !important;
                align-items: center;
                justify-content: center;
            }

            body.surat-route-page .navbar.surat-navbar-tablet .navbar-toggler-icon {
                width: 1.8rem !important;
                height: 1.8rem !important;
                background-size: 1.8rem 1.8rem !important;
            }

            body.surat-route-page .navbar.surat-navbar-tablet .navbar-collapse {
                width: 100%;
                flex-basis: 100%;
            }

            body.surat-route-page .navbar.surat-navbar-tablet .navbar-collapse.show,
            body.surat-route-page .navbar.surat-navbar-tablet .navbar-collapse.collapsing {
                position: relative;
                z-index: 2;
                margin-top: 0.5rem;
                padding: 0.5rem 0.25rem;
                border-radius: 16px;
                background: rgba(255, 255, 255, 0.98) !important;
                border: 1px solid rgba(15, 23, 42, 0.12);
                box-shadow: 0 16px 34px rgba(15, 23, 42, 0.18);
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
            }

            body.surat-route-page .navbar.surat-navbar-tablet .navbar-collapse .navbar-nav {
                gap: 0.55rem;
                align-items: stretch;
                padding: 0.25rem 0 0.1rem;
            }

            body.surat-route-page .navbar.surat-navbar-tablet .navbar-collapse .navbar-nav > * {
                width: 100%;
            }

            body.surat-route-page .navbar.surat-navbar-tablet .navbar-collapse .navbar-nav .nav-item,
            body.surat-route-page .navbar.surat-navbar-tablet .navbar-collapse .navbar-nav .dropdown,
            body.surat-route-page .navbar.surat-navbar-tablet .navbar-collapse .navbar-nav .dropdown-toggle {
                margin-left: 0 !important;
                padding-left: 0 !important;
            }

            body.surat-route-page .navbar.surat-navbar-tablet .navbar-collapse .navbar-nav .nav-link {
                margin-left: 0 !important;
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                min-height: 48px;
                padding: 0.85rem 1rem !important;
                border-radius: 14px;
                background: rgba(15, 23, 42, 0.04);
                border-bottom: 0 !important;
            }

            body.surat-route-page .navbar.surat-navbar-tablet .navbar-collapse .navbar-nav .nav-link.active::after {
                left: 1rem;
                right: 1rem;
                bottom: 0.35rem;
            }

            body.surat-route-page .navbar.surat-navbar-tablet .navbar-collapse .navbar-nav .dropdown-menu {
                position: static;
                inset: auto;
                width: 100%;
                margin-top: 0.35rem;
                box-shadow: none;
                background: #ffffff;
                border: 1px solid rgba(15, 23, 42, 0.14);
            }

            body.surat-route-page.surat-page-shell-dark .navbar.surat-navbar-tablet.navbar-transparent,
            body.surat-route-page.surat-page-shell-dark .navbar.surat-navbar-tablet .navbar-collapse.show,
            body.surat-route-page.surat-page-shell-dark .navbar.surat-navbar-tablet .navbar-collapse.collapsing,
            body.surat-route-page.surat-page-shell-dark .navbar.surat-navbar-tablet .navbar-collapse .navbar-nav .dropdown-menu {
                background: rgba(31, 33, 37, 0.98) !important;
                border-color: rgba(255, 255, 255, 0.1) !important;
                box-shadow: 0 18px 36px rgba(0, 0, 0, 0.24) !important;
            }

            body.surat-route-page.surat-page-shell-dark .navbar.surat-navbar-tablet .navbar-toggler {
                background: rgba(45, 49, 55, 0.96) !important;
                border-color: rgba(255, 255, 255, 0.12) !important;
                box-shadow: none !important;
            }

            body.surat-route-page.surat-page-shell-dark .navbar.surat-navbar-tablet .navbar-collapse .navbar-nav .nav-link {
                color: #ffffff !important;
                background: rgba(255, 255, 255, 0.03) !important;
            }

            body.surat-route-page.surat-primary-nav-open .surat-premium .advanced-quran-mobile-controls,
            body.surat-route-page.surat-primary-nav-open .surat-premium .advanced-quran-mobile-deep-focus-bar,
            body.surat-route-page.surat-primary-nav-open .surat-premium .quran-toolbar-sticky.quran-toolbar-fixed-shell,
            body.surat-route-page.surat-primary-nav-open .surat-premium .surah-scroll-top {
                opacity: 0 !important;
                pointer-events: none !important;
                transform: translateY(-10px) !important;
            }
        }
    </style>

</head>

<body @class(['surat-route-page' => $isSuratRoute, 'home-route-page' => $isHomeRoute, 'radio-route-page' => $isRadioRoute, 'content-route-page' => $isContentRoute, 'digital-library-route-page' => $isDigitalLibraryRoute, 'dua-route-page' => $isDuaRoute, 'seerah-route-page' => $isSeerahRoute, 'auth-route-page' => $isAuthRoute])>
    <script>
        (function() {
            try {
                var isSuratRoute = {{ $isSuratRoute ? 'true' : 'false' }};
                var root = document.documentElement;
                var body = document.body;
                var theme = root.getAttribute('data-bs-theme') || 'light';
                var suratTheme = isSuratRoute ? localStorage.getItem('suratThemeMode') : null;
                var isDark = theme === 'dark';
                var isSuratDark = suratTheme === 'dark' || (isSuratRoute && !suratTheme && isDark);

                body.classList.toggle('dark-mode', isDark);
                body.classList.toggle('surat-page-shell-dark', isSuratDark);
                body.setAttribute('data-bs-theme', theme);
                body.setAttribute('data-theme', theme);
                body.style.colorScheme = theme;
            } catch (e) {}
        })();
    </script>
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <div>
        <!-- Navbar -->
        <nav @class([
            'navbar',
            'navbar-light',
            'navbar-transparent',
            'fixed-top',
            'shadow-lg',
            'py-1',
            $isSuratRoute ? 'navbar-expand-xl surat-navbar-tablet' : 'navbar-expand-md',
        ]) role="navigation" aria-label="Primary">
            <div class="container-fluid">
                <a class="navbar-brand surat-brand-lockup" href="/welcome" data-path="/welcome" aria-label="Islamic Connect Home">
                    <span class="surat-brand-icon-stack" aria-hidden="true">
                        <img
                            src="/images/logo_black.png"
                            width="751"
                            height="770"
                            alt=""
                            loading="lazy"
                            class="surat-brand-icon surat-brand-icon--light">
                        <img
                            src="/images/logo_white.png"
                            width="751"
                            height="770"
                            alt=""
                            loading="lazy"
                            class="surat-brand-icon surat-brand-icon--dark">
                    </span>
                    <span class="surat-brand-wordmark" aria-hidden="true">
                        <img
                            src="/images/logo_wordmark.png"
                            width="751"
                            height="770"
                            alt=""
                            loading="lazy"
                            class="surat-brand-wordmark-img">
                    </span>
                    <span class="visually-hidden">Islamic Connect</span>
                </a>

                

                <button id="navbarToggler" class="navbar-toggler" type="button"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav justify-content-end pr-4 flex-grow-1" aria-label="Primary menu">
                        <li class="nav-item mt-2">
                            <a class="nav-link pt-2 ml-3 pl-3" href="/" data-path="/" data-nav-item="primary"><b>Home</b></a>
                        </li>
                        <!-- <li class="nav-item mt-2">
                            <button class="button-33" role="button" type="button" onclick="window.location.href='/ramadan-2026'">Ramadan 2026</button>
                        </li>  -->
                        <!--
                        <li class="nav-item mt-2">
                            <button class="button-33" role="button" type="button" onclick="window.location.href='/muslim'">Discover Islam</button>
                        </li> -->

                        <!-- <li class="nav-item mt-2">
                            <a class="nav-link pt-2 ml-3 button-91" href="/muslim" data-path="/muslim" data-nav-item="primary">Non-Muslim zone</a>
                        </li>-->
                       
                      
                        <!-- <li class="nav-item mt-2">
                            <a class="nav-link ml-3 pt-2 pl-3" href="/quran" data-path="/quran" data-nav-item="primary"><b>Quran Companion</b></a>
                        </li> -->

                        <li class="nav-item mt-2">
                            <a class="nav-link pt-2 ml-3" href="/surat" data-path="/surat" data-nav-item="primary"><b>Holy Quran</b></a>
                        </li>

                        <li class="nav-item mt-2">
                            <a class="nav-link ml-3 pt-2 pl-3" href="/mission" data-path="/mission" data-nav-item="primary"><b>Seerah Timeline</b></a>
                        </li>

                        <li class="nav-item mt-2">
                            <a class="nav-link ml-3 pt-2 pl-3" href="/radio" data-path="/radio" data-nav-item="primary"><b>Reciters Station</b></a>
                        </li>

                        <li class="nav-item mt-2">
                            <a class="nav-link ml-3 pt-2 pl-3" href="/content" data-path="/content" data-nav-item="primary"><b>Audio Podcasts</b></a>
                        </li>

                        <li class="nav-item mt-2">
                            <a class="nav-link ml-3 pt-2 pl-3" href="/digital-library" data-path="/digital-library" data-nav-item="primary"><b>Content Library</b></a>
                        </li>

	                        <li class="nav-item mt-2">
	                            <a class="nav-link ml-3 pt-2 pl-3" href="/dua" data-path="/dua" data-nav-item="primary"><b>Dua Collection</b></a>
	                        </li>                        

	                        @if($hasThemeToggle)
	                            <li class="nav-item mt-2 ms-2">
	                                <button id="globalThemeToggle" type="button" class="global-theme-toggle" aria-label="Toggle theme" aria-pressed="false">
	                                    <span class="global-theme-toggle__segments" aria-hidden="true">
	                                        <span class="global-theme-toggle__indicator"></span>
	                                        <span class="global-theme-toggle__segment global-theme-toggle__segment--light"><i class="bi bi-sun-fill" aria-hidden="true"></i></span>
	                                        <span class="global-theme-toggle__segment global-theme-toggle__segment--dark"><i class="bi bi-moon-stars-fill" aria-hidden="true"></i></span>
	                                    </span>
	                                </button>
	                            </li>
	                        @endif

	                        <!-- <button class="button" type="button" onclick="window.location.href='/ramadan-2026'" data-path="/ramadan-2026" data-nav-item="primary">
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
                                    fill="currentColor"
                                ></path>
                                <path
                                    d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM11 6.094l-.806 2.36a6 6 0 0 1-3.49 3.649l-.25.091l-2.36.806l2.36.806a6 6 0 0 1 3.649 3.49l.091.25l.806 2.36l.806-2.36a6 6 0 0 1 3.49-3.649l.25-.09l2.36-.807l-2.36-.806a6 6 0 0 1-3.649-3.49l-.09-.25zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2"
                                    fill="currentColor"
                                ></path>
                                </g>
                            </svg>
                            Ramadan Guide
                            <div class="hoverEffect" data-path="/ramadan-2026" data-nav-item="primary">
                                <div></div>
                            </div>
                        </button> -->

                        <!-- <li class="nav-item mt-2">
                            <a class="nav-link ml-3 pt-2 pl-3" href="/resource" data-path="/resource" data-nav-item="primary"><b>Resources</b></a>
                        </li> -->

                        <!-- <li class="nav-item mt-2">
                            <a class="nav-link pt-2 ml-3 pl-3" href="/support" data-path="/support" data-nav-item="primary"><b>Donations</b></a>
                        </li> -->

                        <!-- <li class="nav-item mt-2">
                            <a class="nav-link pt-2 ml-3 pl-3" href="/about" data-path="/about" data-nav-item="primary">About Us</a>
                        </li> -->

                        @guest
                            @if (Route::has('login'))
                        <li class="nav-item mt-2">
                            <a class="nav-link pt-2" href="{{ route('login', ['redirect' => request()->getRequestUri()]) }}" data-path="/login" data-nav-item="primary"><b>{{ __('Login') }}</b></a>
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
                                <!-- <a class="dropdown-item" role="menuitem" href="/bookmarks">Bookmarks</a>-->
                                <!-- <a class="dropdown-item" role="menuitem" href="/notes">Notes & Reflections</a> 
                                <a class="dropdown-item" role="menuitem" href="/profile">Profile</a>  -->
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
                <select id="adminSectionSelect" class="form-select" aria-label="Go to section">
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
    <script defer src="{{ $manifestJsSrc }}"></script>
    <script defer src="{{ $vendorJsSrc }}"></script>
    <script defer src="{{ $appJsSrc }}"></script>
	    <script>
	        document.addEventListener('DOMContentLoaded', () => {
	            // Global theme toggle for supported routes only: /, /home, /surat, /radio, /content, /digital-library, /dua, /seerah
	            try {
	                const toggleBtn = document.getElementById('globalThemeToggle');
	                if (toggleBtn) {
	                    const root = document.documentElement;
	                    const body = document.body;
	                    const ROUTE_DARK_BG = '#232529';
	                    let themeTransitionTimer = null;
	                    const routeSurfaceClasses = [
	                        'radio-route-page',
	                        'content-route-page',
	                        'digital-library-route-page',
	                        'dua-route-page',
	                        'seerah-route-page',
	                    ];

	                    const getTheme = () => (root.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light');
	                    const isRouteSurfacePage = () => {
	                        if (!body) return false;
	                        return routeSurfaceClasses.some((className) => body.classList.contains(className));
	                    };
	                    const applyRouteBackground = (isDark) => {
	                        const background = isDark && isRouteSurfacePage() ? ROUTE_DARK_BG : '';
	                        root.style.backgroundColor = background;
	                        if (body) {
	                            body.style.backgroundColor = background;
	                        }
	                    };
	                    const getStoredTheme = () => {
	                        const storedDarkMode = localStorage.getItem('darkMode');
	                        const storedSuratTheme = localStorage.getItem('suratThemeMode');
	                        const storedRadioTheme = localStorage.getItem('radioThemeMode');
	                        if (storedDarkMode !== null && storedDarkMode !== undefined && storedDarkMode !== '') {
	                            return storedDarkMode === 'true' ? 'dark' : 'light';
	                        }
	                        if (storedSuratTheme === 'dark' || storedRadioTheme === 'dark') {
	                            return 'dark';
	                        }
	                        return 'light';
	                    };
	                    const updateToggleUI = (theme) => {
	                        const isDark = theme === 'dark';
	                        toggleBtn.classList.toggle('is-dark', isDark);
	                        toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
	                        toggleBtn.setAttribute('aria-pressed', String(isDark));
	                    };
	                    const prefersReducedMotion = () => {
	                        try {
	                            return typeof window.matchMedia === 'function'
	                                && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	                        } catch (e) {
	                            return false;
	                        }
	                    };
	                    const clearThemeTransition = () => {
	                        root.classList.remove('theme-transitioning');
	                        body?.classList.remove('theme-transitioning');
	                        if (themeTransitionTimer) {
	                            clearTimeout(themeTransitionTimer);
	                            themeTransitionTimer = null;
	                        }
	                    };
	                    const beginThemeTransition = () => {
	                        if (prefersReducedMotion()) {
	                            clearThemeTransition();
	                            return;
	                        }
	                        if (themeTransitionTimer) {
	                            clearTimeout(themeTransitionTimer);
	                        }
	                        root.classList.add('theme-transitioning');
	                        body?.classList.add('theme-transitioning');
	                        themeTransitionTimer = window.setTimeout(() => {
	                            clearThemeTransition();
	                        }, 280);
	                    };

	                    const applyTheme = (theme) => {
	                        const isDark = theme === 'dark';
	                        beginThemeTransition();
	                        root.classList.toggle('dark-mode', isDark);
	                        root.setAttribute('data-bs-theme', theme);
	                        root.setAttribute('data-theme', theme);
	                        root.style.colorScheme = theme;

	                        if (body) {
	                            body.classList.toggle('dark-mode', isDark);
	                            body.setAttribute('data-bs-theme', theme);
	                            body.setAttribute('data-theme', theme);
	                            body.style.colorScheme = theme;
	                        }

	                        // Surat uses an extra shell class for the navbar + layout polish
	                        if (body && body.classList.contains('surat-route-page')) {
	                            body.classList.toggle('surat-page-shell-dark', isDark);
	                            try { localStorage.setItem('suratThemeMode', theme); } catch (e) {}
	                        } else {
	                            try { localStorage.setItem('suratThemeMode', theme); } catch (e) {}
	                        }

	                        // Home uses boolean darkMode storage
	                        try { localStorage.setItem('darkMode', String(isDark)); } catch (e) {}
	                        // Radio uses explicit dark/light storage
	                        try { localStorage.setItem('radioThemeMode', theme); } catch (e) {}

	                        applyRouteBackground(isDark);

	                        try {
	                            window.dispatchEvent(new CustomEvent('ic-theme-change', { detail: { theme, isDark } }));
	                        } catch (e) {}

	                        updateToggleUI(theme);
	                    };

	                    window.IC_THEME = {
	                        getTheme,
	                        setTheme: applyTheme,
	                        toggle: () => applyTheme(getTheme() === 'dark' ? 'light' : 'dark'),
	                    };

	                    updateToggleUI(getTheme());
	                    applyRouteBackground(getTheme() === 'dark');
	                    toggleBtn.addEventListener('click', () => window.IC_THEME.toggle());
	                    window.addEventListener('storage', (event) => {
	                        if (!event || !['darkMode', 'suratThemeMode', 'radioThemeMode'].includes(event.key)) return;
	                        const nextTheme = getStoredTheme();
	                        if (nextTheme === getTheme()) {
	                            updateToggleUI(nextTheme);
	                            applyRouteBackground(nextTheme === 'dark');
	                            return;
	                        }
	                        applyTheme(nextTheme);
	                    });
	                }
	            } catch (e) {}

	            const primaryNavItems = document.querySelectorAll('ul[aria-label="Primary menu"] [data-nav-item="primary"]');
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
                '/revert': '/digital-library',
                '/resource': '/digital-library',
                '/about': '/',
                '/welcome': '/',
                // Quran routes
                '/holy': '/quran',
                '/quran': '/quran',
                '/surat': '/surat',
                '/history': '/surat',
                '/about': '/about',
                // Media center (user-specified)
                '/media': '/media',
                '/content': '/media',
                '/digital-library': '/digital-library',
                '/streaming': '/media',
                '/radio': '/media',
                '/gallery': '/media',
                '/ai': '/media',
                '/video': '/media',
                // Knowledge (user-specified)
                '/knowledge': '/knowledge',
                '/mission': '/knowledge',
                '/seerah': '/knowledge',
                '/name': '/knowledge',
                '/guide': '/digital-library',
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
                '/muslim': '/digital-library',
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

            const links = Array.from(primaryNavItems).filter(el => el.dataset && typeof el.dataset.path === 'string');
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
<style scoped>
/* From Uiverse.io by mi-series */
.ramadan-cta .ramadan-cta__button {
  outline: 0;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background: #40B3A2;
  min-width: 200px;
  border: 0;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, .1);
  box-sizing: border-box;
  padding: 12px 16px;
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  overflow: hidden;
  cursor: pointer;
}

.ramadan-cta .ramadan-cta__button:hover {
  opacity: .95;
}

.ramadan-cta .ramadan-cta__pulse {
  border-radius: 100%;
  animation: ramadan-cta-ripple 0.6s linear infinite;
}

@keyframes ramadan-cta-ripple {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.1), 0 0 0 20px rgba(255, 255, 255, 0.1), 0 0 0 40px rgba(255, 255, 255, 0.1), 0 0 0 60px rgba(255, 255, 255, 0.1);
  }

  100% {
    box-shadow: 0 0 0 20px rgba(255, 255, 255, 0.1), 0 0 0 40px rgba(255, 255, 255, 0.1), 0 0 0 60px rgba(255, 255, 255, 0.1), 0 0 0 80px rgba(255, 255, 255, 0);
  }
}


/* Primary navigation highlight states */
.navbar-nav .nav-link {
  position: relative;
  transition: color 0.2s ease;
  color: #121212;
}

@media (min-width: 992px) {
  .navbar-nav .nav-link {
    white-space: nowrap;
    padding-inline: 0.55rem;
  }
}

.navbar-nav .nav-link.active {
  color: #121212;
  font-weight: 600;
}
.navbar-nav .nav-link.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.35rem;
  height: 3px;
  border-radius: 99px;
  background: linear-gradient(90deg, #0f62fe, #6f42c1, #f45b69);
}
.navbar-nav .nav-link:hover:not(.active) {
  color: #121212;
}

/* Surat desktop toolbar: wrap controls so they don't overflow off-screen */
@media (min-width: 992px) {
  body.surat-route-page .surat-premium:not(.mobile-compact-layout) .quran-toolbar-sticky.quran-toolbar-fixed-shell .quran-toolbar.quran-toolbar-reader {
    flex-wrap: wrap !important;
    overflow-x: visible !important;
    justify-content: flex-start !important;
    row-gap: 0.52rem !important;
  }

  body.surat-route-page .surat-premium:not(.mobile-compact-layout) .quran-toolbar-sticky.quran-toolbar-fixed-shell .quran-toolbar.quran-toolbar-reader .quran-toolbar-reciter {
    flex: 1 1 360px !important;
    min-width: 260px !important;
    max-width: none !important;
  }
}

@media (max-width: 1280px) {
  body.surat-route-page .surat-premium:not(.mobile-compact-layout) .quran-toolbar-sticky.quran-toolbar-fixed-shell .quran-toolbar.quran-toolbar-reader .quran-toolbar-btn-text {
    display: none !important;
  }
}

@media (max-width: 991.98px) {
  body.surat-route-page .surat-premium .quran-toolbar.quran-toolbar-reader {
    justify-content: flex-start;
  }

  body.surat-route-page .surat-premium .quran-toolbar.quran-toolbar-reader .quran-toolbar-reciter {
    flex-basis: 100% !important;
    min-width: 0 !important;
    max-width: none !important;
  }
}

.button[data-nav-item="primary"] {
  position: relative;
  transition: color 0.2s ease;
}
.button[data-nav-item="primary"]::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.35rem;
  height: 3px;
  border-radius: 99px;
  background: linear-gradient(90deg, #0f62fe, #6f42c1, #f45b69);
  opacity: 0;
  transition: opacity 0.2s ease;
}
.button[data-nav-item="primary"].active::after {
  opacity: 1;
}

</style>
