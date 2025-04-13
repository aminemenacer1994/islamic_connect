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
                        <h6><a class="nav-link pt-2 ml-3" href="/welcome" data-path="/welcome"><b style="color:black">Home</b></a></h6>
                    </li>
                    <li class="nav-item dropdown pt-3 pl-3">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" onclick="event.preventDefault();">
                            <b style="color:black">Holy Quran</b>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/quran">Companion</a></li>
                            <li><a class="dropdown-item" href="/surat">Explorer</a></li>
                        </ul>
                    </li>
                    <!-- <li class="nav-item mt-3">
                        <h6><a class="nav-link ml-3 pl-3" href="/quran" data-path="/quran"><b style="color:black">Quran Companion</b></a></h6>
                    </li>
                    <li class="nav-item mt-3">
                        <h6><a class="nav-link ml-3 pl-3" href="/surat" data-path="/surat"><b style="color:black">Quran Explorer</b></a></h6>
                    </li> -->

                    <li class="nav-item dropdown pt-3 pl-3">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" onclick="event.preventDefault();">
                            <b style="color:black">Audio Center</b>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/content">Audio Podcasts</a></li>
                            <li><a class="dropdown-item" href="/radio">Radio Stations</a></li>
                        </ul>
                    </li>

                    <li class="nav-item mt-3">
                        <h6><a class="nav-link pt-2 ml-3 pl-2" href="/mission" data-path="/seerah"><b style="color:black">Seerah Timeline</b></a></h6>
                    </li> 
                    <li class="nav-item mt-3">
                        <h6><a class="nav-link pt-2 ml-3 pl-3" href="/dua" data-path="/dua"><b style="color:black">Dua Collection</b></a></h6>
                    </li>
                    <li class="nav-item mt-3">
                        <h6><a class="nav-link pt-2 ml-3 pl-3" href="/ai" data-path="/ai"><b style="color:black">Islamic Gallery</b></a></h6>
                    </li>
                    <li class="nav-item mt-3">
                        <h6><a class="nav-link pt-2 ml-3 pl-3" href="/guide" data-path="/guide"><b style="color:black">Islamic Guides</b></a></h6>
                    </li>
                    <!-- <li class="nav-item mt-3">
                        <h6><a class="nav-link  ml-3 pl-3" href="/group_notes" data-path="/group_notes"><b>Community Board</b></a></h6>
                    </li> -->
                    <!-- <li class="nav-item mt-3">
                        <h6><a class="nav-link ml-3 pl-3" href="/mission" data-path="/mission"><b>About Us</b></a></h6>
                    </li> -->
                    <li class="nav-item mt-3">
                        <h6><a class="nav-link pt-2 ml-3 pl-3" href="/pricing" data-path="/pricing"><b style="color:black">Donations</b></a></h6>
                    </li>
                                    
                    @guest
                    @if (Route::has('login'))
                    <li class="nav-item display-6 pl-3 mt-3">
                        <h6><a class="nav-link pt-2 " href="{{ route('login') }}" data-path="/login"><b style="color:black">{{ __('Login') }}</b></a></h6>
                    </li>
                    @endif
                    <!-- @if (Route::has('register'))
                    <li class="nav-item display-6 pl-3 mt-3">
                        <h6><a class="nav-link " href="{{ route('register') }}" data-path="/register"><b>{{ __('Register') }}</b></a></h6>
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

