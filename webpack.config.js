const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "example/src/index.html"),
  filename: "./index.html"
});

module.exports = {
  mode: 'production',
  entry: "./example/src/index.js",
  plugins: [htmlWebpackPlugin],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]',
        }
      }
    ]
  },
  devServer: {
    port: 3001
  },
  output: {
    clean: true, // Clean the output directory before each build
    assetModuleFilename: 'assets/[hash][ext][query]',
  }
};
