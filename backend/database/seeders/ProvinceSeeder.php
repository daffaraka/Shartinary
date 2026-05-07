<?php

namespace Database\Seeders;

use App\Models\Country;
use App\Models\Province;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProvinceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $provinces = [
            // Indonesia
            [
                'country_id' => Country::where('iso_code', 'ID')->first()->id,
                'name' => 'DKI Jakarta',
                'slug' => 'dki-jakarta',
            ],
            [
                'country_id' => Country::where('iso_code', 'ID')->first()->id,
                'name' => 'Jawa Barat',
                'slug' => 'jawa-barat',
            ],
            [
                'country_id' => Country::where('iso_code', 'ID')->first()->id,
                'name' => 'Bali',
                'slug' => 'bali',
            ],
            [
                'country_id' => Country::where('iso_code', 'ID')->first()->id,
                'name' => 'Daerah Istimewa Yogyakarta',
                'slug' => 'diy-yogyakarta',
            ],
            // Singapore (no provinces)
            // Malaysia
            [
                'country_id' => Country::where('iso_code', 'MY')->first()->id,
                'name' => 'Kuala Lumpur',
                'slug' => 'kuala-lumpur',
            ],
            [
                'country_id' => Country::where('iso_code', 'MY')->first()->id,
                'name' => 'Selangor',
                'slug' => 'selangor',
            ],
            // Thailand
            [
                'country_id' => Country::where('iso_code', 'TH')->first()->id,
                'name' => 'Bangkok',
                'slug' => 'bangkok',
            ],
            // Vietnam
            [
                'country_id' => Country::where('iso_code', 'VN')->first()->id,
                'name' => 'Ho Chi Minh City',
                'slug' => 'ho-chi-minh-city',
            ],
        ];

        foreach ($provinces as $province) {
            Province::firstOrCreate(
                ['slug' => $province['slug']],
                $province
            );
        }
    }
}
