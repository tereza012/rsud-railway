<?php

namespace Database\Factories;

use App\Models\Trainee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TraineeScores>
 */
class TraineeScoresFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'trainee_id' => $this->faker->randomElement(Trainee::pluck('id')),
            'pre_test' => $this->faker->randomNumber(2, $strict = false),
            'post_test' => $this->faker->randomNumber(2, $strict = false),
            'assignment' => $this->faker->randomNumber(2, $strict = false),
            'score_xls' => $this->faker->url(),
            'is_deleted' => $this->faker->boolean(),
            'deleted_at' => $this->faker->dateTime(),
        ];
    }
}
