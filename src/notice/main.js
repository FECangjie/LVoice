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

	async function init() { //
		$('.body').attr('style', 'background: url(../dist/images/bg.png) repeat-y fixed;')
		Data = await fetch("/data.json", {
			method:'get',
			body: {
				request_source: 'dmp',
				agent_ucid: 1
			}
		})
		setSwiper(Data)
		setHtml(Data, 'huodong', 1)
	}
	init()




	/**
	 * 动态加载swiper
	 * @param {[type]} data [description]
	 * @param {[type]} type [description]
	 */
	function setSwiper(data) {
		var swipers = data.swiper
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
		var page = + page
		var notice = data.notice[type]
		var $noticeHtml = $('[data-mark="notice"]');
		var listHtml = ''
		var paginationHtml = ''
		var temp = []

		// 计算分页
		var len = notice.length > page * 6 ? page * 6 : notice.length
		for (var i = (page - 1) * 6; i < len; i++) {
			temp = location.pathname.split('/')
			temp[temp.length-1] = notice[i].href
			listHtml += '<div class="list" onClick="location.href=\'' + temp.join('/') +'#bg\'">'
			listHtml += '<img class="pic" src="'+notice[i].img+'" alt="">'
			listHtml += '<span>'+notice[i].content+'</span>'
			listHtml += '<i>'
			if (notice[i].isNew) {
				listHtml += '<img src="../dist/images/new.png" alt="">'
			}
			listHtml += notice[i].date + '</i>'
			listHtml += '</div>'
		}

		// 加载按钮
		paginationHtml += '<div class="pagination">'
		paginationHtml += (page !== 1) ? '<button data-act="pagination" data-value="up" data-num="'+page+'" data-type="'+type+'" class="btn-up">上一页</button>' : ''
		paginationHtml += (notice.length > page * 6) ? '<button data-act="pagination" data-value="down" data-num="'+page+'" data-type="'+type+'" class="btn-down">下一页</button>' : ''
		paginationHtml += '</div>'

		$noticeHtml.html(listHtml)
		$noticeHtml.append(paginationHtml)

		if ($("#loading")[0]) {
			console.log($("#loading"))
			$("#loading").remove();
		}
	}






		// setHtml(Data.data, 'huodong', 1)

		/**
		 * 初始化tab
		 * @return {[type]} [description]
		 */
		function initTab() {
			var tab = $('[class="actived"]')
			tab.attr('class','')
		}


		/**
		 * 切换tab
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		var tabHandle = function (data) {
			var el = $(data.el)
			initTab()
			el.attr('class','actived')
			setHtml(Data, el.attr('data-value'), 1)
		}

		/**
		 * 分页按钮事件
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		var paginationHandle = function (data) {
			var el = $(data.el)
			var num = el.attr('data-value') === 'up' ? + el.attr('data-num') - 1 : + el.attr('data-num') + 1
			setHtml(Data, el.attr('data-type'), num)
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


		de.add('tab', 'click', tabHandle);
		de.add('pagination', 'click', paginationHandle);
})


// var req = require.context("../images", true, /^\.\/.*\.png|jpg|jpeg$/);
//
// $("img").attr("src", (n, url) => { // html 图片地址处理
// 	var temp = url.split('/')
// 	return req('./' + temp[temp.length - 1])
// })
