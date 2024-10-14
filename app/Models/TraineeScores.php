<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TraineeScores extends Model
{
    use HasFactory;

    protected $table = 'trainee_scores';
    protected $fillable = [
        'trainee_id',
        'pre_test',
        'post_test',
        'assignment',
        'score_xls',
        'is_deleted',
        'deleted_at',
    ];

    public function trainee(): belongsTo
    {
        return $this->belongsTo(Trainee::class, 'trainee_id', 'id');
    }
}
