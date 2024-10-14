<?php

namespace Database\Factories;

use App\Models\TrainingEvaluationVar;
use App\Models\TrainingSchedule;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EvaluationValue>
 */
class EvaluationValueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'evaluationVar_id' => $this->faker->randomElement(TrainingEvaluationVar::all()->pluck('id')->toArray()),
            'trainingSchedule_id' => $this->faker->randomElement(TrainingSchedule::all()->pluck('id')->toArray()),
            'score' => $this->faker->numberBetween(1, 5),
        ];
    }
}
