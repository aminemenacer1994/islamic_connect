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
        Schema::create('information', function (Blueprint $table) {
            $table->id();
            $table->longText('translation', 255)->nullable();            
            $table->longText('tafseer', 255)->nullable();
            $table->longText('transliteration', 255)->nullable();
            $table->longText('information', 255)->nullable();
            $table->string('images')->nullable();
            $table->string('audio')->nullable();
            $table->string('ayah_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('information');
    }
};
