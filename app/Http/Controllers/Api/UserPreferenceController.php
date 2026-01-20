<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserPreference;
use Illuminate\Http\Request;

class UserPreferenceController extends Controller
{
    private const ALLOWED_KEYS = [
        'podcast_bookmarks',
        'podcast_favourites',
        'podcast_recent',
        'podcast_progress',
        'liked_duas',
        'liked_reciters',
        'reciter_recent',
        'surat_realtime_highlighting',
    ];

    public function show(Request $request, string $key)
    {
        $this->ensureAllowedKey($key);

        $preference = UserPreference::where('user_id', $request->user()->id)
            ->where('key', $key)
            ->first();

        return response()->json([
            'key' => $key,
            'value' => $preference?->value ?? [],
        ]);
    }

    public function update(Request $request, string $key)
    {
        $this->ensureAllowedKey($key);

        $validated = $request->validate([
            'value' => 'nullable|array',
        ]);

        $preference = UserPreference::updateOrCreate(
            ['user_id' => $request->user()->id, 'key' => $key],
            ['value' => $validated['value'] ?? []]
        );

        return response()->json([
            'key' => $key,
            'value' => $preference->value ?? [],
        ]);
    }

    private function ensureAllowedKey(string $key): void
    {
        if (!in_array($key, self::ALLOWED_KEYS, true)) {
            abort(404);
        }
    }
}
