const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'production', // Or 'development' for local testing
  entry: './resources/js/app.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            isCustomElement: (tag) => /^x-/.test(tag),
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // Injects styles into DOM
          'css-loader',   // Resolves @import and url()
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
    },
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};