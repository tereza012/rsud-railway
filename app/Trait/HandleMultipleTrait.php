<?php

namespace App\Trait;

use Illuminate\Database\Eloquent\Model;

trait HandleMultipleTrait
{
    /**
     * Handle update for multiple items
     *
     * @param Model $training
     * @param array $newItems
     * @param string $id
     * @param string $relation
     * @return bool
     */
    public static function handleUpdate(Model $training, array $newItems, string $id, string $relation): bool
    {
        $isUpdate = false;

        $newIds = array_filter(array_column($newItems, $id));

        // Remove that are no longer in the list
        $remove = $training->$relation()->whereNotIn('id', $newIds)->delete();
        if ($remove > 0) {
            $isUpdate = true; // Mark as updated if any competences were removed
        }

        // Update or create
        foreach ($newItems as $newItem) {
            $updated = $training->$relation()->updateOrCreate(
                ['id' => $newItem[$id] ?? null],
                $newItem
            );
            if ($updated->wasRecentlyCreated || $updated->wasChanged()) {
                $isUpdate = true; // Mark as updated if any competence was created or updated
            }
        }

        return $isUpdate;
    }

    /**
     * Delete related items if they not implemented cascade on delete
     *
     * @param $existingItems
     * @param string $idKey
     */
    public static function deleteRelatedItems($existingItems, string $idKey): void
    {
        $existingIds = $existingItems->pluck($idKey)->toArray();

        foreach ($existingIds as $id) {
            $existingItems->where($idKey, $id)->delete();
        }
    }
}
