/**
 * @file: 页面框架
 * @author: qinchao@lianjia.com
 */
import Vue from 'vue'
import tpl from './tpl.vtpl'
import './style.less'

export default Vue.component('IndexPage', {
  data () {
    return {
      activeIndex: '1',
      isLoading: true,
      msg: '',
      name: ''
    }
  },
  methods: {
  },
  created () {
    // let me = this
    // me.msg = 'GO!'
    // if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) && location.pathname.indexOf('error') === -1){
    //   window.location.href = window.location.href+'error'
    // }
  },
  template: tpl
})
