// 路由
import Vue from 'vue'

import homePage from './pages/home'
import Recommend from './pages/home/recommend'
import category from './pages/home/category'
import listPage from './pages/list'
import ErrorPage from './pages/error'
import nice from './pages/home/nice'
import listPage2 from './pages/listPage'
import board from './pages/home/board'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [{
            path: '/',
            component: homePage,
            redirect: '/coco/recommend'
        },
        {
            path: '/coco',
            component: homePage,
            children: [{
                    path: '',
                    redirect: '/coco/recommend'
                },
                {
                    path: '/coco/recommend',
                    component: Recommend
                },
                {
                    path: '/coco/category',
                    component: category
                },
                {
                    path: '/coco/nice',
                    component: nice
                },
                {
                    path: '/coco/rank',
                    component: board
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
            path: '/coco/now',
            component: listPage2
        }
    ]
})
