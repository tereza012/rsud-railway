<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Files extends Model
{
    use HasFactory;

    protected $table = 'files';
    protected $fillable = [
        'training_id',
        'userInfo_id',
        'files',
        'file_type',
        'is_deleted',
        'deleted_at',
    ];

    public function user(): belongsTo
    {
        return $this->belongsTo(User::class, 'users_id', 'id');
    }

    public function training(): belongsTo
    {
        return $this->belongsTo(Training::class, 'training_id', 'id');
    }
}
