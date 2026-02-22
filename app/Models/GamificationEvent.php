<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GamificationEvent extends Model
{
    protected $fillable = [
        'user_id',
        'event_type',
        'points',
        'event_date',
        'dedupe_key',
        'meta',
    ];

    protected $casts = [
        'event_date' => 'date',
        'meta' => 'array',
    ];
}
