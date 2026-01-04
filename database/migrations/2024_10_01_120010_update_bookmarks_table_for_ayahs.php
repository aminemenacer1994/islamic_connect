<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('bookmarks', function (Blueprint $table) {
            $table->unsignedBigInteger('ayah_id')->nullable()->after('user_id');
            $table->unsignedSmallInteger('surah_number')->nullable()->after('ayah_id');
            $table->unsignedSmallInteger('ayah_number')->nullable()->after('surah_number');

            $table->unique(['user_id', 'surah_number', 'ayah_number'], 'bookmarks_user_surah_ayah_unique');
            $table->index(['user_id', 'surah_number', 'ayah_number'], 'bookmarks_user_surah_ayah_idx');
            $table->index(['ayah_id'], 'bookmarks_ayah_id_idx');

            $table->foreign('ayah_id')->references('id')->on('ayah')->nullOnDelete();
        });
    }

    public function down()
    {
        Schema::table('bookmarks', function (Blueprint $table) {
            $table->dropForeign(['ayah_id']);
            $table->dropUnique('bookmarks_user_surah_ayah_unique');
            $table->dropIndex('bookmarks_user_surah_ayah_idx');
            $table->dropIndex('bookmarks_ayah_id_idx');
            $table->dropColumn(['ayah_id', 'surah_number', 'ayah_number']);
        });
    }
};
