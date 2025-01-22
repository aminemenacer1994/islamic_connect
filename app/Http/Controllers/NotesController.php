<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\Comment;
use Illuminate\Http\Request;


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
        $notes = Note::where('user_id', $userId)->orderBy('created_at', 'desc')->get();
        return response()->json($notes);
    }

    public function getNotesWithComments()
    {
        $notes = Note::with('comments')->get(); // Eager load comments with notes
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
    

    public function fetchNotes()
    {
        $publicNotes = Note::where('option', 0)->orderBy('created_at', 'desc')->get();

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
            // Make sure 'ayah_notes' can handle large text content (e.g., with HTML, images, audio, etc.)
            'ayah_notes' => 'required|string', // Validate as string to allow HTML
            'is_speech_to_text' => 'boolean',
        ]);

        // Set the user ID to the currently authenticated user
        $validatedData['user_id'] = auth()->id();

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
        $validatedData = $request->validate([
            'surah_name' => 'nullable|string',
            'ayah_num' => 'nullable|string',
            'ayah_verse_ar' => 'nullable|string',
            'ayah_verse_en' => 'nullable|string',
            'ayah_info' => 'nullable|string',
            // Ensure 'ayah_notes' can handle large content such as HTML, base64 images, etc.
            'ayah_notes' => 'required|string', // Validate as string to allow HTML
            'visibility_option' => 'required|integer|in:0,1',  // 0 for public, 1 for private
            'is_speech_to_text' => 'boolean',
        ]);

        // Find the note by ID
        $note = Note::findOrFail($id);

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

        // Update the note
        $note->update($validatedData);

        return response()->json(['message' => 'Note updated successfully', 'note' => $note]);
    }

    // Helper function to add media links to the 'ayah_notes' field
    private function addMediaToNotes($ayahNotes, $imagePaths)
    {
        foreach ($mediaPaths as $path) {
            // Check if the file is an image or video
            $ext = pathinfo($path, PATHINFO_EXTENSION);
            
            if (in_array(strtolower($ext), ['mp4', 'webm', 'ogg'])) {
                // For video files
                $ayahNotes .= '<video src="' . asset('storage/' . $path) . '" class="' . $class . '" controls></video>';
            } else {
                // For image files
                $ayahNotes .= '<img src="' . asset('storage/' . $path) . '" class="' . $class . '" />';
            }
        }

        return $ayahNotes;
    }

    public function deleteNotes($id)
    {
        $note = Note::findOrFail($id);
        $note->delete();
        return response()->json(['message' => 'Note deleted successfully']);
    }

    
}
