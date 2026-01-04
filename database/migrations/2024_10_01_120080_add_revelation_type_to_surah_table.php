<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('surah', function (Blueprint $table) {
            $table->string('revelation_type', 20)->nullable()->after('juz_id');
            $table->index('revelation_type');
        });
    }

    public function down()
    {
        Schema::table('surah', function (Blueprint $table) {
            $table->dropIndex(['revelation_type']);
            $table->dropColumn('revelation_type');
        });
    }
};
