// 测面滑动菜单效果
const SHOW_MUSIC_LIST = true
const HIDE_MUSIC_LIST = false
const SHOW_SEARCH = true

const musiclist = {
	state: {
		scrollTop: 0,
		refs: '',
		isShow: false,
		showSearch: false
	},
	mutations: {
		showMusic (state) {
			// state.content = obj === undefined ? state.content : obj.amount
			state.isShow = SHOW_MUSIC_LIST
		},
		showSearch (state) {
			state.showSearch = true
		},
		hideMusic (state) {
			state.isShow = HIDE_MUSIC_LIST
		},
		hideSearch (state) {
			state.showSearch = false
		},
		setScrollTop (state, scrollTop) { // 浮层弹起
			setTimeout(function () {
				state.refs.scrollTop = scrollTop
			}, 100)
		},
		setRefScrollMusicList (state, ele) {
			state.refs = ele
		}
	},
	actions: {
		showMusicList ({commit}) {
			commit('showMusic')
		},
		show_Search ({commit}) {
			commit('showSearch')
		},
		hide_Search ({commit}) {
			commit('hideSearch')
		},
		hideMusicList ({commit}, obj) {
			commit('hideMusic', obj.refs)
		},
		set_ScrollTop ({commit}, obj) {
			commit('setScrollTop', obj.scrollTop)
		},
		set_RefScrollMusicList ({commit}, obj) {
			commit('setRefScrollMusicList', obj.refs)
		}
	},
	getters: {
		getIsShowMusicList: state => state.isShow,
		getIsShowSearch: state => state.showSearch,
		// getShowMenuInfo: state => state.content
		// 获取列表的scrollTop
		getScrollTop: state => state.scrollTop
	}
}
export default musiclist
