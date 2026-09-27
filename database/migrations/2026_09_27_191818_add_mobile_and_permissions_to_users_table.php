<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Adds the two columns AddNewTl.jsx needs to save a Team Lead:
     *   - mobile        : plain string, shown in the "Mobile Number" column.
     *   - permissions   : JSON map of the 15 module-permission checkboxes
     *                     (education, employment, address, identity, criminal,
     *                     drugTest, courtroom, globalDatabase, caseAllocation,
     *                     verifierCases, qcReview, reportWriting, finalReport,
     *                     universitySelection, viewPermission) -> boolean.
     *                     Read back by ViewPermission.jsx.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'mobile')) {
                $table->string('mobile')->nullable()->after('email');
            }
            if (!Schema::hasColumn('users', 'permissions')) {
                $table->json('permissions')->nullable()->after('role');
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['mobile', 'permissions']);
        });
    }
};