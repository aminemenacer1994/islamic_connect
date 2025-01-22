<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name',
        'lastname',
        'phone',
        'user_type',
        'status',
        'email',
        'password',
        'subscribe',
        'role',
        'google_id',
        'fb_id',
        'linked_id',
        'user_id'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function notes()
    {
        return $this->hasMany(Note::class, 'user_id', 'user_id');
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function bookmarks()
    {
        return $this->hasMany(Bookmark::class);
    }

    public function folders()
    {
        return $this->hasMany(Folder::class);
    }

    public function collections()
    {
        return $this->hasMany(Collection::class);
    }
}
