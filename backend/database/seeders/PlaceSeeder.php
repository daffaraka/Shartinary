<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\City;
use App\Models\Place;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get categories and tags
        $kuliner = Category::where('slug', 'kuliner')->first();
        $hiburan = Category::where('slug', 'hiburan')->first();
        $alam = Category::where('slug', 'alam')->first();
        $budaya = Category::where('slug', 'budaya')->first();
        $belanja = Category::where('slug', 'belanja')->first();
        $relaksasi = Category::where('slug', 'relaksasi')->first();
        $fotografi = Category::where('slug', 'fotografi')->first();

        $tagsMap = Tag::all()->keyBy('slug');

        // Get cities
        $jakarta = City::where('name', 'Jakarta')->first();
        $bandung = City::where('name', 'Bandung')->first();
        $bali = City::where('name', 'Bali')->first();
        $yogyakarta = City::where('name', 'Yogyakarta')->first();
        $singapore = City::where('name', 'Singapore')->first();
        $bangkok = City::where('name', 'Bangkok')->first();
        $kualaLumpur = City::where('name', 'Kuala Lumpur')->first();

        // Jakarta Places
        if ($jakarta) {
            $places = [
                [
                    'name' => 'Soto Ayam Borobudur',
                    'address' => 'Jl. Sabang No. 35, Jakarta Pusat',
                    'latitude' => -6.1944,
                    'longitude' => 106.8229,
                    'category_id' => $kuliner->id,
                    'tags' => ['halal', 'hemat', 'local-favorite'],
                ],
                [
                    'name' => 'Kafe Betawi',
                    'address' => 'Jl. Pecenongan No. 12, Jakarta Pusat',
                    'latitude' => -6.1750,
                    'longitude' => 106.8200,
                    'category_id' => $kuliner->id,
                    'tags' => ['halal', 'family-friendly', 'local-favorite'],
                ],
                [
                    'name' => 'Taman Mini Indonesia Indah',
                    'address' => 'Jl. Taman Mini, Jakarta Timur',
                    'latitude' => -6.2744,
                    'longitude' => 106.8944,
                    'category_id' => $budaya->id,
                    'tags' => ['family-friendly', 'instagrammable', 'trending'],
                ],
                [
                    'name' => 'Grand Indonesia',
                    'address' => 'Jl. M.H. Thamrin No. 1, Jakarta Pusat',
                    'latitude' => -6.1944,
                    'longitude' => 106.8229,
                    'category_id' => $belanja->id,
                    'tags' => ['luxury', 'family-friendly', 'trending'],
                ],
                [
                    'name' => 'Kota Tua Jakarta',
                    'address' => 'Jl. Tol Pondok Indah, Jakarta Selatan',
                    'latitude' => -6.1356,
                    'longitude' => 106.8065,
                    'category_id' => $fotografi->id,
                    'tags' => ['instagrammable', 'hidden-gem', 'trending'],
                ],
            ];

            foreach ($places as $placeData) {
                $tags = $placeData['tags'];
                unset($placeData['tags']);
                $placeData['city_id'] = $jakarta->id;

                $place = Place::firstOrCreate(
                    ['name' => $placeData['name'], 'city_id' => $jakarta->id],
                    $placeData
                );

                $tagIds = collect($tags)->map(fn($slug) => $tagsMap[$slug]->id)->toArray();
                $place->tags()->sync($tagIds);
            }
        }

        // Bandung Places
        if ($bandung) {
            $places = [
                [
                    'name' => 'Tangkuban Perahu',
                    'address' => 'Jl. Raya Tangkuban Perahu, Bandung',
                    'latitude' => -6.7753,
                    'longitude' => 107.6050,
                    'category_id' => $alam->id,
                    'tags' => ['adventurous', 'instagrammable', 'family-friendly'],
                ],
                [
                    'name' => 'Kawah Putih',
                    'address' => 'Jl. Raya Ciwidey, Bandung',
                    'latitude' => -7.1694,
                    'longitude' => 107.3556,
                    'category_id' => $fotografi->id,
                    'tags' => ['instagrammable', 'trending', 'gen-z'],
                ],
                [
                    'name' => 'Dusun Bambu',
                    'address' => 'Jl. Kolonel Masturi No. 516, Bandung',
                    'latitude' => -6.8944,
                    'longitude' => 107.6556,
                    'category_id' => $relaksasi->id,
                    'tags' => ['family-friendly', 'instagrammable', 'romantic'],
                ],
                [
                    'name' => 'Pasar Baru Bandung',
                    'address' => 'Jl. Pasar Baru, Bandung',
                    'latitude' => -6.9147,
                    'longitude' => 107.6050,
                    'category_id' => $belanja->id,
                    'tags' => ['hemat', 'local-favorite', 'trending'],
                ],
            ];

            foreach ($places as $placeData) {
                $tags = $placeData['tags'];
                unset($placeData['tags']);
                $placeData['city_id'] = $bandung->id;

                $place = Place::firstOrCreate(
                    ['name' => $placeData['name'], 'city_id' => $bandung->id],
                    $placeData
                );

                $tagIds = collect($tags)->map(fn($slug) => $tagsMap[$slug]->id)->toArray();
                $place->tags()->sync($tagIds);
            }
        }

        // Bali Places
        if ($bali) {
            $places = [
                [
                    'name' => 'Pura Tanah Lot',
                    'address' => 'Jl. Raya Tanah Lot, Bali',
                    'latitude' => -8.6269,
                    'longitude' => 115.4281,
                    'category_id' => $budaya->id,
                    'tags' => ['instagrammable', 'romantic', 'trending'],
                ],
                [
                    'name' => 'Ubud Monkey Forest',
                    'address' => 'Jl. Monkey Forest, Ubud, Bali',
                    'latitude' => -8.5069,
                    'longitude' => 115.2625,
                    'category_id' => $alam->id,
                    'tags' => ['family-friendly', 'adventurous', 'trending'],
                ],
                [
                    'name' => 'Tegallalang Rice Terrace',
                    'address' => 'Jl. Raya Tegallalang, Ubud, Bali',
                    'latitude' => -8.4269,
                    'longitude' => 115.2625,
                    'category_id' => $fotografi->id,
                    'tags' => ['instagrammable', 'romantic', 'gen-z'],
                ],
                [
                    'name' => 'Warung Biah',
                    'address' => 'Jl. Raya Ubud, Bali',
                    'latitude' => -8.5069,
                    'longitude' => 115.2625,
                    'category_id' => $kuliner->id,
                    'tags' => ['vegetarian', 'vegan', 'instagrammable'],
                ],
                [
                    'name' => 'Spa Bali',
                    'address' => 'Jl. Raya Seminyak, Bali',
                    'latitude' => -8.6900,
                    'longitude' => 115.1700,
                    'category_id' => $relaksasi->id,
                    'tags' => ['luxury', 'romantic', 'family-friendly'],
                ],
            ];

            foreach ($places as $placeData) {
                $tags = $placeData['tags'];
                unset($placeData['tags']);
                $placeData['city_id'] = $bali->id;

                $place = Place::firstOrCreate(
                    ['name' => $placeData['name'], 'city_id' => $bali->id],
                    $placeData
                );

                $tagIds = collect($tags)->map(fn($slug) => $tagsMap[$slug]->id)->toArray();
                $place->tags()->sync($tagIds);
            }
        }

        // Singapore Places
        if ($singapore) {
            $places = [
                [
                    'name' => 'Marina Bay Sands',
                    'address' => '10 Bayfront Avenue, Singapore',
                    'latitude' => 1.2830,
                    'longitude' => 103.8607,
                    'category_id' => $hiburan->id,
                    'tags' => ['luxury', 'instagrammable', 'trending'],
                ],
                [
                    'name' => 'Gardens by the Bay',
                    'address' => '18 Marina Gardens Drive, Singapore',
                    'latitude' => 1.2816,
                    'longitude' => 103.8636,
                    'category_id' => $alam->id,
                    'tags' => ['family-friendly', 'instagrammable', 'romantic'],
                ],
                [
                    'name' => 'Orchard Road',
                    'address' => 'Orchard Road, Singapore',
                    'latitude' => 1.3044,
                    'longitude' => 103.8329,
                    'category_id' => $belanja->id,
                    'tags' => ['luxury', 'trending', 'family-friendly'],
                ],
                [
                    'name' => 'Hawker Chan',
                    'address' => '1 Momo Lane, Singapore',
                    'latitude' => 1.2830,
                    'longitude' => 103.8607,
                    'category_id' => $kuliner->id,
                    'tags' => ['hemat', 'local-favorite', 'halal'],
                ],
            ];

            foreach ($places as $placeData) {
                $tags = $placeData['tags'];
                unset($placeData['tags']);
                $placeData['city_id'] = $singapore->id;

                $place = Place::firstOrCreate(
                    ['name' => $placeData['name'], 'city_id' => $singapore->id],
                    $placeData
                );

                $tagIds = collect($tags)->map(fn($slug) => $tagsMap[$slug]->id)->toArray();
                $place->tags()->sync($tagIds);
            }
        }

        // Bangkok Places
        if ($bangkok) {
            $places = [
                [
                    'name' => 'Grand Palace',
                    'address' => 'Na Phra Lan Road, Bangkok',
                    'latitude' => 13.6515,
                    'longitude' => 100.4925,
                    'category_id' => $budaya->id,
                    'tags' => ['instagrammable', 'family-friendly', 'trending'],
                ],
                [
                    'name' => 'Wat Pho',
                    'address' => '2 Sanam Chai Road, Bangkok',
                    'latitude' => 13.6461,
                    'longitude' => 100.4925,
                    'category_id' => $budaya->id,
                    'tags' => ['family-friendly', 'romantic', 'local-favorite'],
                ],
                [
                    'name' => 'Floating Market',
                    'address' => 'Damnoen Saduak, Bangkok',
                    'latitude' => 13.3475,
                    'longitude' => 99.9297,
                    'category_id' => $kuliner->id,
                    'tags' => ['instagrammable', 'adventurous', 'trending'],
                ],
                [
                    'name' => 'Chatuchak Weekend Market',
                    'address' => 'Chatuchak, Bangkok',
                    'latitude' => 13.8000,
                    'longitude' => 100.5500,
                    'category_id' => $belanja->id,
                    'tags' => ['hemat', 'trending', 'family-friendly'],
                ],
            ];

            foreach ($places as $placeData) {
                $tags = $placeData['tags'];
                unset($placeData['tags']);
                $placeData['city_id'] = $bangkok->id;

                $place = Place::firstOrCreate(
                    ['name' => $placeData['name'], 'city_id' => $bangkok->id],
                    $placeData
                );

                $tagIds = collect($tags)->map(fn($slug) => $tagsMap[$slug]->id)->toArray();
                $place->tags()->sync($tagIds);
            }
        }

        // Kuala Lumpur Places
        if ($kualaLumpur) {
            $places = [
                [
                    'name' => 'Petronas Twin Towers',
                    'address' => 'Kuala Lumpur City Centre, Kuala Lumpur',
                    'latitude' => 3.1578,
                    'longitude' => 101.7123,
                    'category_id' => $fotografi->id,
                    'tags' => ['instagrammable', 'trending', 'family-friendly'],
                ],
                [
                    'name' => 'Batu Caves',
                    'address' => 'Gombak, Kuala Lumpur',
                    'latitude' => 3.2426,
                    'longitude' => 101.6869,
                    'category_id' => $alam->id,
                    'tags' => ['adventurous', 'family-friendly', 'instagrammable'],
                ],
                [
                    'name' => 'Central Market',
                    'address' => 'Jalan Hang Kasturi, Kuala Lumpur',
                    'latitude' => 3.1444,
                    'longitude' => 101.6944,
                    'category_id' => $belanja->id,
                    'tags' => ['hemat', 'local-favorite', 'trending'],
                ],
                [
                    'name' => 'Nasi Lemak Wanjo',
                    'address' => 'Jalan Alor, Kuala Lumpur',
                    'latitude' => 3.1444,
                    'longitude' => 101.6944,
                    'category_id' => $kuliner->id,
                    'tags' => ['halal', 'hemat', 'local-favorite'],
                ],
            ];

            foreach ($places as $placeData) {
                $tags = $placeData['tags'];
                unset($placeData['tags']);
                $placeData['city_id'] = $kualaLumpur->id;

                $place = Place::firstOrCreate(
                    ['name' => $placeData['name'], 'city_id' => $kualaLumpur->id],
                    $placeData
                );

                $tagIds = collect($tags)->map(fn($slug) => $tagsMap[$slug]->id)->toArray();
                $place->tags()->sync($tagIds);
            }
        }
    }
}
