<?php

use App\Http\Controllers\AhadithController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HomeController;
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
use App\Http\Controllers\AboutController;
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
use GuzzleHttp\Client;


// Auth routes
Auth::routes();

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    // Other admin routes...
});

Route::get('api/userId', [UserController::class, 'getUserId']);



// comment
Route::get('/notes/{note}/comments', [CommentsController::class, 'getComments']);
Route::post('/comments', [CommentsController::class, 'store']);
Route::get('/notes/{note}', [NoteController::class, 'show']);
Route::get('/notes/{note}/comments', [CommentsController::class, 'getComments']);
Route::post('/add-comment', [CommentsController::class, 'addComment'])->name('add-comment');

// Route to get comments for a specific note
Route::get('/get-comments/{noteId}', [CommentsController::class, 'getComments']);

// Route to add a comment to a specific note
Route::post('/add-comment', [CommentsController::class, 'store']);

// Route to get all notes (and their comments)
Route::get('/get-notes', [NoteController::class, 'getNotesWithComments']);


Route::middleware(['auth'])->group(function () {
    //bookmark
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

    Route::post('/notes/{noteId}/like', [LikeController::class, 'like']);
    Route::post('/notes/{noteId}/unlike', [LikeController::class, 'unlike']);
    
    Route::get('/fetch-notes', [NotesController::class, 'fetchNotes']);

    // Route::get('/notes', [NotesController::class, 'index']);
    // Route::get('api/fetch-notes', [NotesController::class, 'getNotes']);
    Route::post('api/submit-note', [NotesController::class, 'store']);
    Route::post('/submit-note', [NotesController::class, 'store']);

    Route::post('api/update-notes/{id}',  [NotesController::class, 'updateNotes']);
    Route::delete('api/delete-notes/{id}',  [NotesController::class, 'deleteNotes']);
    Route::get('/fetch-notes/{userId}', [NotesController::class, 'getNotes']);

    Route::get('/notes', [NotesController::class, 'index']);
    Route::get('/api/notes/{userId}', [NotesController::class, 'getNotes']);
    Route::post('/api/submit-note', [NotesController::class, 'store']);
    Route::put('/api/update-note/{id}', [NotesController::class, 'updateNotes']);
    Route::delete('/api/delete-note/{id}', [NotesController::class, 'deleteNotes']);
    Route::post('/search', [NotesController::class, 'search'])->name('search');
    Route::get('/search-translations', [SurahController::class, 'searchTranslations']);


});

Route::post('/notes/store', [NotesController::class, 'store'])->middleware('auth');



Route::get('/notes', [NotesController::class, 'showNotes']);
Route::get('/group_notes', [NotesController::class, 'showGroupNotes']);
Route::get('/fetch-notes', [NotesController::class, 'fetchNotes']); // Ensure this is also open



Route::get('/test-fetch-notes', function () {
    $publicNotes = App\Models\Note::where('option', 0)->orderBy('created_at', 'desc')->get();
    return response()->json($publicNotes);
});








Route::get('/ayahs', [QuranController::class, 'index']);

//join us
Route::get('/join_us', [JoinUsController::class, 'index']);



// Example: Restrict access to a route to authenticated users
Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])
    ->middleware('auth');

Route::get('/', function () {
    return view('quran');
});
Route::get('/welcome', function () {
    return view('home');
});

// Folders
Route::get('/folders', [FolderController::class, 'index']);
Route::post('/folders', [FolderController::class, 'store']);
Route::put('/folders/{id}', [FolderController::class, 'update']);
Route::delete('/folders/{id}', [FolderController::class, 'delete']);
Route::get('/folders/{folderId}/bookmarks', [FolderController::class, 'getBookmarksByFolder']);
Route::get('/fetch-folders', [FolderController::class, 'fetchFolders']);

Route::post('/notes/{note}/like', [LikeController::class, 'like'])->middleware('auth');
Route::post('/notes/{note}/unlike', [LikeController::class, 'unlike'])->middleware('auth');



// Route for fetching verses
Route::get('/verses', [VerseController::class, 'getVerses']);
// Route for fetching translations
Route::get('/translations', [VerseController::class, 'getTranslations']);


//updates
Route::get('/updates', [UpdatesController::class, 'index']);

//facebook sign-in
Route::get('/auth/facebook', [LoginController::class, 'redirectToFacebook'])->name('fb-auth');
Route::get('/auth/facebook/callback', [LoginController::class, 'loginWithFacebook']);

// google sign-in
Route::get('auth/google', [LoginController::class, 'redirectToGoogle'])->name('google-auth');
Route::get('auth/google/callback', [LoginController::class, 'handleGoogleCallback']);


// users
Route::get('/users', [UserController::class, 'index']);
Route::get('api/fetch-users', [UserController::class, 'getUsers']);
Route::post('api/create-users', [UserController::class, 'createUsers']);
Route::post('api/update-users/{id}',  [UserController::class, 'updateUsers']);
Route::delete('api/delete-users/{id}',  [UserController::class, 'deleteUsers']);
Route::get('/profile', [UserController::class, 'getProfile']);

//ahadith
Route::get('/get_imams', [AhadithController::class, 'getImams']);
Route::get('/get_chapters', [AhadithController::class, 'getChapters']);
Route::get('/ahadith/{id}/fetch', [AhadithController::class, 'getAhadith']);
Route::get('/get_ahadiths', [AhadithController::class, 'getAhadiths']);
Route::get('/ahadith', [AhadithController::class, 'index']);
Route::post('/search', [AhadithController::class, 'search'])->name('search');
// Route::get('/hadith/{id}/fetch', [AhadithController::class, 'getAhadiths']);

//quran
Route::get('/get_surat', [SurahController::class, 'getSurat']);
Route::get('/get_ayat', [SurahController::class, 'getAyat']);
Route::get('/get_informations', [SurahController::class, 'getInformations']);
Route::get('/tafseer/{id}/fetch', [SurahController::class, 'getTafseers']);

Route::post('/search', [SurahController::class, 'search'])->name('search');

Route::get('/surahs/{id}/ayahs', [SurahController::class, 'getAyahsBySurah']);
Route::get('/surahs/{id}/translations', [SurahController::class, 'getTranslationBySurah']); // Ensure this controller and method exist
Route::get('/get_translation/{id}', [SurahController::class, 'getTranslationBySurah']);

Route::get('/ayahs/{ayahId}/translations', [SurahController::class, 'getTranslationByAyah']);

Route::get('/search-translations', [SurahController::class, 'searchTranslations']);

// audio
Route::get('/ayat', [SurahController::class, 'getAudioAyat']);


// mailing list
Route::get('/mailing_list', [MailingListController::class, 'index'])->name('mailing_list');
Route::get('api/fetch-mail', [MailingListController::class, 'getMail'])->name('mailing_list');
Route::post('api/subscribe', [MailingListController::class, 'create']);
Route::post('api/submit-mail', [MailingListController::class, 'submitMail']);

Route::post('api/subscribe', [MailingListController::class, 'create']);

// correction
Route::post('/submit-correction', [CorrectionController::class, 'submit']);
Route::get('/correction', [CorrectionController::class, 'index']);
Route::get('/fetch-corrections', [CorrectionController::class, 'getCorrections']);
Route::delete('/delete-correction/{id}',  [CorrectionController::class, 'deleteCorrections']);

// dashboard
Route::get('/home', [HomeController::class, 'index'])->name('home');
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('api/fetch-dashboard', [DashboardController::class, 'getDashboard'])->name('fetch_dashboard');

// feedback
Route::get('/feedback', [FeedbackController::class, 'index']);
Route::get('api/fetch-feedbacks', [FeedbackController::class, 'getFeedbacks']);
Route::post('api/send-message', [FeedbackController::class, 'sendMessage']);

// payment
Route::get('/payments', [PaymentController::class, 'index']);
Route::get('api/fetch-payments', [PaymentController::class, 'getPayments']);

// donations
Route::get('/donations', [DonationController::class, 'index']);
Route::get('/fetch-donations', [DonationController::class, 'getDonations']);

Route::post('/create-checkout-session', [SupportController::class, 'createCheckoutSession']);


Route::post('/create-checkout-session', [SupportController::class, 'createCheckoutSession']);

Route::get('/donation/success', function () {
    return view('donation.success');  // View after successful donation
})->name('donation.success');

Route::get('/donation/cancel', function () {
    return view('donation.cancel');  // View if donation is canceled
})->name('donation.cancel');



// quran
Route::get('/quran', [QuranController::class, 'index']);
// contact
Route::get('/contact', [ContactController::class, 'index']);
// pricing
Route::get('/pricing', [PricingController::class, 'index'])->name('pricing');
// charity
Route::get('/charity', [CharityController::class, 'index'])->name('charity');
// volunteer
Route::get('/volunteer', [VolunteerController::class, 'index'])->name('volunteer');
// about
Route::get('/about', [AboutController::class, 'index'])->name('about');
// collection
Route::get('/collection', [CollectionController::class, 'index'])->name('collection');
// faq
Route::get('/faq', [FaqController::class, 'index'])->name('faq');
// join us
Route::get('/join_us', [JoinUsController::class, 'index'])->name('join_us');
// support
Route::get('/support', [SupportController::class, 'index'])->name('support');
// mission
Route::get('/mission', [MissionController::class, 'index'])->name('mission');
// ai
Route::get('/ai', [AiController::class, 'index'])->name('ai');
// access
Route::get('/access', [AccessController::class, 'index'])->name('access');
// content
Route::get('/content', [ContentController::class, 'index'])->name('content');

Route::get('/fetch-podcast', function () {
    $url = "https://themuslimvibe.com/feed/podcast";
    $response = Http::get($url);
    return response($response->body(), 200)
        ->header('Content-Type', 'application/xml');
});