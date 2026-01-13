<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('folders', function (Blueprint $table) {
            $table->unsignedInteger('position')->nullable()->after('color');
        });

        Schema::table('bookmark_folder', function (Blueprint $table) {
            $table->unsignedInteger('position')->nullable()->after('id');
        });

        $this->seedFolderPositions();
        $this->seedBookmarkFolderPositions();
    }

    public function down()
    {
        Schema::table('bookmark_folder', function (Blueprint $table) {
            $table->dropColumn('position');
        });

        Schema::table('folders', function (Blueprint $table) {
            $table->dropColumn('position');
        });
    }

    protected function seedFolderPositions()
    {
        $folders = DB::table('folders')
            ->orderByDesc('updated_at')
            ->get();

        foreach ($folders as $index => $folder) {
            DB::table('folders')
                ->where('id', $folder->id)
                ->update(['position' => $index]);
        }
    }

    protected function seedBookmarkFolderPositions()
    {
        $counters = [];
        $rows = DB::table('bookmark_folder')
            ->orderBy('folder_id')
            ->orderByDesc('created_at')
            ->get();

        foreach ($rows as $row) {
            $folderId = $row->folder_id;
            if (!isset($counters[$folderId])) {
                $counters[$folderId] = 0;
            }
            DB::table('bookmark_folder')
                ->where('id', $row->id)
                ->update(['position' => $counters[$folderId]]);
            $counters[$folderId]++;
        }
    }
};
