<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use App\Models\BookmarkEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class AnalyticsController extends Controller
{
    public function mostBookmarkedAyat(Request $request)
    {
        $limit = (int) $request->query('limit', 10);

        $rows = Bookmark::query()
            ->select('surah_number', 'ayah_number', DB::raw('count(*) as total'))
            ->whereNotNull('surah_number')
            ->whereNotNull('ayah_number')
            ->groupBy('surah_number', 'ayah_number')
            ->orderByDesc('total')
            ->limit($limit)
            ->get();

        return response()->json([
            'data' => $rows,
        ]);
    }

    public function mostPopularFolders(Request $request)
    {
        $limit = (int) $request->query('limit', 10);

        $rows = DB::table('bookmark_folder')
            ->join('folders', 'folders.id', '=', 'bookmark_folder.folder_id')
            ->select('folders.id', 'folders.name', 'folders.icon', 'folders.color', DB::raw('count(*) as total'))
            ->whereNull('folders.deleted_at')
            ->groupBy('folders.id', 'folders.name', 'folders.icon', 'folders.color')
            ->orderByDesc('total')
            ->limit($limit)
            ->get();

        return response()->json([
            'data' => $rows,
        ]);
    }

    public function activityByHour()
    {
        $rows = BookmarkEvent::query()
            ->select(DB::raw('hour(created_at) as hour'), DB::raw('count(*) as total'))
            ->where('event', 'bookmark_created')
            ->groupBy(DB::raw('hour(created_at)'))
            ->orderBy('hour')
            ->get();

        return response()->json([
            'data' => $rows,
        ]);
    }

    public function ramadanActivity(Request $request)
    {
        $start = $request->query('start');
        $end = $request->query('end');

        if (!$start || !$end) {
            return response()->json([
                'message' => 'Provide start and end dates for Ramadan activity.',
            ], 422);
        }

        $startDate = Carbon::parse($start)->startOfDay();
        $endDate = Carbon::parse($end)->endOfDay();

        $rows = BookmarkEvent::query()
            ->select(DB::raw('date(created_at) as day'), DB::raw('count(*) as total'))
            ->where('event', 'bookmark_created')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('date(created_at)'))
            ->orderBy('day')
            ->get();

        return response()->json([
            'data' => $rows,
        ]);
    }
}
