const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: ['./src/index.js'],
  // mode: Set in evironment config.
  output: {
    path: path.resolve(__dirname, "dist"),
    // publicPath: Set in environment config.
    filename: "bundle.js"
  },
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
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/images'
            },
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: ["scss", ".js", ".jsx"],
    alias: {
      public: path.resolve(__dirname, 'public'),
      mixins: path.resolve(__dirname, 'src/mixins'),
      colors: path.resolve(__dirname, 'src/constants/colors.scss'),
      modules: path.resolve(__dirname, 'src/modules'),
      http: path.resolve(__dirname, 'src/http'),
      auth: path.resolve(__dirname, 'src/auth'),
      media: path.resolve(__dirname, 'src/constants/media.scss'),
      logger$: path.resolve(__dirname, 'src/utils/Logger.js'),
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};