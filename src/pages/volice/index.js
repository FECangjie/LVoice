/**
 * @file: 播放详情页
 * @author: qinchao@lianjia.com
 */
import Vue from 'vue'
import './style.less'
import tpl from './tpl.vtpl'

import axios from 'axios'
import store from 'store'
import range from 'pages/range'
import list from 'pages/listPage'
import { MessageBox } from 'mint-ui';

export default Vue.component('volice', {
  data () {
    return {
      isPlay: false,
      showCD: true,
      scrollTop: 0,
      currentLrcIndex: 0
    }
  },
  methods: {
    hideMusicDetail () {
      store.dispatch({
        type: 'set_MusicDetail',
        isShow: false
      })
      this.showCD = true
    },
    playPause () {
      // 控制音乐播放暂停
      store.commit('togglePlay')
    },
    playNext () {
      store.dispatch('play_Next')
    },
    playPrev () {
      store.dispatch('play_Prev')
    },
    // 显示音乐列表
    showMusicList () {
      let scrollTop = (this.$store.getters.getCurrentIndex + 1 - 3) * 42
      store.dispatch({
        type: 'set_ScrollTop',
        scrollTop: scrollTop
      })
      store.dispatch('showMusicList')
    },
    // 设置播放类型
    setPlayType () {
      store.dispatch('set_PlayType')
    },
    isShowCD (bool) {
      this.showCD = bool
    },
    showVolice(e) { // 点击播放
      const index = this.swiperIndex
      let target = e.target
      let list = JSON.parse(target.getAttribute('songlist'))
      console.log('--------播放详情--------')
      console.log(list)
      store.dispatch('set_Voice',{uuid: list.uuid})

    },
    showShare() {
      MessageBox.alert('地址链接：' + location.href, '爱是分享').then(() => {

      })
    }
  },
  computed: {
    isShowMusicDetail () {
      return this.$store.getters.getMusicDetail
    },
    isPlaying () {
      this.isPlay = this.$store.getters.getIsPlaying
      return this.$store.getters.getIsPlaying ? this.$store.getters.getIsPlaying : ''
    },
    getCurrentMusic () {
      return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic : ''
    },
    musicPlayType () {
      let playType = this.$store.getters.getMusicPlayType ? this.$store.getters.getMusicPlayType : -1
      let className = ''
      switch (playType) {
        case 1:
          className = 'icon1-music-shunxu'
          break
        case 2:
          className = 'icon1-music-danqu1'
          break
        case 3:
          className = 'icon1-music-random'
          break
        default:
          className = ''
      }
      return className
    },
    musicCurrentLrc () {
      let currentMusic = this.$store.getters.getCurrentMusic
      let lrcIndex = this.$store.getters.getLyricIndex ? this.$store.getters.getLyricIndex : 0
      if (currentMusic.lyric.length) {
        return lrcIndex === -1 ? '加载中...' : currentMusic.lyric[lrcIndex].text
      } else {
        return '暂无歌词'
      }
    },
    lrcIndex () {
      return this.$store.getters.getLyricIndex ? this.$store.getters.getLyricIndex : 0
    },
    tuijian () {
      return this.$store.getters.getVoiceTuijian || {}
    },
  },
  watch: {
    isPlay: function (newisPlay, oldisPlay) {
      if (newisPlay !== true) {
        let imageTrans = getComputedStyle(this.$refs.cd).transform
        let contentTrans = getComputedStyle(this.$refs.cdcontent).transform
        this.$refs.cdcontent.style.transform = contentTrans === 'none' ? imageTrans : imageTrans.concat('', contentTrans)
      }
    },
    showCD: function (newisPlay, oldisPlay) {
      if (newisPlay !== true) {
        if (this.currentLrcIndex >= 0 && document.getElementsByClassName('musiclrc')[this.currentLrcIndex]) {
          let height = this.$refs.lrc.offsetHeight
          let top = document.getElementsByClassName('musiclrc')[this.currentLrcIndex].offsetTop
          this.scrollTop = top - height / 2
        }
      }
    },
    lrcIndex: function (newisPlay, oldisPlay) {
      this.currentLrcIndex = newisPlay
      if (document.getElementsByClassName('musiclrc')[newisPlay]) {
        let height = this.$refs.lrc.offsetHeight
        let top = document.getElementsByClassName('musiclrc')[newisPlay].offsetTop
        this.scrollTop = top - height / 2
      }
    }
  },
  components: {
    list,
    'range': range // 进度条
  },
  mounted () {
    let _this = this
    setInterval(function () {
      if (_this.currentLrcIndex >= 0 && document.getElementsByClassName('musiclrc')[_this.currentLrcIndex]) {
        let height = _this.$refs.lrc.offsetHeight
        let top = document.getElementsByClassName('musiclrc')[_this.currentLrcIndex].offsetTop
        _this.scrollTop = top - height / 2
      }
    }, 2000)
  },
  created() {
  },
  template: tpl
})
