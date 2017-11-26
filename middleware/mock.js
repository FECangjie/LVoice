/**
 * @file: mock 数据
 * @author: qinchao@lianjia.com
 */

var cacheASync = {}

module.exports = function (req, res, next) {
  var rootPath = process.cwd()
  if (/.json/.test(req.originalUrl)) { // api数据
    console.log('接到mock-api：' + req.originalUrl + '的请求')
    var simplePath = req.originalUrl.split('?')[0].replace('.json', '')
    var temp = simplePath
    // temp = temp.substr(4, temp.length)
    var apiPath = rootPath + '/mock/' + temp + '.js'
    var api = require(apiPath)
    res.send(api(null, req.body || req.query))
  } else {
    next()
  }
}
