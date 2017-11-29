/**
 * @file: 登录
 * @author: qinchao@lianjia.com
 */
import Vue from 'vue'
import './style.less'
import tpl from './tpl.vtpl'
import Url from 'common/url.js'
import { MessageBox } from 'mint-ui';

export default Vue.component('login', {
  data () {
    return {
      uc_id: Url.query('uc_id') || 'null',
      device_id: Url.query('device_id') || 'null',
      btuText: '进入',
      loading: false
    }
  },

  methods: {
    login () {
      let me = this
      if (!me.name) {
         MessageBox.alert('昵称不能为空。', '请输入昵称')
      } else {
        me.loading = true
        me.btuText = '正在进入'
        setTimeout (item => {
          window.location.href = '/home?'
        }, 3000)
      }
    }
  },
  mounted() {
    let me = this
    $http.get('/data.json', {
      params: {
        user: 'xbb'
      }
    }).then(
      (res) => {
        let result = res.data
        if (result.code === 1) {
          this.restaurants = result.data.name
        }
      }
    )
  },
  beforeUpdate() {
  },
  updated() {
  },
  created() {

  },
  template: tpl
})
