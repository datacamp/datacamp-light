const path = require("path");

const env = process.env.NODE_ENV || "production";
const port = process.env.PORT || 8888;
const root = path.resolve(__dirname, "..");
const outputPath = path.resolve(root, "dist");
const vendorOutputPath = path.resolve(root, "lib");

module.exports = {
  env,
  root,
  outputPath,
  vendorOutputPath,
  isProductionMode: () => env === "production",
  port: port,
  host: "localhost",
};
