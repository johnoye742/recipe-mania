<?php

use App\Http\Controllers\ProfileController;
use App\Models\Recipie;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
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

Route::get('/search', function () {
    return inertia('Search', []);
}) -> name('search');

Route::get('/collection', function () {
    $my_collection = Recipie::all() -> where('owner_email', Auth::user() -> email);
    return inertia('Saved', ['collection' => $my_collection]);
}) -> name('collection');

Route::get('/profile/view', function () {
    return inertia('Profile/View', ['user' => Auth::user()]);
}) -> name('view-profile');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
