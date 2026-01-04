<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\Bookmark;
use App\Policies\BookmarkPolicy;
use App\Models\Folder;
use App\Policies\FolderPolicy;
use App\Models\Note;
use App\Policies\NotePolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Bookmark::class => BookmarkPolicy::class,
        Folder::class => FolderPolicy::class,
        Note::class => NotePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        
    }
}
