<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Location\GetProvincesRequest;
use App\Http\Requests\Location\GetCitiesRequest;
use App\Http\Resources\Location\CountryResource;
use App\Http\Resources\Location\ProvinceResource;
use App\Http\Resources\Location\CityResource;
use App\Services\LocationService;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    protected $locationService;

    public function __construct(LocationService $locationService)
    {
        $this->locationService = $locationService;
    }

    /**
     * Display a listing of all countries.
     */
    public function countries()
    {
        $countries = $this->locationService->getAllCountries();
        return CountryResource::collection($countries);
    }

    /**
     * Display a listing of provinces by country_id.
     */
    public function provinces(GetProvincesRequest $request)
    {
        $provinces = $this->locationService->getProvincesByCountryId($request->country_id);
        return ProvinceResource::collection($provinces);
    }

    /**
     * Display a listing of cities by province_id.
     */
    public function cities(GetCitiesRequest $request)
    {
        $cities = $this->locationService->getCitiesByProvinceId($request->province_id);
        return CityResource::collection($cities);
    }
}
