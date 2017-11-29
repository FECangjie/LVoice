/**
 * @file: 分类列表
 * @author: qinchao@lianjia.com
 */
import Vue from 'vue'
import tpl from './tpl.vtpl'
import './style.less'
const prefix = 'type-list'

export default Vue.component('type-list', {
  props: {
    name: {
      type: String,
      default: '未曾遗忘的青春'
    },
    count: {
      type: String,
      default: '1'
    },
    hasBorder: {
      type: Boolean,
      default: true
    },
    playing: {
      type: Boolean,
      default: false
    },
    iconinfo: {
      type: String
    },
    bgcolor: {
      type: String,
      default: '#f7f7f7'
    }
  },
  data () {
    return {
      listName: '',
      listCount: '0',
      showBorder: true,
      isPlaying: false,
      iconInfo: '',
      typelistbg: ''
    }
  },
  methods: {
    alert1 () {
      alert('test')
    }
  },
  computed: {
    showCount () {
      return this.count !== 'none'
    }
  },
  created () {
    this.listName = this.name
    this.listCount = this.count
    this.showBorder = this.hasBorder
    this.isPlaying = this.playing
    this.iconInfo = this.iconinfo
    this.typelistbg = this.bgcolor
  },
  template: tpl
})
