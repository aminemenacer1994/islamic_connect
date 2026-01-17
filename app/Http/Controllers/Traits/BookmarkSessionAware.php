<?php

namespace App\Http\Controllers\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

trait BookmarkSessionAware
{
    protected function resolveBookmarkSessionId(Request $request): ?string
    {
        $headers = ['X-Bookmark-Session', 'X-Bookmark-Session-Id'];
        foreach ($headers as $header) {
            $value = trim((string) $request->header($header, ''));
            if ($value !== '') {
                return $value;
            }
        }

        if ($request->hasSession()) {
            return $request->session()->getId();
        }

        return null;
    }

    protected function bookmarkOwner(Request $request): array
    {
        $owner = [];
        if ($user = $request->user()) {
            $owner['user_id'] = $user->id;
            return $owner;
        }
        if ($sessionId = $this->resolveBookmarkSessionId($request)) {
            $owner['session_id'] = $sessionId;
        }
        return $owner;
    }

    protected function ownerConstraint(Request $request): array
    {
        $owner = $this->bookmarkOwner($request);
        if (!empty($owner['user_id'])) {
            return ['user_id' => $owner['user_id']];
        }
        if (!empty($owner['session_id'])) {
            return ['session_id' => $owner['session_id']];
        }
        return [];
    }

    protected function ownerPayload(Request $request): array
    {
        $owner = $this->bookmarkOwner($request);
        return array_filter([
            'user_id' => $owner['user_id'] ?? null,
            'session_id' => $owner['session_id'] ?? null,
        ], fn ($value) => $value !== null);
    }

    protected function applyOwnerScope(Builder $query, Request $request): Builder
    {
        $owner = $this->bookmarkOwner($request);
        if (empty($owner)) {
            return $query;
        }

        if (!empty($owner['user_id'])) {
            $query->where('user_id', $owner['user_id']);
            return $query;
        }

        if (!empty($owner['session_id'])) {
            $query->where('session_id', $owner['session_id']);
            return $query;
        }

        return $query;
    }
}
