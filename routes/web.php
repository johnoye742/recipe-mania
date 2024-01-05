<?php

use App\Http\Controllers\ProfileController;
use App\Models\Recipie;
use App\Models\SavedRecipie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect() -> to('/home');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/home', function () {
    $recipies = Recipie::all();
    return inertia('Home', ['user' => Auth::user(), 'recipies' => $recipies]);
}) -> name('home');

Route::get('/recipies/{id}', function ($id) {
    $recipie = Recipie::find($id);

    return inertia('RecipiePage', ['recipie' => $recipie]);
}) -> name('recipie');

Route::get('/search', function (Request $request) {
    $q = $request->get('q');
    Log::debug($q);

    $searched_recipies = [];

    if($q != null || $q != '')
    $searched_recipies = Recipie::where('title', 'like', '%' . $q . '%')
    -> orWhere('ingredients', 'like', '%'.$q.'%')
    ->get();

    return inertia('Search', ['recipies' => $searched_recipies, 'query' => $q]);
})->name('search');

Route::get('/collection', function () {
    $my_collection = DB::table('recipies') ->
    rightJoin('saved_recipies', 'saved_recipies.recipie_id', '=', 'recipies.id',)
    -> where('saved_recipies.u_email', '=', Auth::user() -> email)
    -> get(['*']);
    return inertia('Saved', ['collection' => $my_collection, 'email' => Auth::user() -> email]);
}) -> name('collection') -> middleware('auth');

Route::get('/profile/view', function () {
    return inertia('Profile/View', ['user' => Auth::user()]);
}) -> name('view-profile');

Route::get('/truncate', function () {
    $recipies = SavedRecipie::find(1);
    return 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, quia perspiciatis? Accusantium quam amet laboriosam culpa aliquid illo debitis ex dolorum vitae itaque quo necessitatibus ullam similique cupiditate, expedita facilis!';
});

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
    $files = $request -> get('files');


        foreach($files as $file) {
            $f = Storage::putFile('recipe-photos/', $file);
            array_push($uploaded_files, asset(Storage::url($f)));
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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

require __DIR__.'/api.php';
