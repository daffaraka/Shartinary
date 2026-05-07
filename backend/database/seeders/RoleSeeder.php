<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles & permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Buat roles
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $userRole  = Role::firstOrCreate(['name' => 'user',  'guard_name' => 'web']);

        // Buat permissions
        $permissions = [
            // Itinerary
            'itinerary.create',
            'itinerary.edit',
            'itinerary.delete',
            'itinerary.publish',
            // User management
            'user.view',
            'user.ban',
            // Admin dashboard
            'admin.access',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm, 'guard_name' => 'web']);
        }

        // Admin dapat semua permission
        $adminRole->syncPermissions($permissions);

        // User hanya bisa kelola itinerary milik sendiri
        $userRole->syncPermissions([
            'itinerary.create',
            'itinerary.edit',
            'itinerary.delete',
        ]);

        $this->command->info('Roles & Permissions berhasil di-seed!');
    }
}
