const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, 'src'),

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8081',
    'webpack/hot/only-dev-server',
    'whatwg-fetch',
    './index.js'
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    publicPath: '/',
    compress: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist')
  },

  plugins: [
    // Enable hot loader
    new webpack.HotModuleReplacementPlugin(),
    // Better names for hot modules
    new webpack.NamedModulesPlugin(),
    // Generate index.html
    new HtmlWebpackPlugin({
      title: 'App Title',
      template: path.join(__dirname, 'templates', 'app.ejs')
    }),
    // Move static files
    new CopyWebpackPlugin([
      {
        from: 'static',
        to: 'static'
      }
    ])
  ],

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'eslint-loader',
        exclude: [
          /node_modules/,
          /dist/
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.svg$/,
        use: 'svg-sprite-loader?' + JSON.stringify({
          name: '[name]'
        })
      }
    ]
  }
};
