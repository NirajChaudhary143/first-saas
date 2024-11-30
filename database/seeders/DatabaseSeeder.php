<?php

namespace Database\Seeders;

use App\Models\Feature;
use App\Models\Package;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
			'password'=>  bcrypt('11111111')
        ]);

		Feature::create([
			'route_name' => 'feature1.index',
			'name' => 'Addition',
			'description'=> 'You can perform addtion calculation',
			'required_credits' => 1,
			'active' => true,
		]);

		Feature::create([
			'route_name' => 'feature2.index',
			'name' => 'Subtraction',
			'description'=> 'You can perform substraction calculation',
			'required_credits' => 3,
			'active' => true,
		]);

		Package::create([
			'name' => 'Silver',
			'price' => 10,
			'credits' => 100,
			'package_id' => '9SIL3R0'
		]);

		Package::create([
			'name' => 'Gold',
			'price' => 30,
			'credits' => 400,
			'package_id' => '09G0Ld'
		]);

		Package::create([
			'name' => 'Diamond',
			'price' => 60,
			'credits' => 1000,
			'package_id' => 'DIAM0ND1'
		]);
    }
}
