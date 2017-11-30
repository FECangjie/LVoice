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
        // 这个位置放swiper的回调方法
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
