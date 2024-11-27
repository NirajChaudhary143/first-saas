<?php

use App\Http\Controllers\Feature1Controller;
use App\Http\Controllers\Feature2Controller;
use App\Http\Controllers\ProfileController;
use App\Models\Feature;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/feature1',[Feature1Controller::class,'index'])->name('feature1.index');
Route::post('/addition',[Feature1Controller::class,'calculate'])->name('feature1.addition');

Route::get('/feature2',[Feature2Controller::class,'index'])->name('feature2.index');
Route::post('/subs',[Feature2Controller::class,'calculate'])->name('feature2.substraction');
require __DIR__.'/auth.php';
