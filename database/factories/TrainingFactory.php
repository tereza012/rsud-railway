<?php

namespace Database\Factories;

use App\Enum\Training\TrainingTypeEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Training>
 */
class TrainingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $signupStart = $this->faker->dateTimeBetween('-1 year', 'now');
        $signupEnd = $this->faker->dateTimeBetween($signupStart, 'now');
        $trainingStart = $this->faker->dateTimeBetween($signupEnd, '+1 month');
        $trainingEnd = $this->faker->dateTimeBetween($trainingStart, '+1 month');
        return [
            'type' => $this->faker->randomElement(TrainingTypeEnum::getValues()),
            'description' => $this->faker->text(),
            'name' => $this->faker->randomElement(['Training 1', 'Training 2']),
            'purpose' => $this->faker->text(),
            'signup_start' => $signupStart->format('Y-m-d'),
            'signup_end' => $signupEnd->format('Y-m-d'),
            'training_start' => $trainingStart->format('Y-m-d'),
            'training_end' => $trainingEnd->format('Y-m-d'),
            'batch' => $this->faker->randomNumber(1),
            'capacity' => $this->faker->randomNumber(2),
            'skp' => $this->faker->randomNumber(1),
            'jpl' => $this->faker->randomNumber(1),
            'cost' => $this->faker->randomFloat(2, 0, 5000000),
            'cp' => fake('id_ID')->name(),
            'whatsapp_link' => $this->faker->url(),
            'is_accept' => $this->faker->boolean(true),
        ];
    }
}
