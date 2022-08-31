<template>
  <div>
    <el-container>
     <el-aside width="18%" >
        <SlideBar></SlideBar>
      </el-aside>
      <el-container>
        <el-header >
          商家后台
          <el-dropdown >
          <div class="userava"><span>{{userinfo.storename}}</span><img :src="userinfo.avatar" alt="" /></div>
         <!-- 下拉菜单 -->
         <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-s-tools">账号设置</el-dropdown-item>
          <el-dropdown-item icon="el-icon-switch-button" @click.native="logOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
        </el-header>
        <el-main><router-view v-if="routerAlive"/></el-main>
      </el-container>
      </el-container>
      <!-- 接收到订单的时候全局弹出一条消息提示 -->
      <!-- <el-button
    plain
    @click="open2">
    您接到一份新订单
    </el-button> -->
  </div>
</template>

<script>
import SlideBar from '../../components/slidebar/index.vue'
import { mapState } from 'vuex'
export default {
  name: 'MerchantIndex',

  data () {
    return {
      routerAlive: true,
      // 用于存放订单号
      orderCode: ''
    }
  },
  components: {
    SlideBar
  },
  created () {
  },
  mounted () {
    var that = this
    if (JSON.stringify(this.userinfo) === '{}') {
      this.getInfo()
    }
    // --------------------------------------------------
    // 前端连接
    let ws = new WebSocket('ws://localhost:3001')
    ws.onopen = function (evt) {
      console.log('连接开启')
      ws.send('hello')
    }
    // 传递和接收服务器数据的方法
    ws.onmessage = function (evt) {
      // 后台发送的数据
      console.log(evt.data)
      this.orderCode = evt.data
      if (this.orderCode !== '') {
        that.open2()
      }
    }
  },

  methods: {
    //  获取店铺信息
    getInfo () {
      let token = localStorage.getItem('token')
      let params = {token: token}
      this.$store.dispatch('getInfo', params)
    },
    // 退出登录
    logOut () {
      window.localStorage.setItem('token', '')
      this.$router.push('/login')
      window.location.reload()
    },
    // 刷新页面
    routerRefresh () {
      this.routerAlive = false
      this.$nextTick(() => {
		    this.routerAlive = true
	        })
	    },
    // 消息提示
    open2 () {
      this.$notify({
        title: '提示',
        message: '您接到一份新订单',
        duration: 0
      })
      this.orderCode = ''
      this.$router.go(0)
    }

  },
  watch: {
    // orderCode: {
    //   handler (newValue, oldValue) {
    //     if (newValue !== '') {
    //       console.log('zzzz')
    //       this.open2()
    //     }
    //   },
    //   immediate: true
    // }
  },
  computed: {
    ...mapState({
      userinfo: state => state.home.userinfo
    })
  }
}
</script>

<style lang="scss" scoped>
div{
  height: 100%;
  .el-container{
    height: 100%;
    .router-link-active {
  text-decoration: none;
}
a{
  text-decoration: none;
}
div{
  height: 100%;
  .tac{
    height: 100%;
  }
}
    .el-header {
      background: white;
      .el-dropdown{
        float: right;
        .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
          .userava {
        float: right;
        width: 150px;
        span {
          float: left;
        }
        img {
          height: 30px;
          width: 30px;
          float: left;
        }
      }
      }

    }
  }

}

</style>
