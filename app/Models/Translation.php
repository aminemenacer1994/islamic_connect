<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Translation extends Model
{
    use HasFactory;

    protected $fillable = [
        'ayah_id',
        'translation_text',
        'language',
    ];

    // Relationships
    public function ayah(): BelongsTo
    {
        return $this->belongsTo(Ayah::class, 'ayah_id', 'id');
    }
}
