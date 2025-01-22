<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function like(Request $request, $noteId)
    {
        $user = $request->user();
        $like = Like::firstOrCreate([
            'note_id' => $noteId,
            'user_id' => $user->id,
        ]);

        return response()->json([
            'success' => true,
            'liked' => $like->wasRecentlyCreated, // Whether the user just liked it
            'count' => Like::where('note_id', $noteId)->count(), // Total like count
        ]);
    }

    public function unlike(Request $request, $noteId)
    {
        $user = $request->user();
        $like = Like::where('note_id', $noteId)
                    ->where('user_id', $user->id)
                    ->first();

        if ($like) {
            $like->delete();
        }

        return response()->json([
            'success' => $like !== null, // Whether the unlike action was successful
            'count' => Like::where('note_id', $noteId)->count(), // Total like count
        ]);
    }

}
