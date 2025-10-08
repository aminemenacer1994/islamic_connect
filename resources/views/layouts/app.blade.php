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
</head>
<style>



.nav-link:hover{
  color: rgb(53, 163, 139);
  transition: color 0.3s ease;
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
    color: black;
    text-decoration: none;
}

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
    outline:3px solid #35a38b;
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
</style>
<body>
    <a class="skip-to-content" href="#main-content">Skip to main content</a>
    <div id="app">
        <!-- Navbar -->
    <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top shadow-sm py-1">
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

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>   
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav justify-content-end pr-4 flex-grow-1">                
                    <li class="nav-item mt-3">
                        <h6><a class="nav-link pt-2 ml-3" href="/welcome" data-path="/home"><b style="color:black">Home</b></a></h6>
                    </li>
                    <!-- <li class="nav-item dropdown pt-3 pl-3">
                        <a class="nav-link dropdown-toggle" href="/holy" role="button" data-bs-toggle="dropdown" aria-expanded="false" onclick="event.preventDefault();">
                            <b style="color:black">Holy Quran</b>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/quran">Companion</a></li>
                            <li><a class="dropdown-item" href="/surat">Explorer</a></li>
                        </ul>
                    </li> -->

                    <li class="nav-item mt-3">
                        <h6><a class="nav-link pt-2 ml-3 pl-3" href="/holy" data-path="/holy"><b style="color:black">Quran Portal</b></a></h6>
                    </li>
                    
                    <li class="nav-item mt-3">
                        <h6><a class="nav-link pt-2 ml-3 pl-3" href="/media" data-path="/media"><b style="color:black">Media Center</b></a></h6>
                    </li>

                    <li class="nav-item mt-3">
                        <h6><a class="nav-link pt-2 ml-3 pl-3" href="/knowledge" data-path="/knowledge"><b style="color:black">Islamic Knowledge</b></a></h6>
                    </li>
                    
                    <li class="nav-item mt-3">
                        <h6><a class="nav-link pt-2 ml-3 pl-3" href="/toolkit" data-path="/toolkit"><b style="color:black">Utility Toolkit</b></a></h6>
                    </li>

                    <li class="nav-item mt-3">
                        <h6><a class="nav-link pt-2 ml-3 pl-3" href="/services" data-path="/services"><b style="color:black">Services</b></a></h6>
                    </li>

                    <li class="nav-item mt-3">
                        <h6><a class="nav-link pt-2 ml-3 pl-3" href="/subscribe" data-path="/subscribe"><b style="color:black">Packages</b></a></h6>
                    </li>

                    <li class="nav-item mt-3">
                        <h6><a class="nav-link pt-2 ml-3 pl-3" href="/support" data-path="/pricing"><b style="color:black">Donations</b></a></h6>
                    </li>
                                    
                    @guest
                    @if (Route::has('login'))
                    <li class="nav-item display-6 pl-3 mt-3">
                        <h6><a class="nav-link pt-2 " href="{{ route('login') }}" data-path="/login"><b style="color:black">{{ __('Login') }}</b></a></h6>
                    </li>
                    @endif
                    <!-- @if (Route::has('register'))
                    <li class="nav-item display-6 pl-3 mt-3">
                        <h6><a class="nav-link pt-2" href="{{ route('register') }}" data-path="/register"><b style="color:black">{{ __('Register') }}</b></a></h6>
                    </li>
                    @endif -->
                    @else
                    <li class="nav-item dropdown pl-3">
                        <a id="navbarDropdown" class="nav-link dropdown-toggle " href="#" role="button"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                            <i class="bi bi-person-circle pr-2" style="font-size: 1.8rem"></i>
                            {{ Auth::user()->name }}
                        </a>
                        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="/bookmarks">Bookmarks</a>
                            <a class="dropdown-item" href="/notes">Notes & Reflections</a>
                            <a class="dropdown-item" href="/profile">Profile</a>
                            <a class="dropdown-item" href="{{ route('logout') }}"
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
            @yield('content')
        </main>
    </div>

    <!-- Scripts -->
    <script src="{{ mix('js/app.js') }}"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const navLinks = document.querySelectorAll('.nav-link');
        
            // Highlight the active link based on the current page or localStorage
            const currentPath = localStorage.getItem('activeNav') || window.location.pathname;
        
            navLinks.forEach(link => {
                if (link.dataset.path === currentPath) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
        
                // Add click event listener to update localStorage
                link.addEventListener('click', () => {
                    localStorage.setItem('activeNav', link.dataset.path);
                });
            });

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
    
    <!-- Accessibility floating controls
    <button id="a11yOpen" class="btn btn-light a11y-toggle" type="button" aria-haspopup="dialog" aria-controls="a11yPanel" aria-expanded="false">
        <i class="bi bi-universal-access"></i> Accessibility
    </button>
    <section id="a11yPanel" class="a11y-panel" role="dialog" aria-modal="true" aria-labelledby="a11yTitle" hidden>
        <header>
            <h3 id="a11yTitle" class="m-0">Accessibility</h3>
            <button id="a11yClose" class="btn btn-sm btn-outline-secondary" type="button" aria-label="Close accessibility settings">
                <i class="bi bi-x"></i>
            </button>
        </header>
        <div class="content">
            <div class="form-check form-switch mb-2">
                <input class="form-check-input" type="checkbox" id="a11yHighContrast">
                <label class="form-check-label" for="a11yHighContrast">High contrast mode</label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="a11yReducedMotion">
                <label class="form-check-label" for="a11yReducedMotion">Reduce motion</label>
            </div>
        </div>
    </section> -->

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

<!-- Custom Styles -->
<style >
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
    font-weight: bold;
    color: rgb(53, 163, 139); /* Highlight color */
    border-bottom: 2px solid rgb(53, 163, 139); /* Optional underline */
    transition: color 0.3s ease, border-bottom 0.3s ease;
}
</style>

