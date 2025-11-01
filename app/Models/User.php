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
        // In this project, legacy data uses users.user_id as the external id
        // while Laravel uses users.id. Notes.user_id points to users.user_id.
        // Use local key 'user_id' to match existing data.
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
        if ($this->role === 'admin') {
            return true;
        }

        // Support single env or comma-separated list
        $single = env('SUPERADMIN_EMAIL');
        if ($single && strcasecmp($this->email, trim($single)) === 0) {
            return true;
        }

        $list = array_filter(array_map('trim', explode(',', (string) env('SUPERADMIN_EMAILS'))));
        foreach ($list as $email) {
            if (strcasecmp($this->email, $email) === 0) {
                return true;
            }
        }

        return false;
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

    // Preferred helper to reference the identifier used by related tables
    public function effectiveUserId(): int
    {
        return (int) ($this->user_id ?: $this->id);
    }
}
