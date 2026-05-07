<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $countries = [
            [
                'name' => 'Indonesia',
                'slug' => 'indonesia',
                'iso_code' => 'ID',
            ],
            [
                'name' => 'Singapore',
                'slug' => 'singapore',
                'iso_code' => 'SG',
            ],
            [
                'name' => 'Malaysia',
                'slug' => 'malaysia',
                'iso_code' => 'MY',
            ],
            [
                'name' => 'Thailand',
                'slug' => 'thailand',
                'iso_code' => 'TH',
            ],
            [
                'name' => 'Vietnam',
                'slug' => 'vietnam',
                'iso_code' => 'VN',
            ],
        ];

        foreach ($countries as $country) {
            Country::firstOrCreate(
                ['iso_code' => $country['iso_code']],
                $country
            );
        }
    }
}
