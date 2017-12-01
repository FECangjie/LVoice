// 路由
import Vue from 'vue'

import homePage from './pages/home'
import Recommend from './pages/home/recommend'
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
          path:'/list',
          component: listPage
      },
      {
          path:'/error',
          component: ErrorPage
      },
  ]
})