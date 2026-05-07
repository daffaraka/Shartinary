<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\PlaceController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - Shartinary Backend
|--------------------------------------------------------------------------
| Semua route di sini otomatis di-prefix /api
| Auth menggunakan Laravel Sanctum (Token-based untuk React JS)
*/

// Public routes (tidak perlu login)
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);
});

// Master Lokasi (Public)
Route::get('/countries', [LocationController::class, 'countries']);
Route::get('/provinces', [LocationController::class, 'provinces']);
Route::get('/cities',    [LocationController::class, 'cities']);

// Master Data - Categories & Tags (Public)
Route::get('/categories', [\App\Http\Controllers\Api\CategoryController::class, 'index']);
Route::get('/tags', [\App\Http\Controllers\Api\TagController::class, 'index']);

// Places (Public - Read Only)
Route::prefix('places')->group(function () {
    Route::get('/', [PlaceController::class, 'index']);
    Route::get('/search', [PlaceController::class, 'search']);
    Route::get('/nearby', [PlaceController::class, 'nearby']);
    Route::get('/city/{cityId}', [PlaceController::class, 'byCity']);
    Route::get('/category/{categorySlug}', [PlaceController::class, 'byCategory']);
    Route::get('/tag/{tagSlug}', [PlaceController::class, 'byTag']);
    Route::get('/{place}', [PlaceController::class, 'show']);
});

// Protected routes (wajib login / bearer token)
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me',      [AuthController::class, 'me']);
    });

    // Admin-only routes
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        // Placeholder - akan diisi setelah fitur itinerary & user management selesai
        Route::get('/stats', function () {
            return response()->json(['message' => 'Admin area aktif.']);
        });
    });

});
