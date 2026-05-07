<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Roles & Permissions terlebih dahulu
        $this->call(RoleSeeder::class);

        // 2. Seed Master Data (Countries, Provinces, Cities)
        $this->call(CountrySeeder::class);
        $this->call(ProvinceSeeder::class);
        $this->call(CitySeeder::class);

        // 3. Seed Categories & Tags
        $this->call(CategorySeeder::class);
        $this->call(TagSeeder::class);

        // 4. Seed Places (Master POI)
        $this->call(PlaceSeeder::class);

        // 5. Buat akun Admin
        $admin = User::firstOrCreate(
            ['email' => 'admin@shartinary.com'],
            [
                'name'     => 'Admin Shartinary',
                'username' => 'admin',
                'password' => Hash::make('password'),
            ]
        );
        $admin->assignRole('admin');

        // 6. Buat akun User Contoh
        $user = User::firstOrCreate(
            ['email' => 'user@shartinary.com'],
            [
                'name'     => 'User Demo',
                'username' => 'userdemo',
                'password' => Hash::make('password'),
            ]
        );
        $user->assignRole('user');

        $this->command->info('Seed selesai! Admin: admin@shartinary.com | User: user@shartinary.com (password: password)');
    }
}
