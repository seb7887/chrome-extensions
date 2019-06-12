const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
  return {
    mode: env.NODE_ENV,
    devtool: 'inline-source-map',
    entry: {
      options: './src/options.tsx',
      background: './src/background.ts'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCSSExtractPlugin.loader
            },
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
      new MiniCSSExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new HtmlWebpackPlugin({
        inject: true,
        chunks: ['options'],
        filename: 'options.html',
        template: './src/options.html'
      }),
      new CopyWebpackPlugin([
        { from: './src/manifest.json' },
        { context: './src/assets', from: 'icon-**', to: 'assets' }
      ])
    ]
  };
};
