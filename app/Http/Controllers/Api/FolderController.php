<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\BookmarkSessionAware;
use App\Models\Bookmark;
use App\Models\Folder;
use App\Models\SmartFolder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class FolderController extends Controller
{
    use BookmarkSessionAware;

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

        $folders = $this->applyOwnerScope(Folder::query(), $request)
            ->with(['smartFolder', 'sharedFolder'])
            ->withCount('bookmarks')
            ->orderBy('updated_at', 'desc')
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
        $user = Auth::user();

        $ownerData = $this->ownerPayload($request);

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('folders', 'name')->where('user_id', $user->id)->whereNull('deleted_at'),
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

        DB::transaction(function () use ($validated, $user, $isSmart, $ownerData, &$folder) {
            $folder = Folder::create([
                'name' => $validated['name'],
                'icon' => $validated['icon'] ?? null,
                'color' => $validated['color'] ?? null,
                'is_smart' => $isSmart,
                'user_id' => $user->id,
                'session_id' => $ownerData['session_id'] ?? null,
            ]);

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
                Rule::unique('folders', 'name')->where('user_id', $folder->user_id)->whereNull('deleted_at')->ignore($folder->id),
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
            $bookmarkIds = $folder->bookmarks()->pluck('bookmarks.id')->all();
            if (!empty($bookmarkIds)) {
                Bookmark::where('user_id', $folder->user_id)
                    ->whereIn('id', $bookmarkIds)
                    ->delete();
            }
            $folder->forceDelete();
        });

        return response()->json([
            'message' => 'Folder deleted with its bookmarks.',
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
                
                // Delete associated bookmarks
                $bookmarkIds = $folder->bookmarks()->pluck('bookmarks.id')->all();
                if (!empty($bookmarkIds)) {
                    Bookmark::where('user_id', $folder->user_id)
                        ->whereIn('id', $bookmarkIds)
                        ->delete();
                }
                
                // Force delete the folder
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

        $bookmarks = $folder->bookmarks()
            ->with(['folders:id,name,color,icon', 'ayah'])
            ->orderByDesc('bookmarks.created_at')
            ->get();

        return response()->json([
            'data' => $bookmarks,
            'source' => 'manual',
        ]);
    }
}
