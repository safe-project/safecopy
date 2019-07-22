'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

/*************************************************************/

//引入express
const express = require('express')
const app = express() //请求server
var apiRoutes = express.Router()
app.use(apiRoutes)//域名下的访问路径

//接口的返回数据
var loginData = require('../src/mock/login/login.json')
var logoutData = require('../src/mock/login/logout.json')
var rolesData = require('../src/mock/login/roles.json')
var orderListData = require('../src/mock/homePage/orderList.json')
var orderDetailData = require('../src/mock/orderDetail/orderDetail.json')
var riskOrderListData = require('../src/mock/riskOrder/riskOrderList.json')
var historyOrderListData = require('../src/mock/historyOrder/historyOrderList.json')

/*************************************************************/


const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    /*************************************************************/
    before(apiRoutes) {
      
      apiRoutes.get('/api/login', (req, res) => {
        res.json({errno:0,data:loginData})
      })

      apiRoutes.get('/api/logout', (req, res) => {
        res.json({errno:0,data:logoutData})
      })

      apiRoutes.get('/api/roles', (req, res) => {
        res.json({errno:0,data:rolesData})
      })

      apiRoutes.get('/api/homepage/orderList', (req, res) => {
        res.json({errno:0,data:orderListData})
      })

      apiRoutes.get('/api/orderDetail/orderDetail', (req, res) => {
        res.json({errno:0,data:orderDetailData})
      })

      apiRoutes.get('/api/riskOrder/riskOrderList', (req, res) => {
        res.json({errno:0,data:riskOrderListData})
      })

      apiRoutes.get('/api/historyOrder/historyOrderList', (req, res) => {
        res.json({errno:0,data:historyOrderListData})
      })
    }

    
    /*************************************************************/
  },
  // chainWebpack(config) {
  //   config.plugins.delete('preload') // TODO: need test
  //   config.plugins.delete('prefetch') // TODO: need test

  //   // set svg-sprite-loader
  //   config.module
  //     .rule('svg')
  //     .exclude.add(resolve('src/icons'))
  //     .end()
  //   config.module
  //     .rule('icons')
  //     .test(/\.svg$/)
  //     .include.add(resolve('src/icons'))
  //     .end()
  //     .use('svg-sprite-loader')
  //     .loader('svg-sprite-loader')
  //     .options({
  //       symbolId: 'icon-[name]'
  //     })
  //     .end()

  //   // set preserveWhitespace
  //   config.module
  //     .rule('vue')
  //     .use('vue-loader')
  //     .loader('vue-loader')
  //     .tap(options => {
  //       options.compilerOptions.preserveWhitespace = true
  //       return options
  //     })
  //     .end()

  //   config
  //   // https://webpack.js.org/configuration/devtool/#development
  //     .when(process.env.NODE_ENV === 'development',
  //       config => config.devtool('cheap-source-map')
  //     )

  //   config
  //     .when(process.env.NODE_ENV !== 'development',
  //       config => {
  //         config
  //           .plugin('ScriptExtHtmlWebpackPlugin')
  //           .after('html')
  //           .use('script-ext-html-webpack-plugin', [{
  //           // `runtime` must same as runtimeChunk name. default is `runtime`
  //             inline: /runtime\..*\.js$/
  //           }])
  //           .end()
  //         config
  //           .optimization.splitChunks({
  //             chunks: 'all',
  //             cacheGroups: {
  //               libs: {
  //                 name: 'chunk-libs',
  //                 test: /[\\/]node_modules[\\/]/,
  //                 priority: 10,
  //                 chunks: 'initial' // only package third parties that are initially dependent
  //               },
  //               elementUI: {
  //                 name: 'chunk-elementUI', // split elementUI into a single package
  //                 priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
  //                 test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
  //               },
  //               commons: {
  //                 name: 'chunk-commons',
  //                 test: resolve('src/components'), // can customize your rules
  //                 minChunks: 3, //  minimum common number
  //                 priority: 5,
  //                 reuseExistingChunk: true
  //               }
  //             }
  //           })
  //         config.optimization.runtimeChunk('single')
  //       }
  //     )
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
