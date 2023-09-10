const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // 开发模式
  mode: "development",
  // 入口
  entry: "./src/main.js",
  // 输出
  output: {
    // 开发模式是不需要输出文件的
    path: undefined,
    // 入口文件名
    filename: "static/js/main.js",
  },
  // 加载器
  module: {
    rules: [
      {
        oneOf: [
          // loader 的配置
          {
            test: /\.css$/, // 检测 css 文件
            use: [MiniCssExtractPlugin.loader, "css-loader"], // 执行顺序从右至左（从下至上）
          },
          {
            test: /\.less$/,
            use: [
              // compiles Less to CSS
              MiniCssExtractPlugin.loader,
              "css-loader",
              "less-loader",
            ],
          },
          {
            test: /\.s[ac]ss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          },
          {
            test: /\.styl$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"], // 将 Stylus 文件编译为 CSS
          },
          {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                // 小于10kb图片转为base64
                // 优点：减少请求数量，缺点：体积会更大
                maxSize: 10 * 1024, // 10kb
              },
            },
            generator: {
              filename: "static/images/[hash:10][ext][query]",
            },
          },
          {
            test: /\.(ttf|woff2?|mp3|mp4)$/,
            type: "asset/resource",
            generator: {
              filename: "static/fonts/[hash:10][ext][query]",
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/, // 排除node_modules代码不编译
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
        ],
      },
    ],
  },
  // 插件
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../src/public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/index.css",
    }),
  ],
  // 开发服务器
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, //热更新
  },
  
  devtool: "cheap-module-source-map",
};
