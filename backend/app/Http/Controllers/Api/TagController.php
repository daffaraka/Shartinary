<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Support\Facades\Cache;

class TagController extends Controller
{
    /**
     * Display a listing of tags.
     * Cached for 24 hours for performance.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $tags = Cache::remember('tags', 86400, function () {
            return Tag::all();
        });

        return response()->json([
            'success' => true,
            'data' => $tags,
            'message' => 'Tags retrieved successfully',
        ]);
    }
}
