import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import Sidebar from './modules/sidebar.js'
import AudioInfo from './modules/audio.js'
import MenuList from './modules/menulist.js'
import MusicList from './modules/musiclist.js'
import Reconmmed from './modules/reconmmend.js'
import host from 'common/host'
import { router } from '../router.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    allInfo: [],
    errorMsg: '',

    tuijian: [],
    voiceTuijian: [],
    typeList: [],
    key: '优先筛选您的最爱，快去筛选吧～'
  },
  getters: {
    getAllInfo: state => state.allInfo,
    getTuijian: state => state.tuijian,
    getVoiceTuijian: state => state.voiceTuijian,
    // 获取推荐歌单信息
    getFindMusic: state => state.musicAllList.findmusic,
    getTypeList: state => state.typeList,
    getKey: state => state.key
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
    },
    setVoiceTuijianList(state, obj) {
      state.voiceTuijian = obj
    },
    // 列表信息
		setTypeList (state, obj) {
			state.typeList = obj.list
		},
    setKey (state, obj) {
			state.key = obj.key
		}
  },
  actions: {
    set_AllInfo ({ commit }, obj) {
      commit('setAllInfo', obj)
    },
    set_TuijianList ({ commit }, obj) {
      commit('setTuijianList', obj)
    },
    set_VoiceTuijianList ({ commit }, obj) {
      commit('setVoiceTuijianList', obj)
    },
    set_Voice({ commit }, obj) {
      const bofangAPI = host() + '/voice/play.json'
      axios.get(bofangAPI, {params:{uuid: obj.uuid}}).then((res) => { // 播放信息
        if (res.data) {
          let list = res.data.detail
          list.url = list.mp3_url
          store.commit({
            type: 'setMusicList',
            list: list
          })
          store.commit({
            type: 'setVoiceTuijianList',
            list: res.data.others || []
          })
          if (!obj.noShow) {
            store.commit({
              type: 'playIndex',
              index: 0
            })
            store.dispatch({
              type: 'set_MusicDetail',
              isShow: true
            })
          }

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
      const catlistAPI = host() + '/voice/fenlei_list.json'
      axios.get(catlistAPI, { params: {pindao_type: obj.pindao_type} }).then((res) => {
        if (res.data) {
          store.commit({
            type: 'setTypeList',
            list: res.data.fenlei_list || []
          })
          store.commit({
            type: 'setKey',
            key: obj.key
          })
          router.push('/coco/nice');
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
