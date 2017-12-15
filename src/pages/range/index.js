/**
 * @file: 进度条
 * @author: qinchao@lianjia.com
 */
import Vue from 'vue'
import './style.less'
import tpl from './tpl.vtpl'

import store from 'store'
import range from 'pages/range'

let canDrag = false
let persentWidth = 0
export default Vue.component('range', {
  data () {
		return {
			type: '',
			currentcolor: '',
			ballwidth: '',
			currenttime: 0,
			volume: 0.9
		}
	},
	props: {
		// progress 和 volume  一个是显示进度样式一个是显示声音大小
		rangeType: {
			type: String,
			default: 'progress'
		},
		currentColor: {
			type: String,
			default: '#C20C0C'
		},
		ballWidth: {
			type: String,
			default: '16'
		}
	},
	computed: {
		musicCurrentTime () {
			if (this.type === 'progress') {
				return this.$store.getters.getCurrentTime ? this.$store.getters.getCurrentTime : '00:00'
			}
			if (this.type === 'volume') {
				return false
			}
		},
		musicDuration () {
			if (this.type === 'progress') {
				return this.$store.getters.getMusicDuration ? this.$store.getters.getMusicDuration : '00:00'
			}
			if (this.type === 'volume') {
				return false
			}
		},
		progressWidth () {
			if (this.type === 'progress') {
				if (this.$store.getters.getIsLoadStart) {
					return {
						'width': '0'
					}
				} else {
					return {
						'width': `calc(${(this.$store.getters.getCurrentTime / this.$store.getters.getMusicDuration * 100).toFixed(2)}%`
					}
				}
			}
			if (this.type === 'volume' && this.$store.getters.getAudioElement) {
				this.$store.getters.getAudioElement.volume = this.volume
				return {
					'width': `${this.volume * 100}%`
				}
			}
		},

		progressBall () {
			if (this.type === 'progress') {
				if (this.$store.getters.getIsLoadStart) {
					return {
						'left': 'calc(0% - 7px)'
					}
				} else {
					return {
						'left': `calc(${(this.$store.getters.getCurrentTime / this.$store.getters.getMusicDuration * 100).toFixed(2)}%)`
					}
				}
			}
			if (this.type === 'volume' && this.$store.getters.getAudioElement) {
				this.$store.getters.getAudioElement.volume = this.volume
				return {
					'left': `calc(${this.volume * 100}% - 7px)`
				}
			}
		}
	},
	methods: {
		mouseDown () {
			canDrag = true
		},
		mouseMove (event) {
			if (canDrag) {
				let e = event || window.event
				let mouseX = e.pageX
				let offsetLeft = this.$refs.duration.offsetLeft
				persentWidth = Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100)
				persentWidth = persentWidth > 100 ? 100 : persentWidth
				persentWidth = persentWidth < 0 ? 0 : persentWidth
				if (this.type === 'progress') {
					this.$refs.currentProgress.style.width = `${persentWidth}%`
					this.$refs.ball.style.left = `calc(${persentWidth}% - 7px)`
				}
				if (this.type === 'volume') {
					this.$store.getters.getAudioElement.volume = persentWidth / 100
					this.$refs.currentProgress.style.width = `calc(${persentWidth}%`
					this.$refs.ball.style.left = `calc(${persentWidth}% - 7px)`
				}
			} else {
				return
			}
		},
		mouseUp () {
			if (canDrag !== false) {
				canDrag = false
				if (this.type === 'progress') {
					if (isNaN(this.$store.getters.getAudioElement.duration)) return
					this.$store.getters.getAudioElement.currentTime = this.$store.getters.getAudioElement.duration * persentWidth / 100
				}
				if (this.type === 'volume') {
					this.$store.getters.getAudioElement.volume = persentWidth / 100
				}
			}
		},
		touchMove (event) {
			if (canDrag) {
				if (this.type === 'progress') {
					let mouseX = event.touches[0].pageX
					let offsetLeft = this.$refs.duration.offsetLeft
					persentWidth = Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100)
					persentWidth = persentWidth > 100 ? 100 : persentWidth
					persentWidth = persentWidth < 0 ? 0 : persentWidth
					this.$refs.currentProgress.style.width = `${persentWidth}%`
					this.$refs.ball.style.left = `calc(${persentWidth}% - 7px)`
				}
				if (this.type === 'volume') {
					let mouseX = event.touches[0].pageX
					let offsetLeft = this.$refs.duration.offsetLeft
					persentWidth = Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100)
					this.$store.getters.getAudioElement.volume = persentWidth / 100
					this.$refs.currentProgress.style.width = `${persentWidth}%`
					this.$refs.ball.style.left = `calc(${persentWidth}% - 7px)`
				}
			} else {
				return
			}
		},
		touchEnd (event) {
			if (canDrag !== false) {
				canDrag = false
				if (this.type === 'progress') {
					if (isNaN(this.$store.getters.getAudioElement.duration)) return
					this.$store.getters.getAudioElement.currentTime = this.$store.getters.getAudioElement.duration * persentWidth / 100
				}
				if (this.type === 'volume') {
					this.$store.getters.getAudioElement.volume = persentWidth / 100
				}
			}
		},
		setCurrentProgress (event) {
			if (this.type === 'progress') {
				let e = event || window.event
				let mouseX = e.pageX
				let offsetLeft = this.$refs.duration.offsetLeft
				persentWidth = Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100)
				persentWidth = persentWidth > 100 ? 100 : persentWidth
				persentWidth = persentWidth < 0 ? 0 : persentWidth
				if (isNaN(this.$store.getters.getAudioElement.duration)) return
				this.$store.getters.getAudioElement.currentTime = Math.floor(this.$store.getters.getAudioElement.duration * persentWidth) / 100
				this.$refs.currentProgress.style.width = `${persentWidth}%`
				this.$refs.ball.style.left = `calc(${persentWidth}% - 7px)`
			}
			if (this.type === 'volume') {
				let e = event || window.event
				let mouseX = e.pageX
				let offsetLeft = this.$refs.duration.offsetLeft
				persentWidth = Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100)
				this.$store.getters.getAudioElement.volume = persentWidth / 100
				this.$refs.currentProgress.style.width = `${persentWidth}%`
				this.$refs.ball.style.left = `calc(${persentWidth}% - 7px)`
			}
		},
		timerFomart (time) {
			if (isNaN(time)) return '00:00'
			let min = time / 60 > 9 ? Math.floor(time / 60) : '0' + Math.floor(time / 60)
			let miao = time % 60 > 9 ? Math.floor(time % 60) : '0' + Math.floor(time % 60)
			return min + ':' + miao
		}
	},
	mounted () {
		this.type = this.rangeType
		this.currentcolor = this.currentColor
		this.ballwidth = this.ballWidth
		this.$refs.ball.style.width = `${this.ballwidth}px`
		this.$refs.ball.style.height = `${this.ballwidth}px`
		this.$refs.ball.style.marginTop = `-${this.ballwidth / 2 - 1}px`
		if (!this.currentcolor.length > 0 || this.type === 'progress') return
    this.$refs.currentProgress.style.background = '#ff9393'
    // this.$refs.currentProgress.style.background = this.currentcolor // 颜色过浅
	},
  template: tpl
})
