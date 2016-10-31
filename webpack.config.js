const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin("../css/styles.css", { allChunks : true });
const LiveReloadPlugin = require("webpack-livereload-plugin");
const autoprefixer = require("autoprefixer");

const NODE_ENV = process.env.NODE_ENV || "development";

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
        loader: extractCSS.extract("css?sourceMap!postcss")
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

  devtool: "inline-source-map",

  postcss() {
    return [autoprefixer({ browsers: ["last 2 versions"] })];
  },

  plugins: [
    new webpack.DefinePlugin({ NODE_ENV: JSON.stringify(NODE_ENV) }),
    new LiveReloadPlugin({appendScriptTag : true}),
    new webpack.ProvidePlugin({
      React: "react"
    }),
    extractCSS
  ]
};
