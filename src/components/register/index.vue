<template>
  <div class="page">
 <div class="main">
    <div class="title">
        <span>注册账户</span>
    </div>
    <!-- <div class="title-msg">
        <span>请输入注册账户和密码</span>
    </div> -->

    <form class="login-form" method="post" novalidate >
        <!--输入框-->
        <div class="input-content">
            <!--autoFocus-->
            <div>
                <input type="text" autocomplete="off"
                     v-model="phone"  placeholder="手机号" name="userNameOrEmailAddress" required/>
                <el-alert :title="phoneTitle" :type="phoneType" show-icon v-show="phoneShow"></el-alert>
            </div>

            <div style="margin-top: 10px">
                <input type="password" v-model="password"  autocomplete="off" placeholder="请输入密码" name="password" required maxlength="32"/>
                <el-alert :title="pwdTitle" :type="pwdType" show-icon v-show="pwdShow"></el-alert>
            </div>
            <div style="margin-top: 10px;margin-bottom:16px;">
                <input type="password"
                    v-model="checkPassword"   autocomplete="off" placeholder="确认密码" name="password" required maxlength="32"/>
                <el-alert :title="checkTitle" :type="checkType" show-icon v-show="checkShow"></el-alert>
            </div>
        </div>

        <!--登入按钮-->
        <div style="text-align: center;margin-top:110px">
            <button type="button" class="enter-btn" @click="register">注册</button>
        </div>

        <div class="foor">
          <router-link to="/login"> <div class="left"><span>已有账号 ?</span></div></router-link>

            <div class="right"><span>注册账户</span></div>
        </div>
    </form>
  </div>
  </div>
</template>

<script>
// import store from '@/store/index.js'
export default {
  // name: 'Login',

  data () {
    return {
      phone: '',
      password: '',
      checkPassword: '',
      //   号码提示框
      phoneTitle: '',
      phoneType: '',
      phoneShow: false,
      //   密码提示框
      pwdTitle: '',
      pwdType: '',
      pwdShow: false,
      //   确认密码提示框
      checkTitle: '',
      checkType: '',
      checkShow: false
    }
  },

  mounted () {

  },

  methods: {
    async register () {
      let params = {phone: this.phone, password: this.password}
      let reg1 = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      //   验证手机号
      if (!reg1.test(this.phone)) {
        this.phoneTitle = '请输入正确的手机号'
        this.phoneType = 'error'
        this.phoneShow = true
      } else {
        this.phoneTitle = ''
        this.phoneType = 'success'
        let reg2 = /^\w\w{7,15}$/
        // 验证密码
        if (!reg2.test(this.password)) {
          this.pwdTitle = '密码必须为8-16位的数字或字母'
          this.pwdType = 'error'
          this.pwdShow = true
        } else {
          this.pwdTitle = ''
          this.pwdType = 'success'
          //   验证两次密码
          if (this.checkPassword !== this.password) {
            this.checkTitle = '两次密码不一致'
            this.checkType = 'error'
            this.checkShow = true
          } else {
            this.checkTitle = ''
            this.checkType = 'success'
            try {
              await this.$store.dispatch('register', params)
              this.$router.push('/login')
            } catch (error) {
              console.log(error)
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page{
  height: 100%;
  background-image: linear-gradient(#0D91A0, #052A52);
  .main {
        margin: 0 auto;
        padding-left: 25px;
        padding-right: 25px;
        padding-top: 15px;
        width: 350px;
        height: 350px;
        background: #FFFFFF;
        /*以下css用于让登录表单垂直居中在界面,可删除*/
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -175px;
        margin-left: -175px;
        .el-alert{
            margin-top: 5px;
            height: 20px;
        }
    }

    .title {
        width: 100%;
        height: 40px;
        line-height: 40px;
    }

    .title span {
        font-size: 18px;
        color: #353f42;
    }

    .title-msg {
        width: 100%;
        height: 64px;
        line-height: 64px;
    }

    .title:hover{
        cursor: default;
    }

    .title-msg:hover{
        cursor: default;
    }

    .title-msg span {
        font-size: 12px;
        color: #707472;
    }

    .input-content {
        width: 100%;
        height: 120px;
    }

    .input-content input {
        width: 330px;
        height: 40px;
        border: 1px solid #dad9d6;
        background: #ffffff;
        padding-left: 10px;
        padding-right: 10px;
    }

    .enter-btn {
        width: 350px;
        height: 40px;
        color: #fff;
        background: #0bc5de;
        line-height: 40px;
        text-align: center;
        border: 0px;
    }

    .foor{
        width: 100%;
        height: auto;
        color: #9b9c98;
        font-size: 12px;
        margin-top: 20px;
    }

    .enter-btn:hover {
        cursor:pointer;
        background: #1db5c9;
    }

    .foor div:hover {
        cursor:pointer;
        color: #484847;
        font-weight: 600;
    }

    .left{
        float: left;
    }
    .right{
        float: right;
    }
}

</style>
