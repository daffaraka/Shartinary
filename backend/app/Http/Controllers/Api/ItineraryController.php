<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Itinerary;
use Illuminate\Http\Request;

class ItineraryController extends Controller
{
    public function index(Request $request)
    {
        $query = Itinerary::with(['user', 'city', 'days.items.place'])
            ->where('is_public', true);

        if ($request->has('city_id')) {
            $query->where('city_id', $request->city_id);
        }

        if ($request->has('query')) {
            $searchTerm = $request->query('query');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('description', 'LIKE', "%{$searchTerm}%");
            });
        }

        $itineraries = $query->latest()->paginate(10);

        return response()->json($itineraries);
    }

    public function show($id)
    {
        $itinerary = Itinerary::with([
            'user', 
            'city', 
            'days' => function($q) {
                $q->orderBy('day_number', 'asc');
            },
            'days.items' => function($q) {
                $q->orderBy('order', 'asc');
            },
            'days.items.place.category'
        ])->findOrFail($id);

        return response()->json($itinerary);
    }
}
