const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
   .vue({ version: 3 })
   .postCss('resources/css/app.css', 'public/css', [
       require('autoprefixer'),
   ]);

// Extract vendor libraries for better long-term caching
mix.extract();

mix.options({
    hmrOptions: {
        host: 'localhost',
        port: 8080,
    }
});

// Enable versioning in production to add cache-busting query strings
if (mix.inProduction()) {
    mix.version();
}
