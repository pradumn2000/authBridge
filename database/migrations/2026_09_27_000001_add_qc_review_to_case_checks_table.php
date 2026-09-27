<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// TL QC Review (TLQCReview.jsx) needs a place to record the TL's
// approve/reject decision on a single check — separate from
// case_checks.result, which is the *verifier's* clear/discrepancy/unable
// outcome. Adding dedicated columns rather than folding this into the
// `fields` JSON blob so it can be queried/filtered later without touching
// verifier-entered data.
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('case_checks', function (Blueprint $table) {
            $table->string('qc_status')->nullable()->after('result'); // null | pending | approved | rejected
            $table->text('qc_comments')->nullable()->after('qc_status');
            $table->unsignedBigInteger('qc_reviewed_by')->nullable()->after('qc_comments');
            $table->timestamp('qc_reviewed_at')->nullable()->after('qc_reviewed_by');
        });
    }

    public function down(): void
    {
        Schema::table('case_checks', function (Blueprint $table) {
            $table->dropColumn(['qc_status', 'qc_comments', 'qc_reviewed_by', 'qc_reviewed_at']);
        });
    }
};