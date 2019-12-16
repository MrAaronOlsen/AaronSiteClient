const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');

console.log("[INFO] Running Developement Config.")

module.exports = merge(common, {
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    publicPath: "/dist",
    port: 3000,
    hot: true,
    inline: true,
    historyApiFallback: true
  },
  devtool : '#eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv(),
  ]
})