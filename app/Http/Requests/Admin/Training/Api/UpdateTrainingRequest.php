<?php

namespace App\Http\Requests\Admin\Training\Api;

use App\Enum\Training\TrainingTypeEnum;
use App\Enum\User\NakesEnum;
use App\Trait\HandleFileTrait;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTrainingRequest extends FormRequest
{
    use HandleFileTrait;

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
                Rule::in(TrainingTypeEnum::getValues())
            ],
            'description' => [
                'bail',
                'string',
            ],
            'name' => [
                'bail',
                'string',
                'max:255',
            ],
            'purpose' => [
                'bail',
                'string',
                'max:1000',
            ],
            'signup_start' => [
                'bail',
                'date_format:Y-m-d',
                'before_or_equal:signup_end',
            ],
            'signup_end' => [
                'bail',
                'date_format:Y-m-d',
                'after_or_equal:signup_start',
            ],
            'training_start' => [
                'bail',
                'date_format:Y-m-d',
                'before_or_equal:training_end',
            ],
            'training_end' => [
                'bail',
                'date_format:Y-m-d',
                'after_or_equal:training_start',
            ],
            'batch' => [
                'bail',
                'integer',
                'min:1',
                'max:10',
            ],
            'capacity' => [
                'bail',
                'integer',
                'min:1',
            ],
            'skp' => [
                'bail',
                'integer',
                'min:1',
            ],
            'jpl' => [
                'bail',
                'integer',
                'min:1',
            ],
            'cost' => [
                'bail',
                'numeric',
                'regex:/^\d{1,8}(\.\d{1,2})?$/'
            ],
            'cp' => [
                'bail',
                'string',
                'max:255',
            ],
            'whatsapp_link' => [
                'bail',
                'string',
                'max:255',
            ],

            // Relation
            'competences.*.name_competences' => [
                'bail',
                'string',
                'max:255',
            ],
            'competences.*.training_id' => [
                'bail',
                'exists:training,id',
            ],


            'target_type.*.training_id' => [
                'bail',
                'exists:training,id',
            ],
            'target_type.*.target_type' => [
                'bail',
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
        return $this->only('competences');
    }

    public function getTraineeTargets(): array
    {
        return $this->only('target_type');
    }
}
