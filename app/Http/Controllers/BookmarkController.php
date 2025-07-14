<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bookmark;
use App\Models\Folder;
use Illuminate\Support\Facades\Auth;

class BookmarkController extends Controller
{
    public function index()
    {
        // Retrieves bookmarks associated with the authenticated user
        $bookmarks = Auth::user()->bookmarks()->orderBy('created_at', 'desc')->get();
        return view('bookmark', compact('bookmarks'));
    }

    public function getBookmarks($userId)
    {
        $bookmarks = Bookmark::where('user_id', $userId)->orderBy('created_at', 'desc')->get();

        return response()->json($bookmarks);
    }

    
    public function store(Request $request)
    {
        // Check if this is a guide bookmark or Quran bookmark
        if ($request->has('title') && $request->has('content')) {
            // This is a guide bookmark
            $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'category' => 'nullable|string|max:255',
            ]);

            // Create the guide bookmark
            $bookmark = Bookmark::create([
                'title' => $request->input('title'),
                'ayah_verse_en' => $request->input('content'), // Using ayah_verse_en for content
                'surah_name' => $request->input('category', 'Islamic Guide'), // Using surah_name for category
                'user_id' => Auth::id(),
            ]);

            return response()->json([
                'message' => 'Guide bookmark successfully saved!',
                'bookmark' => $bookmark,
            ], 201);
        } else {
            // This is a Quran bookmark (existing logic)
            $request->validate([
                'surah_name' => 'required|string|max:255',
                'ayah_num' => 'required|integer',
                'ayah_verse_ar' => 'required|string',
                'ayah_verse_en' => 'required|string',
            ]);

            // Create the bookmark
            $bookmark = Bookmark::create([
                'surah_name' => $request->input('surah_name'),
                'ayah_num' => $request->input('ayah_num'),
                'ayah_verse_ar' => $request->input('ayah_verse_ar'),
                'ayah_verse_en' => $request->input('ayah_verse_en'),
                'user_id' => Auth::id(),
            ]);

            return response()->json([
                'message' => 'Bookmark successfully saved!',
                'bookmark' => $bookmark,
            ], 201);
        }
    }

    public function storeGuideBookmark(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'nullable|string|max:255',
        ]);

        // Create the guide bookmark
        $bookmark = Bookmark::create([
            'title' => $request->input('title'),
            'ayah_verse_en' => $request->input('content'), // Using ayah_verse_en for content
            'surah_name' => $request->input('category', 'Islamic Guide'), // Using surah_name for category
            'user_id' => Auth::id(),
        ]);

        return response()->json([
            'message' => 'Guide bookmark successfully saved!',
            'bookmark' => $bookmark,
        ], 201);
    }
    

    public function getBookmarksByFolder()
    {
        // Retrieve the folders and their associated bookmarks for the authenticated user
        $folders = Auth::user()->folders()->with('bookmarks')->get();

        return response()->json(['folders' => $folders]);
    }


    public function deleteBookmarks($id)
    {
        // Retrieve the bookmark by ID
        $bookmark = Bookmark::findOrFail($id);

        // Ensure the authenticated user owns the bookmark
        if (Auth::id() != $bookmark->user_id) {
            abort(403); // Forbidden
        }

        // Delete the bookmark
        $bookmark->delete();

        return response()->json(['message' => 'Bookmark deleted successfully']);
    }
}


