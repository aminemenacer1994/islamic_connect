<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class AnalyticsController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'admin']);
    }

    public function index()
    {
        return view('analytics');
    }

    public function realtime(Request $request)
    {
        // Ensure only admins can access
        if (!Auth::check() || !Auth::user()->isAdmin()) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        // Resolution order: explicit query param > config > env
        $propertyId = $request->query('property_id')
            ?: (config('services.ga4.property_id') ?? env('GA4_PROPERTY_ID'));

        if (!$propertyId) {
            return response()->json([
                'error' => 'GA4 property id not configured. Set GA4_PROPERTY_ID or services.ga4.property_id.',
            ], 500);
        }

        // Optional: path to service account credentials JSON via GOOGLE_APPLICATION_CREDENTIALS
        // 1) Prefer env-provided base64 or path. Always end with a readable file path.
        $credsPathEnv = env('GOOGLE_APPLICATION_CREDENTIALS');
        $credsB64 = env('GA_CREDENTIALS_JSON_BASE64');
        $credsFile = null;
        if ($credsB64) {
            $decoded = base64_decode($credsB64, true);
            $jsonCheck = json_decode($decoded ?? '', true);
            if ($decoded && json_last_error() === JSON_ERROR_NONE && is_array($jsonCheck)) {
                // Write to runtime file under storage
                $runtime = storage_path('app/ga_credentials_runtime.json');
                @file_put_contents($runtime, $decoded);
                if (is_readable($runtime)) {
                    $credsFile = $runtime;
                }
            }
        } elseif ($credsPathEnv) {
            if (!is_readable($credsPathEnv)) {
                return response()->json([
                    'error' => 'Credentials file not readable',
                    'message' => 'Check GOOGLE_APPLICATION_CREDENTIALS path and file permissions',
                    'path' => $credsPathEnv,
                ], 500);
            }
            $credsFile = $credsPathEnv; // Use provided path
        } else {
            // 2) Fallback to project file storage/app/ga_credentials.json
            $fallback = storage_path('app/ga_credentials.json');
            if (is_readable($fallback)) {
                $credsFile = $fallback;
            }
        }

        if (!$credsFile) {
            return response()->json([
                'error' => 'No Google credentials found',
                'message' => 'Provide GA_CREDENTIALS_JSON_BASE64 or GOOGLE_APPLICATION_CREDENTIALS, or place storage/app/ga_credentials.json',
            ], 500);
        }

        // Ensure ADC can find it and also pass explicitly
        @putenv('GOOGLE_APPLICATION_CREDENTIALS=' . $credsFile);

        // Check if google analytics data api client is installed
        $hasClient = class_exists('Google\\Analytics\\Data\\V1beta\\BetaAnalyticsDataClient') ||
                     class_exists('Google\\Analytics\\Data\\V1\\AnalyticsDataClient');

        if (!$hasClient) {
            return response()->json([
                'error' => 'Google Analytics client not installed',
                'action' => 'composer require google/apiclient:^2.15 google/analytics-data',
            ], 501);
        }

        try {
            // Prefer GA Data API v1 if available, else fallback to beta
            if (class_exists('Google\\Analytics\\Data\\V1\\AnalyticsDataClient')) {
                /** @var \Google\Analytics\Data\V1\AnalyticsDataClient $client */
                $client = new \Google\Analytics\Data\V1\AnalyticsDataClient([
                    // Provide explicit key file path to avoid ADC fallback
                    'credentials' => $credsFile,
                ]);

                $rt = $client->runRealtimeReport([
                    'property' => 'properties/' . $propertyId,
                    'dimensions' => [
                        new \Google\Analytics\Data\V1\Dimension(['name' => 'unifiedScreenName']),
                    ],
                    'metrics' => [
                        new \Google\Analytics\Data\V1\Metric(['name' => 'activeUsers']),
                        new \Google\Analytics\Data\V1\Metric(['name' => 'screenPageViews']),
                    ],
                    'limit' => 10,
                ]);

                $activeUsers = 0;
                foreach ($rt->getTotals() as $total) {
                    foreach ($total->getMetricValues() as $mv) {
                        $activeUsers = max($activeUsers, (int) $mv->getValue());
                    }
                }

                $top = [];
                foreach ($rt->getRows() as $row) {
                    $dim = $row->getDimensionValues()[0]->getValue();
                    $metrics = $row->getMetricValues();
                    $top[] = [
                        'path' => $dim,
                        'activeUsers' => isset($metrics[0]) ? (int) $metrics[0]->getValue() : 0,
                        'views' => isset($metrics[1]) ? (int) $metrics[1]->getValue() : 0,
                    ];
                }

                return response()->json([
                    'activeUsers' => $activeUsers,
                    'topPages' => $top,
                ]);
            } else {
                /** @var \Google\Analytics\Data\V1beta\BetaAnalyticsDataClient $client */
                $client = new \Google\Analytics\Data\V1beta\BetaAnalyticsDataClient([
                    'credentials' => $credsFile,
                ]);

                $rt = $client->runRealtimeReport([
                    'property' => 'properties/' . $propertyId,
                    'dimensions' => [
                        new \Google\Analytics\Data\V1beta\Dimension(['name' => 'unifiedScreenName']),
                    ],
                    'metrics' => [
                        new \Google\Analytics\Data\V1beta\Metric(['name' => 'activeUsers']),
                        new \Google\Analytics\Data\V1beta\Metric(['name' => 'screenPageViews']),
                    ],
                    'limit' => 10,
                ]);

                $activeUsers = 0;
                foreach ($rt->getTotals() as $total) {
                    foreach ($total->getMetricValues() as $mv) {
                        $activeUsers = max($activeUsers, (int) $mv->getValue());
                    }
                }

                $top = [];
                foreach ($rt->getRows() as $row) {
                    $dim = $row->getDimensionValues()[0]->getValue();
                    $metrics = $row->getMetricValues();
                    $top[] = [
                        'path' => $dim,
                        'activeUsers' => isset($metrics[0]) ? (int) $metrics[0]->getValue() : 0,
                        'views' => isset($metrics[1]) ? (int) $metrics[1]->getValue() : 0,
                    ];
                }

                return response()->json([
                    'activeUsers' => $activeUsers,
                    'topPages' => $top,
                ]);
            }
        } catch (\Throwable $e) {
            Log::error('GA realtime error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to fetch realtime analytics',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function status(Request $request)
    {
        $sources = [];
        $credsPathEnv = env('GOOGLE_APPLICATION_CREDENTIALS');
        $b64 = env('GA_CREDENTIALS_JSON_BASE64') ? 'present' : 'missing';
        if ($credsPathEnv) {
            $sources['env_path'] = [
                'path' => $credsPathEnv,
                'readable' => is_readable($credsPathEnv),
            ];
        } else {
            $sources['env_path'] = null;
        }
        $sources['env_base64'] = $b64;
        $fallback = storage_path('app/ga_credentials.json');
        $sources['storage_fallback'] = [
            'path' => $fallback,
            'exists' => file_exists($fallback),
            'readable' => is_readable($fallback),
            'writable_dir' => is_writable(dirname($fallback)),
        ];
        return response()->json($sources);
    }

    public function upload(Request $request)
    {
        $request->validate([
            'keyfile' => ['required', 'file', 'mimes:json,txt'],
        ]);
        $file = $request->file('keyfile');
        $json = @file_get_contents($file->getRealPath());
        $decoded = json_decode($json, true);
        if (json_last_error() !== JSON_ERROR_NONE || !is_array($decoded)) {
            return response()->json([
                'error' => 'Invalid service account JSON',
                'message' => 'Ensure you uploaded the Google service account key JSON file.',
            ], 422);
        }
        $target = storage_path('app/ga_credentials.json');
        $dir = dirname($target);
        if (!is_dir($dir)) { @mkdir($dir, 0755, true); }
        if (!is_writable($dir)) {
            return response()->json([
                'error' => 'Storage directory not writable',
                'message' => 'Make storage/app writable by your PHP user.',
                'path' => $dir,
            ], 500);
        }
        if (@file_put_contents($target, $json) === false) {
            return response()->json([
                'error' => 'Failed to write credentials',
                'message' => 'Check storage/app permissions.',
            ], 500);
        }
        return response()->json([
            'ok' => true,
            'path' => $target,
        ]);
    }

    public function uploadRaw(Request $request)
    {
        $request->validate([
            'json' => ['required', 'string'],
        ]);
        $json = $request->input('json');
        $decoded = json_decode($json, true);
        if (json_last_error() !== JSON_ERROR_NONE || !is_array($decoded)) {
            return response()->json([
                'error' => 'Invalid service account JSON',
                'message' => 'Paste a valid Google service account key JSON.',
            ], 422);
        }
        $target = storage_path('app/ga_credentials.json');
        $dir = dirname($target);
        if (!is_dir($dir)) { @mkdir($dir, 0755, true); }
        if (!is_writable($dir)) {
            return response()->json([
                'error' => 'Storage directory not writable',
                'message' => 'Make storage/app writable by your PHP user.',
                'path' => $dir,
            ], 500);
        }
        if (@file_put_contents($target, $json) === false) {
            return response()->json([
                'error' => 'Failed to write credentials',
                'message' => 'Check storage/app permissions.',
            ], 500);
        }
        return response()->json(['ok' => true, 'path' => $target]);
    }
}
