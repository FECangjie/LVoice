/**
 * @file: vtpl loader
 * @author: wangshiying@lianjia.com
 */
module.exports = function (context) {
  context = context.replace(/\'/g, '\\\'')
  context = context.replace(/\n/g, '\\n')
  // context = context.replace(/\"/g, '\\\"')
  // console.log(context)
  // return "module.exports = function (this) { return `" + context + "` }"
  return "module.exports = '" + context + "'"
}
