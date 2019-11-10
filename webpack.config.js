const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: ['./src/index.js'],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        include: /src/,
        options: {
          presets: ["@babel/env"],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          "sass-loader"
        ],
        include: /\.mod\.scss$/
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          'css-loader',
          "sass-loader"
        ],
        exclude: /\.mod\.scss$/
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      mixins: path.resolve(__dirname, 'src/mixins'),
      colors: path.resolve(__dirname, 'src/constants/colors.scss'),
      modules: path.resolve(__dirname, 'src/modules'),
      http: path.resolve(__dirname, 'src/http'),
      auth: path.resolve(__dirname, 'src/auth')
    }
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: "/dist/",
    port: 3000,
    hot: true,
    inline: true,
    historyApiFallback: true
  },
  devtool : '#eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};