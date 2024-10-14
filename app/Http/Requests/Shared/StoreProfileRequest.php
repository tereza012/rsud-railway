<?php

namespace App\Http\Requests\Shared;

use App\Enum\User\EducationEnum;
use App\Enum\User\GenderEnum;
use App\Enum\User\GolonganEnum;
use App\Enum\User\NakesEnum;
use App\Enum\User\RoleEnum;
use App\Providers\Services\FilesService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class StoreProfileRequest extends FormRequest
{

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => [
                'bail',
                'required',
                'string',
                'max:255',
            ],
            'username' => [
                'bail',
                'required',
                'string',
                'max:255',
                'unique:users,username',
            ],
            'password' => [
                'bail',
                'required',
                'string',
                'min:8',
            ],
            'email' => [
                'bail',
                'required',
                'string',
                'email',
                'max:255',
                'unique:users,email',
            ],
            'phone' => [
                'bail',
                'required',
                'string',
                'max:255',
                'unique:users,phone',
            ],
            'role' => [
                'bail',
                'required',
                Rule::in(RoleEnum::getValues())
            ],
            'gender' => [
                'bail',
                'required',
                Rule::in(GenderEnum::getValues())
            ],
            'nip' => [
                'bail',
                'required',
                'string',
                'max:255',
            ],
            'employee_position' => [
                'bail',
                'required',
                'string',
                'max:255',
            ],
            'employee_status' => [
                'bail',
                'required',
                'string',
                'max:255',
            ],
            'institution' => [
                'bail',
                'required',
                'string',
                'max:255',
            ],
            'last_education' => [
                'bail',
                'required',
                Rule::in(EducationEnum::getValues())
            ],

            'profile_picture' => [
                'bail',
                'nullable',
                'file',
                'mimes:jpeg,png,jpg',
                'max:2048',
            ],
        ];

        switch ($this->input('role')) {
            case 'facilitator':
                $rl = [
                    'npwp' => [
                        'bail',
                        'required',
                        'string',
                        'max:255',
                    ],
                    'bank_number' => [
                        'bail',
                        'required',
                        'string',
                        'max:255',
                    ],
                    'bank_name' => [
                        'bail',
                        'required',
                        'string',
                        'max:255',
                    ],
                    'owner_name' => [
                        'bail',
                        'required',
                        'string',
                        'max:255',
                    ],
                ];
                $rules = array_merge($rl, $rules);
                break;

            case 'user':
                $rl = [
                    'golongan' => [
                        'bail',
                        'required',
                        Rule::in(GolonganEnum::getValues()),
                    ],
                    'institution_address' => [
                        'bail',
                        'required',
                        'string',
                        'max:255',
                    ],
                    'nakes_type' => [
                        'bail',
                        'required',
                        Rule::in(NakesEnum::getValues()),
                    ],
                    'residence_address' => [
                        'bail',
                        'required',
                        'string',
                        'max:255',
                    ],
                    'province' => [
                        'bail',
                        'required',
                        'string',
                        'max:255',
                    ],
                    'regency' => [
                        'bail',
                        'required',
                        'string',
                        'max:255',
                    ],
                ];
                $rules = array_merge($rl, $rules);
                break;
        }

        return $rules;
    }

    protected function passedValidation()
    {
        if ($this->hasFile('profile_picture')) {
            $fileService = app(FilesService::class);
            $file = $this->file('profile_picture');
            $fileType = 'profile_picture';
            $username = $this->input('username');
            $uniqueFileName = $fileService->generateUniqueFileName($file, $fileType, $username);
            $directory = 'uploads/' . $fileType;
            $fileService->upload($file, $directory, $uniqueFileName);

            $this->merge([
                'profile_picture' => $uniqueFileName,
            ]);
        }
        $this->merge([
            'password' => Hash::make($this->input('password')),
        ]);
    }

    public function getUserData()
    {
        return [
            "name" => $this->input('name'),
            "username" => $this->input('username'),
            "password" => $this->input('password'),
            "email" => $this->input('email'),
            "phone" => $this->input('phone'),
            "role" => $this->input('role'),
        ];
    }

    public function getUserProfileData()
    {
        return [
            "gender" => $this->input('gender'),
            "nip" => $this->input('nip'),
            "employee_position" => $this->input('employee_position'),
            "employee_status" => $this->input('employee_status'),
            "institution" => $this->input('institution'),
            "last_education" => $this->input('last_education'),
            "profile_picture" => $this->input('profile_picture'),
            "golongan" => $this->input('golongan'),
            "nakes_type" => $this->input('nakes_type'),
            "residence_address" => $this->input('residence_address'),
            "province" => $this->input('province'),
            "regency" => $this->input('regency'),
            'npwp' => $this->input('npwp'),
            'bank_number' => $this->input('bank_number'),
            'bank_name' => $this->input('bank_name'),
            'owner_name' => $this->input('owner_name'),
        ];
    }
}
