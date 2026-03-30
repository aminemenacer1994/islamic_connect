<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rag_documents', function (Blueprint $table) {
            $table->id();
            $table->string('document_key', 190)->unique();
            $table->string('source', 32)->index();
            $table->string('source_type', 32)->index();
            $table->string('source_id', 120)->nullable()->index();
            $table->string('language', 12)->default('en')->index();
            $table->string('title', 500)->nullable();
            $table->string('reference', 500)->nullable();
            $table->mediumText('body');
            $table->text('snippet')->nullable();
            $table->string('grade', 32)->nullable()->index();
            $table->unsignedInteger('priority')->default(0)->index();
            $table->json('embedding')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamp('fetched_at')->nullable()->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rag_documents');
    }
};
