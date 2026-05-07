<?php

use App\Http\Controllers\Api\AuthController;
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
