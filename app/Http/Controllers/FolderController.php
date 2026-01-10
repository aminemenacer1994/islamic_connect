<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Traits\BookmarkSessionAware;
use App\Models\Folder;

class FolderController extends Controller
{
    use BookmarkSessionAware;

    public function index(Request $request)
    {
        $owner = $this->bookmarkOwner($request);
        if (empty($owner)) {
            return response()->json(['folders' => []]);
        }

        $folders = $this->applyOwnerScope(Folder::query(), $request)->get();
        return response()->json(['folders' => $folders]);
    }

    public function fetchFolders(Request $request)
    {
        $owner = $this->bookmarkOwner($request);
        if (empty($owner)) {
            return response()->json([]);
        }

        $folders = $this->applyOwnerScope(Folder::query(), $request)->get();
        return response()->json($folders);
    }


    // In your FolderController or a dedicated BookmarkController
    public function getBookmarksByFolder(Request $request, $folderId)
    {
        // Fetch the folder by ID
        $folder = $this->applyOwnerScope(Folder::query(), $request)->findOrFail($folderId);

        // Retrieve the bookmarks associated with this folder
        $bookmarks = $folder->bookmarks()->get();

        return response()->json(['bookmarks' => $bookmarks], 200);
    }

    // Method to store a new folder
    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Create a new folder
        $ownerData = $this->ownerPayload($request);
        $folder = Folder::create(array_merge([
            'name' => $validated['name'],
        ], $ownerData));

        return response()->json(['message' => 'Folder created successfully!', 'folder' => $folder], 201);
    }

    // Method to get all folders for the authenticated user
    public function getFolders(Request $request)
    {
        $owner = $this->bookmarkOwner($request);
        if (empty($owner)) {
            return response()->json(['folders' => []]);
        }

        $folders = $this->applyOwnerScope(Folder::query(), $request)->get();
        return response()->json(['folders' => $folders]);
    }

    

    public function update(Request $request, $id)
    {
        $validated = $request->validate(['name' => 'required|string']);
        $folder = $this->applyOwnerScope(Folder::query(), $request)->findOrFail($id);
        $folder->update($validated);

        return response()->json($folder);
    }

    public function delete(Request $request, $id)
    {
        $folder = $this->applyOwnerScope(Folder::query(), $request)->findOrFail($id);

        // Optionally, delete associated bookmarks or handle folder-related logic
        // $folder->bookmarks()->delete();

        $folder->delete();

        return response()->json(['message' => 'Folder deleted successfully']);
    }

}
