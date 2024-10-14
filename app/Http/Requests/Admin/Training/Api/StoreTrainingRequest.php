<?php

namespace App\Http\Requests\Admin\Training\Api;

use App\Enum\File\FileTypeEnum;
use App\Enum\Training\TrainingTypeEnum;
use App\Enum\User\NakesEnum;
use App\Providers\Services\FilesService;
use App\Trait\HandleFileTrait;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreTrainingRequest extends FormRequest
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
        return [
            'type' => [
                'bail',
                'required',
                Rule::in(TrainingTypeEnum::getValues())
            ],
            'description' => [
                'bail',
                'required',
                'string',
            ],
            'name' => [
                'bail',
                'required',
                'string',
                'max:255',
            ],
            'purpose' => [
                'bail',
                'required',
                'string',
                'max:1000',
            ],
            'signup_start' => [
                'bail',
                'required',
                'date_format:Y-m-d',
                'before_or_equal:signup_end',
            ],
            'signup_end' => [
                'bail',
                'required',
                'date_format:Y-m-d',
                'after_or_equal:signup_start',
            ],
            'training_start' => [
                'bail',
                'required',
                'date_format:Y-m-d',
                'before_or_equal:training_end',
            ],
            'training_end' => [
                'bail',
                'required',
                'date_format:Y-m-d',
                'after_or_equal:training_start',
            ],
            'batch' => [
                'bail',
                'required',
                'integer',
                'min:1',
                'max:10',
            ],
            'capacity' => [
                'bail',
                'required',
                'integer',
                'min:1',
            ],
            'skp' => [
                'bail',
                'required',
                'integer',
                'min:1',
            ],
            'jpl' => [
                'bail',
                'required',
                'integer',
                'min:1',
            ],
            'cost' => [
                'bail',
                'required',
                'numeric',
                'regex:/^\d{1,8}(\.\d{1,2})?$/'
            ],
            'cp' => [
                'bail',
                'required',
                'string',
                'max:255',
            ],
            'whatsapp_link' => [
                'bail',
                'required',
                'string',
                'max:255',
            ],
            'name_competences' => [
                'bail',
                'required',
                'array',
                'min:1',
            ],
            'name_competences.*' => [
                'bail',
                'required',
                'string',
                'max:255',
            ],
            'target_type' => [
                'bail',
                'required',
                'array',
            ],
            'target_type.*' => [
                'bail',
                'required',
                Rule::in(NakesEnum::getValues()),
            ],
        ];
    }

    public function getTraining(): array
    {
        return $this->only([
            'type',
            'description',
            'name',
            'purpose',
            'signup_start',
            'signup_end',
            'training_start',
            'training_end',
            'batch',
            'capacity',
            'skp',
            'jpl',
            'cost',
            'cp',
            'whatsapp_link',
        ]);
    }

    public function getCompetences(): array
    {
        return $this->only('name_competences');
    }

    public function getTraineeTargets(): array
    {
        return $this->only('target_type');
    }
}
