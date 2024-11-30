<?php

use App\Http\Controllers\Feature1Controller;
use App\Http\Controllers\Feature2Controller;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use App\Models\Feature;
use App\Models\Transaction;
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

Route::get('/purchase',[PackageController::class,'index'])->name('purchase');
Route::post('/upgrade/{package}',[TransactionController::class,'purchase'])->name('purchase.package');
Route::get('/success', [TransactionController::class,'success'])->name('purchase.success');
Route::get('/failed', [TransactionController::class,'failed'])->name('purchase.failed');
require __DIR__.'/auth.php';
