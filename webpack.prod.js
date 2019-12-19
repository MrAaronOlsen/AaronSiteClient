const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");

console.log("[INFO] Running Production Config.")

module.exports = merge(common, {
  mode: "production",
  output: {
    publicPath: "/public"
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.GUEST_USER': JSON.stringify(process.env.GUEST_USER),
      'process.env.GUEST_PW': JSON.stringify(process.env.GUEST_PW)
    })
  ]
})