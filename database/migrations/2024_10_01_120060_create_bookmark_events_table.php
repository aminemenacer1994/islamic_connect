<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('bookmark_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('bookmark_id')->nullable()->constrained('bookmarks')->nullOnDelete();
            $table->foreignId('folder_id')->nullable()->constrained('folders')->nullOnDelete();
            $table->foreignId('ayah_id')->nullable()->constrained('ayah')->nullOnDelete();
            $table->string('event', 40);
            $table->json('meta')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'event', 'created_at']);
            $table->index(['folder_id', 'created_at']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('bookmark_events');
    }
};
