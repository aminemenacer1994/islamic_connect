<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="description" content="Welcome to Islamic Connect, your hub for Islamic teachings, Quranic resources, podcasts, and AI-powered accessibility tools. Explore our website for educational content, community engagement, and more.">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- CSS Assets -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/css/adminlte.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="icon" type="image/x-icon" href="{{ asset('images/favicon.ico') }}">

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
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-QWLL07EBX9"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-QWLL07EBX9');
    </script>
</head>
<style>

/* CSS */
.button-36 {
    background-image: linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%);
    border-radius: 8px;
    border: none;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: "Inter UI", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 17px;
    height: 2.4rem;
    min-width: 130px; /* Avoid layout shifts */
    padding: 0 1.6rem;
    text-align: center;
    text-shadow: rgba(0, 0, 0, 0.25) 0 3px 8px;
    transition: all 0.5s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

.button-36:hover {
    background-image: linear-gradient(92.88deg, #5643CC 9.16%, #455EB5 43.89%, #673FD7 64.72%);
    transform: scale(1.05);
}

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
</style>
<body>
    <div id="app">
        <!-- Navbar -->
    <nav class="navbar navbar-expand-md navbar-light bg-light shadow-sm py-1">
    <div class="container-fluid">
    <a class="navbar-brand" href="{{ url('/welcome') }}" aria-label="Home">
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
                    <h6><a class="nav-link ml-3 pl-3" href="/welcome" data-path="/welcome"><b>Home</b></a></h6>
                </li>
                <li class="nav-item mt-3">
                    <h6><a class="nav-link ml-3 pl-3" href="/quran" data-path="/quran"><b>Quran</b></a></h6>
                </li>
                <li class="nav-item mt-3">
                    <h6><a class="nav-link ml-3 pl-3" href="/content"><b>Audio Podcasts</b></a></h6>
                </li> 
                {{-- <li class="nav-item mt-3">
                    <h6><a class="nav-link  ml-3 pl-3" href="/about"><b>About Us</b></a></h6>
                </li> --}}
                <li class="nav-item mt-3">
                    <h6><a class="nav-link ml-3 pl-3" href="/mission" data-path="/mission"><b>About Us</b></a></h6>
                </li>
                {{-- <li class="nav-item mt-3">
                    <h6><a class="nav-link ml-3 pl-3" href="/faq"><b>Prayer times</b></a></h6>
                </li> --}}
                <!-- <li class="nav-item mt-3">
                    <h6><a class="nav-link  ml-3 pl-3" href="/join_us"><b>Mailing list</b></a></h6>
                </li> -->
                <li class="nav-item mt-3">
                    <h6><a class="nav-link  ml-3 pl-3" href="/pricing" data-path="/pricing"><b>Pricings</b></a></h6>
                </li>
                <li class="nav-item mt-3">
                    <h6><a class="nav-link  ml-3 pl-3" href="/updates" data-path="/updates"><b>Updates</b></a></h6>
                </li>
                {{-- <li class="nav-item mt-3">
                    <h6><a class="nav-link  ml-3 pl-3 pr-3" href="/support"><b>Donation</b></a></h6>
                </li> --}}
                <!-- <dark-mode-component></dark-mode-component> -->
                
                @guest
                @if (Route::has('login'))
                <li class="nav-item display-6 pl-3 mt-3">
                    <h6><a class="nav-link " href="{{ route('login') }}" data-path="/login"><b>{{ __('Login') }}</b></a></h6>
                </li>
                @endif
                @if (Route::has('register'))
                <li class="nav-item display-6 pl-3 mt-3">
                    <h6><a class="nav-link " href="{{ route('register') }}" data-path="/register"><b>{{ __('Register') }}</b></a></h6>
                </li>
                @endif
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
                {{-- <li class="pl-4 pb-2 pt-3"> 
                    <button class="button-36" role="button">
                        <span>
                            <strong>
                                <a href="/pricing" style="color: white; text-decoration: none; cursor:pointer">Try Premium</a>
                            </strong>
                        </span>
                    </button>
                </li> --}}
            </ul>
        </div>
    </div>
</nav>


        <!-- Main Content -->
        <main>
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
        });
    </script>
        
</body>
</html>

<!-- Custom Styles -->
<style>
.nav-link.active {
    font-weight: bold;
    color: rgb(53, 163, 139); /* Highlight color */
    border-bottom: 2px solid rgb(53, 163, 139); /* Optional underline */
    transition: color 0.3s ease, border-bottom 0.3s ease;
}
</style>

