/**
 * @file: nav
 * @author: qinchao@lianjia.com
 */
import Vue from 'vue'
import tpl from './tpl.vtpl'
import './style.less'

import store from 'store'
import { mapState, mapMutations, mapActions } from 'vuex'

export default Vue.component('v-header', {
  props: {
    index: {
      type: Number,
      default: 0
    },
    showMenu: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectIndex: this.index,
      isShowMenu: this.showMenu
    }
  },

  methods: {
    // showMueu () {
    //   store.dispatch({
    //     type: 'showSideBar'
    //   })
    // },
    // hideMenu () {
    //   store.dispatch({
    //     type: 'hideSideBar'
    //   })
    // },
    //
    // ...mapMutations({
    //   adds: 'increment'
    // }),
    //
    // ...mapActions({}),
    // add () {
    //   this.$store.dispatch({
    //     type: 'myactionAsync',
    //     count: 10
    //   })
    // }

    // sideBar () {
    // 	alert(store.state.sideBar.isShow)
    // }
    // add () {
    // 	try {
    // 		store.dispatch({
    // 			type: 'myactionAsync',
    // 			count: 10
    // 		})
    // 	} catch (error) {
    // 		alert(error)
    // 	}
    // }
  },

  components: {
  },
  template: tpl
})
