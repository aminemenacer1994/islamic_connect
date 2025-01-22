<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class DonationSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 15) as $index) {
            DB::table('donation')->insert([
                'firstname' => $faker->firstNameMale(),
                'lastname' => $faker->lastname(),
                'amount' => $faker->buildingNumber(),
                'currency' => $faker->currencyCode(),
                'email' => $faker->email(),
                'country' => $faker->country(),
                'payment_status' => $faker->word(),
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ]);
        }
    }
}
