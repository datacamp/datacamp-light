const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const WebpackNotifierPlugin = require("webpack-notifier");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

const config = require("./config");

const assetExtensions = "jpg jpeg png gif eot otf ttf woff woff2".split(" ");

const sassOptions = {
  sourceMap: true,
  includePaths: [
    path.resolve(config.root, "src", "styles"),
    path.resolve(config.root, "node_modules"),
    path.resolve(config.root, "vendor"),
  ],
};

const extraPlugins =
  process.env.NODE_CI === "TRUE"
    ? []
    : [
        new BundleAnalyzerPlugin({
          analyzerPort: 8889,
        }),
      ];

module.exports = {
  target: "web",
  devtool: false,
  context: config.root,
  stats: "errors-only",

  entry: {
    main: [path.resolve(config.root, "src", "index.ts")],
  },

  output: {
    path: config.outputPath,
    filename: "dcl-react.js",
    publicPath: "/",
    libraryTarget: "var",
    library: "DCL",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    modules: ["node_modules", "src", "vendor"],
    alias: {
      // 'bluebird': 'core-js/fn/promise'
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: [/\.module\.s?css$/],
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: false,
              context: "/",
            },
          },
          {
            loader: "sass-loader",
            options: sassOptions,
          },
        ],
      },
      {
        test: /\.module\.s?css$/,
        exclude: [/node_modules/],
        use: [
          { loader: "style-loader" },
          {
            loader: "typings-for-css-modules-loader",
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: "dcl__[name]__[local]--[hash:base64:5]",
              camelCase: true,
              namedExport: true,
              sass: true,
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: sassOptions,
          },
        ],
      },
      {
        test: /\.(t|j)sx?$/,
        exclude: [/node_modules/, /helpers\/vendors/],
        loader: "happypack/loader?id=ts",
      },
      {
        test: /\.svg$/,
        loader: "svg-react-loader",
      },
    ],
  },

  plugins: [
    new WebpackNotifierPlugin(),
    new CleanWebpackPlugin(["dist"], {
      root: config.root,
    }),
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      watch: ["./src"],
    }),
    new StyleLintPlugin({
      syntax: "scss",
    }),
    new HtmlWebpackPlugin({
      template: path.join("src", "index.html"),
      inject: "body",
      filename: "index.html",
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "async",
    }),
    new webpack.ProvidePlugin({
      JQuery: "jquery",
      "window.$": "jquery",
      "window.jQuery": "jquery",
      React: "react",
      ReactDOM: "react-dom",
      Promise: "bluebird",
    }),
    ...extraPlugins,
  ],
};
