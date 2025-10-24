<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="description" content="Welcome to Islamic Connect, your hub for Islamic teachings, Quranic resources, podcasts, and AI-powered accessibility tools. Explore our website for educational content, community engagement, and more.">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="stripe-key" content="{{ config('services.stripe.key') }}">
    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- CSS Assets -->
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/css/adminlte.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="icon" type="image/x-icon" href="{{ asset('images/favicon.ico') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Analytics -->
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
        function gtag(){ dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-QWLL07EBX9');
    </script>
    @yield('critical')
    @stack('critical')

    <style>



.nav-link{
  color:#212529; /* Bootstrap body color: high contrast on light bg */
}
.nav-link:hover{
  color:#0b5d4b; /* darker teal for 4.5:1 contrast */
  transition: color 0.3s ease;
}

/* Ensure navbar links maintain sufficient contrast on .navbar-light */
.navbar-light .navbar-nav .nav-link{
  color:#212529 !important;
}
.navbar-light .navbar-nav .nav-link:focus,
.navbar-light .navbar-nav .nav-link:hover{
  color:#0b5d4b !important;
}
.navbar-light .navbar-nav .nav-link.active,
.navbar-light .navbar-nav .show > .nav-link{
  color:#0b5d4b !important;
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

.nav-link { text-decoration: none; }

body{
    padding-top: 70px;
}

/* Screen-reader utilities */
.sr-only{
    position:absolute;
    width:1px;
    height:1px;
    padding:0;
    margin:-1px;
    overflow:hidden;
    clip:rect(0,0,0,0);
    white-space:nowrap;
    border:0;
}
.sr-only-focusable:active,.sr-only-focusable:focus{
    position:static;
    width:auto;
    height:auto;
    margin:0;
    overflow:visible;
    clip:auto;
    white-space:normal;
}

/* Skip link */
.skip-to-content{
    position:absolute;
    top:-40px;
    left:8px;
    background:#fff;
    color:#000;
    padding:8px 12px;
    z-index:10000;
    border-radius:6px;
    box-shadow:0 2px 6px rgba(0,0,0,0.2);
}
.skip-to-content:focus{
    top:8px;
}

/* Focus visibility */
:focus-visible{
    outline:3px solid #0b5d4b; /* higher contrast focus outline */
    outline-offset:2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce){
    *{
        animation-duration:0.001ms !important;
        animation-iteration-count:1 !important;
        transition-duration:0.001ms !important;
        scroll-behavior:auto !important;
    }
}

/* Class-driven reduced motion (user preference) */
.reduced-motion *{
    animation-duration:0.001ms !important;
    animation-iteration-count:1 !important;
    transition-duration:0.001ms !important;
    scroll-behavior:auto !important;
}

/* High contrast mode */
.high-contrast body{
    background-color:#ffffff !important;
    color:#000000 !important;
}
.high-contrast a,.high-contrast .nav-link{
    color:#004085 !important;
}
.high-contrast a:focus-visible,
.high-contrast button:focus-visible,
.high-contrast [role="button"]:focus-visible{
    outline:3px solid #000 !important;
}
.high-contrast .btn-primary{
    background-color:#0d6efd !important;
    border-color:#0d6efd !important;
    color:#fff !important;
}
.a11y-toggle{
    position:fixed;
    right:16px;
    bottom:16px;
    z-index:1100;
}
.a11y-panel{
    position:fixed;
    right:16px;
    bottom:64px;
    width:280px;
    max-width:90vw;
    background:#fff;
    border-radius:10px;
    box-shadow:0 8px 24px rgba(0,0,0,.2);
    z-index:1100;
}
.a11y-panel header{
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:10px 12px;
    border-bottom:1px solid #e5e7eb;
}
.a11y-panel .content{ padding:12px; }
.a11y-panel[hidden]{ display:none; }
/* Custom Styles */
.custom-nav {
    display: flex;
    direction: rtl; /* Right-to-left scrolling direction */
    overflow-x: auto; /* Enable horizontal scrolling */
    overflow-y: hidden; /* Prevent vertical scrolling */
    max-width: 100%; /* Adjust to the container's width */
    white-space: nowrap; /* Prevent items from wrapping to next line */
    background-color:rgba(0, 0, 0, 0.21); /* Light background color */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Medium shadow */
    padding: 10px; /* Adjust padding for spacing */
    gap: 15px; /* Space between items */
    margin: 0;
    border-radius: 8px; /* Rounded corners for aesthetic */
    height: 60px; /* Adjust height for proper alignment */
    scrollbar-width: thin; /* Thin scrollbar for Firefox */
    -ms-overflow-style: none; /* Remove scrollbar for IE and Edge */
}

/* Custom scrollbar for WebKit browsers (Chrome, Safari) */
.custom-nav::-webkit-scrollbar {
    height: 8px; /* Horizontal scrollbar height */
}

.custom-nav::-webkit-scrollbar-thumb {
    background-color: #cccccc;
    border-radius: 4px;
}

.nav-item {
    display: inline-block; /* Ensure items are displayed in a row */
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
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
  justify-content: center; /* Center the links */
  list-style: none; /* Remove bullet points */
  padding: 0;
  margin: 0;
}

.responsive-nav .nav-item {
  margin: 5px; /* Add some spacing between items */
}

.responsive-nav .nav-link {
  padding: 10px 15px; /* Adjust padding as needed */
  text-decoration: none; /* Remove underlines from links */
  color: #333; /* Set link color */
  border-radius: 5px; /* Add rounded corners (optional) */
}

.responsive-nav .nav-link:hover {
  background-color: #f0f0f0; /* Add hover effect (optional) */
}

/* Media query for smaller screens (e.g., mobile) */
@media (max-width: 768px) {
  .responsive-nav {
    flex-direction: column; /* Stack links vertically */
    align-items: center; /* Center links horizontally */
  }

  .responsive-nav .nav-item {
    width: 100%; /* Make each item take full width */
    text-align: center; /* Center text within items */
    margin: 5px 0; /* Adjust margin for vertical spacing */
  }
}
.nav-link.active {
    font-weight: 600;
    color: #0b5d4b; /* High-contrast highlight */
    border-bottom: 2px solid #0b5d4b; /* Optional underline */
    transition: color 0.3s ease, border-bottom 0.3s ease;
}

/* Uniform alignment for collapsed mobile menu */
@media (max-width: 767.98px) {
  .navbar-collapse .navbar-nav .nav-item {
    margin-left: 0 !important;
    padding-left: 0 !important; /* neutralize any pl-* utilities on li (e.g., Login) */
  }
  .navbar-collapse .navbar-nav .nav-link {
    margin-left: 0 !important; /* neutralize any ml-* utilities */
    padding-left: 1.25rem !important; /* consistent indent */
  }
  /* Ensure user dropdown toggle aligns identically */
  .navbar-collapse .navbar-nav .dropdown,
  .navbar-collapse .navbar-nav .dropdown-toggle {
    margin-left: 0 !important;
    padding-left: 1.25rem !important;
  }
  .navbar-collapse .navbar-nav .dropdown-toggle .bi {
    margin-right: .5rem; /* breathing room between icon and name */
  }

  /* Make sure the hamburger stays above the expanded menu on iOS Safari */
  .navbar .navbar-toggler {
    position: relative;
    z-index: 1060; /* above collapse content */
  }
  .navbar .navbar-collapse {
    position: relative;
    z-index: 1000;
  }
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
                class="img-fluid"
            >
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
                    <li class="nav-item dropdown pl-3">
                        <a id="navbarDropdown" class="nav-link dropdown-toggle pt-2" href="#" role="button"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="User menu" data-nav-item="primary" v-pre>
                            <i class="bi bi-person-circle pr-2" style="font-size: 1.8rem"></i>
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
        <!-- Main Content -->
        <main id="main-content" role="main" tabindex="-1">
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
            const navLinks = document.querySelectorAll('.nav-link');
            // Ensure hamburger toggler controls the collapse reliably
            try {
                const toggler = document.getElementById('navbarToggler') || document.querySelector('.navbar-toggler');
                const collapseEl = document.getElementById('navbarSupportedContent');
                if (collapseEl && window.bootstrap) {
                    // Create a single Collapse controller; we removed data-bs-* on the button to avoid double toggles
                    const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false });

                    const setExpanded = (expanded) => {
                        if (toggler) {
                            toggler.classList.toggle('collapsed', !expanded);
                            toggler.setAttribute('aria-expanded', expanded ? 'true' : 'false');
                        }
                    };
                    // Toggle open/close when pressing the burger
                    if (toggler){
                        toggler.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const isShown = collapseEl.classList.contains('show');
                            isShown ? bsCollapse.hide() : bsCollapse.show();
                        }, { passive: true });
                    }

                    // Close the menu only for plain nav links (not dropdown toggles)
                    collapseEl.querySelectorAll('a.nav-link:not(.dropdown-toggle), .dropdown-item').forEach(a => {
                        a.addEventListener('click', () => {
                            if (window.innerWidth < 768) {
                                bsCollapse.hide();
                            }
                        });
                    });

                    // Keep aria-expanded in sync with collapse events
                    collapseEl.addEventListener('shown.bs.collapse', () => setExpanded(true));
                    collapseEl.addEventListener('hidden.bs.collapse', () => setExpanded(false));
                }
            } catch(_) { /* ignore */ }
        
            // Highlight the active link based on the current page or localStorage
            const currentPath = localStorage.getItem('activeNav') || window.location.pathname;
        
            navLinks.forEach(link => {
                if (link.dataset.path === currentPath) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                } else {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                }
        
                // Add click event listener to update localStorage
                link.addEventListener('click', () => {
                    localStorage.setItem('activeNav', link.dataset.path);
                });
            });

            // Keyboard navigation across top-level menu items (Left/Right)
            const menuItems = Array.from(document.querySelectorAll('[data-nav-item="primary"]'));
            const menubar = document.querySelector('ul[aria-label="Primary menu"]');
            if (menubar && menuItems.length){
                menubar.addEventListener('keydown', (e) => {
                    const currentIndex = menuItems.indexOf(document.activeElement);
                    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
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
            if (dropdownToggle){
                dropdownToggle.addEventListener('shown.bs.dropdown', () => dropdownToggle.setAttribute('aria-expanded', 'true'));
                dropdownToggle.addEventListener('hidden.bs.dropdown', () => dropdownToggle.setAttribute('aria-expanded', 'false'));
                dropdownToggle.addEventListener('keydown', (e) => {
                    if (e.key === ' ' || e.key === 'Enter'){
                        e.preventDefault();
                        dropdownToggle.click();
                    }
                    if (e.key === 'Escape'){
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
            if (hcToggle){
                hcToggle.checked = highContrast;
                hcToggle.addEventListener('change', () => {
                    root.classList.toggle('high-contrast', hcToggle.checked);
                    localStorage.setItem('a11y_high_contrast', hcToggle.checked);
                });
            }
            if (rmToggle){
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
            if (openBtn && panel){
                openBtn.addEventListener('click', () => {
                    panel.hidden = false;
                    panel.querySelector('h3')?.focus();
                });
            }
            if (closeBtn && panel){
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
        window.addEventListener('load', function(){
            if (window.axe){
                axe.run().then(results => {
                    if (results && results.violations && results.violations.length){
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
