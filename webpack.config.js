const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const env = process.env.NODE_ENV;

module.exports = {
  entry: "./app/js/index.js",

  mode: env,

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "/",
  },

  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 3500,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true,
              disable: true,
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          env == "development" ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "resolve-url-loader",
            options: {
              debug: true,
              sourceMap: false,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({ template: "./app/index.html" }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};
