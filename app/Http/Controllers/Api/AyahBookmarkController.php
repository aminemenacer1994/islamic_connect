<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ayah;
use App\Models\Bookmark;
use App\Models\BookmarkEvent;
use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AyahBookmarkController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $surahNumber = $request->query('surah_number');
        $ayahNumber = $request->query('ayah_number');

        if ($surahNumber && $ayahNumber) {
            $bookmarks = Bookmark::where('user_id', $user->id)
                ->where('surah_number', (int) $surahNumber)
                ->where('ayah_number', (int) $ayahNumber)
                ->with(['folders:id,name,color,icon', 'ayah'])
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'data' => $bookmarks,
            ]);
        }

        $folderId = $request->query('folder_id');
        if ($folderId) {
            $folder = Folder::where('user_id', $user->id)->findOrFail($folderId);
            $bookmarks = $folder->bookmarks()
                ->with(['folders:id,name,color,icon', 'ayah'])
                ->orderBy('bookmark_folder.created_at', 'desc')
                ->get();

            return response()->json([
                'data' => $bookmarks,
            ]);
        }

        $bookmarks = Bookmark::where('user_id', $user->id)
            ->with(['folders:id,name,color,icon', 'ayah'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'data' => $bookmarks,
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'surah_number' => 'required|integer|min:1|max:114',
            'ayah_number' => 'required|integer|min:1',
            'surah_name' => 'required|string|max:255',
            'ayah_verse_ar' => 'required|string',
            'ayah_verse_en' => 'nullable|string',
            'folder_ids' => 'array',
            'folder_ids.*' => 'integer',
        ]);

        $ayahId = Ayah::where('surah_id', (string) $validated['surah_number'])
            ->where('ayah_id', (string) $validated['ayah_number'])
            ->value('id');

        $bookmark = Bookmark::firstOrCreate([
            'user_id' => $user->id,
            'surah_number' => $validated['surah_number'],
            'ayah_number' => $validated['ayah_number'],
        ], [
            'surah_name' => $validated['surah_name'],
            'ayah_num' => (string) $validated['ayah_number'],
            'ayah_verse_ar' => $validated['ayah_verse_ar'],
            'ayah_verse_en' => $validated['ayah_verse_en'] ?? null,
            'ayah_id' => $ayahId,
        ]);

        if (!$bookmark->ayah_id && $ayahId) {
            $bookmark->ayah_id = $ayahId;
            $bookmark->save();
        }

        $folderIds = $this->normalizeFolderIds($user->id, $request->input('folder_ids', []));
        if (!empty($folderIds)) {
            $bookmark->folders()->syncWithoutDetaching($folderIds);
            foreach ($folderIds as $folderId) {
                $this->logEvent($user->id, 'bookmark_added_to_folder', $bookmark->id, $folderId, $bookmark->ayah_id);
            }
            Folder::whereIn('id', $folderIds)->update(['updated_at' => now()]);
        }

        $event = $bookmark->wasRecentlyCreated ? 'bookmark_created' : 'bookmark_saved';
        $this->logEvent($user->id, $event, $bookmark->id, null, $bookmark->ayah_id);

        return response()->json([
            'message' => $bookmark->wasRecentlyCreated ? 'Ayah bookmarked.' : 'Bookmark updated.',
            'bookmark' => $bookmark->load('folders:id,name,color,icon'),
        ], 201);
    }

    public function attachFolders(Request $request, Bookmark $bookmark)
    {
        $this->authorize('update', $bookmark);

        $validated = $request->validate([
            'folder_ids' => 'required|array',
            'folder_ids.*' => 'integer',
        ]);

        $folderIds = $this->normalizeFolderIds($bookmark->user_id, $validated['folder_ids']);
        $bookmark->folders()->syncWithoutDetaching($folderIds);

        foreach ($folderIds as $folderId) {
            $this->logEvent($bookmark->user_id, 'bookmark_added_to_folder', $bookmark->id, $folderId, $bookmark->ayah_id);
        }
        Folder::whereIn('id', $folderIds)->update(['updated_at' => now()]);

        return response()->json([
            'message' => 'Bookmark added to folders.',
            'bookmark' => $bookmark->load('folders:id,name,color,icon'),
        ]);
    }

    public function detachFolder(Bookmark $bookmark, Folder $folder)
    {
        $this->authorize('update', $bookmark);
        $this->authorize('view', $folder);

        if ($folder->is_smart) {
            return response()->json([
                'message' => 'Smart folders cannot be edited manually.',
            ], 422);
        }

        $bookmark->folders()->detach($folder->id);
        $this->logEvent($bookmark->user_id, 'bookmark_removed_from_folder', $bookmark->id, $folder->id, $bookmark->ayah_id);
        $folder->touch();

        return response()->json([
            'message' => 'Bookmark removed from folder.',
        ]);
    }

    public function destroy(Bookmark $bookmark)
    {
        $this->authorize('delete', $bookmark);

        $folderIds = $bookmark->folders()->pluck('folders.id')->all();
        $bookmark->folders()->detach();
        $bookmark->delete();

        $this->logEvent($bookmark->user_id, 'bookmark_deleted', $bookmark->id, null, $bookmark->ayah_id);
        if (!empty($folderIds)) {
            Folder::whereIn('id', $folderIds)->update(['updated_at' => now()]);
        }

        return response()->json([
            'message' => 'Bookmark removed.',
        ]);
    }

    private function normalizeFolderIds(int $userId, array $folderIds): array
    {
        if (empty($folderIds)) {
            return [];
        }

        return Folder::where('user_id', $userId)
            ->where('is_smart', false)
            ->whereNull('deleted_at')
            ->whereIn('id', $folderIds)
            ->pluck('id')
            ->all();
    }

    private function logEvent(int $userId, string $event, ?int $bookmarkId, ?int $folderId, ?int $ayahId): void
    {
        BookmarkEvent::create([
            'user_id' => $userId,
            'bookmark_id' => $bookmarkId,
            'folder_id' => $folderId,
            'ayah_id' => $ayahId,
            'event' => $event,
        ]);
    }
}
