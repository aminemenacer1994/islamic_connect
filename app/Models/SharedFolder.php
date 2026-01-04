<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

class SharedFolder extends Model
{
    protected $fillable = [
        'folder_id',
        'user_id',
        'token',
        'revoked_at',
        'last_viewed_at',
    ];

    protected $casts = [
        'revoked_at' => 'datetime',
        'last_viewed_at' => 'datetime',
    ];

    public function folder(): BelongsTo
    {
        return $this->belongsTo(Folder::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isActive(): bool
    {
        return $this->revoked_at === null;
    }
}
