<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Attach any NULL notes to the smallest existing user id
        $minId = DB::table('users')->min('id');
        if ($minId) {
            DB::table('notes')->whereNull('user_id')->update(['user_id' => $minId]);
        }
    }

    public function down(): void
    {
        // Not reversible safely; leave as is
    }
};

