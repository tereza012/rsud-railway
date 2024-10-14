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
        Schema::create('evaluation_value', function (Blueprint $table) {
            $table->id()->primary();
            $table->foreignId('evaluationVar_id')->constrained('training_evaluation_var')->cascadeOnDelete();
            $table->foreignId('trainingSchedule_id')->constrained('training_schedule')->cascadeOnDelete(); // digunakan untuk mengambil nama materi yang ada
            $table->integer('score')->check('score >= 1 and score <= 5');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evaluation_value');
    }
};
