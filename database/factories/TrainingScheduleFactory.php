<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TrainingSchedule>
 */
class TrainingScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'materi_name' => $this->faker->randomElement(['Praktek Bedah', 'Bius Pasien', 'Dosis Obat', 'Lab']),
            'desc_schedule' => $this->faker->text(),
            'start_at' => $this->faker->randomNumber(5),
            'end_at' => $this->faker->randomNumber(5),
        ];
    }
}
