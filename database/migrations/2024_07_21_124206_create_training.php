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
        Schema::create('training', function (Blueprint $table) {
            $table->id()->primary();
            $table->enum('type', \App\Enum\Training\TrainingTypeEnum::getValues());
            $table->text('description');
            $table->string('name')->index();
            $table->text('purpose');
            $table->dateTime('signup_start')->index();
            $table->dateTime('signup_end')->index();
            $table->dateTime('training_start')->index();
            $table->dateTime('training_end')->index();
            $table->integer('batch');
            $table->integer('capacity');
            $table->integer('skp');
            $table->integer('jpl');
            $table->decimal('cost', 10, 2);
            $table->string('cp');
            $table->string('whatsapp_link');
            $table->boolean('is_accept')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('training');
    }
};
