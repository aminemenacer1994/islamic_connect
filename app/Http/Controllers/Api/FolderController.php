<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\BookmarkSessionAware;
use App\Models\Folder;
use App\Models\SmartFolder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rule;

class FolderController extends Controller
{
    use BookmarkSessionAware;

    private static ?bool $foldersHavePositionColumn = null;

    private const RULE_TYPES = ['surah', 'juz', 'revelation_type', 'topic', 'tag'];

    private const BOOTSTRAP_COLORS = [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
    ];

    public function index(Request $request)
    {
        $owner = $this->bookmarkOwner($request);
        if (empty($owner)) {
            return response()->json(['data' => []]);
        }

        $foldersQuery = $this->applyOwnerScope(Folder::query(), $request)
            ->with(['smartFolder', 'sharedFolder'])
            ->withCount('bookmarks');

        if ($this->supportsFolderPosition()) {
            $foldersQuery->orderByRaw('COALESCE(position, 0) ASC');
        }

        $folders = $foldersQuery
            ->orderByDesc('updated_at')
            ->get();

        $data = $folders->map(function (Folder $folder) {
            $ayahCount = $folder->bookmarks_count;
            if ($folder->is_smart && $folder->smartFolder) {
                $ayahCount = $folder->smartFolder->buildAyahQuery()->count();
            }

            return [
                'id' => $folder->id,
                'name' => $folder->name,
                'icon' => $folder->icon,
                'color' => $folder->color,
                'is_smart' => $folder->is_smart,
                'ayah_count' => $ayahCount,
                'position' => $folder->position,
                'updated_at' => $folder->updated_at,
                'shared_token' => $folder->sharedFolder?->token,
            ];
        });

        return response()->json([
            'data' => $data,
        ]);
    }

    public function show(Folder $folder)
    {
        $this->authorize('view', $folder);

        $ayahCount = $folder->bookmarks()->count();
        if ($folder->is_smart && $folder->smartFolder) {
            $ayahCount = $folder->smartFolder->buildAyahQuery()->count();
        }

        return response()->json([
            'data' => [
                'id' => $folder->id,
                'name' => $folder->name,
                'icon' => $folder->icon,
                'color' => $folder->color,
                'is_smart' => $folder->is_smart,
                'ayah_count' => $ayahCount,
                'updated_at' => $folder->updated_at,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $ownerData = $this->ownerPayload($request);
        if (empty($ownerData)) {
            abort(403, 'Unable to resolve bookmark owner.');
        }

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                $this->buildFolderNameUniqueRule($ownerData),
            ],
            'icon' => 'nullable|string|max:40',
            'color' => ['nullable', 'string', Rule::in(self::BOOTSTRAP_COLORS)],
            'is_smart' => 'boolean',
            'rule_type' => ['nullable', 'string', Rule::in(self::RULE_TYPES)],
            'rule_payload' => 'nullable|array',
        ]);

        $isSmart = (bool) ($validated['is_smart'] ?? false);
        if ($isSmart && empty($validated['rule_type'])) {
            return response()->json([
                'message' => 'Smart folders require a rule type.',
            ], 422);
        }

        $folder = null;

        $maxPosition = $this->supportsFolderPosition()
            ? $this->applyOwnerScope(Folder::query(), $request)->max('position')
            : null;

        DB::transaction(function () use ($validated, $isSmart, $ownerData, $maxPosition, &$folder) {
            $attributes = [
                'name' => $validated['name'],
                'icon' => $validated['icon'] ?? null,
                'color' => $validated['color'] ?? null,
                'is_smart' => $isSmart,
                'user_id' => $ownerData['user_id'] ?? null,
                'session_id' => $ownerData['session_id'] ?? null,
            ];

            if ($this->supportsFolderPosition()) {
                $attributes['position'] = ($maxPosition ?? -1) + 1;
            }

            $folder = Folder::create($attributes);

            if ($isSmart) {
                SmartFolder::create([
                    'folder_id' => $folder->id,
                    'rule_type' => $validated['rule_type'],
                    'rule_payload' => $validated['rule_payload'] ?? [],
                ]);
            }
        });

        return response()->json([
            'message' => 'Folder created.',
            'folder' => $folder->load('smartFolder'),
        ], 201);
    }

    public function update(Request $request, Folder $folder)
    {
        $this->authorize('update', $folder);

        $validated = $request->validate([
            'name' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                $this->buildFolderNameUniqueRule([
                    'user_id' => $folder->user_id,
                    'session_id' => $folder->session_id,
                ], $folder->id),
            ],
            'icon' => 'nullable|string|max:40',
            'color' => ['nullable', 'string', Rule::in(self::BOOTSTRAP_COLORS)],
            'rule_type' => ['nullable', 'string', Rule::in(self::RULE_TYPES)],
            'rule_payload' => 'nullable|array',
        ]);

        $folder->fill($validated);
        $folder->save();

        if ($folder->is_smart && ($request->has('rule_type') || $request->has('rule_payload'))) {
            $smartFolder = $folder->smartFolder;
            if ($smartFolder) {
                $smartFolder->update([
                    'rule_type' => $validated['rule_type'] ?? $smartFolder->rule_type,
                    'rule_payload' => $validated['rule_payload'] ?? $smartFolder->rule_payload,
                ]);
            }
        }

        return response()->json([
            'message' => 'Folder updated.',
            'folder' => $folder->load('smartFolder'),
        ]);
    }

    public function destroy(Folder $folder)
    {
        $this->authorize('delete', $folder);

        DB::transaction(function () use ($folder) {
            $folder->bookmarks()->detach();
            $folder->sharedFolder()?->delete();
            $folder->smartFolder()?->delete();
            $folder->forceDelete();
        });

        return response()->json([
            'message' => 'Collection deleted. Saved bookmarks remain available in All.',
        ]);
    }

    public function bulkDestroy(Request $request)
    {
        $validated = $request->validate([
            'folder_ids' => 'required|array',
            'folder_ids.*' => 'integer',
        ]);

        $folderIds = $validated['folder_ids'];
        
        if (empty($folderIds)) {
            return response()->json([
                'message' => 'No folders selected.',
                'deleted_count' => 0,
            ], 422);
        }

        // Fetch folders owned by the user
        $folders = $this->applyOwnerScope(Folder::query(), $request)
            ->whereIn('id', $folderIds)
            ->get();

        if ($folders->isEmpty()) {
            return response()->json([
                'message' => 'No folders found to delete.',
                'deleted_count' => 0,
            ], 404);
        }

        $deletedCount = 0;
        $skippedSmartFolders = 0;

        DB::transaction(function () use ($folders, &$deletedCount, &$skippedSmartFolders) {
            foreach ($folders as $folder) {
                // Skip smart folders
                if ($folder->is_smart) {
                    $skippedSmartFolders++;
                    continue;
                }

                // Authorize deletion
                $this->authorize('delete', $folder);
                
                $folder->bookmarks()->detach();
                $folder->sharedFolder()?->delete();
                $folder->smartFolder()?->delete();
                $folder->forceDelete();
                $deletedCount++;
            }
        });

        $message = "Successfully deleted {$deletedCount} folder(s).";
        if ($skippedSmartFolders > 0) {
            $message .= " Skipped {$skippedSmartFolders} smart folder(s).";
        }

        return response()->json([
            'message' => $message,
            'deleted_count' => $deletedCount,
            'skipped_count' => $skippedSmartFolders,
        ]);
    }

    public function reorder(Request $request)
    {
        if (!$this->supportsFolderPosition()) {
            return response()->json([
                'message' => 'Folder order updated.',
            ]);
        }

        $validated = $request->validate([
            'folder_ids' => 'required|array',
            'folder_ids.*' => 'integer',
        ]);

        if (empty($validated['folder_ids'])) {
            return response()->json([
                'message' => 'No folders provided for reordering.',
            ], 422);
        }

        $folders = $this->applyOwnerScope(Folder::query(), $request)
            ->whereIn('id', $validated['folder_ids'])
            ->get()
            ->keyBy('id');

        DB::transaction(function () use ($validated, $folders) {
            $position = 0;
            foreach ($validated['folder_ids'] as $folderId) {
                $folder = $folders->get($folderId);
                if (!$folder) {
                    continue;
                }
                if ((int) $folder->position === $position) {
                    $position++;
                    continue;
                }
                $folder->position = $position;
                $folder->save();
                $position++;
            }
        });

        return response()->json([
            'message' => 'Folder order updated.',
        ]);
    }

    public function bookmarks(Request $request, Folder $folder)
    {
        $this->authorize('view', $folder);

        if ($folder->is_smart) {
            $smartFolder = $folder->smartFolder;
            if (!$smartFolder) {
                return response()->json([
                    'data' => [],
                    'source' => 'smart',
                ]);
            }

            $ayahs = $smartFolder->buildAyahQuery()
                ->with('surah')
                ->limit((int) $request->query('limit', 200))
                ->get();

            return response()->json([
                'data' => $ayahs,
                'source' => 'smart',
            ]);
        }

        $bookmarksQuery = $folder->bookmarks()
            ->with(['folders:id,name,color,icon', 'ayah']);

        if ($this->supportsBookmarkFolderPosition()) {
            $bookmarksQuery->orderBy('bookmark_folder.position');
        }

        $bookmarks = $bookmarksQuery
            ->orderByDesc('bookmark_folder.created_at')
            ->get();

        return response()->json([
            'data' => $bookmarks,
            'source' => 'manual',
        ]);
    }

    private function buildFolderNameUniqueRule(array $ownerData, ?int $ignoreId = null): Rule
    {
        $rule = Rule::unique('folders', 'name')->where(function ($query) use ($ownerData) {
            $query->whereNull('deleted_at');

            if (!empty($ownerData['user_id'])) {
                $query->where('user_id', $ownerData['user_id']);
                return;
            }

            if (!empty($ownerData['session_id'])) {
                $query->where('session_id', $ownerData['session_id']);
            }
        });

        return $ignoreId ? $rule->ignore($ignoreId) : $rule;
    }

    private function supportsFolderPosition(): bool
    {
        if (self::$foldersHavePositionColumn !== null) {
            return self::$foldersHavePositionColumn;
        }

        try {
            self::$foldersHavePositionColumn = Schema::hasColumn('folders', 'position');
        } catch (\Throwable $exception) {
            self::$foldersHavePositionColumn = false;
        }

        return self::$foldersHavePositionColumn;
    }

    private function supportsBookmarkFolderPosition(): bool
    {
        try {
            return Schema::hasColumn('bookmark_folder', 'position');
        } catch (\Throwable $exception) {
            return false;
        }
    }
}
