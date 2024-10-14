<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TrainingSchedule extends Model
{
    use HasFactory;

    protected $table = 'training_schedule';

    protected $fillable = [
        'training_id',
        'materi_name',
        'desc_schedule',
        'start_at',
        'end_at',
    ];

    public function training(): belongsTo
    {
        return $this->belongsTo(Training::class, 'training_id', 'id');
    }

    public function evaluationValue(): hasMany
    {
        return $this->hasMany(EvaluationValue::class, 'trainingSchedule_id', 'id');
    }
}
