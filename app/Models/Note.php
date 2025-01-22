<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'surah_name',
        'ayah_num',
        'ayah_info',
        'ayah_verse_ar',
        'ayah_verse_en',
        'ayah_notes',
        'visibility_option', 
        'is_speech_to_text'
    ];
}
