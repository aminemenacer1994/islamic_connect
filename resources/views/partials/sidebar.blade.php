<aside id="tablet-sidebar" class="vc-sidebar fixed-sidebar">
 <div class="sidebar">
  <nav class="mt-2" aria-label="Secondary navigation" role="navigation">
   <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
    @if(auth()->user()->role === 'admin')
    
    <li class="nav-item" data-search="dashboard admin home overview">
     <a href="/dashboard" class="nav-link {{ request()->is('dashboard') ? 'active' : '' }}">
      <i class="bi bi-speedometer2 nav-icon"></i>
      <span class="nav-label">Dashboard</span>
     </a>
    </li>
    
    <li class="nav-item" data-search="users accounts members admin">
     <a href="/users" class="nav-link {{ request()->is('users*') ? 'active' : '' }}">
      <i class="bi bi-people-fill nav-icon"></i>
      <span class="nav-label">Users</span>
     </a>
    </li>
    
    <li class="nav-item" data-search="feedback reports messages admin">
     <a href="/feedback" class="nav-link {{ request()->is('feedback') ? 'active' : '' }}">
      <i class="bi bi-chat-left-text-fill nav-icon"></i>
      <span class="nav-label">Feedback</span>
     </a>
    </li>
    
    <li class="nav-item" data-search="payments transactions finance stripe">
     <a href="/payments" class="nav-link {{ request()->is('payments') ? 'active' : '' }}">
      <i class="bi bi-credit-card-fill nav-icon"></i>
      <span class="nav-label">Payments</span>
     </a>
    </li>
    
    <li class="nav-item" data-search="mailing list newsletter subscribers">
     <a href="/mailing_list" class="nav-link {{ request()->is('mailing_list') ? 'active' : '' }}">
      <i class="bi bi-envelope-at-fill nav-icon"></i>
      <span class="nav-label">Mailing List</span>
     </a>
    </li>
    
    <li class="nav-item" data-search="profile account settings admin">
     <a href="/profile" class="nav-link {{ request()->is('profile') ? 'active' : '' }}">
      <i class="bi bi-person-circle nav-icon"></i>
      <span class="nav-label">Profile</span>
     </a>
    </li>
    
    <li class="nav-item" data-search="bookmarks saved items admin">
     <a href="/bookmarks" class="nav-link {{ request()->is('bookmarks') ? 'active' : '' }}">
      <i class="bi bi-bookmark-star-fill nav-icon"></i>
      <span class="nav-label">Bookmarks</span>
     </a>
    </li>
    
    <li class="nav-item nav-divider">
     <hr class="sidebar-divider">
    </li>
    
    <li class="nav-item">
     <a class="nav-link nav-link-logout" href="{{ route('logout') }}"
      onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
      <i class="bi bi-box-arrow-right nav-icon"></i>
      <span class="nav-label">{{ __('Logout') }}</span>
     </a>
     <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
      @csrf
     </form>
    </li>
    
    @endif

    @if(auth()->user()->role === 'user')
    
    <li class="nav-item" data-search="home landing start">
     <a href="/home" class="nav-link {{ request()->is('home') || request()->is('/') ? 'active' : '' }}">
      <i class="bi bi-house-door-fill nav-icon"></i>
      <span class="nav-label">Home</span>
     </a>
    </li>
    
    <li class="nav-item" data-search="profile account settings">
     <a href="/profile" class="nav-link {{ request()->is('profile') ? 'active' : '' }}">
      <i class="bi bi-person-circle nav-icon"></i>
      <span class="nav-label">Profile</span>
     </a>
    </li>
    
    <li class="nav-item" data-search="bookmarks saved items">
     <a href="/bookmarks" class="nav-link {{ request()->is('bookmarks') ? 'active' : '' }}">
      <i class="bi bi-bookmark-heart-fill nav-icon"></i>
      <span class="nav-label">Bookmarks</span>
     </a>
    </li>
    
    <li class="nav-item nav-divider">
     <hr class="sidebar-divider">
    </li>
    
    <li class="nav-item">
     <a class="nav-link nav-link-logout" href="{{ route('logout') }}" 
      onclick="event.preventDefault(); document.getElementById('logout-form-side').submit();">
      <i class="bi bi-box-arrow-right nav-icon"></i>
      <span class="nav-label">Logout</span>
     </a>
     <form id="logout-form-side" action="{{ route('logout') }}" method="POST" class="d-none">
      @csrf
     </form>
    </li>
    
    @endif

   </ul>
  </nav>
 </div>
</aside>
