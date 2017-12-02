/**
 * @file: 优选
 * @author: yanfangyao01@lianjia.com
 */
import Vue from 'vue'
import store from 'store'
import './style.less'
import tpl from './tpl.vtpl'
import list from 'pages/listPage'

export default Vue.component('nice', {
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
        },
        list () {
          return this.$store.getters.getTypeList || []
        },
        key() {
          return this.$store.getters.getKey || ''
        }
    },
    components: {
        list,
    },
    template: tpl
})
