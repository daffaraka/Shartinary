<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Province;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProvinceController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'country_id' => 'required|exists:countries,id',
            'name' => 'required|string',
        ]);

        $province = Province::create([
            'country_id' => $request->country_id,
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return response()->json([
            'message' => 'Provinsi berhasil ditambahkan',
            'data' => $province
        ], 210);
    }

    public function update(Request $request, Province $province)
    {
        $request->validate([
            'country_id' => 'required|exists:countries,id',
            'name' => 'required|string',
        ]);

        $province->update([
            'country_id' => $request->country_id,
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return response()->json([
            'message' => 'Provinsi berhasil diperbarui',
            'data' => $province
        ]);
    }

    public function destroy(Province $province)
    {
        $province->delete();
        return response()->json([
            'message' => 'Provinsi berhasil dihapus'
        ]);
    }
}
