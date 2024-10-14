<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('training_schedule', function (Blueprint $table) {
            $table->id()->primary();
            $table->foreignId('training_id')->constrained('training')->cascadeOnDelete();
            $table->string('materi_name');
            $table->text('desc_schedule');
            $table->bigInteger('start_at');
            $table->bigInteger('end_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('training_schedule');
    }
};
