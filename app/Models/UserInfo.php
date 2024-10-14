<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UserInfo extends Model
{
    use HasFactory;

    protected $table = 'user_info';
    protected $fillable = [
        'users_id',
        'gender',
        'nip',
        'employee_position',
        'institution',
        'employee_status',
        'last_education',
        'profile_picture',
        'npwp',
        'bank_number',
        'bank_name',
        'owner_name',
        'golongan',
        'nakes_type',
        'residence_address',
        'province',
        'regency',
    ];

    public function user(): belongsTo
    {
        return $this->belongsTo(User::class, 'users_id', 'id');
    }
}
