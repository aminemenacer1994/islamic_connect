<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('payment', function (Blueprint $table) {
            $table->string('provider')->nullable()->after('date');
            $table->string('stripe_payment_intent_id')->nullable()->unique()->after('provider');
            $table->string('stripe_checkout_session_id')->nullable()->unique()->after('stripe_payment_intent_id');
            $table->string('receipt_url')->nullable()->after('stripe_checkout_session_id');
            $table->longText('metadata')->nullable()->after('receipt_url');
        });
    }

    public function down(): void
    {
        Schema::table('payment', function (Blueprint $table) {
            $table->dropColumn([
                'provider',
                'stripe_payment_intent_id',
                'stripe_checkout_session_id',
                'receipt_url',
                'metadata',
            ]);
        });
    }
};

