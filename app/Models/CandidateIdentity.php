<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CandidateIdentity extends Model
{
    protected $fillable = [
        'case_id', 'gender', 'current_address', 'current_address_doc_type',
        'is_permanent_same', 'permanent_address', 'permanent_address_doc_type',
        'aadhaar_number', 'pan_number', 'documents',
        'digilocker_verified', 'digilocker_data',
    ];

    protected $casts = [
        'documents'          => 'array',
        'digilocker_data'    => 'array',
        'is_permanent_same'  => 'boolean',
        'digilocker_verified' => 'boolean',
    ];
}