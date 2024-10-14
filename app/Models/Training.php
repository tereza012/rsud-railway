<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Training extends Model
{
    use HasFactory;

    protected $table = 'training';
    protected $fillable = [
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
    ];

    public function files(): hasMany
    {
        return $this->hasMany(Files::class, 'training_id', 'id');
    }

    public function trainee(): hasMany
    {
        return $this->hasMany(Trainee::class, 'training_id', 'id');
    }

    public function trainingOrganizer(): hasMany
    {
        return $this->hasMany(TrainingOrganizer::class, 'training_id', 'id');
    }

    public function traineeTargets(): hasMany
    {
        return $this->hasMany(TraineeTargets::class, 'training_id', 'id');
    }

    public function trainingSchedule(): hasMany
    {
        return $this->hasMany(TrainingSchedule::class, 'training_id', 'id');
    }

    public function competences(): hasMany
    {
        return $this->hasMany(Competences::class, 'training_id', 'id');
    }

    public function trainingEvalVar(): HasMany
    {
        return $this->hasMany(TrainingEvaluationVar::class, 'training_id', 'id');
    }

    public function surveyResponse(): HasMany
    {
        return $this->hasMany(SurveyResponse::class, 'training_id', 'id');
    }
}
