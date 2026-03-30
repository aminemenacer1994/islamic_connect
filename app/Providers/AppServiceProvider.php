<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\View;
use Laravel\Cashier\Cashier;

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
        View::composer(['app', 'layouts.app', 'layouts.master'], function ($view) {
            $manifestPath = public_path('mix-manifest.json');
            $manifestVersion = is_file($manifestPath) ? (string) filemtime($manifestPath) : 'missing';

            $view->with('assetUrls', Cache::rememberForever("view.asset-urls.{$manifestVersion}", function () {
                return [
                    'css.app' => mix('css/app.css'),
                    'css.layout' => mix('css/layout.css'),
                    'css.vue-styles' => asset('css/vue-styles.css'),
                    'css.adminlte' => asset('vendor/adminlte/dist/css/adminlte.min.css'),
                    'css.fontawesome' => asset('vendor/fontawesome-free/css/all.min.css'),
                    'js.manifest' => mix('js/manifest.js'),
                    'js.vendor' => mix('js/vendor.js'),
                    'js.app' => mix('js/app.js'),
                ];
            }));
        });
    }
}
