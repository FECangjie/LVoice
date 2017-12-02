/**
 * @file: 分类页
 * @author: yanfangyao01@lianjia.com
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import store from 'store'
import './style.less'
import tpl from './tpl.vtpl'
import { router } from '../../../router'

Vue.use(Vuex)

export default Vue.component('category', {
    data() {
        return {
            icon: 'icon',
            list: [{
                    title: '购房',
                    subitem: [{
                            iconName: 'icon-database',
                            subtitle: '投资置业'
                        },
                        {
                            iconName: 'icon-bullhorn',
                            subtitle: '刚需必知'
                        },
                        {
                            iconName: 'icon-shield',
                            subtitle: '换房套路'
                        }
                    ]
                },
                {
                    title: '装修',
                    subitem: [{
                            iconName: 'icon-newspaper',
                            subtitle: '万链专栏'
                        },
                        {
                            iconName: 'icon-pacman',
                            subtitle: '装修大实话'
                        }
                    ]
                },
                {
                    title: '特色',
                    subitem: [{
                            iconName: 'icon-home2',
                            subtitle: '地产知识'
                        },
                        {
                            iconName: 'icon-office',
                            subtitle: '楼市快报'
                        },
                        {
                            iconName: 'icon-headphones',
                            subtitle: '马红下班时光'
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        sendAjax(evt) {
            let target = evt.target
            store.dispatch('set_Category', { pindao_type: target.getAttribute('ajaxParam'),key: target.getAttribute('ajaxParam')})
        }
    },
    computed: {
        formartTopRight() {
            const numberInfo = Number(this.toprighttitle)
            return numberInfo > 10000 ? `${Math.floor(numberInfo / 10000)}万` : numberInfo
        }
    },
    template: tpl
})
