<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;

class User extends Authenticatable
{
    use Notifiable, Billable;

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
        'github_id',
        'fb_id',
        'linked_id',
        'user_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'trial_ends_at' => 'datetime',
    ];

    public function notes()
    {
        return $this->hasMany(Note::class, 'user_id', 'user_id');
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

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function hasPremiumAccess(): bool
    {
        return $this->subscribed('default') || $this->onTrial('default');
    }

    public function getSubscriptionStatusAttribute(): string
    {
        if (!$this->stripe_id) {
            return 'never_subscribed';
        }

        if ($this->subscribed('default')) {
            return 'active';
        }

        if ($this->subscription('default') && $this->subscription('default')->cancelled()) {
            return 'cancelled';
        }

        if ($this->subscription('default') && $this->subscription('default')->onGracePeriod()) {
            return 'grace_period';
        }

        return 'inactive';
    }

    public function hasActiveSubscription(): bool
    {
        return $this->subscribed('default');
    }
}