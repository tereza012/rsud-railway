<?php

use App\Enum\User\EducationEnum;
use App\Enum\User\GenderEnum;
use App\Enum\User\GolonganEnum;
use App\Enum\User\NakesEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_info', function (Blueprint $table) {
            $table->id()->primary();
            $table->foreignId('users_id')->constrained('users')->cascadeOnDelete();
            $table->enum('gender', GenderEnum::getValues());
            $table->string('nip')->unique();
            $table->string('employee_position');
            $table->string('institution');
            $table->string('employee_status');
            $table->enum('last_education', EducationEnum::getValues());
            $table->string('institution_address')->nullable();
            $table->string('profile_picture')->nullable();
            $table->string('npwp')->nullable();
            $table->string('bank_number')->nullable();
            $table->string('bank_name')->nullable();
            $table->string('owner_name')->nullable();
            $table->enum('golongan', GolonganEnum::getValues())->nullable();
            $table->enum('nakes_type', NakesEnum::getValues())->nullable();
            $table->string('residence_address')->nullable();
            $table->string('province')->nullable();
            $table->string('regency')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_info');
    }
};
