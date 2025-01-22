@extends('layouts.app')

@section('content')
<section class="">
    <div class="px-4 py-5 px-md-5 text-center text-lg-start">
        <div class="container">
            <div class="row gx-lg-5 align-items-center">
                <div class="col-lg-6 mb-lg-0 hide-on-mobile">
                    <img src="{{ asset('images/mob-auth.png') }}" width="90%" alt="Auth Image" loading="lazy">
                </div>
                <div class="col-lg-6 mb-lg-0">
                    <div class="card" style="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; border-radius:10px">
                        <div class="card-body px-md-5">
                            <form method="POST" action="{{ route('login') }}">
                                @csrf
                                <h2 class="fw-normal mt-4 pb-3" style="font-family:inter"><b>Login to your account</b></h2>
                                <div class="row">
                                    <div class="form-outline mb-4">
                                        <label class="form-label text-left" style="font-weight:bold">Email address</label>
                                        <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                                        @error('email')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                        @enderror
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label class="form-label text-left" for="form2Example27">Password</label>
                                        <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">
                                        @error('password')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                        @enderror
                                    </div>
                                </div>
                                <div class="pt-1 mb-2">
                                    <button type="submit" class="btn btn-lg btn-block text-white" style="background: #00BFA6">Login</button>
                                </div>
                                <div class="text-center">
                                    {{-- @if (Route::has('password.request'))
                                        <a class="btn btn-link" style="text-decoration: none" href="{{ route('password.request') }}">
                                            {{ __('Forgot Your Password?') }}
                                        </a>
                                    @endif --}}
                                    <p class="mb-3 pb-lg-2 pt-2 custom-text" ><b>Don't have an account? <a style="text-decoration: none" href="/register" style="color: #00BFA6;">Register here</a></b></p>
                                </div>
                                
                                    
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection

<style>

    @media (max-width: 575px) {
        .hide-on-mobile {
            display: none;
        }
        .custom-dropdown {
            max-height: 200px;
            overflow-y: auto;
        }
    }
    @media (max-width: 767px) {
        .hide-on-mobile {
            display: none;
        }
        .custom-dropdown {
            max-height: 200px;
            overflow-y: auto;
        }
    }
</style>
