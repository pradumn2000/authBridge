<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CheckType extends Model
{
    protected $fillable = [
        'key', 'label', 'icon',
        'default_rate', 'default_working_days', 'default_calendar_days',
        'fields', 'is_system', 'is_active', 'created_by',
    ];

    protected $casts = [
        'fields'                 => 'array',
        'is_system'              => 'boolean',
        'is_active'              => 'boolean',
        'default_rate'           => 'float',
        'default_working_days'   => 'integer',
        'default_calendar_days'  => 'integer',
    ];
}