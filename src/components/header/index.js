/**
 * @file: nav
 * @author: qinchao@lianjia.com
 */
import Vue from 'vue'
import tpl from './header.vue'
import './style.less'
const prefix = 'com-header'

export default Vue.component('Com-header', {
  data () {
    return {
      activeIndex: '1',
      isLoading: true,
      msg: ''
    }
  },
  methods: {
     handleSelect(key, keyPath) { // nav select
     }
   },
  created () {

  },
  template: tpl
})
