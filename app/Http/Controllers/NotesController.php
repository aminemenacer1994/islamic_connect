<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;


class NotesController extends Controller
{
    public function showNotes()
    {
        return view('notes');
    }

    public function showGroupNotes()
    {
        return view('group_notes');
    }

    public function getNotes($userId)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        // Notes are keyed to users.id
        $effectiveId = (int) ($user->id);
        $targetId = (int) ($userId ?: $effectiveId);

        if ($targetId !== $effectiveId && !(method_exists($user, 'isAdmin') && $user->isAdmin())) {
            abort(403);
        }

        $notes = Note::where('user_id', $targetId)->orderBy('created_at', 'desc')->get();
        return response()->json($notes);
    }

    public function getNotesWithComments()
    {
        if (!auth()->check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $notes = Note::where('user_id', auth()->id())
            ->with('comments')
            ->get();
        return response()->json(['notes' => $notes], 200);
    }

    public function submitNote(Request $request) {
        $notes = $request->validate([
            'ayah_notes' => 'required|string',
            'option' => 'string',
        ]);
    
        // Save note or handle the request here...
    
        return response()->json(['note' => $notes], 200);
    }
    

    public function fetchNotes($userId = null)
    {
        // If authenticated, prefer returning the caller's notes (or a requested userId when allowed)
        if (auth()->check()) {
            $user = auth()->user();
            // Notes are keyed to users.id
            $currentId = (int) ($user->id);
            $targetId = $userId ?: $currentId;

            // Allow viewing own notes; admins may view any user's notes
            if ((int)$targetId === (int)$currentId || (method_exists(auth()->user(), 'isAdmin') && auth()->user()->isAdmin())) {
                $notes = Note::where('user_id', $targetId)->orderBy('created_at', 'desc')->get();
                return response()->json($notes);
            }
        }

        // Fallback: return only public notes
        $publicNotes = Note::where('visibility_option', 'public')->orderBy('created_at', 'desc')->get();
        return response()->json($publicNotes);
    }


    public function store(Request $request)
    {
        // Validate the input data
        $validatedData = $request->validate([
            'surah_name' => 'nullable|string',
            'ayah_num' => 'nullable|string',
            'ayah_verse_ar' => 'nullable|string',
            'ayah_verse_en' => 'nullable|string',
            'ayah_info' => 'nullable|string',
            'ayah_notes' => 'required|string', 
            'is_speech_to_text' => 'boolean',
        ]);

        // Set the user ID to the effective user identifier
        $user = auth()->user();
        $validatedData['user_id'] = $user ? (int) $user->id : null;

        // Handle file uploads (if applicable)
        if ($request->hasFile('ayah_images')) {
            // Handle image or video file upload here (example: upload to storage and save the file path)
            $images = $request->file('ayah_images');
            $imagePaths = [];

            foreach ($images as $image) {
                $imagePaths[] = $image->store('public/ayah_images'); // Adjust storage path as needed
            }

            // Add image URLs to ayah_notes
            $validatedData['ayah_notes'] = $this->addMediaToNotes($validatedData['ayah_notes'], $imagePaths);
        }

        // Create the note and save it to the database
        $note = Note::create($validatedData);

        return response()->json(['message' => 'Note created successfully', 'note' => $note], 201);
    }


    public function updateNotes(Request $request, $id)
    {
        // Validate the input data
        // Accept either visibility_option or legacy option
        $validatedData = $request->validate([
            'surah_name' => 'nullable|string',
            'ayah_num' => 'nullable|string',
            'ayah_verse_ar' => 'nullable|string',
            'ayah_verse_en' => 'nullable|string',
            'ayah_info' => 'nullable|string',
            'ayah_notes' => 'required|string', 
            'visibility_option' => 'nullable|integer|in:0,1',  // 0 for public, 1 for private
            'is_speech_to_text' => 'boolean',
        ]);

        // Backwards compatibility: map 'option' to 'visibility_option' when missing
        if (!$request->has('visibility_option')) {
            $validatedData['visibility_option'] = (int) ($request->input('option', 0));
        }

        // Find the note by ID
        $note = Note::findOrFail($id);

        // Authorize update (owner-only)
        $user = auth()->user();
        $effectiveId = $user ? (int) $user->id : 0;
        if ((int)$note->user_id !== (int)$effectiveId) {
            abort(403);
        }

        // Handle file uploads (if applicable)
        if ($request->hasFile('ayah_images')) {
            // Handle image or video file upload here (example: upload to storage and save the file path)
            $images = $request->file('ayah_images');
            $imagePaths = [];

            foreach ($images as $image) {
                $imagePaths[] = $image->store('public/ayah_images'); // Adjust storage path as needed
            }

            // Add image URLs to ayah_notes
            $validatedData['ayah_notes'] = $this->addMediaToNotes($validatedData['ayah_notes'], $imagePaths);
        }

        // Normalize visibility field to match DB column semantics
        if (array_key_exists('visibility_option', $validatedData)) {
            $incoming = $validatedData['visibility_option'];
            $numeric = is_numeric($incoming) ? (int) $incoming : null;
            $asString = null;

            // DB migration in this repo defines visibility_option as string with default 'public'
            if ($numeric !== null) {
                $asString = $numeric === 1 ? 'private' : 'public';
            } elseif (is_string($incoming)) {
                $asString = $incoming; // already string; assume valid
                $numeric = ($incoming === 'private') ? 1 : 0;
            }

            if (Schema::hasColumn('notes', 'visibility_option')) {
                // If column likely stores strings, send the string version
                $validatedData['visibility_option'] = $asString ?? $incoming;
                // Mirror to legacy numeric column if present
                if (Schema::hasColumn('notes', 'option')) {
                    $validatedData['option'] = $numeric ?? 0;
                }
            } else {
                // DB does not have visibility_option; fall back to legacy 'option' only
                $validatedData['option'] = $numeric ?? 0;
                unset($validatedData['visibility_option']);
            }
        }

        // Only include fillable attributes from the Note model
        $fillable = (new Note())->getFillable();
        $payload = collect($validatedData)
            ->filter(function ($v, $k) use ($fillable) { return in_array($k, $fillable, true); })
            ->toArray();

        // Update using fill/save to respect fillable and avoid empty-update edge cases
        $note->fill($payload);
        $note->save();

        return response()->json(['message' => 'Note updated successfully', 'note' => $note]);
    }

    // Helper function to add media links to the 'ayah_notes' field
    private function addMediaToNotes($ayahNotes, $imagePaths)
    {
        foreach ($imagePaths as $path) {
            $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
            $url = asset('storage/' . ltrim($path, '/'));
            if (in_array($ext, ['mp4', 'webm', 'ogg'])) {
                $ayahNotes .= '<video src="' . $url . '" controls style="max-width:100%;height:auto"></video>';
            } else {
                $ayahNotes .= '<img src="' . $url . '" alt="attachment" style="max-width:100%;height:auto" />';
            }
        }
        return $ayahNotes;
    }

    public function deleteNotes($id)
    {
        $note = Note::findOrFail($id);
        $user = auth()->user();
        $effectiveId = $user ? (method_exists($user, 'effectiveUserId') ? $user->effectiveUserId() : ($user->user_id ?: $user->id)) : 0;
        if ((int)$note->user_id !== (int)$effectiveId) {
            abort(403);
        }
        $note->delete();
        return response()->json(['message' => 'Note deleted successfully']);
    }

    
}
