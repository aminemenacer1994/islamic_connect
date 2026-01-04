<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('bookmark_folder', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bookmark_id')->constrained('bookmarks')->cascadeOnDelete();
            $table->foreignId('folder_id')->constrained('folders')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['bookmark_id', 'folder_id']);
            $table->index(['folder_id', 'bookmark_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('bookmark_folder');
    }
};
