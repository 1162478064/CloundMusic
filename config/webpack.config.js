const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
// const glob = require('glob');
module.exports = {
  entry: './src/main.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[fullhash:8].js',
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(woff | eot | ttf | otf | svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  mode: process.env.NODE_ENV,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  externals: {
    jquery: 'jQuery',
    lodash: '_',
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    hot: true,
    // 配置前端请求代理,
    proxy: {
      '/': {
        target: 'https://649eb7fb445eac61dd938fd6--silly-hotteok-f92eac.netlify.app', // https://netease-cloud-music-c2c1ys55f-cc-0820.vercel.app
        changeOrigin: true
      }
    },
    client: {
      overlay: false,
    },
  },
  plugins: [
    new WebpackBar(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      cdn: {
        script: [
          'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.min.js',
          'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.min.js',
        ],
        style: [],
      },
    }),
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
  ],
};
