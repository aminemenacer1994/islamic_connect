<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ahadith extends Model
{
    use HasFactory;

    protected $table = 'ahadith';

    public $timestamps = false;

    protected $fillable = [
        'hadith_ar',
        'hadith_en',
        'chapter_id',
        'imam_id'       
    ];

    public function chapter()
    {
        return $this->BelongsTo(Chapter::class,'chapter_id','id');
    }


}