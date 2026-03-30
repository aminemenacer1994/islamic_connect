<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RagDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'document_key',
        'source',
        'source_type',
        'source_id',
        'language',
        'title',
        'reference',
        'body',
        'snippet',
        'grade',
        'priority',
        'embedding',
        'metadata',
        'fetched_at',
    ];

    protected $casts = [
        'embedding' => 'array',
        'metadata' => 'array',
        'fetched_at' => 'datetime',
    ];
}
