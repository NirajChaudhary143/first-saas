<?php

use App\Http\Controllers\Feature1Controller;
use App\Http\Controllers\Feature2Controller;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use App\Http\Resources\UsedFeatureResource;
use App\Models\Feature;
use App\Models\Transaction;
use App\Models\UsedFeature;
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
	$user_id = auth()->user()->id;

	$used_features = UsedFeature::query()
		->with(['feature'])
		->where('user_id', $user_id)
		->latest()
		->paginate();

	return Inertia::render('Dashboard', [
		'used_feature' => UsedFeatureResource::collection($used_features), 
	]);

})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

	Route::name('feature1.')->controller(Feature1Controller::class)->group(function () {
		Route::get('/feature1', 'index')->name('index');
		Route::post('/addition', 'calculate')->name('addition');
	});

	// Feature2Controller routes
	Route::name('feature2.')->controller(Feature2Controller::class)->group(function () {
		Route::get('/feature2', 'index')->name('index');
		Route::post('/subs', 'calculate')->name('substraction');
	});

	// PackageController routes
	Route::controller(PackageController::class)->group(function () {
		Route::get('/purchase', 'index')->name('purchase');
	});

	// TransactionController routes
	Route::name('purchase.')->controller(TransactionController::class)->group(function () {
		Route::post('/upgrade/{package}', 'purchase')->name('package');
		Route::get('/success', 'success')->name('success');
		Route::get('/failed', 'failed')->name('failed');
	});
});


require __DIR__.'/auth.php';
