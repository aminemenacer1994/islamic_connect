<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // If legacy data stored external users.user_id in notes.user_id, remap to users.id
        DB::statement('
            UPDATE notes n
            JOIN users u ON n.user_id = u.user_id
            SET n.user_id = u.id
        ');
    }

    public function down(): void
    {
        // Irreversible
    }
};

