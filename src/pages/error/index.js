/**
 * @file: 首页
 * @author: qinchao@lianjia.com
 */
import Vue from 'vue'
import './style.less'
import tpl from './tpl.vtpl'
import store from 'store'

export default Vue.component('ErrorPage', {
  data () {
    return {
      isLoading: true,
      title: '出错啦！',
      msg: ''
    }
  },
  created () {
    let me = this
    this.msg = this.$store.state.errorMsg
  },
  template: tpl
})
