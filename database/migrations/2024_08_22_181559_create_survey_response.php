<?php

use App\Enum\User\SurveyTypeEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('survey_response', function (Blueprint $table) {
            $table->id()->primary();
            $table->foreignId('training_id')->constrained('training')->cascadeOnDelete();
            $table->foreignId('users_id')->constrained('users')->cascadeOnDelete();
            $table->string('question')->nullable();
            $table->enum('survey_type', SurveyTypeEnum::getValues());
            $table->enum('score', ['1', '2', '3', '4', '5'])->nullable();
            $table->text('suggestion')->nullable(); // Buat saran per pertanyaan
            $table->text('comment')->nullable(); // buat critic dan suggestion
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('survey_response');
    }
};
