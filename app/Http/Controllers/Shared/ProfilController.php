<?php

namespace App\Http\Controllers\Shared;

use App\Enum\File\FileTypeEnum;
use App\Enum\User\EducationEnum;
use App\Enum\User\GolonganEnum;
use App\Enum\User\NakesEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Shared\StoreProfileRequest;
use App\Http\Requests\Shared\UpdateProfilRequest;
use App\Models\Files;
use App\Models\User;
use App\Models\UserInfo;
use App\Providers\Services\UserInfoService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfilController extends Controller
{
    private UserInfoService $userInfoService;

    public function __construct(UserInfoService $userInfoService)
    {
        $this->userInfoService = $userInfoService;
    }

    public function index(): Response
    {
        $data = [
            'user' => User::with(['userInfo', 'files'])->findOrFail(auth()->id()),
            'cv' => Files::where('users_id', auth()->id())->where('file_type', FileTypeEnum::CV->value)->first(),
            'golonganEnum' => GolonganEnum::getValues(),
            'lastEducationEnum' => EducationEnum::getValues(),
            'nakesEnum' => NakesEnum::getValues(),
            'files' => FileTypeEnum::getValues()
        ];

        $data['user']->userInfo->profile_picture = Storage::url('uploads/profile_picture/' . $data['user']->userInfo->profile_picture);

        return Inertia::render('App/Shared/Profile', $data);
    }

    public function edit(string $id): RedirectResponse|Response
    {
        $user = User::with(['userInfo', 'files'])->findOrFail($id);

        if (Gate::denies('can-update', $user)) {
            return redirect()->route('profile.index')->with('error', 'You are not allowed to Lookup this data');
        }

        return Inertia::render('App/Shared/ProfilEdit', $user);
    }

    public function update(UpdateProfilRequest $request, string $id): RedirectResponse
    {
        $user = User::with(['userInfo', 'files'])->findOrFail($id);

        if (Gate::denies('can-update', $user)) {
            return redirect()->route('profile.index')->with('error', 'You are not allowed to update this data');
        }

        $isUpdate = $this->userInfoService->update($request, $id);

        return redirect(Auth::user()->role . '/profile')->with(
            $isUpdate ? 'success' : 'error',
            $isUpdate ? 'Success Update Data' : 'Failed Update Data'
        );
    }

    public function destroy(string $id): RedirectResponse
    {
        $userInfo = UserInfo::findOrFail($id)->pluck('users_id');

        if (Gate::denies('can-update', $userInfo)) {
            return redirect()->route('profile.index')->with('error', 'You are not allowed to delete this data');
        }

        $isDelete = $this->userInfoService->destroy($id);

        return redirect(Auth::user()->role . '/profile')->with(
            $isDelete ? 'success' : 'error',
            $isDelete ? 'Success Delete Data' : 'Failed Delete Data'
        );
    }
}
