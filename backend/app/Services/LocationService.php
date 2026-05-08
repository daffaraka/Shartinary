<?php

namespace App\Services;

use App\Models\Country;
use App\Models\Province;
use App\Models\City;

class LocationService
{
    /**
     * Get all countries.
     */
    public function getAllCountries()
    {
        return Country::all();
    }

    /**
     * Get provinces by country ID.
     */
    public function getProvincesByCountryId(int $countryId)
    {
        return Province::where('country_id', $countryId)->get();
    }

    /**
     * Get cities by province ID.
     */
    public function getCitiesByProvinceId(int $provinceId)
    {
        return City::where('province_id', $provinceId)->get();
    }
    /**
     * Get cities by country ID.
     */
    public function getCitiesByCountryId(int $countryId)
    {
        return City::whereHas('province', function($query) use ($countryId) {
            $query->where('country_id', $countryId);
        })->get();
    }
}
