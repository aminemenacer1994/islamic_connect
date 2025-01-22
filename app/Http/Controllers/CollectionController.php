<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bookmark;
use App\Models\Folder;
use Illuminate\Support\Facades\Auth;

class CollectionController extends Controller
{
    public function index()
    {
        $collections = Auth::user()->bookmarks()->with('folder')->get();
        return view('collection', compact('collections'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        return auth()->user()->collections()->create($validated);
    }

    public function getBookmarks($userId)
    {
        $bookmarks = Bookmark::where('user_id', $userId)
            ->with('folder')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($bookmarks);
    }

    public function getFolders()
    {
        // Check if the user is authenticated
        $user = Auth::user();

        if (!$user) {
            // Return an error response if the user is not authenticated
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        // Retrieve folders associated with the authenticated user
        $folders = $user->folders()->get();

        return response()->json(['folders' => $folders]);
    }
}
