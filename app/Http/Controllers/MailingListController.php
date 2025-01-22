<?php

namespace App\Http\Controllers;

use App\Models\MailingList;
use Illuminate\Http\Request;

class MailingListController extends Controller
{
    public function index()
    {
        return view('mailing_list');
    }
    
    public function getMail()
    {
        $mailinglist = Mailinglist::orderBy('id', 'desc')->get();
        return $mailinglist;
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'lastname' => 'required',
            'phone' => 'required',
            'email' => 'required',
        ]);

        $mailinglist = new MailingList();
        $mailinglist->name = $request->name;
        $mailinglist->lastname = $request->lastname;
        $mailinglist->phone = $request->phone;
        $mailinglist->email = $request->email;
        $mailinglist->save();
    }

    public function submitMail(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:mailinglist,email',
        ]);

        $mailinglist = new MailingList();
        $mailinglist->name = $request->name;
        $mailinglist->email = $request->email;
        $mailinglist->save();
    }
}
