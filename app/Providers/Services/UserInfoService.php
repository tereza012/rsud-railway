<?php

namespace App\Providers\Services;

use App\Models\User;
use App\Models\Files;
use App\Models\UserInfo;
use App\Providers\Interfaces\CRUDInterfaces;
use App\Trait\HandleFileTrait;
use App\Trait\HandleMultipleTrait;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use function PHPUnit\Framework\isFalse;

class UserInfoService implements CRUDInterfaces
{
    use HandleMultipleTrait, HandleFileTrait;

    public function store($request): bool
    {
        try {
            DB::beginTransaction();
            $userInfo = UserInfo::create($request->all());

            $addId = fn($item) => array_merge($item, ['userInfo_id' => $userInfo->id]);

            $items = array_map($addId, $request->getFiles());
            $userInfo->files()->createMany($items);

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }

    public function update($request, $id): bool
    {
        try {
            DB::beginTransaction();

            $isUpdate = false;
            $user = User::with(['userInfo', 'files'])->findOrFail($id);
            $userInfo = $user->userInfo ? $user->userInfo->toArray() : [];

            $newUserInfo = array_diff_assoc(array_filter($request->getUserInfoData(), fn($value) => $value !== null && $value !== '' && $value !== 'undefined'), $userInfo);

            if (count($newUserInfo) > 0) {
                $isUpdate = true;
                $user->userInfo()->update($newUserInfo);
            }

            $this->updateFileRelations($user, $request) ? $isUpdate = true : null;

            if ($isUpdate) {
                DB::commit();
            }
            return $isUpdate;
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }

    public function destroy($id): bool
    {
        try {
            DB::beginTransaction();

            $userInfo = UserInfo::findOrFail($id);

            $userInfo->delete();

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }
}
