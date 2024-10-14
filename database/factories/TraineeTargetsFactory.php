<?php

namespace Database\Factories;

use App\Enum\User\NakesEnum;
use App\Models\Training;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TraineeTargets>
 */
class TraineeTargetsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'target_type' => $this->faker->randomElement(NakesEnum::getValues()),
        ];
    }
}
