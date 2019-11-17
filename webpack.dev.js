const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

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
})