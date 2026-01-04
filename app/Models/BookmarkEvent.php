<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookmarkEvent extends Model
{
    protected $fillable = [
        'user_id',
        'bookmark_id',
        'folder_id',
        'ayah_id',
        'event',
        'meta',
    ];

    protected $casts = [
        'meta' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function bookmark(): BelongsTo
    {
        return $this->belongsTo(Bookmark::class);
    }

    public function folder(): BelongsTo
    {
        return $this->belongsTo(Folder::class);
    }

    public function ayah(): BelongsTo
    {
        return $this->belongsTo(Ayah::class);
    }
}
