module.exports = {
  entry: "./src.js",
  output: {
    path: __dirname,
    filename: "bundle.js",
    library: "start"
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 100
  },
  devtool: "source-map"
};