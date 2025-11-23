<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutUsSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'section_group',
        'column_name',
        'column_class',
        'label',
        'heading',
        'heading_tag',
        'subheading',
        'content',
        'layout',
        'order',
    ];

    protected $casts = [
        'content' => 'array',
    ];
}
