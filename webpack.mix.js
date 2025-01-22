const mix = require('laravel-mix');
mix.js('resources/js/app.js', 'public/js')
   .vue()
   .sass('resources/sass/app.scss', 'public/css')
   .version()
   .minify('public/js/app.js') // Minify the JS
   .minify('public/css/app.css') // Minify the CSS
mix.webpackConfig({
   stats: {
      warningsFilter: /deprecated/,
   },
});
  