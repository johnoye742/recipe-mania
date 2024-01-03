<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('saved_recipies', function (Blueprint $table) {
            //
            $table -> dropColumn('owner_email');
            $table -> text('u_email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('saved_recipies', function (Blueprint $table) {
            //
        });
    }
};
