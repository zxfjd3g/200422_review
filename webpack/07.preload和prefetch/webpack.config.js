const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const PreloadWebpackPlugin = require('preload-webpack-plugin');

module.exports = {
  // entry: "./src/index.js",  // 等价于下面这种
  entry: {
    main: "./src/index.js",
  },
  optimization: {
    splitChunks: {
      chunks: "all", // 对所有模块进行处理
    },
  },
  output: {
    path: path.resolve(__dirname, "build"),
    // [name]会自动补充为文件名
    filename: "./js/[name].js",
    chunkFilename: './js/[name].chunk.js', // 分割的非入口文件代码命名
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader"],
        sideEffects: true, // 当前处理的文件都有副作用，不要进行tree shaking
      },
    ],
  },
  plugins: [
    // 自动删除上一个打包的结果
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  
    // 针对异步加载的包用prefetch
    new PreloadWebpackPlugin({
      rel: 'prefetch',
      include: 'asyncChunks',
      as(entry) {
        if (/\.css$/.test(entry)) return 'style'; 
        if (/\.woff$/.test(entry)) return 'font';
        if (/\.png$/.test(entry)) return 'image';
        return 'script';
      }
    }),
    // 针对同步的包使用preload
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: ['main', 'vendors~main.chunk'],
      as(entry) {
        if (/\.css$/.test(entry)) return 'style';
        if (/\.woff$/.test(entry)) return 'font';
        if (/\.png$/.test(entry)) return 'image';
        return 'script';
      }
    })
  ],
  mode: "development",
};
