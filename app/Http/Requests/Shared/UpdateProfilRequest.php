<?php

namespace App\Http\Requests\Shared;

use App\Enum\File\FileTypeEnum;
use App\Enum\User\EducationEnum;
use App\Enum\User\GenderEnum;
use App\Enum\User\GolonganEnum;
use App\Enum\User\NakesEnum;
use App\Enum\User\RoleEnum;
use App\Providers\Services\FilesService;
use App\Trait\HandleFileTrait;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UpdateProfilRequest extends FormRequest
{
    use HandleFileTrait;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        $this->request->replace($this->only([
            'name',
            'username',
            'password',
            'email',
            'phone',
            'role',
            'gender',
            'nip',
            'employee_position',
            'last_education',
            'profile_picture',
            'files',
            'file_type',
            'npwp',
            'bank_number',
            'bank_name',
            'owner_name',
            'golongan',
            'nakes_type',
            'residence_address',
            'province',
            'regency',
            'is_deleted',
        ]));
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
                'string',
                'max:255',
            ],
            'username' => [
                'bail',
                'string',
                'max:255',
                'unique:users,username,' . Auth::id(),
            ],
            'password' => [
                'bail',
                'nullable',
                'string',
                'min:8',
            ],
            'email' => [
                'bail',
                'string',
                'email',
                'max:255',
                'unique:users,email,' . Auth::id(),
            ],
            'phone' => [
                'bail',
                'string',
                'max:255',
                'unique:users,phone,' . Auth::id(),
            ],
            'role' => [
                'bail',
                Rule::in(RoleEnum::getValues())
            ],
            'gender' => [
                'bail',
                Rule::in(GenderEnum::getValues())
            ],
            'nip' => [
                'bail',
                'string',
                'max:255',
                'unique:user_info,nip,' . Auth::user()->userInfo->id,
            ],
            'employee_position' => [
                'bail',
                'string',
                'max:255',
            ],
            'last_education' => [
                'bail',
                Rule::in(EducationEnum::getValues())
            ],

            'files' => [
                'bail',
                'array',
            ],

            'files.*' => [
                'bail',
                function ($attribute, $value, $fail) {
                    if (is_string($value)) {
                        $rules = [
                            'string',
                            'max:255',
                        ];
                    } elseif ($value instanceof \Illuminate\Http\UploadedFile) {
                        $rules = [
                            'file',
                            'mimes:pdf',
                            'max:1024',
                        ];
                    } else {
                        $fail($attribute . ' harus berupa string atau file.');
                    }
                },
            ],

            'file_type' => [
                'bail',
                'array'
            ],
            'file_type.*' => [
                'bail',
                Rule::in(FileTypeEnum::getValues())
            ],

            'profile_picture' => [
                'bail',
                'nullable',
                'max:2048',
            ],
        ];

        switch (Auth::user()->role) {
            case 'facilitator':
                $rl = [
                    'npwp' => [
                        'bail',
                        'string',
                        'max:255',
                        'unique:user_info,npwp,' . Auth::user()->userInfo->id,
                    ],
                    'bank_number' => [
                        'bail',
                        'string',
                        'max:255',
                    ],
                    'bank_name' => [
                        'bail',
                        'string',
                        'max:255',
                    ],
                    'owner_name' => [
                        'bail',
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
                        Rule::in(GolonganEnum::getValues()),
                    ],
                    'institution_address' => [
                        'bail',
                        'string',
                        'max:255',
                    ],
                    'nakes_type' => [
                        'bail',
                        Rule::in(NakesEnum::getValues()),
                    ],
                    'residence_address' => [
                        'bail',
                        'string',
                        'max:255',
                    ],
                    'province' => [
                        'bail',
                        'string',
                        'max:255',
                    ],
                    'regency' => [
                        'bail',
                        'string',
                        'max:255',
                    ],
                ];
                $rules = array_merge($rl, $rules);
                break;
        }

        return $rules;
    }

    protected function passedValidation(): void
    {
        if ($this->input('profile_picture') != "undefined" || $this->input('files')) {
            $this->handleFile();
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
            if ($this->input('password')) {
                $this->merge(['password' => Hash::make($this->input('password'))]);
            }
        }
    }

    public function getUserData(): array
    {
        return [
            'name' => $this->input('name'),
            'username' => $this->input('username'),
            'password' => $this->input('password'),
            'email' => $this->input('email'),
            'phone' => $this->input('phone'),
            'role' => $this->input('role'),
        ];
    }

    public function getFiles(): array
    {
        return [
            'files' => $this->input('files'),
            'file_type' => $this->input('file_type'),
        ];
    }

    public function getUserInfoData(): array
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
