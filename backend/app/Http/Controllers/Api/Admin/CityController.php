<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CityController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'province_id' => 'required|exists:provinces,id',
            'name' => 'required|string',
        ]);

        $city = City::create([
            'province_id' => $request->province_id,
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return response()->json([
            'message' => 'Kota berhasil ditambahkan',
            'data' => $city
        ], 210);
    }

    public function update(Request $request, City $city)
    {
        $request->validate([
            'province_id' => 'required|exists:provinces,id',
            'name' => 'required|string',
        ]);

        $city->update([
            'province_id' => $request->province_id,
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return response()->json([
            'message' => 'Kota berhasil diperbarui',
            'data' => $city
        ]);
    }

    public function destroy(City $city)
    {
        $city->delete();
        return response()->json([
            'message' => 'Kota berhasil dihapus'
        ]);
    }
}
