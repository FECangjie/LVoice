/**
 * @file: url
 * @author Shiying wang (wangshiying@baidu.com)
 */

export default {

  /**
   * 查询 url query中的每个key的值
   * @param {string} item 要查询的key
   * @return {string} value
   */
  query: function (item) {
    var search = location.search.split('?')
    var queryStr = ''
    if (search && search.length === 2) {
      queryStr = search[1]
    }

    var queryArr = queryStr.split('&')
    if (!item) {
      return ''
    }
    for (var i = 0, len = queryArr.length; i < len; i++) {
      var queryItem = queryArr[i].split('=')
      if (queryItem[0] === item) {
        return queryItem[1]
      }
    }
    return ''
  },
  /**
   * 获得全部的key
   * @return {Object} query
   */
  getQuerys: function () {
    var search = location.search.split('?')
    var queryStr = ''
    if (search && search.length === 2) {
      queryStr = search[1]
    }
    if (search[0] === '?') {
      search = search.slice(1)
    }

    var queryArr = queryStr.split('&')
    var query = {}
    for (var i = 0, len = queryArr.length; i < len; i++) {
      var queryItem = queryArr[i].split('=')
      query[queryItem[0]] = queryItem[1]
    }
    return query
  }
}
