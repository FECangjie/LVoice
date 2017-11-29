// 路由
import Vue from 'vue'

import homePage from './pages/home'
import Recommend from './pages/home/findrecommend'
import minePage from './pages/mine'
import listPage from './pages/list'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
  		{
          path:'/',
          component: homePage
      },
      {
          path:'/findvoice',
          component: homePage,
          children: [{
            path: '',
            redirect: '/findvoice/recommend'
            },
            {
              path: '/findvoice/recommend',
              component: Recommend
          }]
      },
      {
          path:'/mine',
          component: minePage
      },
      {
          path:'/list',
          component: listPage
      },
  ]
})
