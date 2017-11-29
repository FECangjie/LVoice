/**
 * @file: 首页
 * @author: qinchao@lianjia.com
 */
import Vue from 'vue'
import './style.less'
// import musicsheet from '../musicsheet/musicsheet.vue'
import typelist from '../typelist'
// import menulist from '../menulist'
import tpl from './tpl.vtpl'

export default Vue.component('list', {
  data () {
    return {
      isLoading: true,
      errorTip: '',
      type: ''
    }
  },
  computed: {
    items () {
      return this.$store.getters.getMusicAllList.sheets
    }
  },
  components: { // 子组件
    'type-list': typelist,
    // musicsheet,
    // 'menu-list': menulist
  },
  created () {
  },
  template: tpl
})
