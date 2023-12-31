<?php

use App\Models\Recipie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

Route::post('/create-recipie', function (Request $request) {
    $validatedData = $request -> validate([
        'title' => 'required|string',
        'description' => 'required|min:200',
        'ingredients' => 'required',
        'instructions' => 'required'
    ]);

    $data = [
        'title' => $validatedData['title'],
        'description' => $validatedData['description'],
        'ingredients' => $validatedData['ingredients'],
        'cooking_plan' => $validatedData['instructions'],
        'owner_email' => Auth::user() -> email
    ];

    $recipie = new Recipie($data);

    if($recipie -> save()) {
        return redirect() -> back();
    }
}) -> name('recipie.create');

Route::get('/save-recipie', function () {

});
