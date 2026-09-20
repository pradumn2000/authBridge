<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

/**
 * Adds the columns the corrected $fillable arrays now expect, and migrates
 * users.agreement_path → users.agreement_url.
 *
 * Every change is wrapped in a Schema::hasColumn() guard, because I still
 * haven't seen your two agreement migrations or the cases migration — some
 * of these columns may already exist. Guarded means this is safe to run
 * whatever state your schema is actually in: existing columns are left
 * completely untouched.
 *
 * Run with:  php artisan migrate
 * Check what it did afterwards with:
 *   php artisan tinker --execute="dd(Schema::getColumnListing('cases'))"
 *   php artisan tinker --execute="dd(Schema::getColumnListing('users'))"
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cases', function (Blueprint $table) {
            // Onboarding source — 'client' or 'candidate'. Defaulting to
            // 'client' so every pre-existing row (created before this field
            // was wired up) reads as client-sourced, which matches the
            // fallback the routes already use:
            //   $caseSource = $request->case_source ?? $case->case_source ?? 'client'
            if (! Schema::hasColumn('cases', 'case_source')) {
                $table->string('case_source', 20)->default('client')->after('case_id');
            }

            // Overall TAT in days. AddCase.jsx sends the longest single
            // check's calendar days here (real elapsed time, not a sum).
            if (! Schema::hasColumn('cases', 'overall_tat')) {
                $table->float('overall_tat')->default(0)->after('total_amount');
            }

            // Candidate document portal link.
            if (! Schema::hasColumn('cases', 'candidate_portal_link')) {
                $table->string('candidate_portal_link', 2048)->nullable()->after('payment_link');
            }
        });

        // ── users.agreement_path → users.agreement_url ────────────────────
        //
        // User::$fillable declares 'agreement_url'. If the DB column is
        // actually named 'agreement_path', add the correct one and carry the
        // data across, converting the stored relative path into the public
        // URL the frontend expects (AddClient.jsx reads c.agreement_url
        // straight into an <a href>).
        //
        // The old column is deliberately NOT dropped — it stays as a backup
        // until you've confirmed the agreement links open correctly. Drop it
        // yourself once you're happy.
        Schema::table('users', function (Blueprint $table) {
            if (! Schema::hasColumn('users', 'agreement_url')) {
                $table->string('agreement_url', 2048)->nullable();
            }
            if (! Schema::hasColumn('users', 'agreement_start_date')) {
                $table->date('agreement_start_date')->nullable();
            }
            if (! Schema::hasColumn('users', 'agreement_end_date')) {
                $table->date('agreement_end_date')->nullable();
            }
        });

        if (Schema::hasColumn('users', 'agreement_path') && Schema::hasColumn('users', 'agreement_url')) {
            DB::table('users')
                ->whereNotNull('agreement_path')
                ->where('agreement_path', '!=', '')
                ->whereNull('agreement_url')
                ->orderBy('id')
                ->chunkById(100, function ($rows) {
                    foreach ($rows as $row) {
                        DB::table('users')
                            ->where('id', $row->id)
                            ->update([
                                'agreement_url' => Storage::disk('public')->url($row->agreement_path),
                            ]);
                    }
                });
        }
    }

    public function down(): void
    {
        Schema::table('cases', function (Blueprint $table) {
            foreach (['case_source', 'overall_tat', 'candidate_portal_link'] as $column) {
                if (Schema::hasColumn('cases', $column)) {
                    $table->dropColumn($column);
                }
            }
        });

        // users.agreement_url is intentionally left in place on rollback —
        // dropping it would destroy the migrated agreement references if the
        // old agreement_path column has since been removed.
    }
};