<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BGVCase extends Model
{
    use HasFactory;

    protected $table = 'cases';

    protected $fillable = [
        'case_id',

        // ── FIX: 'case_source' was missing. Both POST /api/cases and
        //    PUT /api/cases/{caseId} write it ('case_source' => $caseSource),
        //    so mass assignment was dropping it on every save — every case
        //    ended up with a NULL case_source regardless of what the
        //    Onboarding Source tiles in AddCase.jsx were set to. The
        //    ?case_source= list filter and the via_client / via_candidate
        //    dashboard counters were therefore always reading NULL.
        'case_source',

        'candidate_name',
        'candidate_email',
        'candidate_mobile',
        'candidate_dob',
        'position',
        'client_name',
        'client_id',
        'checks',
        'priority',
        'billing_mode',
        'payment_timing',
        'invoice_cycle',
        'po_number',
        'total_amount',

        'tat',          // legacy case-level TAT (days) — kept for anything still reading it

        // ── FIX: 'overall_tat' was missing. The create route writes
        //    'overall_tat' => $request->overall_tat ?? 0 and the list route
        //    reads it back ($c->overall_tat) as the due-date fallback, but
        //    only 'tat' was fillable, so the value never persisted. This is
        //    the same bug class as agreement_path vs agreement_url in
        //    routes/api.php.
        'overall_tat',

        'check_tat',    // per-check TAT breakdown
        'check_rates',
        'assigned_verifiers',
        'payment_link',

        // ── FIX: 'candidate_portal_link' was missing. AddCase.jsx sends it
        //    in the create/update payload and reads it back on edit
        //    (if (c.candidate_portal_link) setCandidatePortalLink(...)), so
        //    a generated candidate portal link disappeared as soon as the
        //    page was reloaded. The routes now pass it through too.
        'candidate_portal_link',

        'status',
        'check_results',
        'check_details',
        'notes',
        'created_by',
    ];

    protected $casts = [
        'checks'             => 'array',
        'check_results'      => 'array',
        'check_details'      => 'array',
        'check_tat'          => 'array',
        'check_rates'        => 'array',
        'assigned_verifiers' => 'array',
        'total_amount'       => 'float',
        'tat'                => 'float',
        'overall_tat'        => 'float',   // ← added alongside the fillable entry
        'candidate_dob'      => 'date',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function events()
    {
        return $this->hasMany(CaseEvent::class, 'case_id', 'case_id');
    }

    public function caseChecks()
    {
        return $this->hasMany(CaseCheck::class, 'case_id', 'case_id');
    }

    /**
     * NOTE (pre-existing, not changed here): this derives the next id from
     * the highest `id`, not the highest case_id, and is not transactional —
     * two cases created at the same instant can collide on case_id. If you
     * ever see a duplicate-key error on cases.case_id, that's the cause;
     * wrapping this in a DB transaction with a lock (or a dedicated
     * sequence table) is the fix. Left alone for now since it isn't the
     * bug you're chasing.
     */
    public static function generateCaseId(): string
    {
        $last = self::latest('id')->first();

        if (!$last || !$last->case_id) {
            return 'BGV-2501';
        }

        $number = (int) str_replace('BGV-', '', $last->case_id);

        return 'BGV-' . ($number + 1);
    }
}