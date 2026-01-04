<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('smart_folders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('folder_id')->constrained('folders')->cascadeOnDelete();
            $table->string('rule_type', 40);
            $table->json('rule_payload');
            $table->timestamps();

            $table->unique('folder_id');
            $table->index('rule_type');
        });
    }

    public function down()
    {
        Schema::dropIfExists('smart_folders');
    }
};
