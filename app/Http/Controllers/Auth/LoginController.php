<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    protected $redirectTo = '/welcome';

    public function showLoginForm(Request $request)
    {
        $this->storeIntendedUrlFromRequest($request);

        return view('auth.login');
    }

    // Redirect to Google
    public function redirectToGoogle(Request $request)
    {
        $this->storeIntendedUrlFromRequest($request);
        return Socialite::driver('google')->redirect();
    }

    // Handle Google callback
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            $user = User::firstOrCreate(
                ['email' => $googleUser->email],
                ['name' => $googleUser->name, 'password' => bcrypt(rand(100000, 999999))]
            );

            Auth::login($user);
            return redirect()->intended($this->redirectPath());
        } catch (\Exception $e) {
            return redirect('/welcome')->withErrors('Google login failed. Please try again.');
        }
    }

    // Redirect to Facebook
    public function redirectToFacebook(Request $request)
    {
        $this->storeIntendedUrlFromRequest($request);
        return Socialite::driver('facebook')->redirect();
    }

    // Handle Facebook callback
    public function handleFacebookCallback()
    {
        try {
            $facebookUser = Socialite::driver('facebook')->stateless()->user();

            $user = User::updateOrCreate(
                [
                    'email' => $facebookUser->getEmail(),
                ],
                [
                    'name' => $facebookUser->getName(),
                    'facebook_id' => $facebookUser->getId(),
                    'avatar' => $facebookUser->getAvatar(),
                ]
            );

            Auth::login($user);
            return redirect()->intended('/dashboard');
        } catch (\Exception $e) {
            return redirect('/welcome')->withErrors('Facebook login failed. Please try again.');
        }
    }

    public function redirectToLinkedIn(Request $request)
    {
        $this->storeIntendedUrlFromRequest($request);
        return Socialite::driver('linkedin')
            ->scopes(['r_liteprofile', 'r_emailaddress']) // Request the necessary permissions
            ->stateless()
            ->redirect();
    }


    public function handleLinkedInCallback()
    {
        try {
            $linkedinUser = Socialite::driver('linkedin')->user();

            // Check if the user has provided email and name
            if (!$linkedinUser->getEmail() || !$linkedinUser->getName()) {
                return redirect()->route('login')->withErrors('Missing required permissions.');
            }

            $user = User::firstOrCreate([
                'email' => $linkedinUser->getEmail(),
            ], [
                'name' => $linkedinUser->getName(),
                'linkedin_id' => $linkedinUser->getId(),
            ]);

            auth()->login($user);

            return redirect()->intended('/'); // Or a specific page
        } catch (\Exception $e) {
            return redirect()->route('login')->withErrors('Something went wrong. Please try again.');
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('login');
    }

    public function __construct()
    {
        // Allow authenticated users to access the logout action; guests elsewhere
        $this->middleware('guest')->except('logout');
    }

    private function storeIntendedUrlFromRequest(Request $request): void
    {
        if ($request->session()->has('url.intended')) {
            return;
        }

        $candidate = $request->query('redirect')
            ?? $request->query('next')
            ?? $request->headers->get('referer');

        $intended = $this->sanitizeRedirectCandidate($request, is_string($candidate) ? $candidate : null);
        if ($intended === null) {
            return;
        }

        $request->session()->put('url.intended', $intended);
    }

    private function sanitizeRedirectCandidate(Request $request, ?string $candidate): ?string
    {
        $candidate = is_string($candidate) ? trim($candidate) : '';
        if ($candidate === '') {
            return null;
        }

        $requestHost = $request->getHost();

        // If it's a fully-qualified URL, only allow same-origin redirects.
        if (preg_match('/^https?:\\/\\//i', $candidate)) {
            $parts = parse_url($candidate);
            if (!is_array($parts)) {
                return null;
            }

            $host = $parts['host'] ?? null;
            if (!$host || strcasecmp($host, $requestHost) !== 0) {
                return null;
            }

            $path = $parts['path'] ?? '/';
            $query = isset($parts['query']) ? ('?' . $parts['query']) : '';
            $fragment = isset($parts['fragment']) ? ('#' . $parts['fragment']) : '';
            $candidate = $path . $query . $fragment;
        }

        // Only allow app-internal paths (avoid protocol-relative URLs like //evil.com).
        if (!str_starts_with($candidate, '/') || str_starts_with($candidate, '//')) {
            return null;
        }

        // Avoid redirecting back to auth pages (login loops / unexpected flows).
        $pathOnly = parse_url($candidate, PHP_URL_PATH) ?: '';
        foreach (['/login', '/register', '/password', '/logout'] as $blockedPrefix) {
            if (str_starts_with($pathOnly, $blockedPrefix)) {
                return null;
            }
        }

        return $candidate;
    }
}
