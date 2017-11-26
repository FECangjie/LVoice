/**
 *  页面对应资源模块映射 重要
 */

var path = require('path')
var ROOT = path.resolve(__dirname)

module.exports = {
	'home/main': { // 主页
		"src": ROOT + "/src/home/main",
		"tpl": "home.html"
	},

	'notice/main': {
		"src": ROOT + '/src/notice/main',
		"tpl": "notice.html"
	},

	'gonggao/main': {
		"src": ROOT + '/src/gonggao/main',
		"tpl": "gonggao.html"
	}

}
