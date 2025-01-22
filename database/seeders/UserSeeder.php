<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 15) as $index) {
            DB::table('users')->insert(
                [
                    'name' => $faker->firstname(),
                    'user_id' => '1',
                    'lastname' => $faker->lastname(),
                    'email' => $faker->email(),
                    'password' => Hash::make('admin'),
                    'role' => 'admin',
                    'phone' => $faker->PhoneNumber,
                    'user_type' => $faker->word(),
                    'subscribe' => $faker->boolean(),
                    'status' => $faker->word(),
                    'created_at' => date("Y-m-d H:i:s"),
                    'updated_at' => date("Y-m-d H:i:s"),
                ],
            );
        }
    }
}
