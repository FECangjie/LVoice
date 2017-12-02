/**
 * @file: 音乐播放列表
 * @author: qinchao@lianjia.com
 */
import Vue from 'vue'
import './style.less'
import tpl from './tpl.vtpl'

import axios from 'axios'
import store from 'store'
import typelist from 'pages/typelist'

export default Vue.component('voice-play-list', {
  data () {
    return {
      typeName: ''
    }
  },
  methods: {
    hideMusicList () {
      store.dispatch({
        type: 'hideMusicList'
      })
    },
    playIndex (index) {
      store.dispatch({
        type: 'play_Index',
        index: index
      })
      store.dispatch({
        type: 'hideMusicList'
      })
    },
    setPlayType () {
      store.dispatch('set_PlayType')
    }
  },
  computed: {
    isShowMusicList () {
      return this.$store.getters.getIsShowMusicList
    },
    musiclist () {
      return this.$store.getters.getMusicList
    },
    getCurrentIndex () {
      return this.$store.getters.getCurrentIndex
    },
    getScrollTop () {
      return this.$store.getters.getScrollTop
    },
    musicPlayType () {
      let playType = this.$store.getters.getMusicPlayType ? this.$store.getters.getMusicPlayType : -1
      let className = ''
      switch (playType) {
        case 1:
          className = 'icon1-music-shunxu'
          this.typeName = '列表循环'
          break
        case 2:
          className = 'icon1-music-danqu1'
          this.typeName = '单曲循环'
          break
        case 3:
          className = 'icon1-music-random'
          this.typeName = '随机播放'
          break
        default:
          className = ''
      }
      return className
    }
  },
  mounted () {
    store.dispatch({
      type: 'set_RefScrollMusicList',
      refs: this.$refs.musiclistContent
    })
  },
  template: tpl
})
