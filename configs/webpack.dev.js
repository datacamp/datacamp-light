const webpack = require("webpack");
const Merge = require("webpack-merge");
const Happypack = require("happypack");

const CommonConfig = require("./webpack.common");

module.exports = Merge(CommonConfig, {
  devtool: "cheap-module-source-map",

  plugins: [
    new webpack.DefinePlugin({
      "global.RELEASE": process.env.RELEASE_NUMBER,
      "process.env.NODE_ENV": JSON.stringify("development"),
      __IS_DEBUG__: true,
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        },
      },
    }),
    new Happypack({
      id: "ts",
      threads: 2,
      loaders: [
        { loader: "react-hot-loader/webpack" },
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
    // ignore *.css.d.ts which cause problems integrated with HMR
    new webpack.WatchIgnorePlugin([/\.css\.d\.ts$/]),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
