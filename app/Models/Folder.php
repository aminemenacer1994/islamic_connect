<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;


class Folder extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'icon',
        'color',
        'is_smart',
        'user_id',
    ];

    protected $casts = [
        'is_smart' => 'bool',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bookmarks()
    {
        return $this->belongsToMany(Bookmark::class, 'bookmark_folder')->withTimestamps();
    }

    public function smartFolder(): HasOne
    {
        return $this->hasOne(SmartFolder::class);
    }

    public function sharedFolder(): HasOne
    {
        return $this->hasOne(SharedFolder::class);
    }
}
