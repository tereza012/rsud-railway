<?php

namespace Database\Factories;

use App\Enum\User\EducationEnum;
use App\Enum\User\GenderEnum;
use App\Enum\User\GolonganEnum;
use App\Enum\User\NakesEnum;
use App\Enum\User\RoleEnum;
use App\Pipelines\QueryFilter\Helper\UserPipeline;
use App\Pipelines\QueryFilter\User\ByRole;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserInfo>
 */
class UserInfoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = fake('id_ID');
        return [
            'gender' => $faker->randomElement(GenderEnum::getValues()),
            'nip' => $faker->unique()->bothify('##################'),
            'employee_position' => $faker->jobTitle(),
            'institution' => $faker->company(),
            'employee_status' => $faker->randomElement(['Aktif', 'Tidak Aktif']),
            'last_education' => $faker->randomElement(EducationEnum::getValues()),
        ];
    }

    public function facilitator(): self
    {
        $faker = fake('id_ID');
        return $this->state(function (array $attributes) use ($faker) {
            return [
                'npwp' => $faker->unique()->bothify('################'),
                'bank_number' => $faker->bothify('##########'),
                'bank_name' => $faker->company() . ' ' . $faker->randomElement(['Bank', 'Bank Negara']),
                'owner_name' => $faker->name(),
            ];
        });
    }

    public function user(): self
    {
        $faker = fake('id_ID');
        return $this->state(function (array $attributes) use ($faker) {
            return [
                'golongan' => $faker->randomElement(GolonganEnum::getValues()),
                'nakes_type' => $faker->randomElement(NakesEnum::getValues()),
                'residence_address' => $faker->address(),
                'province' => $faker->address(),
                'regency' => $faker->streetAddress(),
                'institution_address' => $faker->address(),
            ];
        });
    }
}
