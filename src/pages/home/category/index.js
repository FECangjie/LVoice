/**
 * @file: 分类页
 * @author: yanfangyao01@lianjia.com
 */
import Vue from 'vue'
import './style.less'
import tpl from './tpl.vtpl'

export default Vue.component('category', {
    data() {
        return {
            icon: 'icon',
            list: [{
                    title: '购房',
                    subitem: [{
                            jumplink: '/lvoice/category/detail/detail',
                            iconName: 'icon-coin',
                            subtitle: '投资置业'
                        },
                        {
                            jumplink: '/lvoice/category/detail',
                            iconName: 'icon-coin',
                            subtitle: '刚需必知'
                        },
                        {
                            jumplink: '/lvoice/category/detail',
                            iconName: 'icon-coin',
                            subtitle: '换房套路'
                        }
                    ]
                },
                {
                    title: '装修',
                    subitem: [{
                            jumplink: '/lvoice/category/detail',
                            iconName: 'icon-coin',
                            subtitle: '万链专栏'
                        },
                        {
                            jumplink: '/lvoice/category/detail',
                            iconName: 'icon-coin',
                            subtitle: '装修大实话'
                        }
                    ]
                },
                {
                    title: '特色',
                    subitem: [{
                            jumplink: '/lvoice/category/detail',
                            iconName: 'icon-coin',
                            subtitle: '地产知识'
                        },
                        {
                            jumplink: '/lvoice/category/detail',
                            iconName: 'icon-coin',
                            subtitle: '楼市快报'
                        },
                        {
                            jumplink: '/lvoice/category/detail',
                            iconName: 'icon-coin',
                            subtitle: '马红下班时光'
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