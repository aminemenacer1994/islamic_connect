<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    use HasFactory;

    protected $table = 'chapter';


    protected $fillable = [
        'chapter_id', 
        'chapter_text',
        'imam_id',
              
    ];

    public function imam()
    {
        return $this->BelongsTo(Imam::class, 'imam_id', 'id');
    }

    public function ahadith()
    {
        return $this->oneToMany(Ahadith::class,'chapter_id','id');
    }
}
