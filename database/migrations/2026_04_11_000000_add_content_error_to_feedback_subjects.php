<?php

use Illuminate\Database\Migrations\Migration;
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
        if (DB::getDriverName() !== 'mysql') {
            return;
        }

        $enumValues = "'" . implode("','", self::SUBJECTS) . "'";
        DB::statement("ALTER TABLE feedback MODIFY COLUMN subject ENUM($enumValues) NOT NULL DEFAULT 'enquiry'");
        DB::statement("ALTER TABLE feedback MODIFY COLUMN message TEXT NULL");
    }

    public function down()
    {
        if (DB::getDriverName() !== 'mysql') {
            return;
        }

        DB::table('feedback')->where('subject', 'content error')->update(['subject' => 'comment']);

        $subjects = array_values(array_filter(
            self::SUBJECTS,
            fn ($subject) => $subject !== 'content error'
        ));
        $enumValues = "'" . implode("','", $subjects) . "'";

        DB::statement("ALTER TABLE feedback MODIFY COLUMN subject ENUM($enumValues) NOT NULL DEFAULT 'enquiry'");
        DB::statement("ALTER TABLE feedback MODIFY COLUMN message VARCHAR(255) NULL");
    }
};
