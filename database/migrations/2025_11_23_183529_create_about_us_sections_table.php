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
        Schema::create('about_us_sections', function (Blueprint $table) {
            $table->id();
            $table->string('section_group')->default('default');
            $table->string('column_name')->default('full');
            $table->string('column_class')->default('col-lg-12');
            $table->string('label')->nullable();
            $table->string('heading')->nullable();
            $table->string('heading_tag')->default('h3');
            $table->text('subheading')->nullable();
            $table->json('content');
            $table->string('layout')->default('default');
            $table->integer('order')->default(0);
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
        Schema::dropIfExists('about_us_sections');
    }
};
