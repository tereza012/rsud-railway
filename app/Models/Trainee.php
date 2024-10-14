<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Trainee extends Model
{
    use HasFactory;

    protected $table = 'trainee';
    protected $fillable = [
        'status',
        'reject_category',
        'users_id',
        'training_id',
        'evaluation',
        'rating',
    ];

    public function user(): belongsTo
    {
        return $this->belongsTo(User::class, 'users_id', 'id');
    }

    public function training(): belongsTo
    {
        return $this->belongsTo(Training::class, 'training_id', 'id');
    }

    public function traineeScores(): hasMany
    {
        return $this->hasMany(TraineeScores::class, 'trainee_id', 'id');
    }
}
