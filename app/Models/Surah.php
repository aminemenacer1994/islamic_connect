<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Surah extends Model
{
    use HasFactory;

    protected $table = 'surah';

    protected $fillable = [
        'name_en',
        'name_ar',
        'text',
        'juz_id',
    ];

    // Relationships
    public function ayahs()
    {
        return $this->hasMany(Ayah::class, 'surah_id');
    }
}
