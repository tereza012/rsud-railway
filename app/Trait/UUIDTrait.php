<?php

namespace App\Trait;

use Ramsey\Uuid\Uuid;

trait UUIDTrait
{
    /**
     * Boot function from Laravel.
     */
    protected static function bootUuid7Trait()
    {
        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Uuid::uuid7(); // Menghasilkan UUIDv7
            }
        });
    }

    /**
     * Set tipe kunci utama ke string.
     */
    public function getIncrementing()
    {
        return false;
    }

    /**
     * Set tipe kunci utama ke string.
     */
    public function getKeyType()
    {
        return 'string';
    }
}
