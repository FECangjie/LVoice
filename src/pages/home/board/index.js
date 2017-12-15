/**
 * @file: 单独列表页
 * @author: yanfangyao01@lianjia.com
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import store from 'store'
import './style.less'
import tpl from './tpl.vtpl'

export default Vue.component('board', {
    data() {
        return {
            list: []
        }
    },
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
            default: false
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
    methods: {
        showVoice(e) { // 点击播放
          let target = e.target
          store.dispatch('set_Voice',{uuid: target.getAttribute('uuid')})
        },
        formartTime (time) {
          return moment(this.time).format('YYYY-MM-DD')
        }
    },
    computed: {
        formartTopRight() {
            const numberInfo = Number(this.toprighttitle)
            return numberInfo > 10000 ? `${Math.floor(numberInfo / 10000)}万` : numberInfo
        }
    },
    created() {
        let api = '/voice/rank_list.json'
        axios.get(api, {}).then((res) => {
            if (res.data) {
                this.list = res.data.rank_list;
                console.log(this.list);
            }
        })
    },
    template: tpl
})
