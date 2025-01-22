<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class CommentsController extends Controller
{
    // Fetch comments for a specific note
    public function getComments($noteId) {
        $comments = Comment::where('note_id', $noteId)->get();

        return response()->json([
            'comments' => $comments
        ], 200);
    }

    // Add a new comment
    public function store(Request $request) {
        // Validate the request
        $request->validate([
            'note_id' => 'required|exists:notes,id',
            'comment' => 'required|string|max:255',
        ]);

        // Create a new comment
        $comment = Comment::create([
            'note_id' => $request->note_id,
            'comment' => $request->comment,
        ]);

        // Return the created comment with a success status
        return response()->json($comment, 201);
    }
}
