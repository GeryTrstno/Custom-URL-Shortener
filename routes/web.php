<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\LinkController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/shortener', [LinkController::class, 'index'])->name('shortener');

    Route::post('/links', [LinkController::class, 'store'])->name('links.store');
});

Route::get('/{code}', [LinkController::class, 'shortenLink'])->name('links.redirect');

require __DIR__.'/settings.php';
