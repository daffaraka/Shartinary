<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CountryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:countries,name',
            'iso_code' => 'required|string|size:2|unique:countries,iso_code',
        ]);

        $country = Country::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'iso_code' => strtoupper($request->iso_code),
        ]);

        return response()->json([
            'message' => 'Negara berhasil ditambahkan',
            'data' => $country
        ], 210);
    }

    public function update(Request $request, Country $country)
    {
        $request->validate([
            'name' => 'required|string|unique:countries,name,' . $country->id,
            'iso_code' => 'required|string|size:2|unique:countries,iso_code,' . $country->id,
        ]);

        $country->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'iso_code' => strtoupper($request->iso_code),
        ]);

        return response()->json([
            'message' => 'Negara berhasil diperbarui',
            'data' => $country
        ]);
    }

    public function destroy(Country $country)
    {
        $country->delete();
        return response()->json([
            'message' => 'Negara berhasil dihapus'
        ]);
    }
}
