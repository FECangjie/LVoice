// 路由
import Vue from 'vue'

import homePage from './pages/home'
import Recommend from './pages/home/recommend'
import category from './pages/home/category'
import listPage from './pages/list'
import ErrorPage from './pages/error'
import nice from './pages/home/nice'
import listPage2 from './pages/listPage'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [{
            path: '/',
            component: homePage,
            redirect: '/lvoice/recommend'
        },
        {
            path: '/lvoice',
            component: homePage,
            children: [{
                    path: '',
                    redirect: '/lvoice/recommend'
                },
                {
                    path: '/lvoice/recommend',
                    component: Recommend
                },
                {
                    path: '/lvoice/category',
                    component: category
                },
                {
                    path: '/lvoice/nice',
                    component: nice
                }
            ]
        },
        {
            path: '/list',
            component: listPage
        },
        {
            path: '/error',
            component: ErrorPage
        },
        {
            path: '/lvoice/now',
            component: listPage2
        }
    ]
})