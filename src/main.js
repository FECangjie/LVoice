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

(function(win, doc) {
    var isIOS = win.navigator.appVersion.match(/iphone/gi);
    var isAndorid = win.navigator.appVersion.match(/android/gi);
    var deviceDpr = win.devicePixelRatio;
    var setDpr = 1;
    var scale = 1;
    var rootEle = doc.documentElement;
    var viewport = doc.querySelector('meta[name="viewport"]');

    // 只针对ios进行处理
    if (isIOS) {
        if (deviceDpr >= 3) {
            setDpr = 3;
        } else if (deviceDpr >= 2) {
            setDpr = 2;
        } else {
            setDpr = 1;
        }
    } else {
        // 对安卓及其他设备设置dpr为1
        setDpr = 1;
    }
    scale = 1 / setDpr;
    scale = 1
    setDpr = 1

    if (!viewport) {

        viewport = doc.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        viewport.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=' + 'no, uc-fitscreen=yes');

        if (!rootEle.firstElementChild) {
            var wrapper = doc.createElement('div');
            wrapper.appendChild(viewport);
            doc.write(wrapper.innerHTML);
        } else {
            rootEle.firstElementChild.appendChild(viewport);
        }

    } else {
        // 如果页面已经设置了viewport，则对viewport进行更改
        viewport.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no, uc-fitscreen=yes');
    }
    rootEle.setAttribute('style', 'font-size: ' + 16 * setDpr + 'px;');
    window.DPR = setDpr;

})(window, window.document);

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
