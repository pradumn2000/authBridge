<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('case_checks', function (Blueprint $table) {
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
    }

    public function down(): void
    {
        Schema::dropIfExists('case_checks');
    }
};