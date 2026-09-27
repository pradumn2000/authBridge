<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CaseCheck extends Model
{
    protected $fillable = [
    'case_id', 'check_type', 'fields', 'documents', 'result',
    'status', 'verifier_id', 'rate', 'tat_days',
    'working_days', 'calendar_days',
    // TL QC Review (TLQCReview.jsx) — the TL's approve/reject decision on
    // this check, separate from the verifier's own `result`.
    'qc_status', 'qc_comments', 'qc_reviewed_by', 'qc_reviewed_at',
];

    protected $casts = [
        'fields' => 'array',
        'documents' => 'array',
        'result' => 'array',
        'rate' => 'decimal:2',
        'qc_reviewed_at' => 'datetime',
    ];

    public function bgvCase()
    {
        return $this->belongsTo(BGVCase::class, 'case_id', 'case_id');
    }

    public function verifier()
    {
        return $this->belongsTo(User::class, 'verifier_id');
    }
}