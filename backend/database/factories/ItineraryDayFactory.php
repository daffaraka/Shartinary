<?php

namespace Database\Factories;

use App\Models\Itinerary;
use App\Models\ItineraryDay;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ItineraryDay>
 */
class ItineraryDayFactory extends Factory
{
    protected $model = ItineraryDay::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'itinerary_id' => Itinerary::factory(),
            'day_number' => 1,
            'theme' => $this->faker->sentence(3),
        ];
    }
}
