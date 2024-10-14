<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TrainingEvaluationVar extends Model
{
    use HasFactory;

    protected $table = 'training_evaluation_var';

    protected $fillable = [
        'training_id',
        'variable',
    ];

    public function training(): BelongsTo
    {
        return $this->belongsTo(Training::class, 'training_id', 'id');
    }

    public function evaluationValues(): HasMany
    {
        return $this->hasMany(EvaluationValue::class, 'evaluationVar_id', 'id');
    }
}
