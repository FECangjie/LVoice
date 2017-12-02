/**
 * @file: 单独列表页
 * @author: yanfangyao01@lianjia.com
 */
import Vue from 'vue'
import './style.less'
import tpl from './tpl.vtpl'

export default Vue.component('board', {
    props: {
        listpadding: {
            type: String,
            default: '0'
        },
        imagesrc: {
            type: String
        },
        showtoprighttips: {
            type: Boolean,
            default: true
        },
        toprighticonclass: {
            type: String
        },
        toprighttitle: {
            type: String
        },
        showbottomtips: {
            type: Boolean,
            default: true
        },
        bottomtips: {
            type: String
        },
        showbottomtitle: {
            type: Boolean,
            default: true
        },
        bottomtitle: {
            type: String
        },
        listwidth: {
            type: String
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