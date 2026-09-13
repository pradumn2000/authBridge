<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('case_checks', function (Blueprint $table) {
            $table->unsignedInteger('working_days')->default(0)->after('rate');
            $table->unsignedInteger('calendar_days')->default(0)->after('working_days');
        });
    }

    public function down(): void
    {
        Schema::table('case_checks', function (Blueprint $table) {
            $table->dropColumn(['working_days', 'calendar_days']);
        });
    }
};