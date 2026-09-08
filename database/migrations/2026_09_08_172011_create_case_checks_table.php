<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('case_checks', function (Blueprint $table) {
            $table->id(); // The unique ID for this specific check instance
            $table->string('case_id'); // Maps to bgv_cases.case_id
            $table->string('check_type'); // 'employment', 'education', 'address', etc.
            
            // Check Data
            $table->json('fields')->nullable(); // Replaces check_details[type]['fields']
            $table->json('documents')->nullable(); // Replaces check_details[type]['documents']
            $table->json('result')->nullable(); // Replaces check_results[type]

            // Workflow & Assignment
            $table->string('status')->default('pending'); // pending, in-progress, completed
            $table->unsignedBigInteger('verifier_id')->nullable(); // Replaces assigned_verifiers JSON
            
            // Billing & SLA
            $table->decimal('rate', 10, 2)->default(0); // Replaces check_rates JSON
            $table->integer('tat_days')->default(0); // Replaces check_tat JSON

            $table->timestamps();

            // Relationships
            $table->foreign('case_id')->references('case_id')->on('bgv_cases')->onDelete('cascade');
            $table->foreign('verifier_id')->references('id')->on('users')->onDelete('set null');
            
            // Ensure we don't duplicate the same check type on a single case
            $table->unique(['case_id', 'check_type']); 
        });
    }

    public function down()
    {
        Schema::dropIfExists('case_checks');
    }
};