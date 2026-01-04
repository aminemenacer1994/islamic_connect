<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('slug', 120);
            $table->string('type', 20)->default('tag');
            $table->timestamps();

            $table->unique(['slug', 'type']);
            $table->index(['type', 'name']);
        });

        Schema::create('ayah_tag', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ayah_id')->constrained('ayah')->cascadeOnDelete();
            $table->foreignId('tag_id')->constrained('tags')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['ayah_id', 'tag_id']);
            $table->index(['tag_id', 'ayah_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('ayah_tag');
        Schema::dropIfExists('tags');
    }
};
