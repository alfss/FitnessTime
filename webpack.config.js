const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./develop/main",
  output: {
    path: __dirname + "/static/",
    filename: "bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: ["/node_modules/", "/static/"],
        loader: "babel",
        query: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.css$/,
        exclude: ["/node_modules/", "/static/"],
        loader: ExtractTextPlugin.extract("css?sourceMap!autoprefixer?browsers=last 2 versions")
      },
      {
        test: /\.scss$/,
        exclude: ["/node_modules/", "/static/"],
        loader: ExtractTextPlugin.extract("css?sourceMap!autoprefixer?browsers=last 2 versions!resolve-url!sass?sourceMap")
      },
      {
        test: /\.svg$/,
        exclude: ["/node_modules/", "/static/"],
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
    new ExtractTextPlugin("styles.css", { allChunks : true })
  ]
};
