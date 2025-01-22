<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Information extends Model
{
    use HasFactory;

    protected $table = 'information';

    protected $fillable = [
        'tafseer',
        'translation',
        'transliteration',
        'information',
        'images',
        'audio',
        'ayah_id',
    ];

    // Relationships
    public function ayah(): BelongsTo
    {
        return $this->belongsTo(Ayah::class, 'ayah_id', 'id');
    }
}
