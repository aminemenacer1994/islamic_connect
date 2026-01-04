<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Folder;
use App\Models\SharedFolder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class SharedFolderController extends Controller
{
    public function store(Folder $folder)
    {
        $this->authorize('view', $folder);

        $share = SharedFolder::firstOrNew(['folder_id' => $folder->id]);
        $share->user_id = Auth::id();

        if (!$share->exists || $share->revoked_at) {
            $share->token = Str::random(40);
        }

        $share->revoked_at = null;
        $share->save();

        return response()->json([
            'message' => 'Share link generated.',
            'share_url' => url('/shared/folders/' . $share->token),
            'token' => $share->token,
        ]);
    }

    public function destroy(Folder $folder)
    {
        $this->authorize('view', $folder);

        $share = SharedFolder::where('folder_id', $folder->id)->firstOrFail();
        $share->revoked_at = now();
        $share->save();

        return response()->json([
            'message' => 'Share link revoked.',
        ]);
    }

    public function show(string $token)
    {
        $share = SharedFolder::where('token', $token)
            ->whereNull('revoked_at')
            ->firstOrFail();

        $share->last_viewed_at = now();
        $share->save();

        $folder = $share->folder()->with(['smartFolder'])->firstOrFail();

        if ($folder->is_smart && $folder->smartFolder) {
            $items = $folder->smartFolder->buildAyahQuery()
                ->with('surah')
                ->get();

            return response()->json([
                'folder' => [
                    'id' => $folder->id,
                    'name' => $folder->name,
                    'icon' => $folder->icon,
                    'color' => $folder->color,
                    'is_smart' => $folder->is_smart,
                ],
                'items' => $items,
                'source' => 'smart',
            ]);
        }

        $items = $folder->bookmarks()
            ->with('ayah')
            ->orderBy('bookmark_folder.created_at', 'desc')
            ->get();

        return response()->json([
            'folder' => [
                'id' => $folder->id,
                'name' => $folder->name,
                'icon' => $folder->icon,
                'color' => $folder->color,
                'is_smart' => $folder->is_smart,
            ],
            'items' => $items,
            'source' => 'manual',
        ]);
    }

    public function publicView(string $token)
    {
        return view('shared-folder', ['token' => $token]);
    }
}
