<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('candidate_links', function (Blueprint $table) {
            $table->string('otp_code', 10)->nullable()->after('status');
            $table->timestamp('otp_expires_at')->nullable()->after('otp_code');
            $table->timestamp('email_verified_at')->nullable()->after('otp_expires_at');
        });

        Schema::create('candidate_identities', function (Blueprint $table) {
            $table->id();
            $table->string('case_id')->unique();
            $table->string('gender')->nullable();
            $table->text('current_address')->nullable();
            $table->string('current_address_doc_type')->nullable();
            $table->boolean('is_permanent_same')->default(false);
            $table->text('permanent_address')->nullable();
            $table->string('permanent_address_doc_type')->nullable();
            $table->string('aadhaar_number', 20)->nullable();
            $table->string('pan_number', 10)->nullable();
            $table->json('documents')->nullable();
            $table->boolean('digilocker_verified')->default(false);
            $table->json('digilocker_data')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('candidate_identities');
        Schema::table('candidate_links', function (Blueprint $table) {
            $table->dropColumn(['otp_code', 'otp_expires_at', 'email_verified_at']);
        });
    }
};