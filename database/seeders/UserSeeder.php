<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 15) as $index) {
            User::create([
                'name' => $faker->firstName(),
                // do NOT set user_id; let the model assign a unique one
                'lastname' => $faker->lastName(),
                'email' => $faker->unique()->safeEmail(),
                'password' => Hash::make('admin'),
                'role' => 'admin',
                'phone' => $faker->phoneNumber(),
                'user_type' => $faker->word(),
                'subscribe' => $faker->boolean(),
                'status' => $faker->word(),
            ]);
        }
    }
}
