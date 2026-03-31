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
            $resolverVersion = (string) filemtime(__FILE__);

            $view->with('assetUrls', Cache::rememberForever("view.asset-urls.{$manifestVersion}.{$resolverVersion}", function () {
                return [
                    'css.app' => $this->resolveAssetUrl('css/app.css'),
                    'css.vue-runtime' => $this->resolveAssetUrl('css/vue-runtime.css'),
                    'css.layout' => $this->resolveAssetUrl('css/layout.css'),
                    'css.vue-styles' => $this->resolveAssetUrl('css/vue-styles.css'),
                    'css.adminlte' => asset('vendor/adminlte/dist/css/adminlte.min.css'),
                    'css.fontawesome' => asset('vendor/fontawesome-free/css/all.min.css'),
                    'js.manifest' => $this->resolveAssetUrl('js/manifest.js'),
                    'js.vendor' => $this->resolveAssetUrl('js/vendor.js'),
                    'js.app' => $this->resolveAssetUrl('js/app.js'),
                ];
            }));
        });
    }

    protected function resolveAssetUrl(string $path): string
    {
        $normalizedPath = '/' . ltrim($path, '/');

        try {
            return mix($normalizedPath);
        } catch (\Throwable $e) {
            $publicFilePath = public_path(ltrim($normalizedPath, '/'));
            if (is_file($publicFilePath)) {
                return asset(ltrim($normalizedPath, '/') . '?id=' . filemtime($publicFilePath));
            }

            throw $e;
        }
    }
}
