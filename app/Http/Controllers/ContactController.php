<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feedback;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;


class ContactController extends Controller
{
    public function index()
    {
        return view('contact');
        
    }

    public function fetchAudioFile($id)
    {
        try {
            $response = Http::get("https://cdn.islamic.network/quran/audio/128/ar.alafasy/{id}.mp3");
            return $response->body();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch audio file'], 500);
        }
    }

    public function sendMessage(Request $request)
    {
        $this->validate($request, [
            'firstname',
            'lastname',
            'email',
            'mobile',
            'subject',
            'message'
        ]);

        $feedback = new Feedback();

        $feedback->firstname = $request->firstname;
        $feedback->lastname = $request->lastname;
        $feedback->email = $request->email;
        $feedback->mobile = $request->mobile;
        $feedback->subject = $request->subject;
        $feedback->message = $request->message;
        $feedback->save();
        
    }
}
