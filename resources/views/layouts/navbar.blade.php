<nav class="navbar navbar-expand-md" role="navigation" aria-label="Primary navigation" style="box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;">
    <div class="container-fluid">
        <a class="navbar-brand" href="/welcome">
            <img src="/images/logo_main.png" width="275" height="54" class="d-inline-block align-top" alt="islamic connect logo" loading="lazy">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- Left Side Of Navbar -->
            <ul class="navbar-nav justify-content-end pr-4 flex-grow-1">
                <li class="nav-item mt-3">
                    <a style="font-family:inter; color: black;" class="nav-link ml-4 pl-3" href="/quran">Home</a>
                </li>
                <li class="nav-item mt-3">
                    <a style="font-family:inter; color: black;" class="nav-link ml-4 pl-3" href="/contact">Contact</a>
                </li>
                <li class="nav-item mt-3">
                    <a style="font-family:inter; color: black;" class="nav-link ml-4 pl-3" href="/about">About Us</a>
                </li>
                <li class="nav-item mt-3">
                    <a style="font-family:inter; color: black;" class="nav-link ml-4 pl-3" href="/updates">Updates</a>
                </li>
                <li class="nav-item mt-3">
                    <a style="font-family:inter; color: black;" class="nav-link ml-4 pl-3 pr-5" href="/join_us">Mailing List</a>
                </li>
                <a class="btn btn-sm text-white" href="/pricing" style="background:linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);">
                    Try Premium
                </a>

                <!-- Right Side Of Navbar -->
                @guest
                @if (Route::has('login'))
                <li class="nav-item ">
                    <a class="nav-link " href="{{ route('login') }}">{{ __('Login') }}</a>
                </li>
                @endif
                @if (Route::has('register'))
                <li class="nav-item ">
                    <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
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
                <li class="nav-item mt-2">
                    <a class="btn btn-primary"
                       href="https://www.gofundme.com/f/empowerment-through-quran-support-islamic-connects-mission"
                       target="_blank" rel="noopener"
                       aria-label="Support us on GoFundMe">
                        Support Us
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
