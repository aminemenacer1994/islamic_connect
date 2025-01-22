<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class MailingSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach(range(1,15) as $index){
            DB::table('mailinglist')->insert([
                'name' => $faker->firstNameMale(),
                'lastname' => $faker->lastname(),
                'email' => $faker->email(),
                'phone' => $faker->PhoneNumber,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ]);
        }
    }
}
