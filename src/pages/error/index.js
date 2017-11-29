/**
 * @file: 首页
 * @author: qinchao@lianjia.com
 */
import Vue from 'vue'
import './style.less'
import tpl from './tpl.vtpl'

export default Vue.component('ErrorPage', {
  data () {
    return {
      isLoading: true,
      errorTip: '请在电脑端预览'
    }
  },
  created () {
    let me = this
  },
  template: tpl
})
