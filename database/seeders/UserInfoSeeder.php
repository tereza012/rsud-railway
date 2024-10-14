<?php

namespace Database\Seeders;

use App\Enum\User\RoleEnum;
use App\Models\UserInfo;
use App\Pipelines\QueryFilter\Helper\UserPipeline;
use App\Pipelines\QueryFilter\User\ByRole;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = RoleEnum::getValuesWithout(RoleEnum::ADMIN->value);
        $userIdsByRole = [];

        foreach ($roles as $role) {
            $userIdsByRole[$role] = UserPipeline::thenReturnStatic([
                ByRole::class . ':' . $role
            ])->pluck('id');
        }

        foreach ($userIdsByRole as $role => $userIds) {
            foreach ($userIds as $userId) {
                $userInfoFactory = UserInfo::factory();

                if ($role === RoleEnum::FACILITATOR->value) {
                    $userInfoFactory->facilitator()->create([
                        'users_id' => $userId,
                    ]);
                } elseif ($role === RoleEnum::USER->value) {
                    $userInfoFactory->user()->create([
                        'users_id' => $userId,
                    ]);
                } else {
                    $userInfoFactory->create([
                        'users_id' => $userId,
                    ]);
                }
            }
        }
    }
}
