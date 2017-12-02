/**
 * @file: 推荐
 * @author: qinchao@lianjia.com
 */
import Vue from 'vue'
import './style.less'
import tpl from './tpl.vtpl'

import store from 'store'
import { Swipe, SwipeItem } from 'mint-ui'
import list from 'pages/list'
// import findsheettitle from '../findsheettitle/findsheettitle'

export default Vue.component('home', {
  data () {
      return {
    swiperOption: {
      autoplay: 1113000,
      grabCursor: true,
      setWrapperSize: true,
      autoHeight: true,
      pagination: '.swiper-pagination',
      paginationClickable: true,
      mousewheelControl: true,
      autoplayDisableOnInteraction: false,
      observeParents: true,
      loop: true,
      onSlideChangeEnd: swiper => {
        this.page = swiper.realIndex + 1
        this.index = swiper.realIndex
      },
      onClick: swiper => {
        const index = swiper.activeIndex
        store.commit({
          type: 'setMusicList',
          list: JSON.parse(swiper.slides[index].getAttribute('songlist'))
        })
        store.commit({
          type: 'playIndex',
          index: 0
        })
        store.dispatch({
          type: 'set_MusicDetail',
          isShow: true
        })
      }
    }
      }
    },
    computed: {
      reconmmend () {
        return store.getters.getAllInfo || '暂无数据'
      },
      tuijian () {
        return store.getters.getTuijian || {}
      },
      swiper () {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
      showSongSheet (data) {
        store.dispatch({
          type: 'set_MusicSheetList',
          data: data
        })
        store.commit({
          type: 'setIsShowSongSheet',
          isShow: true
        })
      },
      swiperClick(e) { // 轮播图点击播放
        const index = this.swiperIndex
        let target = e.target
        let swiper = $(target).parent()
        let list = JSON.parse(swiper[0].getAttribute('songlist'))
        console.log('--------播放详情--------')
        console.log(list)
        store.dispatch('set_Voice',{uuid: list.uuid})

      },
      swiperChange(index) { // 轮播图切换
        this.swiperIndex = index
      },
      showVolice(e) { // 点击播放
        const index = this.swiperIndex
        let target = e.target
        let list = JSON.parse(target.getAttribute('songlist'))
        console.log('--------播放详情--------')
        console.log(list)
        store.dispatch('set_Voice',{uuid: list.uuid})
      },
      setType(e) {
        let target = e.target
        let type = target.getAttribute('data-type') ? target.getAttribute('data-type') : target.innerHTML
        store.dispatch('set_Category', { pindao_type: type,key: type})
      }
    },
  mounted () {
    // this.$refs.mySwiper.slideTo(0, 1000, false)
  },
  components: {
    list,
    // findsheettitle
  },
  template: tpl
})
