<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Backfill bookmarks.user_id to reference users.id, using legacy users.user_id mapping
        // MySQL-compatible UPDATE ... JOIN
        DB::statement('
            UPDATE bookmarks b
            JOIN users u ON b.user_id = u.user_id
            SET b.user_id = u.id
        ');
    }

    public function down(): void
    {
        // Irreversible migration: we cannot reliably restore prior legacy values
        // Intentionally left empty.
    }
};

