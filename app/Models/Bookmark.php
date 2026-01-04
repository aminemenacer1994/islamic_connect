<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
}

