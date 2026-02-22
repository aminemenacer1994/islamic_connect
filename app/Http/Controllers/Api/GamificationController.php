<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\GamificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GamificationController extends Controller
{
    public function __construct(private readonly GamificationService $gamificationService)
    {
    }

    public function summary(Request $request): JsonResponse
    {
        return response()->json([
            'summary' => $this->gamificationService->getSummary($request->user()),
        ]);
    }

    public function complete(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'task_type' => 'required|string|in:quran,hadith,dua,review',
            'reference_type' => 'nullable|string|max:80',
            'reference_id' => 'nullable|string|max:190',
            'metadata' => 'nullable|array',
        ]);

        $summary = $this->gamificationService->recordTaskCompletion(
            $request->user(),
            $validated['task_type'],
            [
                'reference_type' => $validated['reference_type'] ?? null,
                'reference_id' => $validated['reference_id'] ?? null,
                'metadata' => $validated['metadata'] ?? null,
            ]
        );

        return response()->json([
            'message' => 'Memorisation progress recorded.',
            'summary' => $summary,
        ]);
    }
}
