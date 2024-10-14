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
        Schema::create('trainee_targets', function (Blueprint $table) {
            $table->id()->primary();
            $table->foreignId('training_id')->constrained('training')->cascadeOnDelete();
            $table->enum('target_type', \App\Enum\User\NakesEnum::getValues());
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trainee_targets');
    }
};
