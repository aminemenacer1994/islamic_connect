<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('bookmarks', function (Blueprint $table) {
            $table->string('session_id')->nullable()->after('user_id');
            $table->index('session_id', 'bookmarks_session_id_idx');
        });

        Schema::table('folders', function (Blueprint $table) {
            $table->string('session_id')->nullable()->after('user_id');
            $table->index('session_id', 'folders_session_id_idx');
        });
    }

    public function down()
    {
        Schema::table('bookmarks', function (Blueprint $table) {
            $table->dropIndex('bookmarks_session_id_idx');
            $table->dropColumn('session_id');
        });

        Schema::table('folders', function (Blueprint $table) {
            $table->dropIndex('folders_session_id_idx');
            $table->dropColumn('session_id');
        });
    }
};
