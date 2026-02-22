<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserBadge extends Model
{
    protected $fillable = [
        'user_id',
        'badge_key',
        'title',
        'awarded_at',
    ];

    protected $casts = [
        'awarded_at' => 'datetime',
    ];
}
