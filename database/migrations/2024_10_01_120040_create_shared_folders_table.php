<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('shared_folders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('folder_id')->constrained('folders')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('token', 80)->unique();
            $table->timestamp('revoked_at')->nullable();
            $table->timestamp('last_viewed_at')->nullable();
            $table->timestamps();

            $table->index(['folder_id', 'revoked_at']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('shared_folders');
    }
};
