<?php

namespace Database\Factories;

use App\Enum\Training\RejectTypeEnum;
use App\Enum\Training\StatusEnum;
use App\Enum\User\RoleEnum;
use App\Models\Training;
use App\Pipelines\QueryFilter\Helper\UserPipeline;
use App\Pipelines\QueryFilter\User\ByRole;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Trainee>
 */
class TraineeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'users_id' => $this->faker->randomElement(UserPipeline::thenReturnStatic([
                ByRole::class . ":" . RoleEnum::USER->value
            ])
                ->pluck('id')),
            'training_id' => $this->faker->randomElement(Training::pluck('id')),
            'status' => $this->faker->randomElement(StatusEnum::getValues()),
        ];
    }
}
