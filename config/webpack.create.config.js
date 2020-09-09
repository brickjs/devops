const fs = require('fs');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const sassRegex = /\.(scss|sass|css)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const createAppConfig = (args) => {
  let {
    https = true,
    rootDir = __dirname,
    packageVersion = 'NO_VERSION',
    plugins = [],
    entry = {},
    optimization = {},
  } = args;

  return {
    devtool: 'source-map',
    mode: process.env.CI ? 'production' : 'development', // In BitBucket Pipeline, CI = true
    devServer: {
      historyApiFallback: true,
      disableHostCheck: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    context: path.join(rootDir),
    entry,
    output: {
      path: path.join(rootDir, 'dist', packageVersion),
      publicPath: undefined,
      filename: '[name].js',
      chunkFilename: '[name].bundle.js',
    },
    optimization: {
      minimize: !!process.env.CI,
      minimizer: [new TerserPlugin()],
      ...optimization,
    },
    plugins: [
      new MiniCssExtractPlugin({
        moduleFilename: ({ name }) => {
          if (name.includes('-css')) {
            return `${name.replace('-css', '')}.css`;
          } else {
            return `${name}.module.css`;
          }
        },
      }),
      new ManifestPlugin({
        generate: (seed, files) => {
          const entrypoints = new Set();
          files.forEach((file) =>
            ((file.chunk || {})._groups || []).forEach((group) => entrypoints.add(group))
          );
          const entries = [...entrypoints];
          const entryArrayManifest = entries.reduce((acc, entry) => {
            const name = (entry.options || {}).name || (entry.runtimeChunk || {}).name;
            const files = []
              .concat(...(entry.chunks || []).map((chunk) => chunk.files))
              .filter(Boolean);
            return name ? { ...acc, [name]: files } : acc;
          }, seed);
          return entryArrayManifest;
        },
      }),
      ...plugins,
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /(node_modules|bower_compontents)/,
          use: {
            loader: 'graphql-tag/loader',
          },
        },
        {
          test: sassRegex,
          exclude: sassModuleRegex,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                autoprefixer: {
                  browsers: ['last 2 versions'],
                },
                plugins: () => [require('autoprefixer')],
              },
            },
            {
              loader: 'sass-loader',
              options: {},
            },
          ],
        },
        {
          test: sassModuleRegex,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                autoprefixer: {
                  browsers: ['last 2 versions'],
                },
                plugins: () => [require('autoprefixer')],
              },
            },
            {
              loader: 'sass-loader',
              options: {},
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|mp3|svg|eot|woff|woff2|ttf)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                emitFile: true,
              },
            },
          ],
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: { loader: 'html-loader' },
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
  };
};

module.exports = {
  createAppConfig,
};
