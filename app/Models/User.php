<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;
use Illuminate\Support\Facades\DB;

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

    protected static function booted(): void
    {
        static::created(function (User $user) {
            // Ensure user_id starts from 0 and increments with id
            if ($user->user_id === null || $user->user_id === $user->id) {
                $user->user_id = max(0, (int)$user->id - 1);
                // Update directly to avoid recursion
                DB::table('users')->where('id', $user->id)->update(['user_id' => $user->user_id]);
            }
        });
    }

    public function notes()
    {
        // Notes now consistently reference users.id
        return $this->hasMany(Note::class);
    }

    public function bookmarks()
    {
        // Bookmarks reference users.id in this app
        return $this->hasMany(Bookmark::class, 'user_id', 'id');
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

        $userType = strtolower((string) $this->user_type);
        if (in_array($userType, ['admin', 'superadmin', 'owner'], true)) {
            return true;
        }

        if ((int) $this->id === 1) {
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
        if ($this->isAdmin()) {
            return true;
        }

        return $this->subscribed('premium') || $this->onTrial('premium');
    }

    public function getSubscriptionStatusAttribute(): string
    {
        if ($this->isAdmin()) {
            return 'active';
        }

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
        if ($this->isAdmin()) {
            return true;
        }

        return $this->subscribed('premium');
    }

    // Preferred helper to reference the identifier used by related tables
    public function effectiveUserId(): int
    {
        // External-facing numeric identifier starting at 0
        return (int) ($this->user_id ?? max(0, $this->id - 1));
    }
}
