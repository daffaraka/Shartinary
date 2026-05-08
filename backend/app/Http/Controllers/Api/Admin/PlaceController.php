<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Place;
use App\Http\Resources\PlaceResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PlaceController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'address'     => 'required|string',
            'latitude'    => 'nullable|numeric',
            'longitude'   => 'nullable|numeric',
            'category_id' => 'required|exists:categories,id',
            'city_id'     => 'required|exists:cities,id',
            'image'       => 'nullable|image|max:2048', // Max 2MB
            'tags'        => 'nullable|array',
            'tags.*'      => 'exists:tags,id'
        ]);

        $data = $request->only([
            'name', 'description', 'address', 'latitude', 'longitude', 'category_id', 'city_id'
        ]);
        
        $data['slug'] = Str::slug($request->name) . '-' . Str::random(5);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('places', 'public');
            $data['image'] = Storage::url($path);
        }

        $place = Place::create($data);

        if ($request->tags) {
            $place->tags()->sync($request->tags);
        }

        return new PlaceResource($place->load('category', 'tags', 'city.province.country'));
    }

    public function update(Request $request, Place $place)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'address'     => 'required|string',
            'latitude'    => 'nullable|numeric',
            'longitude'   => 'nullable|numeric',
            'category_id' => 'required|exists:categories,id',
            'city_id'     => 'required|exists:cities,id',
            'image'       => 'nullable|image|max:2048',
            'tags'        => 'nullable|array',
            'tags.*'      => 'exists:tags,id'
        ]);

        $data = $request->only([
            'name', 'description', 'address', 'latitude', 'longitude', 'category_id', 'city_id'
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($place->image) {
                $oldPath = str_replace('/storage/', '', $place->image);
                Storage::disk('public')->delete($oldPath);
            }
            
            $path = $request->file('image')->store('places', 'public');
            $data['image'] = Storage::url($path);
        }

        $place->update($data);

        if ($request->has('tags')) {
            $place->tags()->sync($request->tags);
        }

        return new PlaceResource($place->load('category', 'tags', 'city.province.country'));
    }

    public function destroy(Place $place)
    {
        // Delete image from storage
        if ($place->image) {
            $oldPath = str_replace('/storage/', '', $place->image);
            Storage::disk('public')->delete($oldPath);
        }

        $place->delete();

        return response()->json([
            'success' => true,
            'message' => 'Place deleted successfully'
        ]);
    }
}
