import Vue from 'vue'
import Vuex from 'vuex'
import Sidebar from './modules/sidebar.js'
import AudioInfo from './modules/audio.js'
import MenuList from './modules/menulist.js'
import MusicList from './modules/musiclist.js'
import Reconmmed from './modules/reconmmend.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    allInfo: [],
    errorMsg: ''
  },
  getters: {
    getAllInfo: state => state.allInfo,
    // 获取推荐歌单信息
    getFindMusic: state => state.musicAllList.findmusic
  },
  mutations: {
    setAllInfo (state, obj) {
      state.allInfo = obj
    },
    setErrorMsg (state, obj) {
      state.errorMsg = obj.errorMsg
    }
  },
  actions: {
    set_AllInfo ({ commit }, obj) {
      commit('setAllInfo', obj)
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
