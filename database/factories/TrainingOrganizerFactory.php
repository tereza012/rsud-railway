<?php

namespace Database\Factories;

use App\Enum\User\RoleEnum;
use App\Models\Training;
use App\Pipelines\QueryFilter\Helper\UserPipeline;
use App\Pipelines\QueryFilter\User\ByRole;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TrainingOrganizer>
 */
class TrainingOrganizerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $roles = [
            RoleEnum::FACILITATOR->value,
            RoleEnum::ORGANIZER->value,
            RoleEnum::CONTROLLER->value,
        ];

        return [
            'users_id' => $this->faker->randomElement(UserPipeline::thenReturnStatic([
                ByRole::class . ':' . $this->faker->randomElement($roles),
            ])
                ->pluck('id')
                ->toArray()),
            'training_id' => $this->faker->randomElement(Training::pluck('id')),
        ];
    }
}
