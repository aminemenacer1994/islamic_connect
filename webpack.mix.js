const mix = require('laravel-mix');
const webpack = require('webpack');

mix.setPublicPath('public');
mix.setResourceRoot(process.env.MIX_ASSET_URL || '/');

mix.js('resources/js/app.js', 'public/js')
   .vue({ version: 3, extractStyles: true })
   .postCss('resources/css/app.css', 'public/css', [
       require('autoprefixer'),
   ])
   .postCss('resources/css/layout.css', 'public/css', [
       require('autoprefixer'),
   ])
   .options({
       processCssUrls: false
   });

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

// Ensure Webpack targets a browser environment and selects a valid chunk format
mix.webpackConfig({
    target: 'web',
    output: {
        chunkFormat: 'array-push'
    },
    resolve: {
        alias: {
            // Use the Vue build that includes the template compiler so in-DOM
            // templates inside Blade (e.g., <homepage-component/>) are compiled.
            vue$: 'vue/dist/vue.esm-bundler.js',
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            __VUE_PROD_DEVTOOLS__: false,
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
        })
    ]
});

mix.override(webpackConfig => {
    // Drop any HtmlWebpackPlugin instances so Mix does not emit its own index.html.
    webpackConfig.plugins = (webpackConfig.plugins || []).filter(
        plugin => !(plugin && plugin.constructor && plugin.constructor.name === 'HtmlWebpackPlugin')
    );
});

// Enable versioning to add cache-busting query strings
mix.version();

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
