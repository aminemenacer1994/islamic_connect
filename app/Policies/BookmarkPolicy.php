<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Models\Bookmark;

class BookmarkPolicy
{
    use HandlesAuthorization;

    protected function getSessionId()
    {
        $request = request();
        $headers = ['X-Bookmark-Session', 'X-Bookmark-Session-Id'];
        foreach ($headers as $header) {
            $value = trim((string) $request->header($header, ''));
            if ($value !== '') {
                return $value;
            }
        }

        return $request->session()->getId();
    }

    public function view(?User $user, Bookmark $bookmark)
    {
        if ($user && $user->id === $bookmark->user_id) {
            return true;
        }

        return $bookmark->session_id === $this->getSessionId();
    }

    public function update(?User $user, Bookmark $bookmark)
    {
        if ($user && $user->id === $bookmark->user_id) {
            return true;
        }

        return $bookmark->session_id === $this->getSessionId();
    }

    public function delete(?User $user, Bookmark $bookmark)
    {
        if ($user && $user->id === $bookmark->user_id) {
            return true;
        }

        return $bookmark->session_id === $this->getSessionId();
    }
}
