<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class SmartFolder extends Model
{
    protected $fillable = [
        'folder_id',
        'rule_type',
        'rule_payload',
    ];

    protected $casts = [
        'rule_payload' => 'array',
    ];

    public function folder(): BelongsTo
    {
        return $this->belongsTo(Folder::class);
    }

    public function buildAyahQuery(): Builder
    {
        $payload = is_array($this->rule_payload) ? $this->rule_payload : [];
        $query = Ayah::query();

        switch ($this->rule_type) {
            case 'surah':
                $surahId = $payload['surah_id'] ?? $payload['surah_number'] ?? null;
                if ($surahId === null) {
                    return $query->whereRaw('1=0');
                }
                return $query->where('surah_id', (string) $surahId);
            case 'juz':
                $juzId = $payload['juz_id'] ?? null;
                if ($juzId === null) {
                    return $query->whereRaw('1=0');
                }
                return $query->whereHas('surah', function (Builder $builder) use ($juzId) {
                    $builder->where('juz_id', (string) $juzId);
                });
            case 'revelation_type':
                $type = $payload['revelation_type'] ?? $payload['type'] ?? null;
                if (!$type) {
                    return $query->whereRaw('1=0');
                }
                return $query->whereHas('surah', function (Builder $builder) use ($type) {
                    $builder->where('revelation_type', $type);
                });
            case 'topic':
            case 'tag':
                $tagType = $this->rule_type === 'topic' ? 'topic' : 'tag';
                $tagIds = $payload['tag_ids'] ?? [];
                $tagSlugs = $payload['tag_slugs'] ?? $payload['tags'] ?? [];
                return $query->whereHas('tags', function (Builder $builder) use ($tagType, $tagIds, $tagSlugs) {
                    $builder->where('type', $tagType);
                    if (!empty($tagIds)) {
                        $builder->whereIn('tags.id', $tagIds);
                    }
                    if (!empty($tagSlugs)) {
                        $builder->whereIn('tags.slug', $tagSlugs);
                    }
                });
            default:
                return $query->whereRaw('1=0');
        }
    }
}
