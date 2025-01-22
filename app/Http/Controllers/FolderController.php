<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Folder;
use Illuminate\Support\Facades\Auth;

class FolderController extends Controller
{
    public function index()
    {
        // Fetch all folders belonging to the authenticated user
        $folders = Auth::user()->folders;
        return response()->json(['folders' => $folders]);
    }

    public function fetchFolders()
    {
        $folders = Folder::get();
        return response()->json($folders);
    }


    // In your FolderController or a dedicated BookmarkController
    public function getBookmarksByFolder($folderId)
    {
        // Fetch the folder by ID
        $folder = Folder::findOrFail($folderId);

        // Ensure the folder belongs to the authenticated user
        if ($folder->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

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
        $folder = Folder::create([
            'name' => $validated['name'],
            'user_id' => Auth::id(),
        ]);

        return response()->json(['message' => 'Folder created successfully!', 'folder' => $folder], 201);
    }

    // Method to get all folders for the authenticated user
    public function getFolders()
    {
        $folders = Auth::user()->folders()->get();
        return response()->json(['folders' => $folders]);
    }

    

    public function update(Request $request, $id)
    {
        $validated = $request->validate(['name' => 'required|string']);

        // Find the folder belonging to the authenticated user and update it
        $folder = Auth::user()->folders()->findOrFail($id);
        $folder->update($validated);

        return response()->json($folder);
    }

    public function delete($id)
    {
        // Find the folder by ID and ensure it belongs to the authenticated user
        $folder = Auth::user()->folders()->findOrFail($id);
        
        // Optionally, delete associated bookmarks or handle folder-related logic
        // $folder->bookmarks()->delete();

        // Delete the folder
        $folder->delete();

        return response()->json(['message' => 'Folder deleted successfully']);
    }

}

