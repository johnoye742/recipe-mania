<?php

use App\Models\Recipie;
use App\Models\SavedRecipie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware('auth') -> group(function () {


    Route::post('/save-recipie', function (Request $request) {
        $validatedData = $request -> validate([
            'id' => 'integer|required',
            'email' => 'email|required'
        ]);
        Log::alert($validatedData['email']);

        $data = [
            'u_email' => $validatedData['email'],
            'recipie_id' => $validatedData['id']
        ];

        $saved_recipie = new SavedRecipie($data);

        if($saved_recipie -> save()) {

            return redirect() -> back();
        }
    }) -> name('save-recipie');

    Route::post('/delete-saved-recipie', function (Request $request) {
        $val = $request -> validate(['id' => 'integer|required']);

        $saved_recipie = SavedRecipie::find($val['id']);

        if($saved_recipie -> delete()) {
            Log::debug('noice');
            return redirect() -> back();
        }
    }) -> name('delete-saved');

    
});
