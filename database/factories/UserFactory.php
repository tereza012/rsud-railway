<?php

namespace Database\Factories;

use App\Enum\User\RoleEnum;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    public function definition(): array
    {
        $faker = fake('id_ID');
        return [
            'name' => $faker->name(),
            'username' => $faker->userName(),
            'role' => $faker
                ->randomElement(RoleEnum::getValues()),
            'password' => Hash::make('123'),
            'email' => $faker->unique()->safeEmail(),
            'phone' => $faker->phoneNumber(),
            'is_verified' => true,
        ];
    }
}
