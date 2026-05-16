<?php

namespace Database\Seeders;

use App\Models\Itinerary;
use App\Models\ItineraryDay;
use App\Models\ItineraryItem;
use App\Models\Place;
use App\Models\User;
use App\Models\City;
use Illuminate\Database\Seeder;

class ItinerarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $cities = City::all();
        
        if ($users->isEmpty() || $cities->isEmpty()) {
            return;
        }

        // Buat 5 Itinerary Contoh
        foreach (range(1, 5) as $i) {
            $city = $cities->random();
            $duration = rand(2, 4);
            
            $itinerary = Itinerary::factory()->create([
                'user_id' => $users->random()->id,
                'city_id' => $city->id,
                'duration_days' => $duration,
            ]);

            // Buat Days untuk setiap Itinerary
            foreach (range(1, $duration) as $dayNum) {
                $day = ItineraryDay::factory()->create([
                    'itinerary_id' => $itinerary->id,
                    'day_number' => $dayNum,
                    'theme' => "Eksplorasi Hari ke-$dayNum di " . $city->name,
                ]);

                // Buat 3-5 Items untuk setiap Day
                $places = Place::where('city_id', $city->id)->inRandomOrder()->limit(5)->get();
                
                // Jika tidak ada place di kota tersebut, ambil random dari mana saja
                if ($places->isEmpty()) {
                    $places = Place::inRandomOrder()->limit(5)->get();
                }

                foreach ($places as $index => $place) {
                    ItineraryItem::factory()->create([
                        'itinerary_day_id' => $day->id,
                        'place_id' => $place->id,
                        'order' => $index + 1,
                        'time_start' => sprintf('%02d:00:00', 8 + ($index * 3)),
                        'time_end' => sprintf('%02d:00:00', 10 + ($index * 3)),
                    ]);
                }
            }
        }
    }
}
