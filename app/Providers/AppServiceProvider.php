<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // \Gate::define('ManageProducts', function ($user) {
        //     if ($user->role_id == '1') {
        //         return true;
        //     }
        //     return false;
        // });
    }
}
