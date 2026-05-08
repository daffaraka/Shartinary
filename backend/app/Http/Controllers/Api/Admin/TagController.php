<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;

class TagController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:tags,name',
        ]);

        $tag = Tag::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        Cache::forget('tags');

        return response()->json([
            'success' => true,
            'data' => $tag,
            'message' => 'Tag created successfully'
        ], 201);
    }

    public function update(Request $request, Tag $tag)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:tags,name,' . $tag->id,
        ]);

        $tag->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        Cache::forget('tags');

        return response()->json([
            'success' => true,
            'data' => $tag,
            'message' => 'Tag updated successfully'
        ]);
    }

    public function destroy(Tag $tag)
    {
        $tag->delete();
        Cache::forget('tags');

        return response()->json([
            'success' => true,
            'message' => 'Tag deleted successfully'
        ]);
    }
}
