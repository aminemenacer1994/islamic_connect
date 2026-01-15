@extends('layouts.app')
@section('content')

<!-- Main Content -->
<main id="main-content">
    <div class="auth-page" role="region" aria-label="Registration form">
        <div class="auth-page__glow auth-page__glow--left" aria-hidden="true"></div>
        <div class="auth-page__glow auth-page__glow--right" aria-hidden="true"></div>
        <div class="auth-card">
            

            <form method="POST" action="{{ route('register') }}" novalidate>
                <div >
                    <h1>Create an account</h1>
                </div>
                @csrf
                <div class="auth-field">
                    <label for="name" class="form-label">First Name</label>
                    <input id="name" type="text" class="form-control auth-input @error('name') is-invalid @enderror"
                            name="name" value="{{ old('name') }}" required autocomplete="name" autofocus
                            placeholder="Enter your first name">
                    @error('name')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>

                <div class="auth-field">
                    <label for="email" class="form-label">Email Address</label>
                    <input id="email" type="email" class="form-control auth-input @error('email') is-invalid @enderror"
                            name="email" value="{{ old('email') }}" required autocomplete="email"
                            placeholder="Enter your email">
                    @error('email')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>

                <div class="auth-field">
                    <label for="password" class="form-label">Password</label>
                    <input id="password" type="password"
                            class="form-control auth-input @error('password') is-invalid @enderror"
                            name="password" required autocomplete="new-password"
                            placeholder="Create a password">
                    @error('password')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>

                <div class="auth-field">
                    <label for="password-confirm" class="form-label">Confirm Password</label>
                    <input id="password-confirm" type="password" class="form-control auth-input"
                            name="password_confirmation" required autocomplete="new-password"
                            placeholder="Confirm your password">
                </div>

                <!-- <p class="auth-card__benefits">
                    Create your free account to save bookmarks, write notes &amp; reflections, and keep everything synchronized on every device.
                </p> -->

                <div class="auth-card__button">
                    <button type="submit" class="btn btn-lg btn-primary-auth">Create Account</button>
                </div>
            </form>

            <div class="divider">
                <span>Or sign up with</span>
            </div>

            <div class="social-auth">
                <a href="/auth/google" class="social-btn btn-google" aria-label="Sign up with Google">
                    <i class="bi bi-google"></i> Google
                </a>
            </div>

            <div class="auth-card__footer">
                <p>Already have an account? <a href="/login">Sign in here</a></p>
            </div>
        </div>
    </div>
</main>

@endsection


<style>
    :root {
        --auth-teal: #0f9c7f;
        --auth-teal-dark: #0a6d60;
        --auth-muted: #5e6570;
        --auth-border: rgba(15, 110, 99, 0.18);
    }

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        min-height: 100vh;
        font-family: 'Nunito', 'Inter', sans-serif;
        color: #0c1f1b;
        background: radial-gradient(circle at top left, #fdfdf7, #f5f8f7 45%, #eef7f4);
        padding-top: 70px;
    }

    #main-content {
        min-height: calc(100vh - 70px);
    }

    .navbar {
        background-color: #ffffff;
        box-shadow: 0 18px 40px rgba(13, 39, 33, 0.08);
    }

    .nav-link {
        color: #051818;
        font-weight: 500;
    }

    .nav-link:hover,
    .nav-link.active {
        color: var(--auth-teal);
    }

    .auth-page {
        min-height: calc(100vh - 70px);
        padding: clamp(2rem, 5vw, 3.5rem);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
    }

    .auth-page__glow {
        position: absolute;
        width: 360px;
        height: 360px;
        border-radius: 50%;
        filter: blur(70px);
        opacity: 0.55;
    }

    .auth-page__glow--left {
        top: -80px;
        left: -40px;
        background: rgba(13, 182, 145, 0.35);
    }

    .auth-page__glow--right {
        bottom: -120px;
        right: -20px;
        background: rgba(9, 95, 84, 0.25);
    }

    .auth-card {
        width: min(520px, 92vw);
        border-radius: 36px;
        border: 1px solid rgba(15, 110, 99, 0.15);
        padding: clamp(2rem, 3vw, 3rem);
        background: #ffffff;
        box-shadow: 0 30px 70px rgba(15, 53, 48, 0.15);
        position: relative;
        z-index: 1;
    }

    .auth-card__header {
        margin-bottom: 1.4rem;
    }

    .auth-card__badge {
        display: inline-flex;
        align-items: center;
        padding: 0.35rem 1rem;
        border-radius: 999px;
        background: rgba(15, 156, 125, 0.12);
        color: #0f6258;
        font-size: 0.85rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        margin-bottom: 0.45rem;
    }

    .auth-card__header h1 {
        margin-bottom: 0.25rem;
        font-size: clamp(2.2rem, 4vw, 2.9rem);
        color: #0f2b2a;
    }

    .auth-card__lead {
        color: var(--auth-muted);
        line-height: 1.6;
        font-size: 1rem;
        
    }

    .auth-field {
        margin-bottom: 1rem;
    }

    .auth-card form {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
    }

    .form-label {
        font-weight: 600;
        font-size: 0.95rem;
        color: #0c1f1b;
        margin-bottom: 0.35rem;
        display: block;
    }

    .auth-input {
        width: 100%;
        padding: 0.9rem 1.2rem;
        border-radius: 14px;
        border: 1px solid var(--auth-border);
        background: #fdfdfd;
        font-size: 1rem;
        color: #0b1a19;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .auth-input:focus {
        border-color: var(--auth-teal);
        box-shadow: 0 0 0 0.2rem rgba(15, 156, 125, 0.3);
        outline: none;
    }

    .auth-card__benefits {
        text-align: center;
        margin: 0 0 1.25rem;
        color: var(--auth-muted);
        line-height: 1.6;
        font-size: 0.95rem;
    }

    .auth-card__button {
        margin-bottom: 0.35rem;
    }

    .btn-primary-auth {
        width: 100%;
        padding: 0.95rem 1.25rem;
        border-radius: 16px;
        border: none;
        background: linear-gradient(135deg, var(--auth-teal), var(--auth-teal-dark));
        color: #fff !important;
        font-size: 1.05rem;
        font-weight: 600;
        letter-spacing: 0.03em;
        box-shadow: 0 12px 30px rgba(15, 110, 99, 0.3);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .btn-primary-auth:hover {
        transform: translateY(-1px);
        box-shadow: 0 18px 36px rgba(15, 110, 99, 0.35);
    }

    .divider {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: #8a92a0;
        font-size: 0.9rem;
        margin: 1.5rem 0;
    }

    .divider::before,
    .divider::after {
        content: "";
        flex: 1;
        height: 1px;
        border-radius: 999px;
        background: rgba(15, 110, 99, 0.18);
    }

    .social-auth {
        display: flex;
        gap: 0.75rem;
    }

    .social-btn {
        width: 100%;
        padding: 0.85rem;
        border-radius: 12px;
        border: 1px solid rgba(15, 110, 99, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.6rem;
        font-weight: 600;
        color: #28343f;
        text-decoration: none;
        background: #fff;
        transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    }

    .social-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 14px 32px rgba(15, 110, 99, 0.25);
        background: rgba(15, 156, 125, 0.08);
        border-color: rgba(15, 110, 99, 0.4);
        color: #0f5c4f;
    }

    .social-btn i {
        font-size: 1.1rem;
    }

    .auth-card__footer {
        margin-top: 1.5rem;
        text-align: center;
        color: var(--auth-muted);
        font-size: 0.95rem;
    }

    .auth-card__footer a {
        color: var(--auth-teal);
        font-weight: 600;
    }

    .auth-card__footer a:hover {
        text-decoration: underline;
    }

    .invalid-feedback {
        display: block;
        color: #dc3545;
        margin-top: 0.35rem;
        font-size: 0.9rem;
    }

    .auth-input.is-invalid {
        border-color: #dc3545;
    }

    .auth-input.is-invalid:focus {
        border-color: #dc3545;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }

    button:focus,
    input:focus,
    select:focus,
    textarea:focus {
        outline: 2px solid rgba(15, 156, 125, 0.5);
        outline-offset: 2px;
    }

    @media (max-width: 600px) {
        .auth-card {
            padding: 1.75rem;
        }

        .auth-card__badge {
            font-size: 0.8rem;
        }
    }
</style>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer></script>
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
            } else if (passwordInput.value.length < 6) {
                showError(passwordInput, 'Password must be at least 6 characters');
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
            } else if (this.value.length < 6) {
                showError(this, 'Password must be at least 6 characters');
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
