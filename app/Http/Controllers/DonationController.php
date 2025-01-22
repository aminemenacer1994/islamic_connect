<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;

class DonationController extends Controller
{
    public function index()
    {
        return view('donations');
    }

    public function getDonations()
    {
        $donations = Donation::orderBy('id', 'desc')->get();
        return $donations;
    }
}
