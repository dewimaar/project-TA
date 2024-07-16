<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->string('ekspedisi_name')->nullable();
            $table->decimal('ekspedisi_cost', 10, 2)->nullable();
            $table->decimal('total_cost', 10, 2)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn('ekspedisi_name');
            $table->dropColumn('ekspedisi_cost');
            $table->dropColumn('total_cost');
        });
    }
};
