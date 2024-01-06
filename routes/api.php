<?php

use App\Models\Recipie;
use App\Models\SavedRecipie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

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


    Route::post('/save', function (Request $request) {
        $validatedData = $request -> validate([
            'id' => 'integer|required',
            'email' => 'email|required'
        ]);
        Log::alert($validatedData['email']);

        $data = [
            'u_email' => $validatedData['email'],
            'recipie_id' => $validatedData['id']
        ];

        //Use insert_or_update so it'll not save the same item twice
        $saved_recipie = DB::table('saved_recipies') -> insertOrIgnore($data);

        if($saved_recipie) {
            return redirect() -> back();
        }
    }) -> name('recipie.save');

    Route::post('/delete-saved-recipie', function (Request $request) {
        $val = $request -> validate(['id' => 'integer|required']);

        $saved_recipie = SavedRecipie::find($val['id']);

        if($saved_recipie -> delete()) {
            Log::debug('noice');
            return redirect() -> back();
        }
    }) -> name('delete-saved');

    Route::post('/create-recipie', function (Request $request) {
        $validatedData = $request -> validate([
            'title' => 'required|string',
            'description' => 'required|min:200',
            'ingredients' => 'required',
            'instructions' => 'required',

        ]);

        Log::debug('nahice');

        //UPLOAD a list of files if they exist and add their urls to an array that will be eventually inserted to the table
        $uploaded_files = [];
        $files = $request -> file('files');

        if(is_array($files)) {
            foreach($files as $file) {
                $f = Storage::putFile('public/recipe-photos', $file);
                array_push($uploaded_files, asset(Storage::url($f)));
            }
        } else {
            //add the only file to uploaded_files
            array_push($uploaded_files, asset(Storage::url(Storage::putFile('public/recipe-photos', $files))));
        }
        $uploaded_files = json_encode([
            'urls' => $uploaded_files
        ]);

        $data = [
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'ingredients' => $validatedData['ingredients'],
            'cooking_plan' => $validatedData['instructions'],
            'owner_email' => Auth::user() -> email,
            'images_url' => $uploaded_files
        ];

        $recipie = new Recipie($data);

        if($recipie -> save()) {
            return redirect() -> back();
        }
    }) -> name('recipie.create');

});
