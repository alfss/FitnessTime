const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin("../css/styles.css", { allChunks : true });
const autoprefixer = require("autoprefixer");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || "development";

console.log("NODE_ENV: " + NODE_ENV);
module.exports = {
  entry: "./FitnessTime/static_dist/main.js",
  output: {
    path: path.join(__dirname, "/FitnessTime/static/js/"),
    filename: "main.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, "/FitnessTime/static_dist"),
        loader: "babel",
        query: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.css$/,
        loader: extractCSS.extract("css!postcss")
      },
      {
        test: /\.styl$/,
        loader: extractCSS.extract("css!postcss!stylus?resolve url")
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: "url?name=../images/[name]-[hash:6].[ext]&limit=5000"
      }
    ]
  },

  postcss() {
    return [autoprefixer({ browsers: ["last 2 versions"] })];
  },

  plugins: [
    new CleanWebpackPlugin(["js", "images", "css"], {
      root: path.join(__dirname, "/FitnessTime/static/")
    }),
    new webpack.DefinePlugin({ NODE_ENV: JSON.stringify(NODE_ENV) }),
    new webpack.ProvidePlugin({
      React: "react"
    }),
    extractCSS
  ]
};
