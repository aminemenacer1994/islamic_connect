<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AiMessageReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'chat_session_id',
        'user_id',
        'session_id',
        'entry_key',
        'reason',
        'details',
        'reported_text',
        'question_text',
        'message_time',
        'references',
        'verification',
        'page_url',
        'user_agent',
        'reporter_ip',
        'status',
    ];

    protected $casts = [
        'message_time' => 'datetime',
        'references' => 'array',
        'verification' => 'array',
    ];

    public function session()
    {
        return $this->belongsTo(ChatSession::class, 'chat_session_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
