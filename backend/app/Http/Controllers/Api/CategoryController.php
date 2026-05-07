<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Support\Facades\Cache;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories.
     * Cached for 24 hours for performance.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $categories = Cache::remember('categories', 86400, function () {
            return Category::all();
        });

        return response()->json([
            'success' => true,
            'data' => $categories,
            'message' => 'Categories retrieved successfully',
        ]);
    }
}
