<?php

namespace Database\Factories;

use App\Models\ItineraryDay;
use App\Models\ItineraryItem;
use App\Models\Place;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ItineraryItem>
 */
class ItineraryItemFactory extends Factory
{
    protected $model = ItineraryItem::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'itinerary_day_id' => ItineraryDay::factory(),
            'place_id' => Place::exists() ? Place::inRandomOrder()->first()->id : Place::factory(),
            'time_start' => '08:00:00',
            'time_end' => '10:00:00',
            'estimated_cost' => $this->faker->numberBetween(10000, 200000),
            'order' => 1,
            'note' => $this->faker->sentence(),
        ];
    }
}
