<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;

class User extends Authenticatable
{
    use Billable, Notifiable;

    protected $fillable = [
        'name', 'lastname', 'phone', 'user_type', 'status', 'email', 'password',
        'subscribe', 'role', 'google_id', 'github_id', 'fb_id', 'linked_id', 'user_id', 'stripe_id'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        // Use Cashier's default 'ends_at' instead of 'subscription_ends_at'
        // 'subscription_ends_at' => 'datetime', // Remove this
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
        return $this->subscribed('premium') || $this->onTrial('premium');
    }

    public function getSubscriptionStatusAttribute(): string
    {
        if (!$this->stripe_id) {
            return 'never_subscribed';
        }

        if ($this->subscribed('premium')) {
            return 'active';
        }

        if ($this->subscription('premium') && $this->subscription('premium')->cancelled()) {
            return 'cancelled';
        }

        if ($this->subscription('premium') && $this->subscription('premium')->onGracePeriod()) {
            return 'grace_period';
        }

        return 'inactive';
    }

    public function hasActiveSubscription(): bool
    {
        return $this->subscribed('premium');
    }
}