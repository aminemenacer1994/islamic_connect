<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ai_message_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chat_session_id')->nullable()->constrained('chat_sessions')->nullOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('session_id', 64)->nullable()->index();
            $table->string('entry_key', 96)->nullable()->index();
            $table->string('reason', 48);
            $table->text('details')->nullable();
            $table->text('reported_text');
            $table->text('question_text')->nullable();
            $table->timestamp('message_time')->nullable();
            $table->json('references')->nullable();
            $table->json('verification')->nullable();
            $table->string('page_url', 2048)->nullable();
            $table->string('user_agent', 1024)->nullable();
            $table->ipAddress('reporter_ip')->nullable();
            $table->string('status', 24)->default('open')->index();
            $table->timestamps();
            $table->index(['reason', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ai_message_reports');
    }
};
