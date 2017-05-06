// Webpack production build configurations

var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, 'src'),

  entry: [
    'whatwg-fetch',
    './index.js'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: [
  // Generate index.html
    new HtmlWebpackPlugin({
      title: 'Epidemiakartta',
      template: path.join(__dirname, 'templates', 'app.ejs')
    }),
    // Set NODE_ENV
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    // Suppress UglifyJS warnings when building for production
    new webpack.optimize.UglifyJsPlugin({
      "compress": {
        "warnings": false
      }
    }),
    // Extracts block-styles to separate CSS-file
    new ExtractTextPlugin("[name].css"),
    // Move static files to build folder
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
        test: /\.js$/,
        use: 'babel-loader',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
          publicPath: "/dist"
        })
      },
      {
        test: /\.svg$/,
        use: 'svg-sprite-loader?' + JSON.stringify({
          name: '[name]'
        })
      }
    ]
  }
}
