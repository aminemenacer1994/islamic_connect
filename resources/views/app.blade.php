<!DOCTYPE html>
<html>
<head>
    <title>Islamic Connect</title>
    @php
        $appCssMix = mix('css/app.css');
        $appJsMix = mix('js/app.js');
        $appCssHref = $appCssMix . (str_contains($appCssMix, '?') ? '&' : '?') . 'v=' . @filemtime(public_path('css/app.css'));
        $appJsSrc = $appJsMix . (str_contains($appJsMix, '?') ? '&' : '?') . 'v=' . @filemtime(public_path('js/app.js'));
    @endphp
    <link href="{{ $appCssHref }}" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <img src="/logo.png" alt="Islamic Connect Logo">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/" data-path="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/subscribe" data-path="/subscribe">Subscription</a>
                    </li>
                    @auth
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('logout') }}" data-path="/logout" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">Logout</a>
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                @csrf
                            </form>
                        </li>
                    @else
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('login') }}" data-path="/login">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/register" data-path="/register">Register</a>
                        </li>
                    @endauth
                </ul>
            </div>
        </div>
    </nav>
    @yield('content')
    <script src="{{ $appJsSrc }}" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const navLinks = document.querySelectorAll('.nav-link');
            const normalize = (p) => {
                if (!p) return '/';
                try { p = p.trim(); } catch(_){}
                if (p.length > 1 && p.endsWith('/')) p = p.replace(/\/+$/,'');
                return p || '/';
            };
            const pathNow = normalize(window.location.pathname);
            const links = Array.from(navLinks).filter(a => a.dataset && typeof a.dataset.path === 'string');
            const candidates = links.map(a => normalize(a.dataset.path));
            let best = candidates.find(p => p === pathNow);
            if (!best){
                const pref = candidates
                    .filter(p => p !== '/' && (pathNow === p || pathNow.startsWith(p + '/')))
                    .sort((a,b) => b.length - a.length);
                best = pref[0] || '/';
            }
            links.forEach(a => {
                const ap = normalize(a.dataset.path);
                const isActive = ap === best;
                a.classList.toggle('active', isActive);
                if (isActive) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
            });
        });
    </script>
</body>
</html>
