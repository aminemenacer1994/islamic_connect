<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;

class User extends Authenticatable
{
    use Notifiable;
    use Billable;

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
        'stripe_id'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'trial_ends_at' => 'datetime',
        'ends_at' => 'datetime',
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

    public function hasPremiumAccess(): bool
    {
        return $this->subscribed('default') || $this->onTrial('default');
    }

    public function getSubscriptionStatusAttribute()
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

        return 'inactive';
    }

    protected $dates = [
        'email_verified_at',
        'subscription_ends_at',
    ];

    public function hasActiveSubscription()
    {
        return $this->subscription_status === 'active' 
            && $this->subscription_ends_at 
            && $this->subscription_ends_at->isFuture();
    }

    // public function isAdmin(): bool
    // {
    //     // Add your admin logic here
    //     // For example, check if email is in admin list or has admin role
    //     return in_array($this->email, [
    //         'admin@admin.com',
    //         // Add other admin emails
    //     ]);
    // }
}
