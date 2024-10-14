<?php

namespace App\Providers\Services\Admin;

use App\Models\User;
use App\Models\UserInfo;
use App\Providers\Interfaces\CRUDInterfaces;
use Illuminate\Support\Facades\DB;

class AccountService implements CRUDInterfaces
{

    /**
     * Store a newly created resource in storage.
     *
     * @param mixed $request
     * @return bool
     */
    public function store($request): bool
    {
        try {
            DB::beginTransaction();
            $user = User::insertGetId($request->getUserData());
            $userInfoData = $request->getUserProfileData();
            $userInfoData['users_id'] = $user;

            UserInfo::create($userInfoData);

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param mixed $request
     * @param mixed $id
     * @return bool
     */
    public function update($request, $id): bool
    {
        try {
            User::findOrFail($id)->update($request->all());

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param mixed $id
     * @return bool
     */
    public function destroy($id): bool
    {
        try {
            User::findOrFail($id)->delete();

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}
