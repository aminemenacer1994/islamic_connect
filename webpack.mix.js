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
    },
    // Prefer modern syntax when possible; avoids heavy legacy transforms
    terser: {
        terserOptions: {
            compress: {
                passes: 2,
                pure_funcs: ['console.debug']
            }
        }
    }
});

// Enable versioning in production to add cache-busting query strings
if (mix.inProduction()) {
    mix.version();
}

// Target modern evergreen browsers to avoid unnecessary polyfills/transforms
mix.babelConfig({
    presets: [
      [
        '@babel/preset-env',
        {
          targets: { esmodules: true },
          bugfixes: true,
          modules: false,
          useBuiltIns: false
        }
      ]
    ]
});
