<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TrainingOrganizer extends Model
{
    use HasFactory;

    protected $table = 'training_organizer';
    protected $fillable = [
        'training_id',
        'users_id',
    ];


    public function training(): belongsTo
    {
        return $this->belongsTo(Training::class, 'training_id', 'id');
    }

    public function user(): belongsTo
    {
        return $this->belongsTo(User::class, 'users_id', 'id');
    }
}
