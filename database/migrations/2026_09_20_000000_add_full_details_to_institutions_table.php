<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('institutions', function (Blueprint $table) {
            // Basic Information
            $table->string('city')->nullable()->after('state');
            $table->string('pin_code')->nullable()->after('city');
            $table->string('email')->nullable()->after('website');
            $table->string('phone')->nullable()->after('email');
            $table->string('alternate_phone')->nullable()->after('phone');

            // Verification Fees (National)
            $table->string('verification_fees_by')->nullable()->after('phone');
            $table->integer('from_yop')->nullable()->after('verification_fees_by');
            $table->integer('to_yop')->nullable()->after('from_yop');
            $table->decimal('fees_amount', 10, 2)->nullable()->after('to_yop');

            // Verification Fees (International)
            $table->decimal('university_fees', 10, 2)->nullable()->after('fees_amount');

            // Regulatory Details — kept separate from the legacy `stature`
            // and `aicte` columns (still used by CSV import + the existing
            // table badges) so neither breaks.
            $table->string('regulatory_body')->nullable()->after('stature');
            $table->boolean('ugc_recognized')->nullable()->default(true)->after('regulatory_body');
            $table->boolean('aicte_approved')->nullable()->default(false)->after('ugc_recognized');

            // Address
            $table->string('address_line1')->nullable()->after('aicte_approved');
            $table->string('address_line2')->nullable()->after('address_line1');
            $table->string('landmark')->nullable()->after('address_line2');
            $table->string('country')->nullable()->default('India')->after('landmark');

            // Other Information
            $table->decimal('charges', 10, 2)->nullable()->after('country');
            $table->decimal('service_charges', 10, 2)->nullable()->after('charges');
            $table->boolean('gst_applicable')->nullable()->default(true)->after('service_charges');
            $table->decimal('gst_percent', 5, 2)->nullable()->after('gst_applicable');
            $table->decimal('service_charges_with_gst', 10, 2)->nullable()->after('gst_percent');
            $table->decimal('total_amount', 10, 2)->nullable()->after('service_charges_with_gst');
            $table->text('notes')->nullable()->after('total_amount');
        });
    }

    public function down(): void
    {
        Schema::table('institutions', function (Blueprint $table) {
            $table->dropColumn([
                'city', 'pin_code', 'email', 'phone', 'alternate_phone',
                'verification_fees_by', 'from_yop', 'to_yop', 'fees_amount', 'university_fees',
                'regulatory_body', 'ugc_recognized', 'aicte_approved',
                'address_line1', 'address_line2', 'landmark', 'country',
                'charges', 'service_charges', 'gst_applicable', 'gst_percent',
                'service_charges_with_gst', 'total_amount', 'notes',
            ]);
        });
    }
};