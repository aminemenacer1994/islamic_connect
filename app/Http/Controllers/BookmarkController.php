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
        $user = Auth::user();
        if (!$user) {
            return view('bookmark', ['bookmarks' => collect()]);
        }

        // Bookmarks are scoped to the authenticated user's primary id
        $bookmarks = Bookmark::where('user_id', (int) $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return view('bookmark', compact('bookmarks'));
    }

    public function getBookmarks($userId)
    {
        $user = Auth::user();
        if (!$user) {
            abort(401);
        }

        // Client can only fetch its own bookmarks
        if ((int) $userId !== (int) $user->id) {
            abort(403);
        }

        $bookmarks = Bookmark::where('user_id', (int)$user->id)
            ->orderBy('created_at', 'desc')
            ->get();

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
                'surah_number' => 'nullable|integer|min:1|max:114',
                'folder_id' => 'nullable|integer',
                'folder_ids' => 'array',
                'folder_ids.*' => 'integer',
            ]);

            // Create the bookmark
            $bookmark = Bookmark::create([
                'surah_name' => $request->input('surah_name'),
                'ayah_num' => $request->input('ayah_num'),
                'surah_number' => $request->input('surah_number'),
                'ayah_number' => $request->input('ayah_num'),
                'ayah_verse_ar' => $request->input('ayah_verse_ar'),
                'ayah_verse_en' => $request->input('ayah_verse_en'),
                'user_id' => Auth::id(),
            ]);

            $folderIds = collect($request->input('folder_ids', []))
                ->push($request->input('folder_id'))
                ->filter()
                ->unique()
                ->values()
                ->all();

            if (!empty($folderIds)) {
                $ownedFolderIds = Folder::where('user_id', Auth::id())
                    ->where('is_smart', false)
                    ->whereIn('id', $folderIds)
                    ->pluck('id')
                    ->all();

                $bookmark->folders()->syncWithoutDetaching($ownedFolderIds);
            }

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
