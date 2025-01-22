<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotesTable extends Migration
{
    public function up()
    {
        Schema::create('notes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->text('surah_name')->nullable();
            $table->text('ayah_num')->nullable();
            $table->text('ayah_info')->nullable();
            $table->text('ayah_verse_ar')->nullable();
            $table->text('ayah_verse_en')->nullable();
            $table->longText('ayah_notes')->nullable();
            $table->string('visibility_option')->default('public');
            $table->boolean('is_speech_to_text')->default(false);
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
        
    }

    public function down()
    {
        Schema::dropIfExists('notes');
    }
}