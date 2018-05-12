const webpack = require("webpack");
const Merge = require("webpack-merge");
const MinifyPlugin = require("uglifyjs-webpack-plugin");
const Happypack = require("happypack");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

const config = require("./config");
const CommonConfig = require("./webpack.common");

module.exports = Merge(CommonConfig, {
  output: {
    filename: "dcl-react.js",
  },

  devtool: "source-map",
  performance: {
    hints: "warning",
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
      __IS_DEBUG__: false,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new Happypack({
      id: "ts",
      threads: 2,
      loaders: [
        {
          loader: "babel-loader",
          options: {
            ignore: ["node_modules"],
            presets: [
              "react",
              [
                "env",
                {
                  targets: {
                    browsers: ["last 2 versions", "Firefox ESR", "> 5%"],
                  },
                  modules: false,
                },
              ],
            ],
            plugins: [
              "babel-plugin-transform-export-extensions",
              "babel-plugin-lodash",
            ].map(require.resolve),
          },
        },
        {
          loader: "ts-loader",
          query: {
            happyPackMode: true,
            transpileOnly: true,
          },
        },
      ],
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
    }),
    new MinifyPlugin(),
  ],
});
