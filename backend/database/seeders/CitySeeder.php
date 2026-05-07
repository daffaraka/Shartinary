<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Province;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cities = [
            // Indonesia - DKI Jakarta
            [
                'province_id' => Province::where('slug', 'dki-jakarta')->first()?->id,
                'name' => 'Jakarta',
                'slug' => 'jakarta',
            ],
            // Indonesia - Jawa Barat
            [
                'province_id' => Province::where('slug', 'jawa-barat')->first()?->id,
                'name' => 'Bandung',
                'slug' => 'bandung',
            ],
            // Indonesia - Bali
            [
                'province_id' => Province::where('slug', 'bali')->first()?->id,
                'name' => 'Bali',
                'slug' => 'bali',
            ],
            // Indonesia - DIY Yogyakarta
            [
                'province_id' => Province::where('slug', 'diy-yogyakarta')->first()?->id,
                'name' => 'Yogyakarta',
                'slug' => 'yogyakarta',
            ],
            // Malaysia - Kuala Lumpur
            [
                'province_id' => Province::where('slug', 'kuala-lumpur')->first()?->id,
                'name' => 'Kuala Lumpur',
                'slug' => 'kuala-lumpur',
            ],
            // Thailand - Bangkok
            [
                'province_id' => Province::where('slug', 'bangkok')->first()?->id,
                'name' => 'Bangkok',
                'slug' => 'bangkok',
            ],
            // Singapore - Create province first if needed
            [
                'province_id' => Province::firstOrCreate(
                    ['slug' => 'singapore'],
                    ['country_id' => 2, 'name' => 'Singapore', 'slug' => 'singapore']
                )->id,
                'name' => 'Singapore',
                'slug' => 'singapore',
            ],
        ];

        foreach ($cities as $city) {
            if ($city['province_id']) {
                City::firstOrCreate(
                    ['slug' => $city['slug']],
                    $city
                );
            }
        }
    }
}
