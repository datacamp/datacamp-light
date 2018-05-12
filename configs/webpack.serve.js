const path = require("path");
const webpack = require("webpack");
const Merge = require("webpack-merge");

const config = require("./config");
const DevConfig = require("./webpack.dev");

module.exports = Merge.strategy({
  entry: "prepend",
})(DevConfig, {
  entry: {
    main: [
      "react-hot-loader/patch",
      // activate HMR for React

      `webpack-dev-server/client?http://localhost:${config.port}`,
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint

      "webpack/hot/only-dev-server",
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
    ],
  },

  devServer: {
    port: config.port,
    host: config.host,
    contentBase: path.resolve(config.root, "dist"),
    historyApiFallback: true,
    hot: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
});
