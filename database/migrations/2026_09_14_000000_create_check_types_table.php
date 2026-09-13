<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('check_types', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('label');
            $table->string('icon')->nullable();
            $table->decimal('default_rate', 10, 2)->default(0);
            $table->unsignedInteger('default_working_days')->default(0);
            $table->unsignedInteger('default_calendar_days')->default(0);
            // Field-builder schema: array of
            // { id, label, type, required, options[] (dropdown only) }
            $table->json('fields')->nullable();
            // System (legacy) types can be edited but never deleted —
            // case_checks rows already reference these keys directly.
            $table->boolean('is_system')->default(false);
            $table->boolean('is_active')->default(true);
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
        });

        // Seed the 7 pre-existing check types so nothing that already
        // depends on these exact keys (case_checks rows, client
        // agreed_checks/check_rates/check_tat, CHECK_KEY_ALIASES on the
        // frontend) breaks after this migration runs.
        $now = now();
        $legacy = [
            ['key' => 'employment', 'label' => 'Employment'],
            ['key' => 'education',  'label' => 'Education'],
            ['key' => 'address',    'label' => 'Address'],
            ['key' => 'database',   'label' => 'Database'],
            ['key' => 'criminal',   'label' => 'Criminal'],
            ['key' => 'drug',       'label' => 'Drug Test'],
            ['key' => 'court',      'label' => 'Courtroom'],
        ];

        foreach ($legacy as $row) {
            DB::table('check_types')->insert(array_merge($row, [
                'icon'                   => 'images/sidebar/report-icon.svg',
                'default_rate'           => 0,
                'default_working_days'   => 0,
                'default_calendar_days'  => 0,
                'fields'                 => json_encode([]),
                'is_system'              => true,
                'is_active'              => true,
                'created_at'             => $now,
                'updated_at'             => $now,
            ]));
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('check_types');
    }
};