<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EvaluationValue extends Model
{
    use HasFactory;

    protected $table = 'evaluation_value';

    protected $fillable = [
        'evaluationVar_id',
        'trainingSchedule_id',
        'score',
    ];

    public function evaluationVar(): BelongsTo
    {
        return $this->belongsTo(TrainingEvaluationVar::class, 'evaluationVar_id', 'id');
    }

    public function trainingSchedule(): BelongsTo
    {
        return $this->belongsTo(TrainingSchedule::class, 'trainingSchedule_id', 'id');
    }
}
