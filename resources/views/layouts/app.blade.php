<!DOCTYPE html>
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
        $metaTitle = trim($__env->yieldContent('meta_title', 'Islamic Connect — Accessible Quran & Community Tools'));
        $metaDescription = trim(
            $__env->yieldContent(
                'meta_description',
                'Islamic Connect delivers accessible Quran study, dua guidance, and community tools for Muslims seeking clarity and service.'
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
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <link rel="stylesheet" href="{{ mix('css/layout.css') }}">
    <link rel="icon" type="image/png" sizes="256x256" href="{{ asset('images/logo_black.png') }}">
    <link rel="icon" type="image/png" sizes="256x256" href="{{ asset('images/logo_black.png') }}" media="(prefers-color-scheme: light)">
    <link rel="icon" type="image/png" sizes="256x256" href="{{ asset('images/logo_white.png') }}" media="(prefers-color-scheme: dark)">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('images/logo_main.png') }}">
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

                        <!-- <li class="nav-item mt-2">
                            <a class="nav-link ml-3 pt-2 pl-3" href="/subscribe" data-path="/subscribe" data-nav-item="primary">Packages</a>
                        </li> -->

                        <li class="nav-item mt-2">
                            <a class="nav-link pt-2 ml-3 pl-3" href="/support" data-path="/support" data-nav-item="primary">Donations</a>
                        </li>

                        <!-- <li class="nav-item mt-2">
                            <a class="nav-link pt-2 ml-3 pl-3" href="/bookmarks" data-path="/bookmarks" data-nav-item="primary">Bookmarks</a>
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

</html>
