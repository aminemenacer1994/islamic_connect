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
        Schema::create('liked', function (Blueprint $table) {
            $table->id();
            $table->string('surah');            
            $table->string('audio');
            $table->string('image');
            $table->string('ayaatiha');
            $table->string('maeni_asamuha');
            $table->string('sabab_tasmiatiha');
            $table->string('asmawuha');
            $table->string('maqsiduha_aleamu');
            $table->string('sabab_nuzuliha');
            $table->string('fadluha');
            $table->string('munasabatiha');
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
        Schema::dropIfExists('liked');
    }
};
