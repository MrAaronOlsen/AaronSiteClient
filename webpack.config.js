const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: ['react-hot-loader/patch', './src/index.js'],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        include: /src/,
        options: {
          presets: ["@babel/env"]
        }
      },
      {
        test: /\.(js|jsx)$/,
        use: 'react-hot-loader/webpack',
        include: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      mixins: path.resolve(__dirname, 'src/mixins'),
      colors: path.resolve(__dirname, 'src/constants/colors.scss')
    }
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};