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
                    title: '中文',
                    subitem: [{
                            iconName: 'icon-bullhorn',
                            subtitle: '中国风'
                        },
                        {
                            iconName: 'icon-bullhorn',
                            subtitle: '五月天'
                        },
                        {
                            iconName: 'icon-bullhorn',
                            subtitle: '失恋必备'
                        }
                    ]
                },
                {
                    title: '欧美',
                    subitem: [{
                            iconName: 'icon-pacman',
                            subtitle: '烟卷'
                        },
                        {
                            iconName: 'icon-pacman',
                            subtitle: '酷玩'
                        }
                    ]
                },
                {
                    title: '二次元',
                    subitem: [{
                            iconName: 'icon-headphones',
                            subtitle: '颅内xxoo'
                        },
                        {
                            iconName: 'icon-headphones',
                            subtitle: 'x君和o酱'
                        },
                        {
                            iconName: 'icon-headphones',
                            subtitle: '呀咩爹'
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
