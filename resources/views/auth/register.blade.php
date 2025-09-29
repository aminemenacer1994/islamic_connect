@extends('layouts.app')
@section('content')

<!-- Main Content -->
<main id="main-content">
    <div class="register-container">
        <div class="register-card">
            <div class="register-header">
                <h1>Create an Account</h1>
                <p>Join Islamic Connect to access Quranic resources and Islamic knowledge</p>
            </div>
            
            <form method="POST" action="{{ route('register') }}">
                @csrf
                <div class="mb-3">
                    <label for="name" class="form-label">First Name</label>
                    <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" 
                            name="name" value="{{ old('name') }}" required autocomplete="name" autofocus
                            placeholder="Enter your first name">
                    @error('name')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
                
                <div class="mb-3">
                    <label for="email" class="form-label">Email Address</label>
                    <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" 
                            name="email" value="{{ old('email') }}" required autocomplete="email"
                            placeholder="Enter your email">
                    @error('email')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
                
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" 
                            name="password" required autocomplete="new-password"
                            placeholder="Create a password">
                    <div class="password-requirements">
                        Password must be at least 8 characters
                    </div>
                    @error('password')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
                
                <div class="mb-3">
                    <label for="password-confirm" class="form-label">Confirm Password</label>
                    <input id="password-confirm" type="password" class="form-control" 
                            name="password_confirmation" required autocomplete="new-password"
                            placeholder="Confirm your password">
                </div>
                
                <div class="d-grid mb-3">
                    <button type="submit" style="background:rgb(53, 163, 139); color:white" class="btn btn-lg">Create Account</button>
                </div>
            </form>
            
            <div class="divider">
                <span class="divider-text">Or sign up with</span>
            </div>
            
            <div class="social-register">
                <a href="/auth/google" class="social-btn btn-google" aria-label="Sign up with Google">
                    <i class="bi bi-google"></i> Google
                </a>
            </div>
            
            <div class="register-footer">
                <p>Already have an account? <a href="/login">Sign in here</a></p>
            </div>
        </div>
    </div>
</main>

@endsection


<style>
    :root {
        --primary-color: #35a38b;
        --primary-hover: #2d8c77;
        --text-color: #1a1a1a;
        --light-bg: #f8f9fa;
        --border-radius: 8px;
        --shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        --transition: all 0.3s ease;
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        background-color: var(--light-bg);
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
        color: var(--primary-color);
        transition: color 0.3s ease;
    }
    
    .nav-link.active {
        font-weight: bold;
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
        transition: color 0.3s ease, border-bottom 0.3s ease;
    }
    
    .navbar-toggler {
        border: none;
    }
    
    /* Register Container */
    .register-container {
        min-height: calc(100vh - 70px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem 0;
    }
    
    .register-card {
        background: white;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        padding: 2.5rem;
        width: 100%;
        max-width: 450px;
        transition: var(--transition);
        border-top: 4px solid var(--primary-color);
    }
    
    .register-card:hover {
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    }
    
    .register-header {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .register-header h1 {
        font-weight: 600;
        color: var(--text-color);
        margin-bottom: 0.5rem;
        font-size: 1.75rem;
    }
    
    .register-header p {
        color: #6c757d;
        margin-bottom: 0;
    }
    
    .form-label {
        font-weight: 500;
        margin-bottom: 0.5rem;
    }
    
    .form-control {
        padding: 0.75rem 1rem;
        border: 1px solid #dee2e6;
        border-radius: 6px;
        transition: var(--transition);
        font-family: 'Inter', sans-serif;
    }
    
    .form-control:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 0.2rem rgba(53, 163, 139, 0.25);
    }
    
    .btn-primary {
        background-color: var(--primary-color);
        border-color: var(--primary-color);
        padding: 0.75rem;
        font-weight: 500;
        transition: var(--transition);
        font-family: 'Inter', sans-serif;
    }
    
    .btn-primary:hover {
        background-color: var(--primary-hover);
        border-color: var(--primary-hover);
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(53, 163, 139, 0.3);
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
        border-bottom: 1px solid #dee2e6;
    }
    
    .divider-text {
        padding: 0 1rem;
        color: #6c757d;
        font-size: 0.875rem;
        font-weight: 500;
    }
    
    .social-register {
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
        border: 1px solid #dee2e6;
        border-radius: 6px;
        background: white;
        transition: var(--transition);
        font-weight: 500;
        color: #5f6368;
        text-decoration: none;
    }
    
    .social-btn:hover {
        background-color: #f8f9fa;
        border-color: #adb5bd;
        transform: translateY(-1px);
        color: #5f6368;
    }
    
    .social-btn i {
        margin-right: 0.5rem;
        font-size: 1.1rem;
    }
    
    .btn-google {
        color: #5f6368;
    }
    
    .btn-google:hover {
        background-color: #f8f9fa;
        border-color: #dadce0;
    }
    
    .register-footer {
        text-align: center;
        margin-top: 1.5rem;
        color: #6c757d;
    }
    
    .register-footer a {
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 500;
    }
    
    .register-footer a:hover {
        text-decoration: underline;
    }
    
    .invalid-feedback {
        display: block;
    }
    
    .password-requirements {
        font-size: 0.8rem;
        color: #6c757d;
        margin-top: 0.25rem;
    }
    
    /* Skip to main content for accessibility */
    .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
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
        .register-card {
            padding: 2rem 1.5rem;
            margin: 0 1rem;
        }
        
        .social-register {
            flex-direction: column;
        }
    }
    
    @media (max-width: 576px) {
        .register-header h1 {
            font-size: 1.5rem;
        }
        
        .register-card {
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
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
        :root {
            --text-color: #000;
        }
        
        .navbar {
            border-bottom: 2px solid #000;
        }
        
        .register-card {
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

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
    // Enhanced form validation
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.querySelector('form');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const passwordConfirmInput = document.getElementById('password-confirm');
        
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Name validation
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            // Email validation
            if (!emailInput.value || !isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            // Password validation
            if (!passwordInput.value) {
                showError(passwordInput, 'Please enter a password');
                isValid = false;
            } else if (passwordInput.value.length < 8) {
                showError(passwordInput, 'Password must be at least 8 characters');
                isValid = false;
            } else {
                removeError(passwordInput);
            }
            
            // Password confirmation validation
            if (!passwordConfirmInput.value) {
                showError(passwordConfirmInput, 'Please confirm your password');
                isValid = false;
            } else if (passwordInput.value !== passwordConfirmInput.value) {
                showError(passwordConfirmInput, 'Passwords do not match');
                isValid = false;
            } else {
                removeError(passwordConfirmInput);
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
        nameInput.addEventListener('blur', function() {
            if (!this.value.trim()) {
                showError(this, 'Please enter your name');
            } else {
                removeError(this);
            }
        });
        
        emailInput.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                showError(this, 'Please enter a valid email address');
            } else {
                removeError(this);
            }
        });
        
        passwordInput.addEventListener('blur', function() {
            if (!this.value) {
                showError(this, 'Please enter a password');
            } else if (this.value.length < 8) {
                showError(this, 'Password must be at least 8 characters');
            } else {
                removeError(this);
            }
        });
        
        passwordConfirmInput.addEventListener('blur', function() {
            if (!this.value) {
                showError(this, 'Please confirm your password');
            } else if (passwordInput.value !== this.value) {
                showError(this, 'Passwords do not match');
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
