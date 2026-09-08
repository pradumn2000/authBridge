<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CaseCheck extends Model
{
    protected $fillable = [
        'case_id', 'check_type', 'fields', 'documents', 'result', 
        'status', 'verifier_id', 'rate', 'tat_days'
    ];

    protected $casts = [
        'fields' => 'array',
        'documents' => 'array',
        'result' => 'array',
        'rate' => 'decimal:2',
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