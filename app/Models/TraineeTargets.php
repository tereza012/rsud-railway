<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TraineeTargets extends Model
{
    use HasFactory;

    protected $table = 'trainee_targets';
    protected $fillable = [
        'target_type',
        'training_id',
    ];

    public function training(): belongsTo
    {
        return $this->belongsTo(Training::class, 'training_id', 'id');
    }
}
