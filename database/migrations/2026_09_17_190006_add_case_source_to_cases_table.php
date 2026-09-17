<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('cases', function (Blueprint $table) {
            if (!Schema::hasColumn('cases', 'case_source')) {
                // 'client' (default) = client is submitting/sponsoring the case.
                // 'candidate' = candidate self-onboarded. Matches the two
                // options in AddCase.jsx's "Onboarding Source" card.
                $table->string('case_source')->default('client')->after('checks');
            }
        });
    }

    public function down()
    {
        Schema::table('cases', function (Blueprint $table) {
            $table->dropColumn('case_source');
        });
    }
};