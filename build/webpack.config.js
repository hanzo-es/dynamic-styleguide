// modules
const path = require('path');

// paths
const fileLoaderPath = require.resolve('file-loader');
const BASE = path.join(__dirname, '../');
const DIST = 'public';
const ASSETS = 'styleguide-assets';
const ASSETSPATH = path.join(BASE, DIST, ASSETS);
const PROJECTASSETSPATH = path.join(BASE, 'project-assets');
const APP = path.join(BASE, 'src/ui');

// plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// plugin helper
const cleanFoldersPlugin = require('./clean-folders-plugin-helper');

// exports
const config = {
  entry: [
    `${APP}/index.js`
  ],
  output: {
    path: ASSETSPATH,
    filename: 'app.js',
    publicPath: `${ASSETS}`
  },
  resolve: {
    modules: [
      'node_modules',
      APP
    ],
    extensions: ['.js'],
    alias: {
      modernizr$: path.join(BASE, '/.modernizrrc'),
      '@src': path.resolve(BASE, 'src')
    }
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      options: {
        presets: ['env']
      }
    },
    {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            minimize: true,
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer],
            sourceMap: true
          }
        },
        {
          loader: 'resolve-url-loader',
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            includePaths: ['src']
          }
        }
      ]
    },
    {
      test: /\.(svg|jpg|png)(\?[a-z0-9#=&.]+)?$/,
      loader: `${fileLoaderPath}?publicPath=images/ui&outputPath=images/ui/`
    },
    {
      test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
      loader: `${fileLoaderPath}?limit=10000&mimetype=application/font-woff&publicPath=fonts&outputPath=fonts/`,
    },
    {
      test: /\.(ttf|eot)(\?[a-z0-9#=&.]+)?$/,
      loader: `${fileLoaderPath}?publicPath=fonts&outputPath=fonts/`
    },
    {
      test: /\.modernizrrc.js$/,
      use: ['modernizr-loader']
    },
    {
      test: /\.modernizrrc(\.json)?$/,
      use: ['modernizr-loader', 'json-loader']
    }
    ]
  },
  plugins: [
    cleanFoldersPlugin([DIST], {
      root: BASE
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunkFilename: '[id].css'
    }),
    new CopyWebpackPlugin([{
      from: PROJECTASSETSPATH,
      to: DIST,
    }], {
      debug: 'warning'
    })
  ]
};

module.exports = config;
