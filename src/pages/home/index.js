/**
 * @file: 首页
 * @author: qinchao@lianjia.com
 */
import Vue from 'vue'
import './style.less'
import findrecommend from './findrecommend'
	// import findsheet from '../findsheet/findsheet.vue'
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
			findrecommend: findrecommend,
			// findsheet: findsheet
		}
  },
  created () {
  },
  template: tpl
})
