<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class FeedbackController extends Controller
{
    public function index()
    {
        return view('feedback');
    }

    public function getFeedbacks()
    {
        $feedback = Feedback::orderBy('id', 'desc')->get();
        return $feedback;
    }

    public function sendMessage(Request $request)
    {
        $this->validate($request, [
            'firstname' => ['nullable', 'string', 'max:60'],
            'lastname' => ['nullable', 'string', 'max:60'],
            'email' => ['nullable', 'email', 'max:255'],
            'mobile' => ['nullable', 'string', 'regex:/^[0-9]{10,15}$/'],
            'subject' => ['required', Rule::in(Feedback::subjectValues())],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        $feedback = new Feedback();
        $feedback->firstname = $request->firstname;
        $feedback->lastname = $request->lastname;
        $feedback->email = $request->email;
        $feedback->mobile = $request->mobile;
        $feedback->subject = $request->subject;
        $feedback->message = $request->message;
        $feedback->save();

        return response()->json([
            'message' => 'Message sent successfully',
        ]);
        
    }
}
