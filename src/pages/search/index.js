/**
 * @file: 播放列表
 * @author: qinchao@lianjia.com
 */
import Vue from 'vue'
import './style.less'
import tpl from './tpl.vtpl'

import axios from 'axios'
import store from 'store'
import typelist from 'pages/typelist'

export default Vue.component('menu-play-list', {
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    stopTouch (event) {
      return
    },
    hideSearch () {
      store.dispatch({
        type: 'hide_Search'
      })
    }
  },
  computed: {
    showMenu () {
      this.isShow = this.$store.getters.getIsShow ? this.$store.getters.getIsShow : false
      return this.$store.getters.getIsShow ? this.$store.getters.getIsShow : false
    },
    showSearch () {
      return this.$store.getters.getIsShowSearch ? this.$store.getters.getIsShowSearch : false
    },
    menuList () {
      return this.$store.getters.getShowMenuInfo ? this.$store.getters.getShowMenuInfo : ''
    }
  },
  watch: {
    isShow: function (newisShow) {
      if (newisShow) {
        this.$refs.content.style.height = `${this.$store.getters.getShowMenuInfo.content.length * 50 + 20}px`
      }
    }
  },
  components: {
    'type-list': typelist
  },
  template: tpl
})
