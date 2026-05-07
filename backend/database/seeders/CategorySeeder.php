<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Kuliner',
                'slug' => 'kuliner',
                'icon' => '🍽️',
                'color' => 'orange',
            ],
            [
                'name' => 'Hiburan',
                'slug' => 'hiburan',
                'icon' => '🎭',
                'color' => 'purple',
            ],
            [
                'name' => 'Alam',
                'slug' => 'alam',
                'icon' => '🏞️',
                'color' => 'green',
            ],
            [
                'name' => 'Budaya',
                'slug' => 'budaya',
                'icon' => '🏛️',
                'color' => 'amber',
            ],
            [
                'name' => 'Belanja',
                'slug' => 'belanja',
                'icon' => '🛍️',
                'color' => 'pink',
            ],
            [
                'name' => 'Olahraga',
                'slug' => 'olahraga',
                'icon' => '⚽',
                'color' => 'blue',
            ],
            [
                'name' => 'Relaksasi',
                'slug' => 'relaksasi',
                'icon' => '🧘',
                'color' => 'cyan',
            ],
            [
                'name' => 'Fotografi',
                'slug' => 'fotografi',
                'icon' => '📸',
                'color' => 'indigo',
            ],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}
