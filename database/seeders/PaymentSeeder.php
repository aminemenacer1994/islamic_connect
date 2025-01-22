<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class PaymentSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach(range(1,15) as $index){
            DB::table('payment')->insert([
                'name' => $faker->firstNameMale(),
                'amount' => $faker->numberBetween($min = 10, $max = 20),
                'status' => $faker->state(),
                'payment_method' => $faker->creditCardType(),
                'currency' => $faker->currencyCode(),
                'description' => $faker->realText(rand(10,20)),                
                'date' => $faker->dateTime(),
                'created_at' => date("Y-m-d H:i:s"),
            ]);
        }
    }
}
