<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Itinerary;
use Illuminate\Http\Request;

class ItineraryController extends Controller
{
    public function index()
    {
        $itineraries = Itinerary::with(['user', 'city'])->latest()->paginate(10);
        return response()->json($itineraries);
    }

    public function show($id)
    {
        $itinerary = Itinerary::with(['user', 'city', 'days.items.place'])->findOrFail($id);
        return response()->json($itinerary);
    }

    public function destroy($id)
    {
        $itinerary = Itinerary::findOrFail($id);
        $itinerary->delete();

        return response()->json([
            'success' => true,
            'message' => 'Itinerary berhasil dihapus'
        ]);
    }

    public function toggleVisibility($id)
    {
        $itinerary = Itinerary::findOrFail($id);
        $itinerary->is_public = !$itinerary->is_public;
        $itinerary->save();

        return response()->json([
            'success' => true,
            'message' => 'Visibilitas itinerary berhasil diubah',
            'is_public' => $itinerary->is_public
        ]);
    }
}
