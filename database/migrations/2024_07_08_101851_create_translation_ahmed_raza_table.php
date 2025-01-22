<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('translation_ahmed_raza', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ayah_id')->unique();
            $table->text('translation_ahmed_raza')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('translation_ahmed_raza');
    }
};
