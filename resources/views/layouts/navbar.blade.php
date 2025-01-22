<nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
 <div class="container-fluid">
     {{-- <a class="navbar-brand" href="{{ url('/') }}">
         <img src="/images/logo_main.png" width="275" height="54" class="d-inline-block align-top" alt="" loading="lazy">
     </a> --}}
     <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
         data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
         aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
         <span class="navbar-toggler-icon"></span>
     </button>
     <div class="collapse navbar-collapse" id="navbarSupportedContent">
         <!-- Left Side Of Navbar -->
         <ul class="navbar-nav justify-content-end pr-4 flex-grow-1">
             <li class="nav-item mt-3">
                 <h6><a style="font-family:inter; color: black;" class="nav-link ml-4 pl-3"
                         href="/quran">Home</a></h6>
             </li>
             <li class="nav-item mt-3">
                 <h6><a style="font-family:inter; color: black;" class="nav-link ml-4 pl-3"
                         href="/contact">Contact</a></h6>
             </li>
             <li class="nav-item mt-3">
                 <h6><a style="font-family:inter; color: black;" class="nav-link ml-4 pl-3"
                         href="/about">About Us</a></h6>
             </li>
             <li class="nav-item mt-3">
                 <h6><a style="font-family:inter; color: black;" class="nav-link ml-4 pl-3"
                         href="/updates">Updates</a></h6>
             </li>
             <li class="nav-item mt-3">
                 <h6><a style="font-family:inter; color: black;" class="nav-link ml-4 pl-3 pr-5"
                         href="/join_us">Mailing List</a></h6>
             </li>
            <button @click="getSummary" :disabled="loading" style="background:linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB); ">
                <span>Try Premium</span>
            </button>
         
         <!-- Right Side Of Navbar -->
             @guest
             @if (Route::has('login'))
             <li class="nav-item ">
                 <h6><a class="nav-link " href="{{ route('login') }}">{{ __('Login') }}</a></h6>
             </li>
             @endif
             @if (Route::has('register'))
             <li class="nav-item ">
                 <h6><a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a></h6>
             </li>
             @endif
             @else
             <li class="nav-item dropdown">
                 <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
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
             <li class="nav-item mt-2 ">
                 <button><a style="text-decoration: none;color:white"
                         href="https://www.gofundme.com/f/empowerment-through-quran-support-islamic-connects-mission">Support
                         Us</a></button>
             </li>
            </ul>
     </div>
 </div>
</nav>
