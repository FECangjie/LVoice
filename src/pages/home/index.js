/**
 * @file: 首页
 * @author: qinchao@lianjia.com
 */
import Vue from 'vue'
import './style.less'
import recommend from './recommend'
import tpl from './tpl.vtpl'

export default Vue.component('home', {
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
    components: {
			recommend: recommend,
		}
  },
  created () {
  },
  template: tpl
})
