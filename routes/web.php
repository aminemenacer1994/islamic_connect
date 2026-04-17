<?php

use App\Http\Controllers\AhadithController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Cache;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PricingController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CharityController;
use App\Http\Controllers\VolunteerController;
use App\Http\Controllers\MailingListController;
use App\Http\Controllers\CorrectionController;
use App\Http\Controllers\QuranController;
use App\Http\Controllers\SurahController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\JoinUsController;
use App\Http\Controllers\NotesController;
use App\Http\Controllers\UpdatesController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\VerseController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\SupportController;
use App\Http\Controllers\MissionController;
use App\Http\Controllers\AiController;
use App\Http\Controllers\AccessController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\SuratController;
use App\Http\Controllers\DuaController;
use App\Http\Controllers\RadioController;
use App\Http\Controllers\GuideController;
use App\Http\Controllers\StreamingController;
use App\Http\Controllers\ToolkitController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\ZakatController;
use App\Http\Controllers\QiblaController;
use App\Http\Controllers\MosqueController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\DateController;
use App\Http\Controllers\HadithController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\AthkarController;
use App\Http\Controllers\UmrahController;
use App\Http\Controllers\NameController;
use App\Http\Controllers\PrayerController;
use App\Http\Controllers\TravelController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\KnowledgeController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\WelfareController;
use App\Http\Controllers\BooksController;
use App\Http\Controllers\ConvertController;
use App\Http\Controllers\HolyController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\RevertController;
use App\Http\Controllers\MuslimController;
use App\Http\Controllers\DebugController;
use App\Http\Controllers\DigitalLibraryController;
use App\Http\Controllers\ReadController;
use App\Http\Controllers\ResourcesController;
use App\Http\Controllers\AiMessageReportController;
use App\Http\Controllers\HajjController;
use App\Http\Controllers\IslamController;
use App\Http\Controllers\YouthController;


// use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\Api\AyahBookmarkController;
use App\Http\Controllers\Api\FolderController as ApiFolderController;
use App\Http\Controllers\Api\SharedFolderController;
use App\Http\Controllers\Api\AnalyticsController;

use Illuminate\Http\Request;

Route::get('/sitemap.xml', function () {
    $lastmod = now()->toAtomString();
    
    // Define all public pages with appropriate priorities and change frequencies
    $pages = [
        // Homepage - highest priority
        ['loc' => url('/'), 'changefreq' => 'daily', 'priority' => '1.0'],
        ['loc' => url('/home'), 'changefreq' => 'daily', 'priority' => '1.0'],
        ['loc' => url('/welcome'), 'changefreq' => 'daily', 'priority' => '1.0'],
        
        // Quran Portal - high priority
        ['loc' => url('/holy'), 'changefreq' => 'daily', 'priority' => '0.9'],
        ['loc' => url('/quran'), 'changefreq' => 'daily', 'priority' => '0.9'],
        ['loc' => url('/surat'), 'changefreq' => 'daily', 'priority' => '0.9'],
        ['loc' => url('/history'), 'changefreq' => 'weekly', 'priority' => '0.8'],
        ['loc' => url('/read'), 'changefreq' => 'weekly', 'priority' => '0.8'],
        ['loc' => url('/islamic-blog'), 'changefreq' => 'weekly', 'priority' => '0.7'],
        ['loc' => url('/hadith'), 'changefreq' => 'weekly', 'priority' => '0.8'],
        ['loc' => url('/ahadith'), 'changefreq' => 'weekly', 'priority' => '0.8'],
        
        // Media Center - high priority
        ['loc' => url('/media'), 'changefreq' => 'weekly', 'priority' => '0.8'],
        
        // Islamic Knowledge - high priority
        ['loc' => url('/knowledge'), 'changefreq' => 'weekly', 'priority' => '0.8'],
        ['loc' => url('/mission'), 'changefreq' => 'monthly', 'priority' => '0.8'],
        ['loc' => url('/seerah'), 'changefreq' => 'monthly', 'priority' => '0.8'],
        ['loc' => url('/guide'), 'changefreq' => 'monthly', 'priority' => '0.7'],
        ['loc' => url('/books'), 'changefreq' => 'weekly', 'priority' => '0.7'],
        ['loc' => url('/name'), 'changefreq' => 'monthly', 'priority' => '0.6'],
        
        // Utility Toolkit - medium-high priority
        ['loc' => url('/toolkit'), 'changefreq' => 'weekly', 'priority' => '0.7'],
        ['loc' => url('/dua'), 'changefreq' => 'weekly', 'priority' => '0.7'],
        ['loc' => url('/qibla'), 'changefreq' => 'monthly', 'priority' => '0.6'],
        ['loc' => url('/prayer'), 'changefreq' => 'daily', 'priority' => '0.7'],
        ['loc' => url('/zakat'), 'changefreq' => 'monthly', 'priority' => '0.6'],
        ['loc' => url('/umrah'), 'changefreq' => 'monthly', 'priority' => '0.6'],
        ['loc' => url('/calendar'), 'changefreq' => 'daily', 'priority' => '0.6'],
        ['loc' => url('/date'), 'changefreq' => 'daily', 'priority' => '0.6'],
        
        // Services - medium priority
        ['loc' => url('/services'), 'changefreq' => 'weekly', 'priority' => '0.7'],
        ['loc' => url('/mosque'), 'changefreq' => 'weekly', 'priority' => '0.6'],
        ['loc' => url('/shop'), 'changefreq' => 'weekly', 'priority' => '0.6'],
        ['loc' => url('/store'), 'changefreq' => 'weekly', 'priority' => '0.6'],
        ['loc' => url('/finance'), 'changefreq' => 'monthly', 'priority' => '0.5'],
        ['loc' => url('/school'), 'changefreq' => 'monthly', 'priority' => '0.5'],
        ['loc' => url('/food'), 'changefreq' => 'weekly', 'priority' => '0.5'],
        ['loc' => url('/welfare'), 'changefreq' => 'monthly', 'priority' => '0.5'],
        ['loc' => url('/travel'), 'changefreq' => 'monthly', 'priority' => '0.5'],
        ['loc' => url('/convert'), 'changefreq' => 'monthly', 'priority' => '0.5'],
        
        // Subscription & Support - medium priority
        // ['loc' => url('/subscribe'), 'changefreq' => 'monthly', 'priority' => '0.6'],
        // ['loc' => url('/pricing'), 'changefreq' => 'monthly', 'priority' => '0.6'],
        ['loc' => url('/support'), 'changefreq' => 'monthly', 'priority' => '0.6'],
        ['loc' => url('/charity'), 'changefreq' => 'monthly', 'priority' => '0.7'],
        ['loc' => url('/volunteer'), 'changefreq' => 'monthly', 'priority' => '0.6'],
        ['loc' => url('/donation'), 'changefreq' => 'monthly', 'priority' => '0.6'],
        
        // Content & Collections - medium priority
        ['loc' => url('/collection'), 'changefreq' => 'weekly', 'priority' => '0.7'],
        ['loc' => url('/digital-library'), 'changefreq' => 'weekly', 'priority' => '0.7'],
        ['loc' => url('/updates'), 'changefreq' => 'weekly', 'priority' => '0.5'],
        ['loc' => url('/mailing_list'), 'changefreq' => 'monthly', 'priority' => '0.4'],
        ['loc' => url('/join_us'), 'changefreq' => 'monthly', 'priority' => '0.5'],
        
        // Information & Help - lower priority
        ['loc' => url('/faq'), 'changefreq' => 'monthly', 'priority' => '0.5'],
        ['loc' => url('/contact'), 'changefreq' => 'monthly', 'priority' => '0.4'],
        ['loc' => url('/access'), 'changefreq' => 'monthly', 'priority' => '0.4'],
        ['loc' => url('/feedback'), 'changefreq' => 'monthly', 'priority' => '0.3'],
        ['loc' => url('/correction'), 'changefreq' => 'monthly', 'priority' => '0.3'],
    ];

    // Ensure lastmod is set for all pages
    $pages = array_map(function ($page) use ($lastmod) {
        $page['lastmod'] = $page['lastmod'] ?? $lastmod;
        return $page;
    }, $pages);

    return response()
        ->view('sitemap', ['pages' => $pages])
        ->header('Content-Type', 'application/xml');
});


Route::get('/debug/ga4', fn() => ['config' => config('services.ga4.property_id'), 'env' => env('GA4_PROPERTY_ID')]);
// ========================================
// PUBLIC ROUTES
// ========================================
// Use the main home view that extends layouts.app (contains #app root)
// Route::get('/', fn() => view('app'));
/**
 * Cache the homepage HTML so that repeated hits stay under 0.4s.
 */
$homeResponder = function () {
    if (auth()->check()) {
        return response()
            ->view('home')
            ->header('Cache-Control', 'no-store, private, max-age=0');
    }

    $rendered = Cache::remember('home.page.html', 300, function () {
        return view('home')->render();
    });

    return response($rendered)
        ->header('Cache-Control', 'public, max-age=300, s-maxage=600, stale-while-revalidate=60')
        ->header('Vary', 'Cookie');
};

Route::get('/welcome', $homeResponder);
Route::get('/', $homeResponder);
Route::get('/home', $homeResponder);
Route::view('/trust', 'trust')->name('trust');
// Route::get('/about', [AboutController::class, 'index'])->name('about');

// Auth Routes
Auth::routes();

Route::get('/php-runtime-check', function () {
    return [
    'php' => PHP_VERSION,
    'sapi' => php_sapi_name(),
    'pdo' => extension_loaded('pdo') ? 'yes' : 'no',
    'pdo_mysql' => extension_loaded('pdo_mysql') ? 'yes' : 'no',
    ];
    });


// Social Auth
Route::get('auth/facebook', [LoginController::class, 'redirectToFacebook'])->name('facebook-auth');
Route::get('auth/facebook/callback', [LoginController::class, 'handleFacebookCallback']);
Route::get('auth/google', [LoginController::class, 'redirectToGoogle'])->name('google-auth');
Route::get('auth/google/callback', [LoginController::class, 'handleGoogleCallback']);
Route::get('login/linkedin', [LoginController::class, 'redirectToLinkedIn'])->name('linkedin-auth');
Route::get('login/linkedin/callback', [LoginController::class, 'handleLinkedInCallback']);

// Subscription Public Routes
// Route::view('/subscribe', 'subscribe')->name('subscribe');
// Route::get('/subscribe/success', [SubscriptionController::class, 'success'])->name('subscribe.success');
// Route::post('/stripe/webhook', [SubscriptionController::class, 'handleWebhook'])
//     ->withoutMiddleware([\App\Http\Middleware\VerifyCsrfToken::class]);

// Donation Routes
Route::get('/donation/success', [SupportController::class, 'success'])->name('donation.success');
Route::get('/donation/cancel', fn() => view('donation.cancel'))->name('donation.cancel');
Route::get('/api/donation-insights', [SupportController::class, 'insights']);

// Public API Routes
Route::get('api/userId', [UserController::class, 'getUserId']);
Route::get('/test-fetch-notes', function () {
    $publicNotes = App\Models\Note::where('option', 0)->orderBy('created_at', 'desc')->get();
    return response()->json($publicNotes);
});

// Public Pages
Route::get('/content', [ContentController::class, 'index'])->name('content');
Route::get('/streaming', [StreamingController::class, 'index'])->name('streaming');
Route::get('/radio', [RadioController::class, 'index'])->name('radio');
Route::get('/video', [VideoController::class, 'index'])->name('video');
Route::get('/zakat', [ZakatController::class, 'index'])->name('zakat');
Route::get('/qibla', [QiblaController::class, 'index'])->name('qibla');
Route::get('/mosque', [MosqueController::class, 'index'])->name('mosque');
Route::get('/school', [SchoolController::class, 'index'])->name('school');
Route::get('/shop', [ShopController::class, 'index'])->name('shop');

Route::get('/resource', [ResourcesController::class, 'index'])->name('resource');
Route::get('/revert', [RevertController::class, 'index'])->name('revert');
Route::get('/muslim', [MuslimController::class, 'index'])->name('muslim');




Route::get('/guide', [GuideController::class, 'index'])->name('guide');
Route::view('/ramadan-2026', 'ramadan_2026')->name('ramadan_2026');
Route::view('/hajj','hajj')->name('hajj');
Route::view('/islam','islam')->name('islam');
Route::get('/quran', [QuranController::class, 'index']);
Route::get('/contact', [ContactController::class, 'index']);
// Route::get('/pricing', [PricingController::class, 'index'])->name('pricing');
Route::get('/charity', [CharityController::class, 'index'])->name('charity');
Route::get('/volunteer', [VolunteerController::class, 'index'])->name('volunteer');
Route::get('/collection', [CollectionController::class, 'index'])->name('collection');
Route::get('/faq', [FaqController::class, 'index'])->name('faq');
Route::get('/join_us', [JoinUsController::class, 'index'])->name('join_us');
Route::get('/support', [SupportController::class, 'index'])->name('support');
// Create Stripe Checkout session for donations (optional, for API-driven flow)
Route::post('/support/create-checkout-session', [SupportController::class, 'createCheckoutSession']);
Route::get('/mission', [MissionController::class, 'index'])->name('mission');
Route::get('/updates', [UpdatesController::class, 'index']);
Route::get('/ayahs', [QuranController::class, 'index']);

// Public Notes & Comments
Route::get('/notes', [NotesController::class, 'showNotes']);
Route::get('/group_notes', [NotesController::class, 'showGroupNotes']);
Route::get('/fetch-notes', [NotesController::class, 'fetchNotes']);
Route::get('/notes/{note}', [NotesController::class, 'show']);
Route::get('/notes/{note}/comments', [CommentsController::class, 'getComments']);
Route::get('/get-comments/{noteId}', [CommentsController::class, 'getComments']);
Route::get('/get-notes', [NotesController::class, 'getNotesWithComments']);

// Quran API Routes
Route::get('/get_surat', [SurahController::class, 'getSurat']);
Route::get('/get_ayat', [SurahController::class, 'getAyat']);
Route::get('/get_informations', [SurahController::class, 'getInformations']);
Route::get('/tafseer/{id}/fetch', [SurahController::class, 'getTafseers']);
Route::get('/surahs/{id}/ayahs', [SurahController::class, 'getAyahsBySurah']);
Route::get('/surahs/{id}/translations', [SurahController::class, 'getTranslationBySurah']);
Route::get('/get_translation/{id}', [SurahController::class, 'getTranslationBySurah']);
Route::get('/ayahs/{ayahId}/translations', [SurahController::class, 'getTranslationByAyah']);
Route::get('/search-translations', [SurahController::class, 'searchTranslations']);
Route::get('/ayat', [SurahController::class, 'getAudioAyat']);
Route::get('/verses', [VerseController::class, 'getVerses']);
Route::get('/translations', [VerseController::class, 'getTranslations']);

// Hadith API Routes
Route::get('/get_imams', [AhadithController::class, 'getImams']);
Route::get('/get_chapters', [AhadithController::class, 'getChapters']);
Route::get('/ahadith/{id}/fetch', [AhadithController::class, 'getAhadith']);
Route::get('/get_ahadiths', [AhadithController::class, 'getAhadiths']);
Route::get('/ahadith', [AhadithController::class, 'index']);

// Mailing List
Route::get('/mailing_list', [MailingListController::class, 'index'])->name('mailing_list');
Route::get('api/fetch-mail', [MailingListController::class, 'getMail'])->name('mailing_list');
Route::post('api/subscribe', [MailingListController::class, 'create']);
Route::post('api/submit-mail', [MailingListController::class, 'submitMail']);

// Correction
Route::post('/submit-correction', [CorrectionController::class, 'submit']);
Route::get('/correction', [CorrectionController::class, 'index']);
Route::get('/fetch-corrections', [CorrectionController::class, 'getCorrections']);

// Feedback
Route::get('/feedback', [FeedbackController::class, 'index']);
Route::get('api/fetch-feedbacks', [FeedbackController::class, 'getFeedbacks']);
Route::post('api/send-message', [FeedbackController::class, 'sendMessage']);

// Other Public Pages
Route::get('/access', [AccessController::class, 'index'])->name('access');
Route::get('/surat', [SuratController::class, 'index'])->name('surat');
Route::get('/dua', [DuaController::class, 'index'])->name('dua');
Route::get('/seerah', [MissionController::class, 'index'])->name('seerah');
Route::get('/guide', [GuideController::class, 'index'])->name('guide');
Route::get('/digital-library', [DigitalLibraryController::class, 'index'])->name('digital_library');
Route::get('/toolkit', [ToolkitController::class, 'index'])->name('toolkit');
Route::get('/zakat', [ZakatController::class, 'index'])->name('zakat');
Route::get('/qibla', [QiblaController::class, 'index'])->name('qibla');
Route::get('/mosque', [MosqueController::class, 'index'])->name('mosque');
Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar');
Route::get('/date', [DateController::class, 'index'])->name('date');
Route::get('/hadith', [HadithController::class, 'index'])->name('hadith');
Route::get('/shop', [ShopController::class, 'index'])->name('shop');
Route::get('/finance', [FinanceController::class, 'index'])->name('finance');
Route::get('/umrah', [UmrahController::class, 'index'])->name('umrah');
Route::get('/name', [NameController::class, 'index'])->name('name');
Route::get('/prayer', [PrayerController::class, 'index'])->name('prayer');
Route::get('/travel', [TravelController::class, 'index'])->name('travel');
Route::get('/knowledge', [KnowledgeController::class, 'index'])->name('knowledge');
Route::get('/services', [ServicesController::class, 'index'])->name('services');
Route::get('/store', [StoreController::class, 'index'])->name('store');
Route::get('/food', [FoodController::class, 'index'])->name('food');
Route::get('/welfare', [WelfareController::class, 'index'])->name('welfare');
Route::get('/books', [BooksController::class, 'index'])->name('books');
Route::get('/convert', [ConvertController::class, 'index'])->name('convert');
Route::get('/holy', [HolyController::class, 'index'])->name('holy');
Route::get('/history', [HistoryController::class, 'index'])->name('history');
Route::get('/hajj', [HajjController::class, 'index'])->name('hajj');
Route::get('/islam', [IslamController::class, 'index'])->name('islam');
Route::get('/youth', [YouthController::class, 'index'])->name('youth');
Route::get('/quran', [IslamController::class, 'index'])->name('islam');

Route::get('/read', [ReadController::class, 'index'])->name('read');
Route::view('/islamic-blog', 'islamic-blog')->name('islamic_blog');
Route::get('/media', [MediaController::class, 'index'])->name('media');
Route::get('/ai', [AiController::class, 'index'])->name('ai');
Route::post('/ai/chat', [AiController::class, 'chat'])->name('ai.chat');
Route::get('/shared/folders/{token}', [SharedFolderController::class, 'publicView'])->name('shared.folders.view');
Route::get('/api/shared/folders/{token}', [SharedFolderController::class, 'show'])->name('shared.folders.api');

// ========================================
// AUTHENTICATED ROUTES (No Subscription Required)
// ========================================
Route::middleware(['auth', 'web'])->group(function () {

    // User & Subscription
    Route::get('/user', [MediaController::class, 'getUser']);
    // Route::get('/subscription-status', [SubscriptionController::class, 'subscriptionStatus']);
    // Route::post('/subscribe', action: [SubscriptionController::class, 'createSubscription']);
    // Route::post('/cancel', [SubscriptionController::class, 'cancelSubscription'])->name('cancel');
    
    // Dashboard & Profile
    Route::get('/dashboard', fn() => view('dashboard'))->name('dashboard');
    Route::get('/profile', fn() => view('profile'))->name('profile');
    Route::view('/playlist', 'playlist')->name('playlist');
    Route::view('/pins', 'pins')->name('pins');
    Route::get('api/fetch-dashboard', [DashboardController::class, 'getDashboard'])->name('fetch_dashboard');
    Route::get('api/admin-metrics', [DashboardController::class, 'metrics'])->name('admin_metrics');
    
    // Bookmarks & Folders
    Route::get('/bookmarks', [BookmarkController::class, 'index']);
    Route::post('/bookmarks', [BookmarkController::class, 'store']);
    Route::get('api/fetch-bookmarks/{userId}', [BookmarkController::class, 'getBookmarks']);
    Route::get('api/fetch-bookmarks/folder/{folderId}', [BookmarkController::class, 'getBookmarksByFolder']);
    Route::delete('api/delete-bookmarks/{id}', [BookmarkController::class, 'deleteBookmarks']);
    Route::get('/bookmarks/{userId}', [BookmarkController::class, 'getBookmarks']);
    Route::delete('/bookmarks/{id}', [BookmarkController::class, 'deleteBookmarks']);
    Route::get('/folders/bookmarks', [BookmarkController::class, 'getBookmarksByFolder']);
    Route::get('/folders', [FolderController::class, 'getFolders']);
    Route::post('/folders', [FolderController::class, 'store']);
    Route::put('/folders/{id}', [FolderController::class, 'update']);
    Route::delete('/folders/{id}', [FolderController::class, 'delete']);
    Route::get('/folders/{folderId}/bookmarks', [FolderController::class, 'getBookmarksByFolder']);
    Route::get('/fetch-folders', [FolderController::class, 'fetchFolders']);

    // Bookmark folders (new API)
    Route::prefix('api')->group(function () {
        Route::get('preferences/{key}', [\App\Http\Controllers\Api\UserPreferenceController::class, 'show']);
        Route::put('preferences/{key}', [\App\Http\Controllers\Api\UserPreferenceController::class, 'update']);

        Route::get('folders', [ApiFolderController::class, 'index']);
        Route::post('folders', [ApiFolderController::class, 'store']);
        Route::get('folders/{folder}', [ApiFolderController::class, 'show']);
        Route::put('folders/{folder}', [ApiFolderController::class, 'update']);
        Route::delete('folders/{folder}', [ApiFolderController::class, 'destroy']);
        Route::get('folders/{folder}/bookmarks', [ApiFolderController::class, 'bookmarks']);
        Route::post('folders/order', [ApiFolderController::class, 'reorder']);
        Route::post('folders/{folder}/share', [SharedFolderController::class, 'store']);
        Route::delete('folders/{folder}/share', [SharedFolderController::class, 'destroy']);

        Route::get('ayah-bookmarks', [AyahBookmarkController::class, 'index']);
        Route::post('ayah-bookmarks', [AyahBookmarkController::class, 'store'])->middleware('throttle:30,1');
        Route::post('ayah-bookmarks/{bookmark}/folders', [AyahBookmarkController::class, 'attachFolders'])->middleware('throttle:30,1');
        Route::delete('ayah-bookmarks/bulk', [AyahBookmarkController::class, 'bulkDestroy'])->middleware('throttle:20,1');
        Route::delete('ayah-bookmarks/{bookmarkId}', [AyahBookmarkController::class, 'destroy'])->middleware('throttle:30,1');
        Route::delete('ayah-bookmarks/{bookmark}/folders/{folder}', [AyahBookmarkController::class, 'detachFolder'])->middleware('throttle:30,1');
        Route::post('ayah-bookmarks/order', [AyahBookmarkController::class, 'reorder'])->middleware('throttle:30,1');

        Route::delete('folders/bulk', [ApiFolderController::class, 'bulkDestroy'])->middleware('throttle:20,1');

        Route::get('analytics/most-bookmarked-ayat', [AnalyticsController::class, 'mostBookmarkedAyat']);
        Route::get('analytics/most-popular-folders', [AnalyticsController::class, 'mostPopularFolders']);
        Route::get('analytics/activity-by-hour', [AnalyticsController::class, 'activityByHour']);
        Route::get('analytics/ramadan-activity', [AnalyticsController::class, 'ramadanActivity']);
    });
    
    // Notes & Comments
    Route::post('/notes/{noteId}/like', [LikeController::class, 'like']);
    Route::post('/notes/{noteId}/unlike', [LikeController::class, 'unlike']);
    Route::post('api/submit-note', [NotesController::class, 'store']);
    Route::post('/submit-note', [NotesController::class, 'store']);
    Route::post('api/update-notes/{id}', [NotesController::class, 'updateNotes']);
    Route::delete('api/delete-notes/{id}', [NotesController::class, 'deleteNotes']);
    Route::get('/fetch-notes/{userId}', [NotesController::class, 'getNotes']);
    Route::get('/api/notes/{userId}', [NotesController::class, 'getNotes']);
    Route::put('/api/update-note/{id}', [NotesController::class, 'updateNotes']);
    Route::delete('/api/delete-note/{id}', [NotesController::class, 'deleteNotes']);
    Route::post('/search', [NotesController::class, 'search'])->name('search');
    Route::get('/api/fetch-notes/{userId}', [NotesController::class, 'fetchNotes']);
    Route::get('/api/fetch-notes', [NotesController::class, 'fetchNotes']);
    Route::post('/notes/store', [NotesController::class, 'store']);
    Route::post('/comments', [CommentsController::class, 'store']);
    Route::post('/add-comment', [CommentsController::class, 'store']);
    Route::post('/notes/{note}/like', [LikeController::class, 'like']);
    Route::post('/notes/{note}/unlike', [LikeController::class, 'unlike']);

    // Admin & Management
    Route::get('/users', [UserController::class, 'index']);
    Route::get('api/fetch-users', [UserController::class, 'getUsers']);
    Route::post('api/create-users', [UserController::class, 'createUsers']);
    Route::post('api/update-users/{id}', [UserController::class, 'updateUsers']);
    Route::delete('api/delete-users/{id}', [UserController::class, 'deleteUsers']);
    Route::delete('/delete-correction/{id}', [CorrectionController::class, 'deleteCorrections']);
    Route::get('/ai-reports', [AiMessageReportController::class, 'index'])->name('ai_reports');
    Route::get('api/fetch-ai-reports', [AiMessageReportController::class, 'getReports'])->name('fetch_ai_reports');
    
    // Payments & Donations
    Route::get('/payments', [PaymentController::class, 'index']);
    Route::get('api/fetch-payments', [PaymentController::class, 'getPayments']);
    Route::get('api/stripe/transactions', [PaymentController::class, 'getStripeTransactions']);
    Route::get('/donations', [DonationController::class, 'index']);
    Route::get('/fetch-donations', [DonationController::class, 'getDonations']);

    // Analytics routes removed
    
});

// ========================================
// // SUBSCRIPTION-ONLY ROUTES (Premium Content)
// // ========================================
// Route::middleware(['auth', 'web', 'subscribed'])->group(function () {
//     Route::get('/content', [ContentController::class, 'index'])->name('content');
//     Route::get('/streaming', [StreamingController::class, 'index'])->name('streaming');
//     Route::get('/radio', [RadioController::class, 'index'])->name('radio');
//     Route::get('/video', [VideoController::class, 'index'])->name('video');
//     Route::get('/zakat', [ZakatController::class, 'index'])->name('zakat');
//     Route::get('/qibla', [QiblaController::class, 'index'])->name('qibla');
//     Route::get('/mosque', [MosqueController::class, 'index'])->name('mosque');
//     Route::get('/school', [SchoolController::class, 'index'])->name('school');
//     Route::get('/shop', [ShopController::class, 'index'])->name('shop');
    

// });
