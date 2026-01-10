<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('bookmark_folder', function (Blueprint $table) {
            if (!Schema::hasColumn('bookmark_folder', 'created_at')) {
                $table->timestamp('created_at')->nullable()->after('folder_id');
            }
            if (!Schema::hasColumn('bookmark_folder', 'updated_at')) {
                $table->timestamp('updated_at')->nullable()->after('created_at');
            }
        });
    }

    public function down()
    {
        Schema::table('bookmark_folder', function (Blueprint $table) {
            if (Schema::hasColumn('bookmark_folder', 'updated_at')) {
                $table->dropColumn('updated_at');
            }
            if (Schema::hasColumn('bookmark_folder', 'created_at')) {
                $table->dropColumn('created_at');
            }
        });
    }
};
