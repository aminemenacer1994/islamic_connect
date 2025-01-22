<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Imam extends Model
{
    use HasFactory;

    protected $table = 'imam';


    protected $fillable = [
        'imam_name',       
    ];

    public function chapter()
    {
        return $this->hasMany(Chapter::class);
    }

    public function imam()
    {
        return $this->BelongsTo(Imam::class,'imam_id','id');
    }
}
