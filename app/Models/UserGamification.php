<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserGamification extends Model
{
    protected $fillable = [
        'user_id',
        'points_total',
        'current_streak',
        'best_streak',
        'last_activity_date',
    ];

    protected $casts = [
        'last_activity_date' => 'date',
    ];
}
