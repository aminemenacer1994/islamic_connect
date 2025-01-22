<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class FeedbackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        foreach(range(1,15) as $index){
            DB::table('feedback')->insert([
                'firstname' => $faker->firstNameMale(),
                'lastname' => $faker->lastname(),
                'email' => $faker->email(),
                'mobile' => $faker->PhoneNumber,
                'subject' => $faker->word(),
                'message' => $faker->text,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ]);
        }
    }
}
