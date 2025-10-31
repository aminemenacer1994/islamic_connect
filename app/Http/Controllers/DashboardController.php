<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dashboard;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        return view('dashboard');
    }

    public function getDashboard()
    {
        $dashboard = Dashboard::get();
        return $dashboard;
    }

    public function metrics()
    {
        // Build lifetime monthly series per table
        $seriesMonthly = function(string $table) {
            $min = DB::table($table)->min('created_at');
            $start = $min ? Carbon::parse($min)->startOfMonth() : Carbon::today()->startOfMonth();
            $end = Carbon::today()->endOfMonth();
            $rows = DB::table($table)
                ->selectRaw("DATE_FORMAT(created_at, '%Y-%m-01') as m, COUNT(*) as c")
                ->groupBy('m')
                ->orderBy('m')
                ->get();
            $map = collect($rows)->keyBy('m');
            $out = [];
            for ($d=$start->copy(); $d <= $end; $d->addMonth()) {
                $key = $d->format('Y-m-01');
                $out[] = ['m' => $key, 'c' => (int)($map[$key]->c ?? 0)];
            }
            return $out;
        };

        return response()->json([
            'counts' => [
                'users' => (int) DB::table('users')->count(),
                'donations' => (int) DB::table('donation')->count(),
                'feedback' => (int) DB::table('feedback')->count(),
                'mailing' => (int) DB::table('mailinglist')->count(),
                'notes' => (int) DB::table('notes')->count(),
                'bookmarks' => (int) DB::table('bookmarks')->count(),
            ],
            'series' => [
                'users' => $seriesMonthly('users'),
                'donations' => $seriesMonthly('donation'),
                'feedback' => $seriesMonthly('feedback'),
                'mailing' => $seriesMonthly('mailinglist'),
            ],
            'recent' => [
                'donations' => DB::table('donation')->orderByDesc('id')->limit(5)->get(),
                'feedback' => DB::table('feedback')->orderByDesc('id')->limit(5)->get(),
                'mailing' => DB::table('mailinglist')->orderByDesc('id')->limit(5)->get(),
            ],
            'breakdown' => [
                'donationsByCurrency' => DB::table('donation')->select('currency', DB::raw('COUNT(*) as c'))->groupBy('currency')->get(),
                'usersByType' => DB::table('users')->select('user_type', DB::raw('COUNT(*) as c'))->groupBy('user_type')->get(),
            ],
        ]);
    }

}
