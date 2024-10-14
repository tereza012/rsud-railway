<?php

namespace App\Http\Controllers\Admin;

use App\Enum\User\RoleEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Account\UpdateAccountRequest;
use App\Http\Requests\Shared\StoreProfileRequest;
use App\Models\User;
use App\Pipelines\QueryFilter\Helper\UserPipeline;
use App\Pipelines\QueryFilter\User\ByRole;
use App\Providers\Services\Admin\AccountService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    private AccountService $accountService;

    public function __construct(AccountService $accountService)
    {
        $this->accountService = $accountService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $data = collect(RoleEnum::cases())
            ->mapWithKeys(function ($role) {
                return [$role->value => UserPipeline::thenReturnStatic([ByRole::class . ":" . $role->value])->get()];
            });

        return Inertia::render('App/Admin/Account', ['data' => $data]);
    }

    /**
     * Show the form for creating a new resource.
     * Biarkan user menggisi data mereka sendiri ketika akun sudah dibuatkan oleh admin
     */
    public function create(): Response
    {
        return Inertia::render('App/Admin/AccountCreate', [
            'title' => 'Create Account',
            'roles' => RoleEnum::getValuesWithout(RoleEnum::ADMIN->value),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProfileRequest $request): RedirectResponse
    {
        $isSuccess = $this->accountService->store($request);

        return $isSuccess
            ? redirect()->route('account.index')->with('success', 'Account created successfully')
            : redirect()->back()->withErrors('Something went wrong');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = User::with(['userInfo', 'files'])->findOrFail($id)->first();

        return Inertia::render('App/Admin/AccountShow', ['data' => $data]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $user = $this->accountService->findById($id);

        return Inertia::render('App/Admin/AccountEdit', ['user' => $user]);
    }

    /**
     * Update disini cuman memberikan ijin is Verified doang
     *
     * Update the specified resource in storage.
     */
    public function update(UpdateAccountRequest $request, string $id): RedirectResponse
    {
        $isSuccess = $this->accountService->update($request, $id);

        return $isSuccess
            ? redirect()->route('account.index')->with('success', 'Account updated successfully')
            : redirect()->back()->withErrors('Something went wrong');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $isSuccess = $this->accountService->destroy($id);

        return $isSuccess
            ? redirect()->route('account.index')->with('success', 'Account deleted successfully')
            : redirect()->back()->withErrors('Something went wrong');
    }
}
