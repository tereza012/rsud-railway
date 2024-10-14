<?php

namespace App\Http\Requests\Admin\Training;

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

    private function formatDate($date): string
    {
        return \Carbon\Carbon::parse($date)->format('Y-m-d');
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'signup_start' => $this->formatDate($this->input('signup_start')),
            'signup_end' => $this->formatDate($this->input('signup_end')),
            'training_start' => $this->formatDate($this->input('training_start')),
            'training_end' => $this->formatDate($this->input('training_end')),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
//        dd($this->request->all());
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
                'before_or_equal:signup_end',
            ],
            'signup_end' => [
                'bail',
                'required',
                'after_or_equal:signup_start',
            ],
            'training_start' => [
                'bail',
                'required',
                'before_or_equal:training_end',
            ],
            'training_end' => [
                'bail',
                'required',
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

            'training_schedule.*.materi_name' => [
                'bail',
                'required',
                'string',
                'max:255',
            ],
            'training_schedule.*.desc_schedule' => [
                'bail',
                'required',
                'string',
                'max:1000',
            ],
            'training_schedule.*.start_at' => [
                'bail',
                'required',
                'date_format:Y-m-d H:i:s',
                'before_or_equal:end_at',
            ],
            'training_schedule.*.end_at' => [
                'bail',
                'required',
                'date_format:Y-m-d H:i:s',
                'after_or_equal:start_at',
            ],

            'training_organizer.*' => [
                'bail',
                'required',
                'integer',
                'exists:users,id',
                'distinct',
            ],

            'files.*.files' => [
                'bail',
                'required',
                'string',
            ],

            'files.*.file_type' => [
                'bail',
                'required',
                Rule::in(FileTypeEnum::getValues()),
            ],

            'organizer_data.*.files' => [
                'bail',
                'required',
                'string',
            ],

//            'organizer_data.*.file_type' => [
//                'bail',
//                'required',
//                Rule::in(FileTypeEnum::getValues()),
//            ],

            'organizer_data.*.users_id' => [
                'bail',
                'required',
                'integer',
                'exists:users,id',
            ],

            'facilitator_data.*.files' => [
                'bail',
                'required',
                'string',
            ],

//            'facilitator_data.*.file_type' => [
//                'bail',
//                'required',
//                Rule::in(FileTypeEnum::getValues()),
//            ],

            'facilitator_data.*.users_id' => [
                'bail',
                'required',
                'integer',
                'exists:users,id',
            ],

//            'controller_data.*.files' => [
//                'bail',
//                'required',
//                'string',
//            ],
//
//            'controller_data.*.file_type' => [
//                'bail',
//                'required',
//                Rule::in(FileTypeEnum::getValues()),
//            ],

            'controller_data.*.users_id' => [
                'bail',
                'required',
                'integer',
                'exists:users,id',
            ],


            /*'variable' => [*/
            /*    'bail',*/
            /*    'required',*/
            /*    'array'*/
            /*],*/
            /*'variable.*' => [*/
            /*    'bail',*/
            /*    'required',*/
            /*    'string',*/
            /*    'max:255'*/
            /*]*/
        ];
    }

    public function getTraining()
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

    public function getSchedule()
    {
        return $this->input('training_schedule');
    }

    public function getCompetences()
    {
        return $this->input('name_competences');
    }

    public function getTraineeTargets()
    {
        return $this->input('target_type');
    }

    public function getOrganizer()
    {
        return $this->input('training_organizer');
    }

    public function getFiles()
    {
        $files = $this->input('files');

        return array_map(function ($file) {
            unset($file['url']);
            return $file;
        }, $files);
    }


    public function getFilesOrganizer()
    {
        return $this->input('organizer_data');
    }

    public function getFilesFacilitator()
    {
        return $this->input('facilitator_data');

    }

    public function getFilesController()
    {
        return $this->input('controller_data');
    }
}
