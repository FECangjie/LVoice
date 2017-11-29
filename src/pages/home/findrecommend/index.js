/**
 * @file: 首页
 * @author: qinchao@lianjia.com
 */
import Vue from 'vue'
import './style.less'
import tpl from './tpl.vtpl'

import store from 'store'
// import findsheetlist from '../findsheetlist/findsheetlist'
// import findsheettitle from '../findsheettitle/findsheettitle'

export default Vue.component('home', {
  data () {
      return {
    swiperOption: {
      // 是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
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
      // lazyLoading: true,
      // lazyLoadingOnTransitionStart: true,
      onSlideChangeEnd: swiper => {
        // 这个位置放swiper的回调方法
        this.page = swiper.realIndex + 1
        this.index = swiper.realIndex
      },
      onClick: swiper => {
        const index = swiper.activeIndex
        // alert(swiper.slides[index].getAttribute('songlist'))
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
      return store.getters.getAllInfo
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
    // you can use current swiper instance object to do something(swiper methods)
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // this.$refs.mySwiper.slideTo(0, 1000, false)
  },
  components: {
    // swiper,
    // swiperSlide,
    // findsheetlist,
    // findsheettitle
  },
  template: tpl
})
