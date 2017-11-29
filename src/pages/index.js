/**
 * @file: 整体音乐控制
 * @author: qinchao@lianjia.com
 */
import Vue from 'vue'
import tpl from './tpl.vtpl'
import './style.less'
import axios from 'axios'
import store from 'store'
import "../assets/styles/index.css"


import header from 'components/header'
import sidebar from 'components/header'
import bottombar from 'components/header'
import mymusic from 'components/header'
import musiclist from 'components/header'
import musicdetail from 'components/header'
import songsheet from 'components/header'


export default Vue.component('app', {
  data () {
    return {
      info: {}
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
      if (musicLrc[musicLrcIndex] === undefined) return
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
    // 'bottom-bar': bottombar,
    // 'my-music': mymusic,
    // // 'menu-list': menulist,
    // 'music-list': musiclist,
    // 'music-detail': musicdetail,
    // 'song-sheet': songsheet
  },
  created () {
    let LocalAPI = '/data.json'
    axios.get(LocalAPI).then((res) => {
      // data.user的信息赋值给info  再通过组件的数据传递传给sideBar
      this.info = res.data.user
      // 把所有的音乐数据给vuex的musicAllList
      store.dispatch('set_MusicAllList', res.data.music)
      // 所有的数据存起来  包括音乐个人信息 等等
      store.dispatch('set_AllInfo', res.data)
      // 设置音乐的地址  初始化 根据vuex的currentIndex来决定
      this.$refs.audio && this.$refs.audio.setAttribute('src', store.getters.getCurrentMusic.url)
      // 给audio元素存在vuex 的state里面  方便日后调用
      store.dispatch('set_AudioElement', this.$refs.audio)
    }, (err) => {
      alert(err)
    })
  },
  template: tpl
})
