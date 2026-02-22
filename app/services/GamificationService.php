<?php

namespace App\Services;

use App\Models\GamificationEvent;
use App\Models\UserBadge;
use App\Models\UserGamification;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class GamificationService
{
    private const LEVEL_POINTS = 100;

    private const TASK_POINTS = [
        'quran' => 10,
        'hadith' => 8,
        'dua' => 5,
        'review' => 2,
    ];

    private const BADGES = [
        'first_surah_memorised' => 'First Surah Memorised',
        'first_hadith_memorised' => 'First Hadith Memorised',
        'first_dua_memorised' => 'First Dua Memorised',
        'streak_7_days' => '7-Day Streak',
        'level_5' => 'Level 5 Reached',
    ];

    public function getSummary(User $user): array
    {
        $profile = UserGamification::firstOrCreate(
            ['user_id' => $user->id],
            [
                'points_total' => 0,
                'current_streak' => 0,
                'best_streak' => 0,
            ]
        );

        $level = $this->calculateLevel((int) $profile->points_total);
        $pointsInLevel = (int) $profile->points_total % self::LEVEL_POINTS;

        return [
            'points_total' => (int) $profile->points_total,
            'level' => $level,
            'points_in_level' => $pointsInLevel,
            'points_to_next_level' => self::LEVEL_POINTS - $pointsInLevel,
            'level_progress_percent' => (int) floor(($pointsInLevel / self::LEVEL_POINTS) * 100),
            'current_streak' => (int) $profile->current_streak,
            'best_streak' => (int) $profile->best_streak,
            'badges' => UserBadge::where('user_id', $user->id)
                ->orderByDesc('awarded_at')
                ->get(['badge_key', 'title', 'awarded_at'])
                ->map(fn (UserBadge $badge) => [
                    'badge_key' => $badge->badge_key,
                    'title' => $badge->title,
                    'awarded_at' => optional($badge->awarded_at)->toIso8601String(),
                ])
                ->values()
                ->all(),
        ];
    }

    public function recordTaskCompletion(User $user, string $taskType, array $context = []): array
    {
        if (!array_key_exists($taskType, self::TASK_POINTS)) {
            abort(422, 'Unsupported task_type.');
        }

        $today = Carbon::today();
        $meta = array_filter([
            'reference_type' => $context['reference_type'] ?? null,
            'reference_id' => (string) ($context['reference_id'] ?? ''),
            'details' => $context['metadata'] ?? null,
        ], fn ($v) => $v !== null && $v !== '');

        DB::transaction(function () use ($user, $taskType, $today, $meta, $context): void {
            $profile = UserGamification::lockForUpdate()->firstOrCreate(
                ['user_id' => $user->id],
                [
                    'points_total' => 0,
                    'current_streak' => 0,
                    'best_streak' => 0,
                ]
            );

            $dedupeKey = $this->makeTaskDedupeKey($taskType, $today, $context);
            if ($this->eventExists($user->id, $dedupeKey)) {
                return;
            }

            $isNewActivityDay = $this->isNewActivityDay($profile, $today);
            $this->createEvent($user->id, "task_{$taskType}", self::TASK_POINTS[$taskType], $today, $dedupeKey, $meta);
            $profile->points_total += self::TASK_POINTS[$taskType];

            if ($isNewActivityDay) {
                $this->updateStreak($profile, $today);
                $this->applyStreakReward($user->id, $profile, $today);
            }

            $profile->save();
            $this->awardBadges($user->id, $profile);
        });

        return $this->getSummary($user);
    }

    private function calculateLevel(int $points): int
    {
        return (int) floor($points / self::LEVEL_POINTS) + 1;
    }

    private function isNewActivityDay(UserGamification $profile, Carbon $today): bool
    {
        if (!$profile->last_activity_date) {
            return true;
        }

        return $profile->last_activity_date->toDateString() !== $today->toDateString();
    }

    private function updateStreak(UserGamification $profile, Carbon $today): void
    {
        $last = $profile->last_activity_date;
        if (!$last) {
            $profile->current_streak = 1;
        } elseif ($last->toDateString() === $today->copy()->subDay()->toDateString()) {
            $profile->current_streak += 1;
        } else {
            $profile->current_streak = 1;
        }

        $profile->best_streak = max((int) $profile->best_streak, (int) $profile->current_streak);
        $profile->last_activity_date = $today;
    }

    private function applyStreakReward(int $userId, UserGamification $profile, Carbon $today): void
    {
        if ((int) $profile->current_streak < 3) {
            return;
        }

        $dedupeKey = 'streak_bonus:' . $today->toDateString();
        if ($this->eventExists($userId, $dedupeKey)) {
            return;
        }

        $bonusPoints = 5;
        $this->createEvent(
            $userId,
            'streak_bonus',
            $bonusPoints,
            $today,
            $dedupeKey,
            ['current_streak' => (int) $profile->current_streak]
        );
        $profile->points_total += $bonusPoints;
    }

    private function awardBadges(int $userId, UserGamification $profile): void
    {
        $hasQuranCompletion = GamificationEvent::where('user_id', $userId)
            ->where('event_type', 'task_quran')
            ->exists();
        $hasHadithCompletion = GamificationEvent::where('user_id', $userId)
            ->where('event_type', 'task_hadith')
            ->exists();
        $hasDuaCompletion = GamificationEvent::where('user_id', $userId)
            ->where('event_type', 'task_dua')
            ->exists();

        if ($hasQuranCompletion) {
            $this->grantBadge($userId, 'first_surah_memorised');
        }
        if ($hasHadithCompletion) {
            $this->grantBadge($userId, 'first_hadith_memorised');
        }
        if ($hasDuaCompletion) {
            $this->grantBadge($userId, 'first_dua_memorised');
        }
        if ((int) $profile->current_streak >= 7) {
            $this->grantBadge($userId, 'streak_7_days');
        }
        if ($this->calculateLevel((int) $profile->points_total) >= 5) {
            $this->grantBadge($userId, 'level_5');
        }
    }

    private function grantBadge(int $userId, string $badgeKey): void
    {
        if (!isset(self::BADGES[$badgeKey])) {
            return;
        }

        UserBadge::firstOrCreate(
            ['user_id' => $userId, 'badge_key' => $badgeKey],
            [
                'title' => self::BADGES[$badgeKey],
                'awarded_at' => now(),
            ]
        );
    }

    private function makeTaskDedupeKey(string $taskType, Carbon $today, array $context): string
    {
        $referenceType = trim((string) ($context['reference_type'] ?? 'task'));
        $referenceId = trim((string) ($context['reference_id'] ?? 'general'));

        return sprintf(
            'task:%s:%s:%s:%s',
            $taskType,
            $referenceType,
            $referenceId,
            $today->toDateString()
        );
    }

    private function eventExists(int $userId, string $dedupeKey): bool
    {
        return GamificationEvent::where('user_id', $userId)
            ->where('dedupe_key', $dedupeKey)
            ->exists();
    }

    private function createEvent(
        int $userId,
        string $eventType,
        int $points,
        Carbon $eventDate,
        string $dedupeKey,
        array $meta = []
    ): void {
        GamificationEvent::create([
            'user_id' => $userId,
            'event_type' => $eventType,
            'points' => $points,
            'event_date' => $eventDate->toDateString(),
            'dedupe_key' => $dedupeKey,
            'meta' => $meta,
        ]);
    }
}
