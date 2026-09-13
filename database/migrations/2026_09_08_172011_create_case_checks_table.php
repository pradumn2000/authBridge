<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up()
    {
        // SQLite doesn't support ALTER TABLE ... DROP FOREIGN KEY directly.
        // Laravel's Schema builder handles this for SQLite by rebuilding the
        // table under the hood when you call dropForeign() + foreign()
        // inside a single Schema::table() call, as long as foreign key
        // checks are temporarily disabled around it.
        Schema::disableForeignKeyConstraints();

        Schema::table('case_checks', function (Blueprint $table) {
            // Laravel's default FK constraint name is
            // "<table>_<column>_foreign" — i.e. case_checks_case_id_foreign.
            // This matches what the original migration would have created.
            $table->dropForeign('case_checks_case_id_foreign');
        });

        Schema::table('case_checks', function (Blueprint $table) {
            // Correct target: the real table is "cases" (see BGVCase model's
            // protected $table = 'cases';), not "bgv_cases".
            $table->foreign('case_id')
                  ->references('case_id')
                  ->on('cases')
                  ->onDelete('cascade');
        });

        Schema::enableForeignKeyConstraints();
    }

    public function down()
    {
        Schema::disableForeignKeyConstraints();

        Schema::table('case_checks', function (Blueprint $table) {
            $table->dropForeign(['case_id']);
        });

        Schema::table('case_checks', function (Blueprint $table) {
            // Restore original (broken) reference for symmetry with up().
            $table->foreign('case_id')
                  ->references('case_id')
                  ->on('bgv_cases')
                  ->onDelete('cascade');
        });

        Schema::enableForeignKeyConstraints();
    }
};