<template>
  <div class="page">
 <div class="main">
    <div class="title">
        <span>密码登录</span>
    </div>
    <div class="title-msg">
        <span>请输入登录账户和密码</span>
    </div>

    <form class="login-form" method="post" novalidate >
        <!--输入框-->
        <div class="input-content">
            <!--autoFocus-->
            <div>
                <input type="text" autocomplete="off"
                   v-model="phone"    placeholder="手机号" name="userNameOrEmailAddress" required/>
            </div>

            <div style="margin-top: 16px">
                <input type="password"
                     v-model="pwd"  autocomplete="off" placeholder="登录密码" name="password" required maxlength="32"/>
            </div>
        </div>

        <!--登入按钮-->
        <div style="text-align: center">
            <button type="button" class="enter-btn" @click="login" >登录</button>
        </div>

        <div class="foor">
            <div class="left"><span>忘记密码 ?</span></div>

            <router-link to="/register" ><div class="right"><span>注册账户</span></div></router-link >
        </div>
    </form>
  </div>
  </div>
</template>

<script>
// import {mapState} from 'vuex'
export default {
  // name: 'Login',

  data () {
    return {
      imgSrc: '',
      username: '',
      password: '',
      phone: '',
      pwd: ''
    //   token: ''
    }
  },

  mounted () {
    // let token = localStorage.getItem('token')
    // if(token.length>0){

    // }
  },

  methods: {
    login () {
      try {
        let params = {phone: this.phone, password: this.pwd}
        this.$store.dispatch('login', params).then(res => {
          if (res === 200) {
            this.$router.push('/home/count')
            alert('登录成功')
          } else if (res === 201) {
            alert('账号或密码错误')
          } else {
            alert('服务器错误,登录失败')
          }
        })
      } catch (error) {
        alert(error)
      }
    }
  },
  computed: {
    // ...mapState({
    //   token: state => state.user.token
    // })
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
