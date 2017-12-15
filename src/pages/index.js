/**
 * @file: 整体音乐控制
 * @author: qinchao@lianjia.com
 */
import Vue from 'vue'
import tpl from './tpl.vtpl'
import './style.less'
import axios from 'axios'
import store from 'store'
import { router } from '../router.js'
import { MessageBox } from 'mint-ui';

import header from 'components/header'
import bottombar from 'components/bottomControl'
import voicedetail from 'pages/volice'
import menulist from 'pages/menulist'
import musiclist from 'pages/volice/musiclist'
import searchdetail from 'pages/search'

import sidebar from 'components/header'
import mymusic from 'components/header'
import musicdetail from 'components/header'
import songsheet from 'components/header'

import host from 'common/host'

window.env = location.port == '8080' ? 'dev' : 'prod'

let musicLrcIndex = 0 // 播放控制

export default Vue.component('app', {
  data () {
    return {
      info: {},
      msg: 'Coco',
      loading: true // 加载
    }
  },
  methods: {
    // 音频播放结束事件
    musicEnded () {
      store.dispatch('play_Ended')
      // 歌词初始化
      musicLrcIndex = 0
      store.commit({
        type: 'setLyricIndex',
        index: 0
      })
    },
    // 音乐播放时间更新事件
    musicTimeUpdate () {
      store.dispatch({
        type: 'set_CurrentTime',
        time: Math.floor(this.$refs.audio.currentTime)
      })

      // 设置歌词内容(以索引的形式显示,主要是)
      let musicLrc = store.getters.getCurrentMusic.lyric
      let currentTime = Math.floor(this.$refs.audio.currentTime)

      if (!(musicLrc && musicLrc[musicLrcIndex])) return
      if (musicLrc.length === 0) {
        store.commit({
          type: 'setLyricIndex',
          index: -1
        })
        return
      }
      for (let i = 0; i < musicLrc.length; i++) {
          if (currentTime >= Number(musicLrc[musicLrcIndex].timeId)) {
            musicLrcIndex += 1
            // return
            break
          } else {
            if (musicLrcIndex <= 0) {
              musicLrcIndex = 0
            } else {
              musicLrcIndex--
            }
          }
      }
        store.commit({
          type: 'setLyricIndex',
          index: musicLrcIndex
        })
    },
    // 可以播放事件
    musicCanPlay () {
      store.dispatch({
        type: 'set_MusicDuration',
        duration: Math.floor(this.$refs.audio.duration)
      })
      store.commit({
        type: 'setMusicLoadStart',
        isloadstart: false
      })
    },
    // 音乐处于播放状态
    musicOnPlaying () {
      store.commit('play')
    },
    // 音乐处于watting状态
    musicOnWaiting () {
      // alert('音乐加载中')
    },
    // 音乐处于暂停状态
    musicOnPause () {
      store.commit('pause')
    },
    // 音乐加载
    loadStart () {
      store.commit({
        type: 'setMusicLoadStart',
        isloadstart: true
      })
    }
  },
  components: {
    'v-header': header,
    // 'side-bar': sidebar,
    'bottom-bar': bottombar,
    // 'my-music': mymusic,
    'menu-list': menulist,
    'music-list': musiclist,
    'music-detail': voicedetail,
    'search-detail': searchdetail
    // 'song-sheet': songsheet
  },
  created () {
    let me = this
    let LocalAPI = '/data.json'
    let tuijianAPI = host() + '/voice/tuijian.json'
    if (window.location.pathname.indexOf('error') > -1) {
      return
    }

    axios.get(tuijianAPI).then((res) => { // 推荐
        setTimeout(function(){
          me.loading = false
        }, 500)

        let data = res.data
        let list = []
        let obj = {}
        obj = {
          url: data.moren_mp3,
          tupian_url: data.moren_tupian,
          zhubo_name: data.moren_name,
          biaoti: data.moren_cn,
        }
        // 把所有的音乐数据给vuex的musicAllList
        store.dispatch('set_Voice', {uuid: data.moren_id, noShow: true})
        // store.dispatch('set_MusicList', {list: [obj]})
        // 所有的数据存起来  包括音乐个人信息 等等
        store.dispatch('set_AllInfo', res.data)
        // 设置音乐的地址  初始化 根据vuex的currentIndex来决定
        this.$refs.audio && this.$refs.audio.setAttribute('src',data.moren_mp3 || store.getters.getCurrentMusic.mp3_url || store.getters.getCurrentMusic.url)

        store.dispatch('set_TuijianList', res.data)
        // 给audio元素存在vuex 的state里面  方便日后调用
        store.dispatch('set_AudioElement', this.$refs.audio)
    }, (err) => {
        MessageBox.alert(err, '请求失败').then(() => {
        store.commit('setErrorMsg',{
          errorMsg: '网络出错啦～'
        })
        router.push('/error')
      })
    })
  },
  template: tpl
})
