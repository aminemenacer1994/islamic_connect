<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@hasSection('title')@yield('title') - Islamic Connect@else Islamic Connect @endif</title>
    <link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/bootstrap-icons.woff2">
    <link rel="preload" as="font" type="font/woff2" crossorigin href="/vendor/fontawesome-free/webfonts/fa-solid-900.woff2">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    @stack('styles')
    <style>
        :root { --sidebar-width: 260px; --sidebar-collapsed: 72px; --accent: #00aaff; --frame-radius: 18px; --frame-shadow: 0 8px 30px rgba(0,0,0,.08); --card-radius: 12px; --card-border: #e8ecef; --muted:#6b7280; }
        body { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background: radial-gradient(1200px 600px at -10% -10%, #e8f7ef 0%, transparent 60%), radial-gradient(1200px 600px at 110% 110%, #e7f3ff 0%, transparent 60%), #f6f8f9; }
        /* App frame */
        .layout { display:flex; min-height:100vh; padding: 20px; }
        .app-frame { background:#fff; border-radius: var(--frame-radius); box-shadow: var(--frame-shadow); width:100%; display:flex; overflow:hidden; }
        .content-wrapper { flex:1; margin-left: var(--sidebar-width); transition: margin-left .3s ease; background:#fbfcfd; }
        .content-inner { padding: 24px 28px; }
        .content-wrapper.collapsed { margin-left: var(--sidebar-collapsed); }
        @media (max-width: 768px) { .layout{padding:10px;} .content-wrapper { margin-left: 0; } }

        /* Topbar */
        .main-navbar { position: sticky; top:0; z-index:1020; background: #fff; border-bottom: 1px solid #eef2f5; }
        .main-navbar .nav-link { color:#111; }
        .main-navbar .nav-link:hover { color:#0b5d4b; }
        /* Brand logo sizing */
        .navbar-brand img { height: 56px; width: auto; }
        @media (max-width: 576px) { .navbar-brand img { height: 44px; } }
        .topbar-tools { display:flex; gap:10px; align-items:center; }
        .search-wrap { flex:1; max-width: 560px; position: relative; }
        .search-wrap input { width:100%; border:1px solid #e6eaee; border-radius: 999px; padding:10px 14px 10px 40px; background:#fafbfc; }
        .search-wrap i { position:absolute; left:12px; top:50%; transform: translateY(-50%); color:#94a3b8; }
        .chip { font-size:12px; color:#0f5132; background:#d1f7e2; border:1px solid #a7efc3; padding:4px 8px; border-radius: 999px; }
        .premium-btn { background:linear-gradient(144deg,#AF40FF,#5B42F3 50%,#00DDEB); color:#fff; border:none; border-radius:10px; padding:8px 14px; }

        /* Sidebar (merged, softened) */
        :root {
            --primary-dark: #1a2634; --primary-light: #f5f7fa; --accent-color: #00aaff; --text-dark: #e0e6ed; --text-light: #2c3e50; --hover-color: #007acc; --backdrop-color: rgba(0,0,0,.5);
        }
        body.dark-theme { --background: var(--primary-dark); --text-color: var(--text-dark); --search-bg: rgba(255,255,255,.1); --search-text: var(--text-dark); }
        body.light-theme { --background: var(--primary-light); --text-color: var(--text-light); --search-bg: rgba(0,0,0,.05); --search-text: var(--text-light); }
        .main-sidebar { background: #f5f7fa; width: var(--sidebar-width); min-height: 100vh; padding: 16px 12px; border-right:1px solid #eef2f5; transition: width .3s ease, transform .3s ease, background .3s ease; position: fixed; top:0; left:0; z-index: 1030; overflow-y: auto; }
        .main-sidebar.collapsed { width: var(--sidebar-collapsed); }
        .main-sidebar.collapsed .brand-logo, .main-sidebar.collapsed .nav-link span, .main-sidebar.collapsed .nav-header, .main-sidebar.collapsed .sidebar-search { display: none; }
        .main-sidebar.collapsed .nav-link { justify-content: center; padding: 12px; }
        .sidebar-header { display:flex; align-items:center; justify-content:space-between; padding: 6px 12px; margin-bottom: 12px; }
        .brand-link { display:block; }
        .brand-logo { max-width: 100%; height:auto; transition: transform .3s ease, opacity .3s ease; border-radius:10px; }
        .brand-logo:hover { transform: scale(1.03); opacity:.9; }
        .sidebar-controls { display:flex; gap:10px; }
        .theme-toggle, .sidebar-collapse { background: rgba(255,255,255,.1); border:none; color: var(--text-color); font-size:16px; cursor:pointer; padding:6px; border-radius:6px; transition: background .3s ease, transform .2s ease; }
        .theme-toggle:hover, .sidebar-collapse:hover { background: rgba(255,255,255,.2); transform: scale(1.1); }
        .sidebar-search { position:relative; margin: 6px 12px 16px; }
        .sidebar-search input { width:100%; padding: 8px 12px 8px 36px; background: var(--search-bg); border:none; border-radius:20px; color: var(--search-text); font-size:14px; }
        .sidebar-search input:focus { outline:none; background: rgba(255,255,255,.15); box-shadow: 0 0 0 2px var(--accent-color); }
        .sidebar-search i { position:absolute; left:12px; top:50%; transform: translateY(-50%); color: var(--search-text); font-size:14px; }
        .nav-sidebar { list-style:none; padding:0; margin:0; }
        .nav-header { padding: 10px 14px; color: #6b7280; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:.12em; }
        .nav-item { margin-bottom: 4px; }
        .nav-link { display:flex; align-items:center; padding:10px 14px; color: #1f2937; text-decoration:none; border-radius:10px; transition: background .2s ease, transform .2s ease; font-size:15px; font-weight:600; position:relative; }
        .nav-link i { margin-right:12px; font-size:18px; color:#475569; transition: color .2s ease; }
        .nav-link span { flex:1; }
        .nav-link:hover { background: #e7f5ef; }
        .nav-link:hover i { color: #0b806f; }
        .nav-link[aria-current="page"] { background: #cdeedf; color:#0b5d4b; }
        .nav-link[aria-current="page"] i { color:#fff; }
        .nav-link:focus-visible { outline: 2px solid var(--accent-color); outline-offset: 2px; }
        .nav-link::after { content: attr(title); position:absolute; left:100%; top:50%; transform: translateY(-50%); background: var(--background); color: var(--text-color); padding:6px 12px; border-radius:6px; font-size:12px; white-space:nowrap; opacity:0; visibility:hidden; transition: opacity .3s ease, visibility .3s ease; z-index: 1001; box-shadow:0 2px 8px rgba(0,0,0,.2); }
        .main-sidebar.collapsed .nav-link:hover::after { opacity:1; visibility:visible; }
        .sidebar-backdrop { position: fixed; inset:0; background: var(--backdrop-color); opacity:0; visibility:hidden; transition: opacity .3s ease, visibility .3s ease; z-index: 1025; }
        .sidebar-backdrop.active { opacity:1; visibility:visible; }
        @media (max-width: 768px) { .main-sidebar { transform: translateX(calc(-1 * var(--sidebar-width))); } .main-sidebar.active { transform: translateX(0); } }

        /* Card utilities */
        .card-lite { background:#fff; border:1px solid var(--card-border); border-radius: var(--card-radius); box-shadow: 0 1px 2px rgba(0,0,0,.03); }
        .card-lite .card-hd { padding:14px 16px; border-bottom:1px solid #eef2f5; font-weight:700; }
        .card-lite .card-bd { padding: 16px; }
        .grid-12 { display:grid; grid-template-columns: repeat(12, minmax(0,1fr)); gap:16px; }
        @media (max-width: 991px){ .grid-12 { grid-template-columns: repeat(6, minmax(0,1fr)); } }
        @media (max-width: 640px){ .grid-12 { grid-template-columns: repeat(1, minmax(0,1fr)); } }
    </style>
</head>
<body class="light-theme">
<div class="layout" id="app">
    <div class="app-frame">
    <!-- Top Navbar (merged) -->
    <nav class="navbar navbar-expand-md main-navbar" role="navigation" aria-label="Top navigation">
        <div class="container-fluid">
            <button class="btn btn-link p-2 me-2" id="sidebarToggle" type="button" aria-label="Toggle sidebar">
                <i class="bi bi-list" style="font-size:1.4rem"></i>
            </button>
            <a class="navbar-brand" href="/">
                <img src="/images/logo_main.png" class="d-inline-block align-top" alt="Islamic Connect logo" loading="lazy">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav justify-content-end flex-grow-1 align-items-md-center">
                    <li class="nav-item mt-2 mt-md-0"><a class="nav-link px-3" href="/quran">Home</a></li>
                    <li class="nav-item mt-2 mt-md-0"><a class="nav-link px-3" href="/contact">Contact</a></li>
                    <li class="nav-item mt-2 mt-md-0"><a class="nav-link px-3" href="/about">About Us</a></li>
                    <li class="nav-item mt-2 mt-md-0"><a class="nav-link px-3" href="/updates">Updates</a></li>
                    <li class="nav-item mt-2 mt-md-0"><a class="nav-link px-3" href="/join_us">Mailing List</a></li>
                    <li class="nav-item d-flex align-items-center">
                        <button class="premium-btn" @click="getSummary" :disabled="loading"><span>Try Premium</span></button>
                    </li>
                    @guest
                        @if (Route::has('login'))
                            <li class="nav-item"><a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a></li>
                        @endif
                        @if (Route::has('register'))
                            <li class="nav-item"><a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a></li>
                        @endif
                    @else
                        <li class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                <i class="bi bi-person-circle me-2" style="font-size:1.5rem"></i>
                                {{ Auth::user()->name }}
                            </a>
                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="/bookmarks">Bookmarks</a>
                                <a class="dropdown-item" href="/notes">Notes & Reflections</a>
                                <a class="dropdown-item" href="/profile">Profile</a>
                                <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">{{ __('Logout') }}</a>
                                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">@csrf</form>
                            </div>
                        </li>
                    @endguest
                    <li class="nav-item mt-2 mt-md-0">
                        <a class="btn btn-primary" href="https://www.gofundme.com/f/empowerment-through-quran-support-islamic-connects-mission" target="_blank" rel="noopener">Support Us</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    

    <!-- Main Content -->
    <div id="contentWrapper" class="content-wrapper">
        <div class="content-inner">
            <!-- Example top toolbar area matching reference -->
            <div class="d-flex align-items-center justify-content-between mb-3">
                <div class="search-wrap me-3">
                    <i class="bi bi-search"></i>
                    <input type="search" placeholder="Search" aria-label="Search" />
                </div>
                <div class="topbar-tools">
                    <span class="chip d-none d-md-inline">Welcome back</span>
                    <button class="btn btn-light border"><i class="bi bi-bell"></i></button>
                    <button class="btn btn-light border"><i class="bi bi-gear"></i></button>
                    @auth
                    <div class="d-flex align-items-center gap-2 px-2 py-1 border rounded-pill">
                        <img src="https://www.gravatar.com/avatar/{{ md5(strtolower(trim(Auth::user()->email))) }}?s=40&d=identicon" alt="Avatar" width="28" height="28" class="rounded-circle">
                        <span class="d-none d-md-inline" style="font-weight:600; color:#334155;">{{ Auth::user()->name }}</span>
                    </div>
                    @endauth
                </div>
            </div>

            @yield('content')
        </div>
    </div>
    </div><!-- /.app-frame -->
</div>

<script>
    // Sidebar + theme behavior (vanilla JS)
    document.addEventListener('DOMContentLoaded', () => {
        const sidebar = document.getElementById('tablet-sidebar');
        const backdrop = document.getElementById('sidebar-backdrop');
        const sidebarToggle = document.getElementById('sidebarToggle');
        const collapseBtn = sidebar?.querySelector('.sidebar-collapse');
        const themeToggle = sidebar?.querySelector('.theme-toggle');
        const contentWrapper = document.getElementById('contentWrapper');

        // Initial theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.add(`${savedTheme}-theme`);
        if (themeToggle) themeToggle.innerHTML = `<i class="bi ${savedTheme === 'dark' ? 'bi-sun-fill' : 'bi-moon-stars-fill'}" aria-hidden="true"></i>`;

        // Initial collapsed state (desktop)
        const collapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (collapsed) {
            sidebar?.classList.add('collapsed');
            contentWrapper?.classList.add('collapsed');
        }

        // Toggle sidebar (mobile/offcanvas)
        sidebarToggle?.addEventListener('click', () => {
            const isMobile = window.matchMedia('(max-width: 768px)').matches;
            if (isMobile) {
                sidebar?.classList.toggle('active');
                backdrop?.classList.toggle('active');
            } else {
                sidebar?.classList.toggle('collapsed');
                contentWrapper?.classList.toggle('collapsed');
                localStorage.setItem('sidebarCollapsed', sidebar?.classList.contains('collapsed'));
            }
        });

        // Backdrop click closes sidebar on mobile
        backdrop?.addEventListener('click', () => {
            sidebar?.classList.remove('active');
            backdrop?.classList.remove('active');
        });

        // Explicit collapse button inside sidebar
        collapseBtn?.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            contentWrapper.classList.toggle('collapsed');
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        });

        // Theme toggle
        themeToggle?.addEventListener('click', () => {
            const toDark = !document.body.classList.contains('dark-theme');
            document.body.classList.toggle('dark-theme', toDark);
            document.body.classList.toggle('light-theme', !toDark);
            themeToggle.innerHTML = `<i class=\"bi ${toDark ? 'bi-sun-fill' : 'bi-moon-stars-fill'}\" aria-hidden=\"true\"></i>`;
            localStorage.setItem('theme', toDark ? 'dark' : 'light');
        });

        // Sidebar search (admin only)
        const searchInput = document.getElementById('sidebar-search');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                const query = searchInput.value.toLowerCase();
                document.querySelectorAll('.nav-item, .nav-header').forEach(item => {
                    const text = item.dataset.search?.toLowerCase() || '';
                    item.style.display = text.includes(query) ? 'block' : 'none';
                });
            });
        }

        // Keyboard accessibility for links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); link.click(); }
            });
        });
    });
</script>
<script src="{{ mix('js/app.js') }}" defer></script>
@stack('scripts')
</body>
</html>
