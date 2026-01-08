
@extends('layouts.app')
@section('content')



<!-- Main Content -->
<main id="main-content">
    <div class="login-container">
        <div class="login-card">
            <div class="login-header">
                <h1>Welcome Back</h1>
            </div>
            
            <form method="POST" action="{{ route('login') }}">
                @csrf
                <div class="mb-3">
                    <label for="email" class="form-label">Email Address</label>
                    <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" 
                            name="email" value="{{ old('email') }}" required autocomplete="email" autofocus
                            placeholder="Enter your email" aria-describedby="emailHelp">
                    @error('email')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
                
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" 
                            name="password" required autocomplete="current-password"
                            placeholder="Enter your password">
                    @error('password')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
                
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                        <label class="form-check-label" for="remember">
                            Remember me
                        </label>
                    </div>
                    @if (Route::has('password.request'))
                    <a href="{{ route('password.request') }}" class="text-decoration-none forgot-password-link">
                        Forgot password?
                    </a>
                    @endif
                </div>
                
                <!-- <p class="text-muted small benefits-text">Create an account to save bookmarks, write reflections, report errors, and manage your subscriptions.</p> -->

                <div class="d-grid mb-3">
                    <button type="submit" class="btn btn-lg btn-primary-auth">Sign In</button>
                </div>
            </form>
            
            <div class="divider">
                <span class="divider-text">Or continue with</span>
            </div>
            
            <div class="social-login">
                <a href="/auth/google" class="social-btn btn-google" aria-label="Sign in with Google">
                    <i class="bi bi-google"></i> Google
                </a>
            </div>
            
            <div class="login-footer">
                <p>Don't have an account? <a href="/register">Create account</a></p>
            </div>
        </div>
    </div>
</main>

@endsection

<style>
    :root {
        --accent-color: #009e8a;
        --accent-hover: #00897b;
        --accent-soft: rgba(0, 158, 138, 0.12);
        --text-color: #000000;
        --text-muted: #64748b;
        --light-bg: #ffffff;
        --border-color: rgba(0, 0, 0, 0.1);
        --border-radius: 12px;
        --shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        --shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.12);
        --transition: all 0.2s ease;
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        background-color: #ffffff;
        font-family: 'Inter', sans-serif;
        color: var(--text-color);
        line-height: 1.6;
        padding-top: 70px;
    }
    
    /* Navbar Styles - Matching your existing navbar */
    .navbar {
        background-color: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    }
    
    .navbar-brand img {
        max-height: 50px;
        width: auto;
    }
    
    .nav-link {
        color: black;
        text-decoration: none;
        font-weight: 500;
    }
    
    .nav-link:hover {
        color: var(--accent-color);
        transition: color 0.2s ease;
    }
    
    .nav-link.active {
        font-weight: bold;
        color: var(--accent-color);
        border-bottom: 2px solid var(--accent-color);
        transition: color 0.2s ease, border-bottom 0.2s ease;
    }
    
    .navbar-toggler {
        border: none;
    }
    
    /* Login Container */
    .login-container {
        min-height: calc(100vh - 70px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem 0;
    }
    
    .login-card {
        background: #ffffff;
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow);
        padding: 2.5rem;
        width: 100%;
        max-width: 550px;
        transition: var(--transition);
    }
    
    .login-card:hover {
        box-shadow: var(--shadow-hover);
    }
    
    .login-header {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .login-header h1 {
        font-weight: 700;
        color: var(--text-color);
        margin-bottom: 0.5rem;
        font-size: 1.75rem;
        letter-spacing: -0.01em;
    }
    
    .login-header p {
        color: var(--text-muted);
        margin-bottom: 0;
    }
    
    .benefits-text {
        max-width: 44rem;
        margin: 0.5rem auto 0;
        font-size: 0.95rem; /* slightly larger than small */
        line-height: 1.55;
        text-align: center;
        margin-bottom: 0.9rem;
    }
    @media (min-width: 992px) {
        .benefits-text {
            font-size: 1rem; /* subtle bump on large screens */
        }
    }
    
    .form-label {
        font-weight: 500;
        margin-bottom: 0.5rem;
    }
    
    .form-control {
        padding: 0.75rem 1rem;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        transition: var(--transition);
        font-family: 'Inter', sans-serif;
        background: #ffffff;
        color: var(--text-color);
    }
    
    .form-control:focus {
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(0, 158, 138, 0.1);
        outline: none;
    }
    
    .form-control::placeholder {
        color: var(--text-muted);
    }
    
    
    .divider {
        display: flex;
        align-items: center;
        margin: 1.5rem 0;
    }
    
    .divider::before,
    .divider::after {
        content: "";
        flex: 1;
        border-bottom: 1px solid var(--border-color);
    }
    
    .divider-text {
        padding: 0 1rem;
        color: var(--text-muted);
        font-size: 0.875rem;
        font-weight: 500;
    }
    
    .social-login {
        display: flex;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
    }
    
    .social-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        background: #ffffff;
        transition: var(--transition);
        font-weight: 500;
        color: var(--text-muted);
        text-decoration: none;
    }
    
    .social-btn:hover {
        background-color: var(--accent-soft);
        border-color: var(--accent-color);
        transform: translateY(-1px);
        color: var(--accent-color);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    .social-btn i {
        margin-right: 0.5rem;
        font-size: 1.1rem;
    }
    
    .login-footer {
        text-align: center;
        margin-top: 1.5rem;
        color: var(--text-muted);
    }
    
    .login-footer a {
        color: var(--accent-color);
        text-decoration: none;
        font-weight: 500;
    }
    
    .login-footer a:hover {
        text-decoration: underline;
        color: var(--accent-hover);
    }

    .forgot-password-link {
        color: var(--accent-color);
        font-weight: 500;
        font-size: 0.95rem;
    }
    .forgot-password-link:hover {
        text-decoration: underline;
        color: var(--accent-hover);
    }
    
    .btn-primary-auth {
        background-color: var(--accent-color) !important;
        color: #ffffff !important;
        border: none !important;
        font-weight: 600;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        transition: var(--transition);
        box-shadow: 0 2px 4px rgba(0, 158, 138, 0.2);
    }
    
    .btn-primary-auth:hover {
        background-color: var(--accent-hover) !important;
        color: #ffffff !important;
        box-shadow: 0 4px 8px rgba(0, 158, 138, 0.3);
        transform: translateY(-1px);
    }
    
    .btn-primary-auth:active {
        transform: translateY(0);
        background-color: var(--accent-hover) !important;
    }
    
    .btn-primary-auth:focus {
        background-color: var(--accent-color) !important;
        color: #ffffff !important;
        box-shadow: 0 0 0 3px rgba(0, 158, 138, 0.2);
    }
    
    .invalid-feedback {
        display: block;
    }
    
    .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--accent-color);
        color: white;
        padding: 8px;
        z-index: 100;
        text-decoration: none;
        border-radius: 4px;
    }
    
    .skip-link:focus {
        top: 6px;
    }
    
    /* Mobile Responsiveness */
    @media (max-width: 768px) {
        .login-card {
            padding: 2rem 1.5rem;
            margin: 0 1rem;
        }
        
        .social-login {
            flex-direction: column;
        }
    }
    
    @media (max-width: 576px) {
        .login-header h1 {
            font-size: 1.5rem;
        }
        
        .login-card {
            padding: 1.5rem 1rem;
        }
        
        .btn-primary {
            padding: 0.65rem;
        }
    }
    
    /* Focus styles for accessibility */
    button:focus, 
    a:focus, 
    input:focus, 
    select:focus, 
    textarea:focus {
        outline: 2px solid var(--accent-color);
        outline-offset: 2px;
    }
    
    .form-check-input:checked {
        background-color: var(--accent-color);
        border-color: var(--accent-color);
    }
    
    .form-check-input:focus {
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(0, 158, 138, 0.1);
    }
    
    .invalid-feedback {
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    
    .is-invalid {
        border-color: #dc3545;
    }
    
    .is-invalid:focus {
        border-color: #dc3545;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
        :root {
            --text-color: #000;
        }
        
        .navbar {
            border-bottom: 2px solid #000;
        }
        
        .login-card {
            border: 1px solid #000;
        }
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        * {
            transition: none !important;
        }
    }
</style>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer></script>
<script>
    // Enhanced form validation
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.querySelector('form');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Email validation
            if (!emailInput.value || !isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            // Password validation
            if (!passwordInput.value) {
                showError(passwordInput, 'Please enter your password');
                isValid = false;
            } else {
                removeError(passwordInput);
            }
            
            if (!isValid) {
                e.preventDefault();
                // Focus on first invalid field
                const firstInvalid = form.querySelector('.is-invalid');
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            }
        });
        
        function isValidEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        
        function showError(input, message) {
            input.classList.add('is-invalid');
            let errorElement = input.parentNode.querySelector('.invalid-feedback');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'invalid-feedback';
                input.parentNode.appendChild(errorElement);
            }
            errorElement.textContent = message;
            errorElement.setAttribute('role', 'alert');
        }
        
        function removeError(input) {
            input.classList.remove('is-invalid');
            const errorElement = input.parentNode.querySelector('.invalid-feedback');
            if (errorElement) {
                errorElement.remove();
            }
        }
        
        // Real-time validation
        emailInput.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                showError(this, 'Please enter a valid email address');
            } else {
                removeError(this);
            }
        });
        
        passwordInput.addEventListener('blur', function() {
            if (!this.value) {
                showError(this, 'Please enter your password');
            } else if (this.value.length < 6) {
                showError(this, 'Password must be at least 6 characters');
            } else {
                removeError(this);
            }
        });
        
        // Navbar active link highlighting
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPath = localStorage.getItem('activeNav') || window.location.pathname;
        
        navLinks.forEach(link => {
            if (link.dataset.path === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
            
            link.addEventListener('click', () => {
                localStorage.setItem('activeNav', link.dataset.path);
            });
        });
    });
</script>