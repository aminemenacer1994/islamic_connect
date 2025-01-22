<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Models\Bookmark;

class BookmarkPolicy
{
    use HandlesAuthorization;

    public function delete(User $user, Bookmark $bookmark)
    {
        return $user->id === $bookmark->user_id;
    }
}
