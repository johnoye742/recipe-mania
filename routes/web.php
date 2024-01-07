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
    leftJoin('saved_recipies', 'saved_recipies.recipie_id', '=', 'recipies.id',)
    -> where('saved_recipies.u_email', '=', Auth::user() -> email)
    -> get(['*']);
    return inertia('Saved', ['collection' => $my_collection, 'email' => Auth::user() -> email]);
}) -> name('collection') -> middleware('auth');

Route::get('/collection/{id}', function ($id) {
    $recipie = DB::table('saved_recipies') ->
    join('recipies', 'saved_recipies.recipie_id', '=', 'recipies.id',)
    -> where('saved_recipies.id', '=', $id)
    -> get(['*']);

    return inertia('RecipiePage', ['recipie' => $recipie[0]]);
}) -> name('collection.recipie');

Route::get('/profile/view', function () {
    return inertia('Profile/View', ['user' => Auth::user()]);
}) -> name('view-profile') -> middleware('auth');

Route::get('/truncate-recipies', function () {
    $recipies = DB::table('recipies');
    return $recipies -> truncate();
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

require __DIR__.'/api.php';
