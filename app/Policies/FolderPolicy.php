<?php

namespace App\Policies;

use App\Models\Folder;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class FolderPolicy
{
    use HandlesAuthorization;

    public function view(?User $user, Folder $folder): bool
    {
        if ($user && $user->id === $folder->user_id) {
            return true;
        }
        if ($user) {
            return false;
        }
        $sessionId = $this->resolveSessionId();
        return $sessionId && $sessionId === $folder->session_id;
    }

    public function update(?User $user, Folder $folder): bool
    {
        if ($user && $user->id === $folder->user_id) {
            return true;
        }
        if ($user) {
            return false;
        }
        $sessionId = $this->resolveSessionId();
        return $sessionId && $sessionId === $folder->session_id;
    }

    public function delete(?User $user, Folder $folder): bool
    {
        if ($user && $user->id === $folder->user_id) {
            return true;
        }
        if ($user) {
            return false;
        }
        $sessionId = $this->resolveSessionId();
        return $sessionId && $sessionId === $folder->session_id;
    }

    private function resolveSessionId(): ?string
    {
        $value = trim((string) request()->header('X-Bookmark-Session', ''));
        return $value !== '' ? $value : null;
    }
}
