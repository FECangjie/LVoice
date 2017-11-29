import Vue from 'vue'
import './style.less'
import tpl from './tpl.vtpl'

export default Vue.component('ChatRoomPage',{
    props: ['name'],
    data () {
    return {
        isLoading: true,
        errorTip: '',
        index:0,
        imgUrl: 'src/assets/img/od.jpeg',
        imgUrls: ['src/assets/img/lunbo3.jpeg', 'src/assets/img/lunbo2.jpeg', 'src/assets/img/lunbo3.jpeg', 'src/assets/img/lunbo4.jpg'],
        currentDate: moment(new Date()).format('MM-DD hh:mm'),
        formLabelWidth: '100px',
        labelPosition: 'left',
        formLabelAlign: {
            room: '',
            name: ''
        },
        sites: [
            '加入了房间 ',

        ]
    }
},
    methods:{
        onSubmit () {
            this.sites.push(this.formLabelAlign.name)
            this.formLabelAlign.name = ''
        },
        /**
         * 离开房间
         */
        onLive () {
          let me = this
          this.$confirm('此操作将推出退出该房间, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            me.$emit('setPageType','home')
            this.$message({
              type: 'success',
              message: '退出房间!'
            })
          }).catch(() => {

          })
        }
    },
    created () {
        let me = this
    },
    template: tpl
})
