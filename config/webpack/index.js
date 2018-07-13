const path = require('path');


// 自定义js
const RULES = require('./rules');
const PLUGINS = require('./plugins');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
    // libraryTarget: "amd"
  },
  devtool: 'inline-source-map',
  module: {
    rules: RULES
    // noParse: function (content) { // content 从入口开始解析的模块路径
    //   return /no-parser/.test(content); // 返回true则忽略对no-parser.js的解析
    // }
  },
  optimization: {
    runtimeChunk: true,
    // splitChunks: {
    //   chunks: "initial",         // 必须三选一： "initial" | "all"(默认就是all) | "async"
    //   minSize: 0,                // 最小尺寸，默认0
    //   minChunks: 1,              // 最小 chunk ，默认1
    //   maxAsyncRequests: 1,       // 最大异步请求数， 默认1
    //   maxInitialRequests: 1,     // 最大初始化请求书，默认1
    //   name: () => { },            // 名称，此选项课接收 function
    //   cacheGroups: {                // 这里开始设置缓存的 chunks
    //     priority: "0",              // 缓存组优先级 false | object |
    //     vendor: {                   // key 为entry中定义的 入口名称
    //       chunks: "initial",        // 必须三选一： "initial" | "all" | "async"(默认就是异步)
    //       test: /react|lodash/,     // 正则规则验证，如果符合就提取 chunk
    //       name: "vendor",           // 要缓存的 分隔出来的 chunk 名称
    //       minSize: 0,
    //       minChunks: 1,
    //       enforce: true,
    //       maxAsyncRequests: 1,       // 最大异步请求数， 默认1
    //       maxInitialRequests: 1,     // 最大初始化请求数，默认1
    //       reuseExistingChunk: true   // 可设置是否重用该chunk（查看源码没有发现默认值）
    //     }
    //   }
    // },
    splitChunks: {
      chunks: "initial",
      cacheGroups: {
        default: false,
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }

    },
  },
  plugins: PLUGINS,
  resolve: {
    alias: {
      'pages': path.resolve(__dirname, 'src/pages'),
      'components': path.resolve(__dirname, 'src/components'),
      'context': path.resolve(__dirname, 'src/context')
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  }
};