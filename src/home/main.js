/**
 * 主页
 */
if (ENV === 'DEV') {
	require('pages/home.html')
}
import 'template/home.html'
import 'common/css/base.css'
import 'common/css/swiper.css'
import 'common/js/swiper.js'
import common from 'common/js'
import './style.less'
import * as d3 from 'd3'
import * as Actions from './action'
import fetch from 'common/js/util/fetch'

$(function () {
	var page = $('[data-mark="page"]');
	var de = page.de()
	var Data = {}
	var mySwiper = new Swiper ('.swiper-container', {
      direction: 'horizontal',
			autoplay: 5000,
			autoplayDisableOnInteraction: false,
      // 分页器
			pagination: '.swiper-pagination',
			paginationClickable: true,
			paginationBulletRender: function (swiper, index, className) {
				return '<span class="' + className + '">' + '</span>';
			}
    })

	async function init() { // 获取初始数据
		Data = await fetch("/data.json", {
			method:'get',
			body: {
				request_source: 'dmp',
				agent_ucid: 1
			}
		})
		setSwiper(Data)
		$('.content').append('<i>'+Data.list[0]+'</i>')
	}
	init()




	/**
	 * 动态加载swiper
	 * @param {[type]} data [description]
	 * @param {[type]} type [description]
	 */
	function setSwiper(data) {
		var swipers = []
		var $swiper = $(".swiper-wrapper")
		var txt = ''
		for (var i = 0; i < swipers.length; i++) {
			txt = '<div class="swiper-slide">'
			txt += '<a href="' + swipers[i].url + '">'
			txt += '<img src="' + swipers[i].img + '" alt="'+swipers[i].name+'">'
			txt += '</a></div>'
			$swiper.append(txt)
		}
		mySwiper.update(true)
	}


	/**
	 * 动态加载列表
	 * @param {[type]} data [description]
	 * @param {[type]} type [description]
	 */
	function setHtml(data, type, page) {

		if ($("#loading")[0]) {
			console.log($("#loading"))
			$("#loading").remove();
		}
	}


		/**
		 * 初始化tab
		 * @return {[type]} [description]
		 */
		function initTab() {
		}


		/**
		 * 切换tab
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		var tabHandle = function (data) {
		}

		/**
		 * 分页按钮事件
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		var paginationHandle = function (data) {
		}

		/**
		 * 监听页面滚动
		 * @return {[type]} [description]
		 */
		window.onscroll = function () {
			var t = document.documentElement.scrollTop || document.body.scrollTop
			var tab = document.querySelector('#tab')
			var div = document.querySelectorAll('.tab')[1]
			var swiper = document.querySelector('.swiper')
			if (swiper.offsetHeight && t >= swiper.offsetHeight + 40) {
				tab.style.position = "fixed"
				tab.style.top = "0"
				tab.style.zIndex = "10"
				div.style.display = "block"
	 		} else {
		 		tab.style.position = "relative"
				div.style.display = "none"
	 		}
		}

// 添加事件
		de.add('tab', 'click', tabHandle);
		de.add('pagination', 'click', paginationHandle);
})


// var req = require.context("../images", true, /^\.\/.*\.png|jpg|jpeg$/);
//
// $("img").attr("src", (n, url) => { // html 图片地址处理
// 	var temp = url.split('/')
// 	return req('./' + temp[temp.length - 1])
// })
