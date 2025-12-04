const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const duas = require('./build/duas');

const plugins = [
  new VueLoaderPlugin(),
];

  duas.forEach(dua => {
    plugins.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'resources', 'index.html'),
        filename: 'index.html',
        inject: 'body',
      })
    );    
  });

module.exports = {
  mode: 'production', // Or 'development' for local testing
  entry: {
    app: './resources/js/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].[contenthash].js',
    publicPath: '/',
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 244000,
      automaticNameDelimiter: '~',
    },
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
  stats: {
    children: false,
    warningsFilter: [/asset size limit/, /entrypoint size limit/],
  },
  performance: {
    hints: false,
  },
  plugins,
};
