<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookmarks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade')->nullable();
            // $table->foreignId('folder_id')->constrained('folders')->onDelete('cascade')->nullable();
            $table->string('url')->nullable();
            $table->string('title')->nullable();
            $table->text('surah_name')->nullable();
            $table->text('ayah_num')->nullable();
            $table->text('ayah_info')->nullable();
            $table->text('ayah_verse_ar')->nullable();
            $table->text('ayah_verse_en')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('bookmarks');
    }
};
