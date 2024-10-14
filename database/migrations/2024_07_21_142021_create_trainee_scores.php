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
        Schema::create('trainee_scores', function (Blueprint $table) {
            $table->id()->primary();
            $table->foreignId('trainee_id')->constrained('trainee')->cascadeOnDelete();
            $table->decimal('pre_test', 5, 2);
            $table->decimal('post_test', 5, 2);
            $table->decimal('assignment', 5, 2);
            $table->string('score_xls');
            $table->boolean('is_deleted');
            $table->timestamp('deleted_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trainee_scores');
    }
};
