<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Islamic Connect</title>
    <link rel="stylesheet" href="/css/app.css">
    <!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.3.3/css/bootstrap.min.css"> -->
    <style>
    /* Custom sidebar styles */

    .sidebar .nav-link p {
      margin-left: 0.5rem;
    }

    .nav-link.active {
      background-color: #00BFA6;
      color: white;
    }

    /* Adjust navbar links */
    .navbar-nav .nav-item .nav-link {
      font-family: 'Inter', sans-serif;
      color: black;
    }

    .navbar-nav .nav-item .nav-link:hover {
      color: #00BFA6;
    }

    /* Hide sidebar on smaller screen sizes */
    @media (max-width: 768px) {
      #tablet-sidebar {
        display: none;
      }
      .content-wrapper {
        margin-left: 0;
      }
    }
  </style>
</head>

<body class="hold-transition sidebar-mini">
  <div class="wrapper" id="app">
    {{-- @include('partials.navbar') --}}
    
  <!--
    <aside id="tablet-sidebar" class="main-sidebar sidebar-light-primary elevation-4">
      <a href="/" class="brand-link">
          <img src="/images/logo_main.png" width="220" height="45" alt="" loading="lazy">
      </a>
      <div class="sidebar">
          <nav class="mt-2">
              <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                  @if(auth()->user()->role === 'admin')
                  <li class="nav-item">
                      <a href="/dashboard" class="nav-link">
                          <i class="bi bi-speedometer mr-1"></i>
                          <p>Dashboard</p>
                      </a>
                  </li>
                  <li class="nav-item">
                      <a href="/users" class="nav-link">
                          <i class="bi bi-people-fill mr-1"></i>
                          <p>Users</p>
                      </a>
                  </li>
                  <li class="nav-item">
                      <a href="/feedback" class="nav-link">
                          <i class="bi bi-chat-left-text-fill mr-1"></i>
                          <p>Feedback</p>
                      </a>
                  </li>
                  <li class="nav-item">
                      <a href="/payments" class="nav-link">
                          <i class="bi bi-currency-exchange mr-1"></i>
                          <p>Donations</p>
                      </a>
                  </li>
                  <li class="nav-item">
                      <a href="/mailing_list" class="nav-link">
                          <i class="bi bi-envelope-at-fill mr-1"></i>
                          <p>Mailing List</p>
                      </a>
                  </li>
                  <li class="nav-item">
                      <a href="/profile" class="nav-link">
                          <i class="bi bi-people-fill mr-1"></i>
                          <p>Profile</p>
                      </a>
                  </li>
                  <li class="nav-item">
                      <a href="/correction" class="nav-link">
                          <i class="bi bi-bug-fill mr-1"></i>
                          <p>Correction</p>
                      </a>
                  </li>
                  <li class="nav-item">
                      <a href="/bookmarks" class="nav-link">
                          <i class="bi bi-bookmark-dash-fill mr-1"></i>
                          <p>Bookmarks</p>
                      </a>
                  </li>
                  <li class="nav-item">
                      <a href="/notes" class="nav-link">
                          <i class="bi bi-file-earmark-text-fill mr-1"></i>
                          <p>Notes</p>
                      </a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                          <i class="bi bi-plug-fill" style="font-size: 22px"></i>
                          <p class="mb-2">{{ __('Logout') }}</p>
                      </a>
                      <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                          @csrf
                      </form>
                  </li>
                  @endif
                  @if(auth()->user()->role === 'user')
                  <li class="nav-item">
                      <a href="/home" class="nav-link">
                          <i class="bi bi-house-fill mr-1"></i>
                          <p>Home</p>
                      </a>
                  </li>
                  <li class="nav-item">
                      <a href="/bookmarks" class="nav-link">
                          <i class="bi bi-bookmark-dash-fill mr-1"></i>
                          <p>Bookmarks</p>
                      </a>
                  </li>
                  <li class="nav-item">
                      <a href="/notes" class="nav-link">
                          <i class="bi bi-file-earmark-text-fill mr-1"></i>
                          <p>Notes</p>
                      </a>
                  </li>
                  <li class="nav-item">
                      <a href="/profile" class="nav-link">
                          <i class="bi bi-people-fill mr-1"></i>
                          <p>Profile</p>
                      </a>
                  </li>
                  <li class="nav-item">
                    <a class="dropdown-item" href="{{ route('logout') }}"
                        onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                        {{ __('Logout') }}
                    </a>
                  </li>
                  @endif
              </ul>
          </nav>
      </div>
    </aside>
  -->

    <div class="content-wrapper" >
      <div class="content">
        <div class="container-fluid">
          @yield('content')
        </div>
      </div>
    </div>
  </div>
<script defer>
    // JavaScript for toggling the sidebar
    $(document).ready(function () {
      $('.navbar-toggler').click(function () {
        $('#tablet-sidebar').toggleClass('d-block');
      });
    });
  </script>
  <script src="/js/app.js" defer></script>
  <!-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> -->
  <!-- <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script> -->
  <!-- <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.3.3/js/bootstrap.min.js"></script> -->
  
</body>

</html>
