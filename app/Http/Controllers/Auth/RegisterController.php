<?php

namespace App\Http\Controllers\Auth;

use App\Enum\User\EducationEnum;
use App\Enum\User\GenderEnum;
use App\Enum\User\GolonganEnum;
use App\Enum\User\NakesEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Shared\StoreProfileRequest;
use App\Models\User;
use App\Models\UserInfo;
use App\Providers\Services\Admin\AccountService;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RegisterController extends Controller
{

    private AccountService $accountService;

    public function __construct(AccountService $accountService)
    {
        $this->accountService = $accountService;
    }

    /**
     * Display the registration view.
     */
    public function create(): \Inertia\Response
    {
        $data = [
            'gender' => GenderEnum::getValues(),
            'last_education' => EducationEnum::getValues(),
            'golongan' => GolonganEnum::getValues(),
            'nakes_type' => NakesEnum::getValues(),
        ];
        return Inertia::render('Auth/Register', $data);
    }

    /**
     * Handle an incoming registration request.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreProfileRequest $request): \Illuminate\Http\RedirectResponse
    {
        $isSuccess = $this->accountService->store($request);

        return $isSuccess
            ? to_route('login')->with('status', 'success')->with('message', 'User created successfully.')
            : to_route('login')->with('status', 'error')->with('message', 'User not created.');
    }
}
