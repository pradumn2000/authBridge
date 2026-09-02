<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'address',
        'gstin',
        'primary_contact',
        'contact_phone',
        'priority',
        'billing_mode',
        'agreed_checks',
        'check_rates',
        'check_tat',
        'total_amount',
        'notes',
        'agreement_start_date',
        'agreement_end_date',
        'agreement_url',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'agreed_checks' => 'array',
        'check_rates' => 'array',
        'check_tat' => 'array',
        'agreement_start_date' => 'date',
        'agreement_end_date' => 'date',
    ];

    protected static function booted(): void
    {
        static::saving(function (User $user) {
            if ($user->role === 'admin') {
                $user->status = 'active';
            }
        });
    }
}