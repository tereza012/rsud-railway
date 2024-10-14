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
        Schema::create('trainee', function (Blueprint $table) {
            $table->id()->primary();
            $table->foreignId('users_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('training_id')->constrained('training')->cascadeOnDelete();
            $table->enum('status', \App\Enum\Training\StatusEnum::getValues());
            $table->enum('reject_category', \App\Enum\Training\RejectTypeEnum::getValues())->nullable();
            $table->text('evaluation')->nullable();
            $table->decimal('rating', 3, 1)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trainee');
    }
};
