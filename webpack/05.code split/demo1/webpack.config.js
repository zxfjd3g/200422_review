const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
/*
  code split 代码分割

  方式1: 多入口 (此方式常用于多页打包)
    将输出一个JS文件 改成 输出多个JS文件

    entry: String | Object | Array
      String 单入口（从一个文件开始打包）
      Array  多入口（从多个文件开始打包，全部输出到一个文件中）
      Object 多入口（从多个文件开始打包，有多少入口就输出多少个文件）

  问题: 输出的多个文件，每个文件中都重复的有公共代码，需要将这个公共代码抽取成单独文件

*/

module.exports = {
  entry: {
    a: "./src/index.js",
    b: "./src/main.js",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    // [name]会自动补充为文件名
    filename: "./js/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // 自动删除上一个打包的结果
    new CleanWebpackPlugin()
  ],
  mode: "development",
};
