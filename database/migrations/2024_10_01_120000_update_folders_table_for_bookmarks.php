<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('folders', function (Blueprint $table) {
            $table->string('icon', 40)->nullable()->after('name');
            $table->string('color', 32)->nullable()->after('icon');
            $table->boolean('is_smart')->default(false)->after('color');
            $table->softDeletes();

            $table->unique(['user_id', 'name']);
            $table->index(['user_id', 'is_smart']);
        });
    }

    public function down()
    {
        Schema::table('folders', function (Blueprint $table) {
            $table->dropUnique(['user_id', 'name']);
            $table->dropIndex(['user_id', 'is_smart']);
            $table->dropSoftDeletes();
            $table->dropColumn(['icon', 'color', 'is_smart']);
        });
    }
};
