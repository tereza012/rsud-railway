<?php

namespace App\Providers\Services\Admin;

use App\Models\Trainee;
use Illuminate\Support\Facades\DB;

class TraineeService
{
    public function update($request, $id): bool
    {
        try {
            DB::beginTransaction();

            $trainee = Trainee::with('training')->lockForUpdate()->findOrFail($id);
            $data = array_diff_assoc($request->all(), $trainee->toArray());

            if ($trainee->training->capacity > 0) {
                $trainee->training->decrement('capacity');

            } else {
                DB::rollBack();
                return false;
            }

            if (!empty($data)) {
                $trainee->update($data);
            }

            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }
}
