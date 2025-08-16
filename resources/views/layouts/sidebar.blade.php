<aside id="tablet-sidebar" class="main-sidebar" role="complementary" aria-label="Main navigation">
    <div class="sidebar-header">
        <a href="/" class="brand-link" aria-label="Islamic Connect Home">
            <img src="/images/logo_main.png" width="170" height="34" alt="Islamic Connect logo" loading="lazy" class="brand-logo">
        </a>
        <div class="sidebar-controls">
            <button class="theme-toggle" aria-label="Toggle theme" title="Toggle dark/light theme">
                <i class="bi bi-moon-stars-fill" aria-hidden="true"></i>
            </button>
            <button class="sidebar-collapse" aria-label="Collapse sidebar" title="Collapse sidebar">
                <i class="bi bi-chevron-double-left" aria-hidden="true"></i>
            </button>
        </div>
    </div>
    @if(auth()->user()->role === 'admin')
        <div class="sidebar-search">
            <input type="text" id="sidebar-search" placeholder="Search menu..." aria-label="Search navigation">
            <i class="bi bi-search" aria-hidden="true"></i>
        </div>
    @endif
    <nav class="sidebar-nav" aria-label="Sidebar menu">
        <ul class="nav nav-sidebar flex-column" role="menu" aria-label="Navigation links" data-accordion="false">
            @if(auth()->user()->role === 'admin')
                <li class="nav-header" data-search="admin tools">Admin Tools</li>
                <li class="nav-item" data-search="dashboard">
                    <a href="/dashboard" class="nav-link" aria-current="page" title="View Dashboard">
                        <i class="bi bi-speedometer2" aria-hidden="true"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li class="nav-item" data-search="users">
                    <a href="/users" class="nav-link" title="Manage Users">
                        <i class="bi bi-people-fill" aria-hidden="true"></i>
                        <span>Users</span>
                    </a>
                </li>
                <li class="nav-item" data-search="feedback">
                    <a href="/feedback" class="nav-link" title="View Feedback">
                        <i class="bi bi-chat-left-text-fill" aria-hidden="true"></i>
                        <span>Feedback</span>
                    </a>
                </li>
                <li class="nav-item" data-search="mailing list">
                    <a href="/mailing_list" class="nav-link" title="Manage Mailing List">
                        <i class="bi bi-envelope-at-fill" aria-hidden="true"></i>
                        <span>Mailing List</span>
                    </a>
                </li>
                <li class="nav-header" data-search="content management">Content Management</li>
                <li class="nav-item" data-search="correction">
                    <a href="/correction" class="nav-link" title="Report Corrections">
                        <i class="bi bi-bug-fill" aria-hidden="true"></i>
                        <span>Correction</span>
                    </a>
                </li>
                <li class="nav-item" data-search="bookmarks">
                    <a href="/bookmarks" class="nav-link" title="View Bookmarks">
                        <i class="bi bi-bookmark-fill" aria-hidden="true"></i>
                        <span>Bookmarks</span>
                    </a>
                </li>
                <li class="nav-item" data-search="collections">
                    <a href="/collection" class="nav-link" title="Manage Collections">
                        <i class="bi bi-collection-fill" aria-hidden="true"></i>
                        <span>Collections</span>
                    </a>
                </li>
                <li class="nav-item" data-search="notes">
                    <a href="/notes" class="nav-link" title="View Notes">
                        <i class="bi bi-file-earmark-text-fill" aria-hidden="true"></i>
                        <span>Notes</span>
                    </a>
                </li>
                <li class="nav-header" data-search="account">Account</li>
                <li class="nav-item" data-search="profile">
                    <a href="/profile" class="nav-link" title="Edit Profile">
                        <i class="bi bi-person-fill" aria-hidden="true"></i>
                        <span>Profile</span>
                    </a>
                </li>
                <li class="nav-item" data-search="logout">
                    <a class="nav-link" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();" aria-label="Logout" title="Sign Out">
                        <i class="bi bi-box-arrow-right" aria-hidden="true"></i>
                        <span>Logout</span>
                    </a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                        @csrf
                    </form>
                </li>
            @endif
            @if(auth()->user()->role === 'user')
                <li class="nav-item" data-search="home">
                    <a href="/home" class="nav-link" aria-current="page" title="Go to Home">
                        <i class="bi bi-house-fill" aria-hidden="true"></i>
                        <span>Home</span>
                    </a>
                </li>
                <li class="nav-item" data-search="bookmarks">
                    <a href="/bookmarks" class="nav-link" title="View Bookmarks">
                        <i class="bi bi-bookmark-fill" aria-hidden="true"></i>
                        <span>Bookmarks</span>
                    </a>
                </li>
                <li class="nav-item" data-search="notes">
                    <a href="/notes" class="nav-link" title="View Notes">
                        <i class="bi bi-file-earmark-text-fill" aria-hidden="true"></i>
                        <span>Notes</span>
                    </a>
                </li>
                <li class="nav-item" data-search="profile">
                    <a href="/profile" class="nav-link" title="Edit Profile">
                        <i class="bi bi tins-fill" aria-hidden="true"></i>
                        <span>Profile</span>
                    </a>
                </li>
                <li class="nav-item" data-search="logout">
                    <a class="nav-link" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();" aria-label="Logout" title="Sign Out">
                        <i class="bi bi-box-arrow-right" aria-hidden="true"></i>
                        <span>Logout</span>
                    </a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                        @csrf
                    </form>
                </li>
            @endif
        </ul>
    </nav>
</aside>
<div id="sidebar-backdrop" class="sidebar-backdrop"></div>

<style>
    :root {
        --primary-dark: #1a2634;
        --primary-light: #f5f7fa;
        --accent-color: #00aaff;
        --text-dark: #e0e6ed;
        --text-light: #2c3e50;
        --hover-color: #007acc;
        --backdrop-color: rgba(0, 0, 0, 0.5);
    }

    body.dark-theme {
        --background: var(--primary-dark);
        --text-color: var(--text-dark);
        --search-bg: rgba(255, 255, 255, 0.1);
        --search-text: var(--text-dark);
    }

    body.light-theme {
        --background: var(--primary-light);
        --text-color: var(--text-light);
        --search-bg: rgba(0, 0, 0, 0.05);
        --search-text: var(--text-light);
    }

    .main-sidebar {
        background: var(--background);
        backdrop-filter: blur(10px);
        width: 260px;
        min-height: 100vh;
        padding: 20px 12px;
        box-shadow: 4px 0 12px rgba(0, 0, 0, 0.2);
        transition: width 0.3s ease, transform 0.3s ease, background 0.3s ease;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        overflow-y: auto;
        scroll-behavior: smooth;
    }

    .main-sidebar.collapsed {
        width: 70px;
    }

    .main-sidebar.collapsed .brand-logo,
    .main-sidebar.collapsed .nav-link span,
    .main-sidebar.collapsed .nav-header,
    .main-sidebar.collapsed .sidebar-search {
        display: none;
    }

    .main-sidebar.collapsed .nav-link {
        justify-content: center;
        padding: 12px;
    }

    .main-sidebar.collapsed .sidebar-collapse i::before {
        content: '\f100'; /* bi-chevron-double-right */
    }

    .sidebar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
        margin-bottom: 20px;
    }

    .brand-link {
        display: block;
    }

    .brand-logo {
        max-width: 100%;
        height: auto;
        transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .brand-logo:hover {
        transform: scale(1.03);
        opacity: 0.9;
    }

    .sidebar-controls {
        display: flex;
        gap: 10px;
    }

    .theme-toggle,
    .sidebar-collapse {
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: var(--text-color);
        font-size: 16px;
        cursor: pointer;
        padding: 6px;
        border-radius: 6px;
        transition: background 0.3s ease, transform 0.2s ease;
    }

    .theme-toggle:hover,
    .sidebar-collapse:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
    }

    .sidebar-search {
        position: relative;
        margin: 0 12px 20px;
    }

    .sidebar-search input {
        width: 100%;
        padding: 8px 12px 8px 36px;
        background: var(--search-bg);
        border: none;
        border-radius: 20px;
        color: var(--search-text);
        font-size: 14px;
        transition: background 0.3s ease;
    }

    .sidebar-search input:focus {
        outline: none;
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 0 0 2px var(--accent-color);
    }

    .sidebar-search i {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--search-text);
        font-size: 14px;
    }

    .sidebar-nav {
        padding: 0 8px;
    }

    .nav-sidebar {
        list-style: none;
        padding: 0;
    }

    .nav-header {
        padding: 12px 15px;
        color: var(--text-color);
        font-size: 13px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        opacity: 0.7;
    }

    .nav-item {
        margin-bottom: 6px;
    }

    .nav-link {
        display: flex;
        align-items: center;
        padding: 10px 15px;
        color: var(--text-color);
        text-decoration: none;
        border-radius: 8px;
        transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
        font-size: 15px;
        font-weight: 500;
        position: relative;
    }

    .nav-link i {
        margin-right: 14px;
        font-size: 18px;
        color: var(--text-color);
        transition: color 0.3s ease;
    }

    .nav-link span {
        flex-grow: 1;
    }

    .nav-link:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateX(4px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .nav-link:hover i {
        color: var(--accent-color);
    }

    .nav-link[aria-current="page"] {
        background: var(--accent-color);
        color: #fff;
        font-weight: 600;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    .nav-link[aria-current="page"] i {
        color: #fff;
    }

    .nav-link:focus-visible {
        outline: 2px solid var(--accent-color);
        outline-offset: 2px;
    }

    .nav-link::after {
        content: attr(title);
        position: absolute;
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        background: var(--background);
        color: var(--text-color);
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 12px;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        z-index: 1001;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .main-sidebar.collapsed .nav-link:hover::after {
        opacity: 1;
        visibility: visible;
    }

    .sidebar-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--backdrop-color);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        z-index: 999;
    }

    .sidebar-backdrop.active {
        opacity: 1;
        visibility: visible;
    }

    @media (max-width: 768px) {
        .main-sidebar {
            transform: translateX(-260px);
        }

        .main-sidebar.active {
            transform: translateX(0);
        }

        .main-sidebar.collapsed {
            width: 260px;
        }

        .main-sidebar.collapsed .brand-logo,
        .main-sidebar.collapsed .nav-link span,
        .main-sidebar.collapsed .nav-header,
        .main-sidebar.collapsed .sidebar-search {
            display: block;
        }

        .main-sidebar.collapsed .nav-link {
            justify-content: flex-start;
        }
    }
</style>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const sidebar = document.getElementById('tablet-sidebar');
        const backdrop = document.getElementById('sidebar-backdrop');
        const collapseButton = document.querySelector('.sidebar-collapse');
        const themeToggle = document.querySelector('.theme-toggle');
        const toggleButton = document.createElement('button');
        toggleButton.innerHTML = '<i class="bi bi-list"></i>';
        toggleButton.className = 'sidebar-toggle';
        toggleButton.setAttribute('aria-label', 'Toggle sidebar');
        document.body.appendChild(toggleButton);

        toggleButton.style.position = 'fixed';
        toggleButton.style.top = '15px';
        toggleButton.style.left = '15px';
        toggleButton.style.zIndex = '1001';
        toggleButton.style.background = 'var(--accent-color)';
        toggleButton.style.color = '#fff';
        toggleButton.style.border = 'none';
        toggleButton.style.padding = '10px';
        toggleButton.style.borderRadius = '8px';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            backdrop.classList.toggle('active');
            toggleButton.style.transform = sidebar.classList.contains('active') ? 'translateX(270px)' : 'translateX(0)';
        });

        backdrop.addEventListener('click', () => {
            sidebar.classList.remove('active');
            backdrop.classList.remove('active');
            toggleButton.style.transform = 'translateX(0)';
        });

        collapseButton.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        });

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            document.body.classList.toggle('light-theme');
            const isDark = document.body.classList.contains('dark-theme');
            themeToggle.innerHTML = `<i class="bi ${isDark ? 'bi-sun-fill' : 'bi-moon-stars-fill'}" aria-hidden="true"></i>`;
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        // Initialize theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.classList.add(`${savedTheme}-theme`);
        themeToggle.innerHTML = `<i class="bi ${savedTheme === 'dark' ? 'bi-sun-fill' : 'bi-moon-stars-fill'}" aria-hidden="true"></i>`;

        // Initialize collapsed state
        if (localStorage.getItem('sidebarCollapsed') === 'true') {
            sidebar.classList.add('collapsed');
        }

        // Search functionality
        const searchInput = document.getElementById('sidebar-search');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                const query = searchInput.value.toLowerCase();
                document.querySelectorAll('.nav-item, .nav-header').forEach(item => {
                    const searchText = item.dataset.search?.toLowerCase() || '';
                    item.style.display = searchText.includes(query) ? 'block' : 'none';
                });
            });
        }

        // Keyboard navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    link.click();
                }
            });
        });
    });
</script>