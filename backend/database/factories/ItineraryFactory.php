<?php

namespace Database\Factories;

use App\Models\City;
use App\Models\Itinerary;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Itinerary>
 */
class ItineraryFactory extends Factory
{
    protected $model = Itinerary::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(4);
        return [
            'user_id' => User::exists() ? User::inRandomOrder()->first()->id : User::factory(),
            'city_id' => City::exists() ? City::inRandomOrder()->first()->id : City::factory(),
            'parent_id' => null,
            'title' => $title,
            'slug' => Str::slug($title) . '-' . Str::random(5),
            'description' => $this->faker->paragraph(),
            'duration_days' => $this->faker->numberBetween(1, 5),
            'total_budget' => $this->faker->numberBetween(500000, 5000000),
            'is_public' => $this->faker->boolean(80),
        ];
    }
}
