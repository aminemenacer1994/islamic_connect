<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

use Illuminate\Database\Eloquent\Builder;

class Bookmark extends Model
{
    protected $fillable = [
        'title',
        'surah_name',
        'surah_number',
        'ayah_num',
        'ayah_number',
        'ayah_info',
        'ayah_verse_ar',
        'ayah_verse_en',
        'ayah_id',
        'user_id',
        'session_id',
        'url',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ayah(): BelongsTo
    {
        return $this->belongsTo(Ayah::class, 'ayah_id');
    }

    public function folders(): BelongsToMany
    {
        return $this->belongsToMany(Folder::class, 'bookmark_folder')->withTimestamps();
    }

    public function resolveRouteBinding($value, $field = null)
    {
        $query = $this->newQuery();
        $query = $this->applyRequestOwnerScope($query);

        $field = $field ?? $this->getRouteKeyName();
        return $query->where($field, $value)->firstOrFail();
    }

    protected function applyRequestOwnerScope(Builder $query): Builder
    {
        $owner = $this->resolveOwnerFromRequest();
        if (empty($owner)) {
            return $query;
        }

        if (!empty($owner['user_id']) && !empty($owner['session_id'])) {
            return $query->where(function (Builder $sub) use ($owner) {
                $sub->where('user_id', $owner['user_id'])
                    ->orWhere('session_id', $owner['session_id']);
            });
        }

        if (!empty($owner['user_id'])) {
            return $query->where('user_id', $owner['user_id']);
        }

        if (!empty($owner['session_id'])) {
            return $query->where('session_id', $owner['session_id']);
        }

        return $query;
    }

    protected function resolveOwnerFromRequest(): array
    {
        $owner = [];
        $request = request();
        if (!$request) {
            return $owner;
        }

        if ($user = $request->user()) {
            $owner['user_id'] = $user->id;
        }

        $sessionId = trim((string) $request->header('X-Bookmark-Session', ''));
        if ($sessionId !== '') {
            $owner['session_id'] = $sessionId;
        }

        return $owner;
    }
}
