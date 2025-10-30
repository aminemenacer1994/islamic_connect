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

    // Redirect to Google
    public function redirectToGoogle()
    {
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
    public function redirectToFacebook()
    {
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
            return redirect('/dashboard');
        } catch (\Exception $e) {
            return redirect('/welcome')->withErrors('Facebook login failed. Please try again.');
        }
    }

    public function redirectToLinkedIn()
    {
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
        return redirect('/');
    }

    public function __construct()
    {
        $this->middleware('guest')->except('/');
    }
}
