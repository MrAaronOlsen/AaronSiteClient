const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

console.log("[INFO] Running Production Config.")

module.exports = merge(common, {
  mode: "production",
  output: {
    publicPath: "/public"
  },
})