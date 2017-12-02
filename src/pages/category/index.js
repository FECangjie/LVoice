/**
 * @file: 分类页
 * @author: yanfangyao01@lianjia.com
 */
import Vue from 'vue'
import './style.less'
// import musicsheet from '../musicsheet/musicsheet.vue'
import typelist from '../typelist'
// import menulist from '../menulist'
import tpl from './tpl.vtpl'

export default Vue.component('category', {
    data() {
        return {
            icon: 'icon',
            list: [{
                    title: '购房',
                    subitem: [{
                            jumplink: '/lvoice/category',
                            iconName: 'icon-coin',
                            subtitle: '万链专栏'
                        },
                        {
                            jumplink: '/lvoice/category',
                            iconName: 'icon-coin',
                            subtitle: '装修大实话'
                        }
                    ]
                },
                {
                    title: '装修',
                    subitem: [{
                            jumplink: '/lvoice/category',
                            iconName: 'icon-coin',
                            subtitle: '贷款'
                        },
                        {
                            jumplink: '/lvoice/category',
                            iconName: 'icon-coin',
                            subtitle: '置业'
                        },
                        {
                            jumplink: '/lvoice/category',
                            iconName: 'icon-coin',
                            subtitle: '投资'
                        }, {
                            jumplink: '/lvoice/category',
                            iconName: 'icon-coin',
                            subtitle: '看房'
                        }
                    ]
                },
                {
                    title: '特色',
                    subitem: [{
                            jumplink: '/lvoice/category',
                            iconName: 'icon-coin',
                            subtitle: '贷款'
                        },
                        {
                            jumplink: '/lvoice/category',
                            iconName: 'icon-coin',
                            subtitle: '置业'
                        },
                        {
                            jumplink: '/lvoice/category',
                            iconName: 'icon-coin',
                            subtitle: '投资'
                        }, {
                            jumplink: '/lvoice/category',
                            iconName: 'icon-coin',
                            subtitle: '看房'
                        }
                    ]
                }
            ]
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