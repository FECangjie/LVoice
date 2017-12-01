/**
 * @file: 核心文件
 * @author: qinchao@lianjia.com
 */
import Vue from 'vue'
import App from './pages'
import Axios from 'axios'
import Fetch from 'common/fetch.js'

import { router } from './router.js'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/styles/reset.css'
import './assets/styles/index.css'

window.$http = Axios.create({
  baseURL: '/',
  timeout: 25000
})

Vue.config.devtools = true
Vue.config.debug = true // 开启错误提示
Vue.use(MintUI)
//
// router.beforeEach((to, from, next) => { // 路由钩子（登陆等）
//     next();
// })

new Vue({
  store,
  router,
  el: '#root',
  render: h => h(App)
})
