<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PlaceResource;
use App\Models\Place;
use Illuminate\Http\Request;

class PlaceController extends Controller
{
    /**
     * Display a listing of places with filters.
     *
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $query = Place::with('category', 'tags', 'city.province.country');

        // Filter by city
        if ($request->city_id) {
            $query->where('city_id', $request->city_id);
        }

        // Filter by category slug
        if ($request->category_slug) {
            $query->whereHas('category', function ($q) {
                $q->where('slug', request('category_slug'));
            });
        }

        // Search by name or address
        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%");
            });
        }

        // Filter by tags (comma-separated)
        if ($request->tags) {
            $tags = explode(',', $request->tags);
            $query->whereHas('tags', function ($q) use ($tags) {
                $q->whereIn('slug', $tags);
            }, '>=', count($tags)); // All tags must match
        }

        // Pagination
        $perPage = $request->per_page ?? 15;
        $places = $query->paginate($perPage);

        return PlaceResource::collection($places);
    }

    /**
     * Display a specific place.
     *
     * @param Place $place
     * @return PlaceResource
     */
    public function show(Place $place)
    {
        $place->load('category', 'tags', 'city.province.country');
        return new PlaceResource($place);
    }

    /**
     * Get places by city.
     *
     * @param int $cityId
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function byCity($cityId, Request $request)
    {
        $query = Place::where('city_id', $cityId)
            ->with('category', 'tags', 'city');

        // Filter by category
        if ($request->category_slug) {
            $query->whereHas('category', function ($q) {
                $q->where('slug', request('category_slug'));
            });
        }

        // Filter by tags
        if ($request->tags) {
            $tags = explode(',', $request->tags);
            $query->whereHas('tags', function ($q) use ($tags) {
                $q->whereIn('slug', $tags);
            });
        }

        $places = $query->paginate($request->per_page ?? 15);

        return PlaceResource::collection($places);
    }

    /**
     * Get places by category.
     *
     * @param string $categorySlug
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function byCategory($categorySlug, Request $request)
    {
        $query = Place::whereHas('category', function ($q) use ($categorySlug) {
            $q->where('slug', $categorySlug);
        })->with('category', 'tags', 'city');

        // Filter by city
        if ($request->city_id) {
            $query->where('city_id', $request->city_id);
        }

        // Search
        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%");
            });
        }

        $places = $query->paginate($request->per_page ?? 15);

        return PlaceResource::collection($places);
    }

    /**
     * Get places by tag.
     *
     * @param string $tagSlug
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function byTag($tagSlug, Request $request)
    {
        $query = Place::whereHas('tags', function ($q) use ($tagSlug) {
            $q->where('slug', $tagSlug);
        })->with('category', 'tags', 'city');

        // Filter by city
        if ($request->city_id) {
            $query->where('city_id', $request->city_id);
        }

        // Filter by category
        if ($request->category_slug) {
            $query->whereHas('category', function ($q) {
                $q->where('slug', request('category_slug'));
            });
        }

        $places = $query->paginate($request->per_page ?? 15);

        return PlaceResource::collection($places);
    }

    /**
     * Search places by name or address.
     *
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function search(Request $request)
    {
        $request->validate([
            'q' => 'required|string|min:2',
        ]);

        $query = Place::where(function ($q) {
            $search = request('q');
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('address', 'like', "%{$search}%");
        })->with('category', 'tags', 'city');

        // Filter by city if provided
        if ($request->city_id) {
            $query->where('city_id', $request->city_id);
        }

        $places = $query->paginate($request->per_page ?? 15);

        return PlaceResource::collection($places);
    }

    /**
     * Get nearby places (within radius).
     *
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function nearby(Request $request)
    {
        $request->validate([
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'radius' => 'numeric|min:0.1|max:50', // in km
        ]);

        $latitude = $request->latitude;
        $longitude = $request->longitude;
        $radius = $request->radius ?? 5; // default 5 km

        // Haversine formula for distance calculation
        $query = Place::selectRaw(
            "*, (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance",
            [$latitude, $longitude, $latitude]
        )
        ->having('distance', '<=', $radius)
        ->orderBy('distance')
        ->with('category', 'tags', 'city');

        $places = $query->paginate($request->per_page ?? 15);

        return PlaceResource::collection($places);
    }
}
