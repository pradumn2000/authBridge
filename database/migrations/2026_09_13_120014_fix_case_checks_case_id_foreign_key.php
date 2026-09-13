<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('case_checks_new', function (Blueprint $table) {
            $table->id();
            $table->string('case_id');
            $table->string('check_type');
            $table->text('fields')->nullable();
            $table->text('documents')->nullable();
            $table->text('result')->nullable();
            $table->string('status')->default('pending');
            $table->unsignedBigInteger('verifier_id')->nullable();
            $table->decimal('rate', 10, 2)->default(0);
            $table->unsignedInteger('tat_days')->default(0);
            $table->timestamps();

            $table->unique(['case_id', 'check_type']);
            $table->foreign('case_id')->references('case_id')->on('cases')->onDelete('cascade');
            $table->foreign('verifier_id')->references('id')->on('users')->onDelete('set null');
        });

        DB::statement('
            INSERT INTO case_checks_new
                (id, case_id, check_type, fields, documents, result, status, verifier_id, rate, tat_days, created_at, updated_at)
            SELECT id, case_id, check_type, fields, documents, result, status, verifier_id, rate, tat_days, created_at, updated_at
            FROM case_checks
        ');

        Schema::drop('case_checks');
        Schema::rename('case_checks_new', 'case_checks');

        Schema::enableForeignKeyConstraints();
    }

    public function down(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('case_checks_old', function (Blueprint $table) {
            $table->id();
            $table->string('case_id');
            $table->string('check_type');
            $table->text('fields')->nullable();
            $table->text('documents')->nullable();
            $table->text('result')->nullable();
            $table->string('status')->default('pending');
            $table->unsignedBigInteger('verifier_id')->nullable();
            $table->decimal('rate', 10, 2)->default(0);
            $table->unsignedInteger('tat_days')->default(0);
            $table->timestamps();

            $table->unique(['case_id', 'check_type']);
            $table->foreign('case_id')->references('case_id')->on('bgv_cases')->onDelete('cascade');
            $table->foreign('verifier_id')->references('id')->on('users')->onDelete('set null');
        });

        DB::statement('INSERT INTO case_checks_old SELECT * FROM case_checks');
        Schema::drop('case_checks');
        Schema::rename('case_checks_old', 'case_checks');

        Schema::enableForeignKeyConstraints();
    }
};