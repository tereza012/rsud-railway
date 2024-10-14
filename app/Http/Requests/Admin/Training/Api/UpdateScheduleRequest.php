<?php

namespace App\Http\Requests\Admin\Training\Api;

use Illuminate\Foundation\Http\FormRequest;

class UpdateScheduleRequest extends FormRequest
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
            'schedule_content.*.scheduleId' => [
                'bail',
                'required',
            ],
            'schedule_content' => [
                'bail',
                'array',
            ],
            'schedule_content.*.materi_name' => [
                'bail',
                'string',
                'max:255',
            ],
            'schedule_content.*.desc_schedule' => [
                'bail',
                'string',
                'max:1000',
            ],
            'schedule_content.*.start_at' => [
                'bail',
                'date_format:Y-m-d H:i:s',
                'before_or_equal:end_at',
            ],
            'schedule_content.*.end_at' => [
                'bail',
                'date_format:Y-m-d H:i:s',
                'after_or_equal:start_at',
            ],
        ];
    }

    public function getSchedule(): array
    {
        return $this->input('schedule_content');
    }
}
