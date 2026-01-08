<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use App\Models\Folder;
use App\Models\SmartFolder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class FolderController extends Controller
{
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

    public function index()
    {
        $user = Auth::user();

        $folders = Folder::where('user_id', $user->id)
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

        DB::transaction(function () use ($validated, $user, $isSmart, &$folder) {
            $folder = Folder::create([
                'name' => $validated['name'],
                'icon' => $validated['icon'] ?? null,
                'color' => $validated['color'] ?? null,
                'is_smart' => $isSmart,
                'user_id' => $user->id,
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
            ->orderBy('bookmark_folder.created_at', 'desc')
            ->get();

        return response()->json([
            'data' => $bookmarks,
            'source' => 'manual',
        ]);
    }
}
