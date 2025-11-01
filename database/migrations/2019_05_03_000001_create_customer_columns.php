<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasColumn('users', 'stripe_id')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('stripe_id')->nullable()->index();
            });
        }

        if (!Schema::hasColumn('users', 'pm_type')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('pm_type')->nullable();
            });
        }

        if (!Schema::hasColumn('users', 'pm_last_four')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('pm_last_four', 4)->nullable();
            });
        }

        if (!Schema::hasColumn('users', 'trial_ends_at')) {
            Schema::table('users', function (Blueprint $table) {
                $table->timestamp('trial_ends_at')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('users', 'stripe_id')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('stripe_id');
            });
        }
        if (Schema::hasColumn('users', 'pm_type')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('pm_type');
            });
        }
        if (Schema::hasColumn('users', 'pm_last_four')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('pm_last_four');
            });
        }
        if (Schema::hasColumn('users', 'trial_ends_at')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('trial_ends_at');
            });
        }
    }
};
