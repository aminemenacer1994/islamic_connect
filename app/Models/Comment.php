<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['comment', 'note_id'];

    // A comment belongs to a note
    public function note()
    {
        return $this->belongsTo(Note::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
