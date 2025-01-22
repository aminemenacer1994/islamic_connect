<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Correction extends Model
{
    use HasFactory;

    protected $table = 'correction';


    protected $fillable = [
        'added_notes',
        'rating',
        'created_at',
    ];
}
