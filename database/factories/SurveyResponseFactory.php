<?php

namespace Database\Factories;

use App\Enum\User\SurveyTypeEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SurveyResponse>
 */
class SurveyResponseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = $this->faker->randomElement(SurveyTypeEnum::getValues());

        return array_merge(
            ['survey_type' => $type],
            ['question' => $this->faker->sentence()],
            $type === SurveyTypeEnum::CRITICISM_AND_SUGGESTION->value
                ? ['comment' => $this->faker->sentence()]
                : ['score' => $type === SurveyTypeEnum::CUSTOMER_SATISFACTION->value
                ? $this->faker->randomElement(['1', '2', '3', '4'])
                : $this->faker->randomElement(['1', '2', '3', '4', '5'])
            ]
        );
    }
}
