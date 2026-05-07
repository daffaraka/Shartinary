<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            ['name' => 'Halal', 'slug' => 'halal'],
            ['name' => 'Vegetarian', 'slug' => 'vegetarian'],
            ['name' => 'Vegan', 'slug' => 'vegan'],
            ['name' => 'Matcha', 'slug' => 'matcha'],
            ['name' => 'Gen Z', 'slug' => 'gen-z'],
            ['name' => 'Hidden Gem', 'slug' => 'hidden-gem'],
            ['name' => 'Hemat', 'slug' => 'hemat'],
            ['name' => 'Instagrammable', 'slug' => 'instagrammable'],
            ['name' => 'Pet Friendly', 'slug' => 'pet-friendly'],
            ['name' => 'Family Friendly', 'slug' => 'family-friendly'],
            ['name' => 'Romantic', 'slug' => 'romantic'],
            ['name' => 'Adventurous', 'slug' => 'adventurous'],
            ['name' => 'Luxury', 'slug' => 'luxury'],
            ['name' => 'Budget', 'slug' => 'budget'],
            ['name' => 'Trending', 'slug' => 'trending'],
            ['name' => 'Local Favorite', 'slug' => 'local-favorite'],
        ];

        foreach ($tags as $tag) {
            Tag::firstOrCreate(
                ['slug' => $tag['slug']],
                $tag
            );
        }
    }
}
