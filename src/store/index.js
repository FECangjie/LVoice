import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import Sidebar from './modules/sidebar.js'
import AudioInfo from './modules/audio.js'
import MenuList from './modules/menulist.js'
import MusicList from './modules/musiclist.js'
import Reconmmed from './modules/reconmmend.js'
import host from 'common/host'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    allInfo: [],
    errorMsg: '',

    tuijian: {}
  },
  getters: {
    getAllInfo: state => state.allInfo,
    getTuijian: state => state.tuijian,
    // 获取推荐歌单信息
    getFindMusic: state => state.musicAllList.findmusic
  },
  mutations: {
    setAllInfo (state, obj) {
      state.allInfo = obj
    },
    setErrorMsg (state, obj) {
      state.errorMsg = obj.errorMsg
    },
    setTuijianList(state, obj) {
      state.tuijian = obj
    }
  },
  actions: {
    set_AllInfo ({ commit }, obj) {
      commit('setAllInfo', obj)
    },
    set_TuijianList ({ commit }, obj) {
      commit('setTuijianList', obj)
    },
    set_Voice({ commit }, obj) {
      const bofangAPI = host() + '/bofang.json'
      axios.get(bofangAPI, {params:obj}).then((res) => { // 播放信息
        if (res.data) {
          let list = res.data
          list.url = list.mp3_url
          store.commit({
            type: 'setMusicList',
            list: [list]
          })
          store.commit({
            type: 'playIndex',
            index: 0
          })
          store.dispatch({
            type: 'set_MusicDetail',
            isShow: true
          })
        } else {

        }
      }, (err) => {
          MessageBox.alert(err, '请求失败').then(() => {
          store.commit('setErrorMsg',{
            errorMsg: '网络出错啦～'
          })
          router.push('/error')
        })
      })
    },
    // 分类页发送ajax请求
    set_Category({ commit }, obj) {
      const catlistAPI = 'http://172.30.13.76:12101/voice/fenlei_list'
      axios.get(catlistAPI, { params: obj }).then((res) => {
        if (res.data) {
          console.log('请求成功')
        } else {

        }
      }, (err) => {
         MessageBox.alert(err, '请求失败').then(() => {
          store.commit('setErrorMsg',{
            errorMsg: '网络出错啦～'
          })
          router.push('/error')
        })
      })
    }
  },

  modules: {
    sideBar: Sidebar, // 轮播图
    audioInfo: AudioInfo, // 播放信息
    menuList: MenuList, // 列表
    musiclist: MusicList, // 列表
    reconmmed: Reconmmed // 推荐
  }
})

export default store
