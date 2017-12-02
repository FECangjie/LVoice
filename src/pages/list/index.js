/**
 * @file: 首页
 * @author: qinchao@lianjia.com
 */
import Vue from 'vue'
import './style.less'
import tpl from './tpl.vtpl'

import store from 'store'

export default Vue.component('list', {
  props: {
    listpadding: {
      type: String,
      default: '0'
    },
    imagesrc: {
      type: String
    },
    showtoprighttips: {
      type: Boolean,
      default: true
    },
    toprighticonclass: {
      type: String
    },
    toprighttitle: {
      type: String
    },
    showbottomtips: {
      type: Boolean,
      default: true
    },
    bottomtips: {
      type: String
    },
    showbottomtitle: {
      type: Boolean,
      default: true
    },
    bottomtitle: {
      type: String
    },
    listwidth: {
      type: String
    },
    item: {
    },
    agent: '',
    time: ''
  },
  methods: {
    showVolice(e) { // 点击播放
      const index = this.swiperIndex
      let target = e.target
      let list = JSON.parse(target.getAttribute('songlist'))
      console.log('--------播放详情--------')
      console.log(list)
      store.dispatch('set_Voice',{id: 123})

    }
  },
  computed: {
    formartTopRight () {
      const numberInfo = Number(this.toprighttitle)
      return numberInfo > 10000 ? `${Math.floor(numberInfo / 10000)}万` : numberInfo
    }
  },
  template: tpl
})
