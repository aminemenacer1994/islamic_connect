<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Traits\BookmarkSessionAware;
use App\Models\Bookmark;
use App\Models\Folder;
use Illuminate\Support\Facades\Auth;

class BookmarkController extends Controller
{
    use BookmarkSessionAware;

    public function index(Request $request)
    {
        $owner = $this->bookmarkOwner($request);
        if (empty($owner)) {
            return view('bookmark', ['bookmarks' => collect()]);
        }

        $bookmarks = $this->applyOwnerScope(Bookmark::query(), $request)
            ->orderBy('created_at', 'desc')
            ->get();

        return view('bookmark', compact('bookmarks'));
    }

    public function getBookmarks(Request $request, $userId = null)
    {
        $owner = $this->bookmarkOwner($request);
        if (empty($owner)) {
            abort(401);
        }

        $bookmarks = $this->applyOwnerScope(Bookmark::query(), $request)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($bookmarks);
    }

    
    public function store(Request $request)
    {
        $ownerData = $this->ownerPayload($request);
        // Check if this is a guide bookmark or Quran bookmark
        if ($request->has('title') && $request->has('content')) {
            // This is a guide bookmark
            $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'category' => 'nullable|string|max:255',
            ]);

            // Create the guide bookmark
            $bookmark = Bookmark::create(array_merge([
                'title' => $request->input('title'),
                'ayah_verse_en' => $request->input('content'), // Using ayah_verse_en for content
                'surah_name' => $request->input('category', 'Islamic Guide'), // Using surah_name for category
            ], $ownerData));

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
            $bookmark = Bookmark::create(array_merge([
                'surah_name' => $request->input('surah_name'),
                'ayah_num' => $request->input('ayah_num'),
                'surah_number' => $request->input('surah_number'),
                'ayah_number' => $request->input('ayah_num'),
                'ayah_verse_ar' => $request->input('ayah_verse_ar'),
                'ayah_verse_en' => $request->input('ayah_verse_en'),
            ], $ownerData));

            $folderIds = collect($request->input('folder_ids', []))
                ->push($request->input('folder_id'))
                ->filter()
                ->unique()
                ->values()
                ->all();

            if (!empty($folderIds)) {
                $ownedFolderIds = $this->applyOwnerScope(Folder::query(), $request)
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
        $ownerData = $this->ownerPayload($request);
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'nullable|string|max:255',
        ]);

        // Create the guide bookmark
        $bookmark = Bookmark::create(array_merge([
            'title' => $request->input('title'),
            'ayah_verse_en' => $request->input('content'), // Using ayah_verse_en for content
            'surah_name' => $request->input('category', 'Islamic Guide'), // Using surah_name for category
        ], $ownerData));

        return response()->json([
            'message' => 'Guide bookmark successfully saved!',
            'bookmark' => $bookmark,
        ], 201);
    }
    

    public function getBookmarksByFolder(Request $request)
    {
        $owner = $this->bookmarkOwner($request);
        if (empty($owner)) {
            return response()->json(['folders' => []]);
        }

        $folders = $this->applyOwnerScope(Folder::query(), $request)
            ->with('bookmarks')
            ->get();

        return response()->json(['folders' => $folders]);
    }


    public function deleteBookmarks(Request $request, $id)
    {
        $bookmark = $this->applyOwnerScope(Bookmark::query(), $request)->findOrFail($id);
        $this->authorize('delete', $bookmark);
        $bookmark->folders()->detach();
        $bookmark->delete();

        return response()->json(['message' => 'Bookmark deleted successfully']);
    }
}
