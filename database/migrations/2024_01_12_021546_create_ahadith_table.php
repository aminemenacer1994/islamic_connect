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
        Schema::create('ahadith', function (Blueprint $table) {
            $table->id();
            $table->longText('hadith_ar')->nullable();            
            $table->longText('hadith_en')->nullable();        
            $table->integer('chapter_id')->nullable();        
            $table->integer('imam_id')->nullable();        
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
        Schema::dropIfExists('ahadith');
    }
};
