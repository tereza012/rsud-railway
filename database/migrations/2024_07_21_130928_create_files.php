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
        Schema::create('files', function (Blueprint $table) {
            $table->id()->primary();
            $table->foreignId('users_id')->nullable()->constrained('users')->cascadeOnDelete();
            $table->foreignId('training_id')->nullable()->constrained('training')->cascadeOnDelete();
            $table->string('files');
            $table->enum('file_type', \App\Enum\File\FileTypeEnum::getValues());
            $table->boolean('is_deleted')->default(false);
            $table->timestamp('deleted_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
