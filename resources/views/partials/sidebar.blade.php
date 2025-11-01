<aside id="tablet-sidebar" class="vc-sidebar fixed-sidebar">
 <div class="sidebar">
  <nav class="mt-2" aria-label="Secondary navigation" role="navigation">
   <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
    @if(auth()->user()->role === 'admin')
    <li class="nav-item" data-search="dashboard admin home overview">
     <a href="/dashboard" class="nav-link {{ request()->is('dashboard') ? 'active' : '' }}">
      <i class="bi bi-speedometer mr-3 "></i>
      <span class="label mr-3">Dashboard</span>
     </a>
    </li>
    <li class="nav-item" data-search="users accounts members admin">
     <a href="/users" class="nav-link {{ request()->is('users*') ? 'active' : '' }}">
      <i class="bi bi-people-fill mr-3"></i>
      <span class="label">Users</span>
     </a>
    </li>
    <li class="nav-item" data-search="feedback reports messages admin">
     <a href="/feedback" class="nav-link {{ request()->is('feedback') ? 'active' : '' }}">
      <i class="bi bi-chat-left-text-fill mr-3"></i>
      <span class="label">Feedback</span>
     </a>
    </li>
    <li class="nav-item" data-search="payments transactions finance stripe">
     <a href="/payments" class="nav-link {{ request()->is('payments') ? 'active' : '' }}">
      <i class="bi bi-credit-card-fill mr-3"></i>
      <span class="label">Payments</span>
     </a>
    </li>
    <li class="nav-item" data-search="mailing list newsletter subscribers">
     <a href="/mailing_list" class="nav-link {{ request()->is('mailing_list') ? 'active' : '' }}">
      <i class="bi bi-envelope-at-fill mr-3"></i>
      <span class="label">Mailing List</span>
     </a>
    </li>
    <li class="nav-item" data-search="profile account settings admin">
     <a href="/profile" class="nav-link {{ request()->is('profile') ? 'active' : '' }}">
      <i class="bi bi-people-fill mr-3"></i>
      <span class="label">Profile</span>
     </a>
    </li>
    <li class="nav-item" data-search="bookmarks saved items admin">
     <a href="/bookmarks" class="nav-link {{ request()->is('bookmarks') ? 'active' : '' }}">
      <i class="bi bi-bookmark-dash-fill mr-3"></i>
      <span class="label">Bookmarks</span>
     </a>
    </li>
    <!-- <li class="nav-item" data-search="collections library saved">
     <a href="/collection" class="nav-link">
      <i class="bi bi-bookmark-dash-fill mr-3"></i>
      <span class="label">Collections</span>
     </a>
    </li> -->
    <li class="nav-item" data-search="notes reflections writing">
     <a href="/notes" class="nav-link {{ request()->is('notes') ? 'active' : '' }}">
      <i class="bi bi-file-earmark-text-fill mr-3"></i>
      <span class="label">Notes</span>
     </a>
    </li>
    <li class="nav-item">
     <a class="nav-link" href="{{ route('logout') }}"
      onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
      <i class="bi bi-plug-fill" style="font-size: 22px"></i>
      <span class="label mr-3 mb-2yes do ">{{ __('Logout') }}</span>
     </a>
     <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
      @csrf
     </form>
    </li>
    @endif

    @if(auth()->user()->role === 'user')
    <li class="nav-item" data-search="home landing start">
     <a href="/home" class="nav-link {{ request()->is('home') || request()->is('/') ? 'active' : '' }}">
      <i class="bi bi-house mr-3"></i>
      <span class="label">Home</span>
     </a>
    </li>
    <li class="nav-item" data-search="profile account settings">
     <a href="/profile" class="nav-link {{ request()->is('profile') ? 'active' : '' }}">
      <i class="bi bi-person-circle mr-3"></i>
      <span class="label">Profile</span>
     </a>
    </li>
    <li class="nav-item" data-search="bookmarks saved items">
     <a href="/bookmarks" class="nav-link {{ request()->is('bookmarks') ? 'active' : '' }}">
      <i class="bi bi-bookmark mr-3"></i>
      <span class="label">Bookmarks</span>
     </a>
    </li>
    <li class="nav-item" data-search="notes reflections writing">
     <a href="/notes" class="nav-link {{ request()->is('notes') ? 'active' : '' }}">
      <i class="bi bi-file-earmark-text mr-3"></i>
      <span class="label">Notes</span>
     </a>
    </li>
    <li class="nav-item">
     <a class="nav-link" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form-side').submit();">
      <i class="bi bi-box-arrow-right mr-3"></i>
      <span class="label">Logout</span>
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
