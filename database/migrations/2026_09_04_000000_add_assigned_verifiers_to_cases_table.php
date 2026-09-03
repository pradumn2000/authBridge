<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cases', function (Blueprint $table) {
            // Map of check_type => user_id, e.g. {"employment": 4, "education": 7}
            $table->json('assigned_verifiers')->nullable()->after('check_results');
        });
    }

    public function down(): void
    {
        Schema::table('cases', function (Blueprint $table) {
            $table->dropColumn('assigned_verifiers');
        });
    }
};