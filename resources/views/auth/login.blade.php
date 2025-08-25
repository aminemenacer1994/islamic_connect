@extends('layouts.app')

@section('content')


<!-- Login 2 - Bootstrap Brain Component -->
<div class="bg-light py-3 py-md-5">
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
        <div class="bg-white p-4 p-md-5 rounded shadow-lg" style="border-radius:8px">
          <div class="row">
            <div class="col-12">
              <div class="mb-5">
                <h1>Log in</h1>
              </div>
            </div>
          </div>
          <form method="POST" action="{{ route('login') }}">
          @csrf
            <div class="row gy-3 gy-md-4 overflow-hidden">
              <div class="col-12">
              <div class="form-outline mb-4">
                                        <label class="form-label text-left" style="font-weight:bold">Email address</label>
                                        <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                                        @error('email')
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                        @enderror
                                    </div>
              </div>
              <div class="col-12">
              <label class="form-label text-left" for="form2Example27">Password</label>
                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">
                    @error('password')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
              </div>
              <div class="col-12">
                <div class="form-check">
                <p class="mb-3 pb-lg-2 pt-2 custom-text text-left" ><b>Don't have an account? <a style="text-decoration: none" href="/register" style="color: #00BFA6;">Register here</a></b></p>
                </div>
              </div>
              <div class="col-12">
                <div class="d-grid">
                  <button class="btn btn-lg" style="background: #00BFA6; color:white; font-style:bold" type="submit">Log in now</button>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                <div class="d-flex gap-2 gap-md-4 flex-column flex-md-row text-center mt-5">
                    <a href="/register" class="link-secondary text-center text-decoration-none">Create new account</a>
                    <!-- <a href="#!" class="link-secondary text-decoration-none">Forgot password</a> -->
                </div>
              </div>
    
            </div>
              <hr class="mt-5 mb-3 border-secondary-subtle">

              <!-- <div class="row mt-3 text-center">
                <div class="col w-100">
                    <button onclick="event.preventDefault(); window.location.href='{{ url('/auth/google') }}'" class="gsi-material-button">
                    <div class="gsi-material-button-state"></div>
                        <div class="gsi-material-button-content-wrapper">
                        <div class="gsi-material-button-icon">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                        </div>
                        <span class="gsi-material-button-contents">Sign up with Google</span>
                        <span style="display: none;">Sign up with Google</span>
                        </div>
                    </button>
                </div> -->
            </div>
            </div>
          </form>
          
          <!-- <div class="row">
            <div class="col-12">
              <p class="mt-5 mb-4">Or sign in with</p>
              <div class="d-flex gap-3 flex-column flex-md-row">
                <a href="#!" class="btn bsb-btn-xl btn-outline-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                  </svg>
                  <span class="ms-2 fs-6">Google</span>
                </a>
                <a href="#!" class="btn bsb-btn-xl btn-outline-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                  <span class="ms-2 fs-6">Facebook</span>
                </a>
                <a href="#!" class="btn bsb-btn-xl btn-outline-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                  <span class="ms-2 fs-6">Twitter</span>
                </a>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</div>


<!-- <section class="">
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

                                    <!-- google sign in -->
                                    <!-- <div class="container-fluid text-center" style="display:flex">
                                        <div class="container-fluid text-center">
                                        
                                        
                                        <div class="row">
                                        <div class="col w-100">
                                            <button onclick="event.preventDefault(); window.location.href='{{ url('/auth/google') }}'" class="gsi-material-button">
                                            <div class="gsi-material-button-state"></div>
                                                <div class="gsi-material-button-content-wrapper">
                                                <div class="gsi-material-button-icon">
                                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;">
                                                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                                        <path fill="none" d="M0 0h48v48H0z"></path>
                                                    </svg>
                                                </div>
                                                <span class="gsi-material-button-contents">Sign up with Google</span>
                                                <span style="display: none;">Sign up with Google</span>
                                                </div>
                                            </button>
                                        </div>
                                        </div>
                                        </div>
                                    </div> -->
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
      .gsi-material-button {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-appearance: none;
  background-color: WHITE;
  background-image: none;
  border: 1px solid #747775;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #1f1f1f;
  cursor: pointer;
  font-family: 'Roboto', arial, sans-serif;
  font-size: 14px;
  height: 40px;
  letter-spacing: 0.25px;
  outline: none;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  text-align: center;
  -webkit-transition: background-color .218s, border-color .218s, box-shadow .218s;
  transition: background-color .218s, border-color .218s, box-shadow .218s;
  vertical-align: middle;
  white-space: nowrap;
  width: auto;
  
}

input:focus, textarea:focus, select:focus {
    outline: none;
    box-shadow: none;
}

.gsi-material-button .gsi-material-button-icon {
  height: 20px;
  margin-right: 12px;
  min-width: 20px;
  width: 20px;
}

.gsi-material-button .gsi-material-button-content-wrapper {
  -webkit-align-items: center;
  align-items: center;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: nowrap;
  flex-wrap: nowrap;
  height: 100%;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.gsi-material-button .gsi-material-button-contents {
  -webkit-flex-grow: 1;
  flex-grow: 1;
  font-family: 'Roboto', arial, sans-serif;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
}

.gsi-material-button .gsi-material-button-state {
  -webkit-transition: opacity .218s;
  transition: opacity .218s;
  bottom: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.gsi-material-button:disabled {
  cursor: default;
  background-color: #ffffff61;
  border-color: #1f1f1f1f;
}

.gsi-material-button:disabled .gsi-material-button-contents {
  opacity: 38%;
}

.gsi-material-button:disabled .gsi-material-button-icon {
  opacity: 38%;
}

.gsi-material-button:not(:disabled):active .gsi-material-button-state, 
.gsi-material-button:not(:disabled):focus .gsi-material-button-state {
  background-color: #303030;
  opacity: 12%;
}

.gsi-material-button:not(:disabled):hover {
  -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
}

.gsi-material-button:not(:disabled):hover .gsi-material-button-state {
  background-color: #303030;
  opacity: 8%;
}

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
