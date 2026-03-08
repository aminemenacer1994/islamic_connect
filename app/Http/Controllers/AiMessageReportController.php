<?php

namespace App\Http\Controllers;

use App\Models\AiMessageReport;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class AiMessageReportController extends Controller
{
    public function index()
    {
        return view('ai_reports');
    }

    public function getReports()
    {
        if (!Schema::hasTable('ai_message_reports')) {
            return response()->json([]);
        }

        try {
            $reports = AiMessageReport::query()
                ->with(['user:id,name,lastname,email'])
                ->orderByDesc('created_at')
                ->orderByDesc('id')
                ->get();

            return response()->json($reports);
        } catch (QueryException $exception) {
            Log::warning('AI reports fetch failed', [
                'error' => $exception->getMessage(),
            ]);

            return response()->json([]);
        }
    }
}
