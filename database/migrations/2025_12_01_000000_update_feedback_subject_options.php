<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    private const SUBJECTS = [
        'enquiry',
        'bug report',
        'content error',
        'feature request',
        'comment',
        'question',
    ];

    public function up()
    {
        Schema::table('feedback', function (Blueprint $table) {
            $table->dropUnique('feedback_email_unique');
        });

        DB::table('feedback')->whereNull('subject')->update(['subject' => 'enquiry']);
        DB::table('feedback')->whereNotIn('subject', self::SUBJECTS)->update(['subject' => 'enquiry']);

        $enumValues = "'" . implode("','", self::SUBJECTS) . "'";
        DB::statement("ALTER TABLE feedback MODIFY COLUMN subject ENUM($enumValues) NOT NULL DEFAULT 'enquiry'");
    }

    public function down()
    {
        DB::statement("ALTER TABLE feedback MODIFY COLUMN subject VARCHAR(255) NULL");
        Schema::table('feedback', function (Blueprint $table) {
            $table->unique('email');
        });
    }
};
