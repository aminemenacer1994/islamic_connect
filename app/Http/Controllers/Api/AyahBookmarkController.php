<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\BookmarkSessionAware;
use App\Models\Ayah;
use App\Models\Bookmark;
use App\Models\BookmarkEvent;
use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AyahBookmarkController extends Controller
{
    use BookmarkSessionAware;

    public function index(Request $request)
    {
        $this->requireOwnerConstraint($request);
        $surahNumber = $request->query('surah_number');
        $ayahNumber = $request->query('ayah_number');

        if ($surahNumber && $ayahNumber) {
            $bookmarks = $this->applyOwnerScope(Bookmark::query(), $request)
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
            $this->applyOwnerScope(Folder::query(), $request)->findOrFail($folderId);
            $bookmarks = $this->applyOwnerScope(Bookmark::query(), $request)
                ->select('bookmarks.*')
                ->join('bookmark_folder', 'bookmark_folder.bookmark_id', '=', 'bookmarks.id')
                ->where('bookmark_folder.folder_id', $folderId)
                ->with(['folders:id,name,color,icon', 'ayah'])
                ->orderBy('bookmark_folder.position')
                ->orderByDesc('bookmark_folder.created_at')
                ->get();

            return response()->json([
                'data' => $bookmarks,
            ]);
        }

        $bookmarks = $this->applyOwnerScope(Bookmark::query(), $request)
            ->with(['folders:id,name,color,icon', 'ayah'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'data' => $bookmarks,
        ]);
    }

    public function store(Request $request)
    {
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

        $this->requireOwnerConstraint($request);
        $ownerPayload = $this->ownerPayload($request);

        $bookmark = $this->applyOwnerScope(Bookmark::query(), $request)
            ->firstOrCreate([
                'surah_number' => $validated['surah_number'],
                'ayah_number' => $validated['ayah_number'],
            ], array_merge([
                'surah_name' => $validated['surah_name'],
                'ayah_num' => (string) $validated['ayah_number'],
                'ayah_verse_ar' => $validated['ayah_verse_ar'],
                'ayah_verse_en' => $validated['ayah_verse_en'] ?? null,
                'ayah_id' => $ayahId,
            ], $ownerPayload));

        if (!$bookmark->ayah_id && $ayahId) {
            $bookmark->ayah_id = $ayahId;
            $bookmark->save();
        }

        $folderIds = $this->normalizeFolderIds($request, $request->input('folder_ids', []));
        if (!empty($folderIds)) {
            $bookmark->folders()->syncWithoutDetaching($folderIds);
            foreach ($folderIds as $folderId) {
                $this->logEvent($bookmark->user_id, 'bookmark_added_to_folder', $bookmark->id, $folderId, $bookmark->ayah_id);
                $this->reindexFolderBookmarks($folderId);
            }
            $this->applyOwnerScope(Folder::query(), $request)
                ->whereIn('id', $folderIds)
                ->update(['updated_at' => now()]);
        }

        $event = $bookmark->wasRecentlyCreated ? 'bookmark_created' : 'bookmark_saved';
        $this->logEvent($bookmark->user_id, $event, $bookmark->id, null, $bookmark->ayah_id);

        return response()->json([
            'message' => $bookmark->wasRecentlyCreated ? 'Ayah bookmarked.' : 'Bookmark updated.',
            'bookmark' => $bookmark->load('folders:id,name,color,icon'),
        ], 201);
    }

    public function attachFolders(Request $request, Bookmark $bookmark)
    {
        if ($request->user()) {
            $this->authorize('update', $bookmark);
        }

        $validated = $request->validate([
            'folder_ids' => 'required|array',
            'folder_ids.*' => 'integer',
        ]);

        $folderIds = $this->normalizeFolderIds($request, $validated['folder_ids']);
        $bookmark->folders()->syncWithoutDetaching($folderIds);

        foreach ($folderIds as $folderId) {
            $this->logEvent($bookmark->user_id, 'bookmark_added_to_folder', $bookmark->id, $folderId, $bookmark->ayah_id);
            $this->reindexFolderBookmarks($folderId);
        }
        $this->applyOwnerScope(Folder::query(), $request)
            ->whereIn('id', $folderIds)
            ->update(['updated_at' => now()]);

        return response()->json([
            'message' => 'Bookmark added to folders.',
            'bookmark' => $bookmark->load('folders:id,name,color,icon'),
        ]);
    }

    public function detachFolder(Request $request, Bookmark $bookmark, Folder $folder)
    {
        if ($request->user()) {
            $this->authorize('update', $bookmark);
            $this->authorize('view', $folder);
        } else {
            // Check session ownership if guest
            $sessionId = $this->resolveBookmarkSessionId($request);
            if ($bookmark->session_id !== $sessionId || $folder->session_id !== $sessionId) {
                abort(403, 'This action is unauthorized.');
            }
        }

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

    public function destroy(Request $request, $bookmarkId)
    {
        $bookmark = $this->applyOwnerScope(Bookmark::query(), $request)->findOrFail($bookmarkId);
        
        // Use Policy which now handles both user and session
        $this->authorize('delete', $bookmark);

        $folderIds = $bookmark->folders()->pluck('folders.id')->all();
        $bookmark->folders()->detach();
        $bookmark->delete();

        $this->logEvent($bookmark->user_id, 'bookmark_deleted', null, null, $bookmark->ayah_id);
        if (!empty($folderIds)) {
            $this->applyOwnerScope(Folder::query(), $request)
                ->whereIn('id', $folderIds)
                ->update(['updated_at' => now()]);
        }

        return response()->json([
            'message' => 'Bookmark removed.',
        ]);
    }

    public function bulkDestroy(Request $request)
    {
        $validated = $request->validate([
            'bookmark_ids' => 'required|array',
            'bookmark_ids.*' => 'integer',
        ]);

        $bookmarkIds = $validated['bookmark_ids'];
        
        if (empty($bookmarkIds)) {
            return response()->json([
                'message' => 'No bookmarks selected.',
                'deleted_count' => 0,
            ], 422);
        }

        $this->requireOwnerConstraint($request);

        // Fetch bookmarks owned by the user
        $bookmarks = $this->applyOwnerScope(Bookmark::query(), $request)
            ->whereIn('id', $bookmarkIds)
            ->get();

        if ($bookmarks->isEmpty()) {
            return response()->json([
                'message' => 'No bookmarks found to delete.',
                'deleted_count' => 0,
            ], 404);
        }

        $deletedCount = 0;
        $affectedFolderIds = [];

        foreach ($bookmarks as $bookmark) {
            // Use Policy for authorization
            $this->authorize('delete', $bookmark);
            
            // Collect folder IDs before detaching
            $folderIds = $bookmark->folders()->pluck('folders.id')->all();
            $affectedFolderIds = array_merge($affectedFolderIds, $folderIds);
            
            // Detach from folders and delete
            $bookmark->folders()->detach();
            $bookmark->delete();
            
            $this->logEvent($bookmark->user_id, 'bookmark_deleted', null, null, $bookmark->ayah_id);
            $deletedCount++;
        }

        // Update affected folders' timestamps
        if (!empty($affectedFolderIds)) {
            $uniqueFolderIds = array_unique($affectedFolderIds);
            $this->applyOwnerScope(Folder::query(), $request)
                ->whereIn('id', $uniqueFolderIds)
                ->update(['updated_at' => now()]);
        }

        return response()->json([
            'message' => "Successfully deleted {$deletedCount} bookmark(s).",
            'deleted_count' => $deletedCount,
        ]);
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'folder_id' => 'required|integer',
            'bookmark_ids' => 'required|array',
            'bookmark_ids.*' => 'integer',
        ]);

        $bookmarkIds = array_values(array_unique($validated['bookmark_ids']));
        if (empty($bookmarkIds)) {
            return response()->json([
                'message' => 'No bookmarks provided for reordering.',
            ], 422);
        }

        $this->requireOwnerConstraint($request);
        $folder = $this->applyOwnerScope(Folder::query(), $request)->findOrFail($validated['folder_id']);
        if ($folder->is_smart) {
            return response()->json([
                'message' => 'Smart folders cannot be reordered.',
            ], 422);
        }

        DB::transaction(function () use ($folder, $bookmarkIds) {
            foreach ($bookmarkIds as $position => $bookmarkId) {
                DB::table('bookmark_folder')
                    ->where('folder_id', $folder->id)
                    ->where('bookmark_id', $bookmarkId)
                    ->update(['position' => $position]);
            }
        });

        return response()->json([
            'message' => 'Bookmark order updated.',
        ]);
    }

    protected function reindexFolderBookmarks(int $folderId): void
    {
        $rows = DB::table('bookmark_folder')
            ->where('folder_id', $folderId)
            ->orderByDesc('created_at')
            ->get();

        foreach ($rows as $index => $row) {
            DB::table('bookmark_folder')
                ->where('id', $row->id)
                ->update(['position' => $index]);
        }
    }

    private function normalizeFolderIds(Request $request, array $folderIds): array
    {
        if (empty($folderIds)) {
            return [];
        }

        $this->requireOwnerConstraint($request);

        return $this->applyOwnerScope(Folder::query(), $request)
            ->where('is_smart', false)
            ->whereNull('deleted_at')
            ->whereIn('id', $folderIds)
            ->pluck('id')
            ->all();
    }
    private function logEvent(?int $userId, string $event, ?int $bookmarkId, ?int $folderId, ?int $ayahId): void
    {
        BookmarkEvent::create([
            'user_id' => $userId,
            'bookmark_id' => $bookmarkId,
            'folder_id' => $folderId,
            'ayah_id' => $ayahId,
            'event' => $event,
        ]);
    }

    private function requireOwnerConstraint(Request $request): array
    {
        $constraint = $this->ownerConstraint($request);
        if (empty($constraint)) {
            abort(403, 'Unable to resolve bookmark owner.');
        }
        return $constraint;
    }
}
