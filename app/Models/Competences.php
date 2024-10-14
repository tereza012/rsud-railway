<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Competences extends Model
{
    use HasFactory;

    protected $table = 'competences';
    protected $fillable = [
        "name_competences"
    ];

    public function training(): belongsTo
    {
        return $this->belongsTo(Training::class, 'training_id', 'id');
    }
}
