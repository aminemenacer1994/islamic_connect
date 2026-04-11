<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;

    protected $table = 'feedback';

    public const SUBJECT_OPTIONS = [
        'enquiry' => 'General enquiry',
        'bug report' => 'Bug report',
        'content error' => 'Content error',
        'feature request' => 'Feature request',
        'comment' => 'Comment',
        'question' => 'Question',
    ];

    public static function subjectValues(): array
    {
        return array_keys(self::SUBJECT_OPTIONS);
    }

    public static function subjectLabel(?string $value): string
    {
        return self::SUBJECT_OPTIONS[$value] ?? (string) $value;
    }


    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'mobile',
        'subject',
        'message',
       
    ];

    protected $hidden = [
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

}
