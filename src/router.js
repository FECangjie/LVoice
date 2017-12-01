// 路由
import Vue from 'vue'

import homePage from './pages/home'
import Recommend from './pages/home/recommend'
import minePage from './pages/mine'
import listPage from './pages/list'
import ErrorPage from './pages/error'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
  		{
          path:'/',
          component: homePage,
          redirect: '/lvoice/recommend'
      },
      {
          path:'/lvoice',
          component: homePage,
          children: [{
            path: '',
            redirect: '/lvoice/recommend'
            },
            {
              path: '/lvoice/recommend',
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
      {
          path:'/error',
          component: ErrorPage
      },
  ]
})
