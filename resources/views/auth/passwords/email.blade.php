@extends('layouts.app')

@section('content')
<main id="main-content">
    <div class="login-container">
        <div class="login-card">
            <div class="login-header">
                <h1>Reset Password</h1>
                <p>Enter your email to receive a reset link</p>
            </div>

            @if (session('status'))
                <div class="alert alert-success" role="alert">
                    {{ session('status') }}
                </div>
            @endif

            <form method="POST" action="{{ route('password.email') }}">
                @csrf
                <div class="mb-3">
                    <label for="email" class="form-label">Email Address</label>
                    <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus placeholder="Enter your email">
                    @error('email')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>

                <div class="d-grid mb-2">
                    <button type="submit" style="background: var(--primary-color); color: #ffffff;" class="btn btn-lg">
                        Send Reset Link
                    </button>
                </div>
            </form>

            <div class="login-footer">
                <p><a href="{{ route('login') }}">Back to sign in</a></p>
            </div>
        </div>
    </div>
</main>
@endsection

<style>
    :root { --primary-color:#006b5f; --primary-hover:#00564c; --text-color:#1a1a1a; --light-bg:#f8f9fa; --border-radius:8px; --shadow:0 4px 12px rgba(0,0,0,.08); --transition:all .3s ease; }
    .login-container{min-height:calc(100vh - 70px);display:flex;align-items:center;justify-content:center;padding:2rem 0;}
    .login-card{background:#fff;border-radius:var(--border-radius);box-shadow:var(--shadow);padding:2.5rem;width:100%;max-width:550px;transition:var(--transition);border-top:4px solid var(--primary-color);} 
    .login-header{text-align:center;margin-bottom:2rem;} 
    .form-label{font-weight:500;margin-bottom:.5rem;} 
    .form-control{padding:.75rem 1rem;border:1px solid #dee2e6;border-radius:6px;transition:var(--transition);} 
    .form-control:focus{border-color:var(--primary-color);box-shadow:0 0 0 .2rem rgba(0,107,95,.25);} 
    .btn-lg{padding:.75rem;font-weight:500;} 
    .login-footer{text-align:center;margin-top:1.5rem;color:#6c757d;} 
    .login-footer a{color:var(--primary-color);text-decoration:none;font-weight:500;} 
    .login-footer a:hover{text-decoration:underline;} 
</style>
