<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Ayah extends Model
{
    use HasFactory;

    protected $table = 'ayah';

    protected $fillable = [
        'surah_id',
        'ayah_id',
        'ayah_text',
        'audio_links',
    ];

    public function surah()
    {
        return $this->belongsTo(Surah::class);
    }

    // Relationships for translations, tafseer, and information
    public function translations()
    {
        return $this->hasMany(Translation::class);
    }

    public function tafseer()
    {
        return $this->hasOne(Tafseer::class);
    }

    public function information()
    {
        return $this->hasOne(Information::class);
    }
}
