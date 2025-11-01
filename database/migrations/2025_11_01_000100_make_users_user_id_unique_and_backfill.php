<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add unique index on user_id (ignore if it already exists)
        try {
            Schema::table('users', function (Blueprint $table) {
                $table->unique('user_id');
            });
        } catch (\Throwable $e) {
            // Index likely exists; proceed
        }

        // Backfill existing rows: set user_id = id - 1 (starts at 0)
        DB::statement('UPDATE users SET user_id = id - 1 WHERE user_id IS NULL OR user_id = id');
    }

    public function down(): void
    {
        // Drop unique index if present (name may vary across platforms)
        try {
            Schema::table('users', function (Blueprint $table) {
                $table->dropUnique('users_user_id_unique');
            });
        } catch (\Throwable $e) {
            try {
                Schema::table('users', function (Blueprint $table) {
                    $table->dropUnique(['user_id']);
                });
            } catch (\Throwable $e2) {
                // ignore
            }
        }
    }
};
