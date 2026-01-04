<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('ayah', function (Blueprint $table) {
            $table->index(['surah_id', 'ayah_id'], 'ayah_surah_ayah_idx');
        });
    }

    public function down()
    {
        Schema::table('ayah', function (Blueprint $table) {
            $table->dropIndex('ayah_surah_ayah_idx');
        });
    }
};
