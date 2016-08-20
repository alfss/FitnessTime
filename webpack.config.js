const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin("../css/styles.css", { allChunks : true });
const LiveReloadPlugin = require("webpack-livereload-plugin");

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
        loader: extractCSS.extract("css?sourceMap!autoprefixer?browsers=last 2 versions")
      },
      {
        test: /\.scss$/,
        loader: extractCSS.extract("css?sourceMap!autoprefixer?browsers=last 2 versions!resolve-url!sass")
      },
      {
        test: /\.svg$/,
        loader: "url?name=[name].[ext]&limit=5000"
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery/dist/jquery.min",
      React: "react",
      classNames: "classnames"
    }),
    extractCSS,
    new LiveReloadPlugin({appendScriptTag : true})
  ]
};
