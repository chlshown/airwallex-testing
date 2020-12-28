const path = require('path')
let { version } = require('./package.json')
version = version.replace(/\./g, '_')
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  publicPath: '/',
  outputDir: 'dist', // 打包输出目录默认dist
  assetsDir: 'static',
  // performance: {
  //   maxEntrypointSize: 400000
  // },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [],
    },
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
      // 将每个依赖包打包成单独的js文件
      let optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              },
            },
          },
        },
      }

      // 移除console.log
      config.plugins.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log'],
            },
          },
        })
      )
      Object.assign(config, {
        optimization,
        output: {
          ...config.output,
          filename: `static/js/[name].[chunkhash].${version}.js`,
          chunkFilename: `static/js/[name].[chunkhash].${version}.js`,
        },
      })
    } else {
      // 为开发环境修改配置...
    }

    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components'),
        }, // 别名配置
      },
    })
    config.plugins.push(
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css/,
        threshold: 10240,
        deleteOriginalAssets: false,
      })
    )
    config.module.rules.push({
      test: /\.less$/,
      use: [
        // ...其他 loader 配置
        {
          loader: 'less-loader',
          options: {
            globalVars: {
              // '@orange': '#fa853e',
            },
          },
        },
      ],
    })
    // config.module.rules.push(
    //   {
    //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    //     use: [
    //       {
    //         loader: 'url-loader',
    //         options: {
    //           limit: 10000,
    //           // name: utils.assetsPath('img/[name].[hash:7].[ext]')
    //           name: `static/img/[name].[hash:7].[ext]`
    //         }
    //       }
    //     ]
    //   }
    // )
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
}
