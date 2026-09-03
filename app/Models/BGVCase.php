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
        'tat',          // ← added: case-level TAT (days)
        'check_tat',    // ← added: per-check 
        // TAT breakdown
        'check_rates',
        'assigned_verifiers',   
        'payment_link',
        'status',
        'check_results',
        'check_details',
        'notes',
        'created_by',
    ];

    protected $casts = [
        'checks'         => 'array',
        'check_results'  => 'array',
        'check_details'  => 'array',
        'check_tat'      => 'array',   // ← added
        'check_rates'    => 'array',
        'assigned_verifiers'  => 'array',
        'total_amount'   => 'float',
        'tat'            => 'float',   // ← added
        'candidate_dob'  => 'date',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function events()
    {
        return $this->hasMany(CaseEvent::class, 'case_id', 'case_id');
    }

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