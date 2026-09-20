<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Institution extends Model
{
    protected $fillable = [
        'type',
        'scope',
        'name',
        'code',
        'state',
        'city',
        'pin_code',
        'website',
        'email',
        'phone',
        'alternate_phone',
        'verification_fees_by',
        'from_yop',
        'to_yop',
        'fees_amount',
        'university_fees',
        'stature',
        'regulatory_body',
        'ugc_recognized',
        'aicte_approved',
        'aicte',
        'address_line1',
        'address_line2',
        'landmark',
        'country',
        'charges',
        'status',
        'service_charges',
        'gst_applicable',
        'gst_percent',
        'service_charges_with_gst',
        'total_amount',
        'notes',
        'level',
        'accredited',
    ];

    protected $casts = [
        'ugc_recognized' => 'boolean',
        'aicte_approved' => 'boolean',
        'gst_applicable' => 'boolean',
        'accredited'     => 'boolean',
        'fees_amount'    => 'float',
        'university_fees' => 'float',
        'charges'         => 'float',
        'service_charges' => 'float',
        'gst_percent'     => 'float',
        'service_charges_with_gst' => 'float',
        'total_amount'    => 'float',
        'from_yop'        => 'integer',
        'to_yop'          => 'integer',
    ];
}
