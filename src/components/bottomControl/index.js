/**
 * @file: nav
 * @author: qinchao@lianjia.com
 */
import Vue from 'vue'
import tpl from './tpl.vtpl'
import './style.less'

import store from 'store'

export default Vue.component('v-header', {
  data () {
    return {
      audioInfo: {
      },
      myaudio: {},
      state: {
        isplaying: false,
        loading: false,
        currentIndex: 0
      }
    }
  },
  methods: {
    // 控制音乐播放暂停
    playpause () {
      store.commit('togglePlay')
    },
    // 显示播放列表
    showMusicList () {
      let scrollTop = (this.$store.getters.getCurrentIndex + 1 - 3) * 42
      store.dispatch({
        type: 'set_ScrollTop',
        scrollTop: scrollTop
      })
      store.dispatch('showMusicList')
    },
    playNext () {
      store.dispatch('play_Next')
    },
    showMusicDetail () {
      store.dispatch({
        type: 'set_MusicDetail',
        isShow: true
      })
    }
  },
  computed: {
    iconPlayPause () {
      return this.audioInfo.playing
    },
    // 获取音乐名称
    musicName () {
      return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic.biaoti_cn : ''
    },
    // 获取歌手名称
    musicSinger () {
      return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic.user_name : ''
    },
    // 获取音乐封面地址
    musicImage () {
      return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic.tupian_url : ''
    },
    // 获取音乐播放地址
    musicUrl () {
      return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic.mp3_url : ''
    }
  },
  mounted () {
    // 所有的audio的 vuex 的状态信息
    this.audioInfo = this.$store.state.audioInfo
    // 音乐是否play
    this.state.isplaying = this.audioInfo.playing
  },
  template: tpl
})
