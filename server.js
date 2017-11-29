/**
 * @file: 开发环境的server
 * 主要功能：
 * 1. 同步接口和异步接口的mock
 */
var http = require('http')
var path = require('path')
var fs = require('fs')
var express = require('express')
var Webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./wp.config.js')
var api = require('./middleware/mock')
var webApp = new WebpackDevServer(Webpack(config),{
  // webpack-dev-server options

  contentBase: "pages/",
  // Can also be an array, or: contentBase: "http://localhost/",

  inline: true,
  hot: true,
  publicPath: "/dist",

  stats: { colors: true }
})
var app = webApp.app
// var app = express()
app.use(api)

app.use(function (req, res) {
  fs.readFile('./index.html', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open file.')
    }
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
    res.end(content)
  })
})

app.listen(8080,
  function(err, result) {
    if (err) {
      console.log(err)
    }
    console.log('在8080端口启动')
  }
)
