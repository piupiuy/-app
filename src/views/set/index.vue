<template>
  <div>
    <!-- 主体区域 -->
    <div class="main">
      <div class="message"><img src="../../assets/light.png" alt=""><p>小提示：好的店铺界面能提高店铺的印象分哦！</p></div>
      <div class="change">
      <!-- 修改顶部图片 -->
      <div class="topimg">
         <span > 上传店招：</span>
        <el-upload
          class="avatar-uploader"
          action="/business/upload"
          accept="image/jpeg,image/gif,image/png"
          :limit="1"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="file"
          :file-list="fileList"
          :on-exceed="imgChange"
        >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      </div>

      <!-- 修改店铺头像 -->
      <div class="storeimg">
        <span > 上传店铺头像：</span>
        <el-upload
          class="avatar-uploader"
          action="/business/upload"
          accept="image/jpeg,image/gif,image/png"
          :limit="1"
          :show-file-list="false"
          :on-success="handleAvatarSuccess2"
          :before-upload="beforeAvatarUpload"
          name="file"
          :file-list="fileList2"
          :on-exceed="imgChange2"
        >
        <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      </div>
      <el-input v-model="storeInfo.rank" placeholder="修改标签"></el-input>
      <!-- <el-input v-model="time" placeholder="修改营业时间"></el-input> -->
      <div class="timepick">
         <el-time-picker
    is-range
    v-model="value1"
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    placeholder="选择时间范围">
  </el-time-picker>
      </div>

      <el-button type="primary" @click="updateStore">保存修改</el-button>
     </div>

    </div>
    <!-- 右边店铺展示区 -->
    <div class="show">
      <!-- 手机样式 -->
      <div class="phone">
        <!-- 小圆圈和长方形 -->
        <div class="some">
          <div class="circle"></div>
          <div class="tangular"></div>
        </div>
        <!--  小盒子-->
        <div class="phone2">
           <div class="top">
        <img :src="storeInfo.storeimg" alt="">
      </div>
      <!-- 店铺信息卡 -->
      <div class="card">
        <el-card class="box-card">
          <!-- 店铺头像 -->
        <img :src="storeInfo.avatar" alt="">
        <!-- 店铺信息 -->
        <div class="infoBox">
          <p>{{storeInfo.storename}}</p>
          <div class="rank">
            <img src="../../assets/rank.png" alt="">
            <span >{{storeInfo.rank}}</span>
          </div>
           <div class="time">
            <img src="../../assets/time.png" alt="">
            <span>{{storeInfo.opentime}}</span>
          </div>
        </div>
        <!-- 收藏按钮 -->
        <div class="sc">收藏</div>
        <!-- 店铺公告 -->
        <div class="announce">公告：{{storeInfo.public}}</div>
        </el-card>

      </div>
        </div>
      </div>
      <!-- 顶部图片区 -->

    </div>
  </div>
</template>

<script>
import * as imageConversion from 'image-conversion'
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  name: 'MerchantIndex',

  data () {
    return {
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      fileList: [],
      fileList2: [],
      // 店招数据
      imageUrl: '',
      mode: '',
      // 店铺头像数据
      imageUrl2: '',
      mode2: '',
      rank: 'xxx',
      time: '',
      getMode: []
    }
  },

  mounted () {
    this.imageUrl = this.storeInfo.storeimg
    this.imageUrl2 = this.storeInfo.avatar
    this.mode = this.storeInfo.storeimg
    this.mode2 = this.storeInfo.avatar
  },
  computed: {
    ...mapState({
      storeInfo: state => state.home.userinfo
    })
  },
  methods: {
    // -------------店招的处理方法----------------------
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(this.getMode[0])
      this.getBase64(this.getMode[0]).then(res => {
        this.mode = res
        let topimg = window.document.querySelector('.top img')
        topimg.setAttribute('src', res)
        this.fileList = []
        this.getMode = []
      })
    },
    getBase64 (file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      // return isJPG && isLt2M
      return new Promise((resolve) => {
        imageConversion.compressAccurately(file, 10).then(res => {
			    resolve(res)
          this.getMode[0] = res
		    })
      })
    },
    imgChange (files, fileList) {
      this.imageUrl = ''
      this.handleAvatarSuccess(200, fileList[0])
      this.imageUrl = URL.createObjectURL(fileList[0].raw)
    },
    // -----------店铺头像的处理方法---------------------
    handleAvatarSuccess2 (res, file) {
      this.imageUrl2 = URL.createObjectURL(this.getMode[0])
      this.getBase64(this.getMode[0]).then(res => {
        this.mode2 = res
        let storeimg = window.document.querySelector('.card .box-card img')
        storeimg.setAttribute('src', res)
        this.fileList2 = []
        this.getMode = []
      })
    },
    imgChange2 (files, fileList2) {
      this.imageUrl2 = ''
      this.handleAvatarSuccess2(200, fileList2[0])
      this.imageUrl2 = URL.createObjectURL(fileList2[0].raw)
    },
    // 保存修改
    updateStore () {
      let start = this.value1[0].getHours() + ':' + this.value1[0].getMinutes()
      let end = this.value1[1].getHours() + ':' + this.value1[1].getMinutes()
      this.time = start + '-' + end
      this.storeInfo.opentime = this.time
      // console.log(this.mode2)
      // console.log(this.mode)
      // console.log(this.storeInfo.rank, this.time)
      let params = {
        avatar: this.mode2,
        storeimg: this.mode,
        rank: this.storeInfo.rank,
        opentime: this.time,
        token: window.localStorage.getItem('token')
      }
      axios.post('/business/decoration', params).then(res => {
        alert(res.data.message)
        if (res.data.code === 200) {
          this.$router.push('/home/count')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
div{
  width: 100%;
  height: 70%;
  .main{
    height: 100%;
    background: white;
    float: left;
    width: 69%;
    .message{
      height: 50px;
      img{
        width:25 px;
        height: 25px;
        float: left;
        margin-left: 10px;
      }
      p{
        float: left;
        letter-spacing: 4px;
        font-family:'Courier New', Courier, monospace;
      }
    }
    .change{
      float: left;
      .topimg{
        margin-left: 80px;
        float: left;
        border: 1px solid black;
        width: 200px;
        height: 200px;
        .avatar-uploader .el-upload {
    border: 1px dashed black;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
      }
      .storeimg{
        margin-bottom: 5%;
        margin-right: 80px;
        float: right;
         border: 1px solid black;
        width: 200px;
        height: 200px;
        .avatar-uploader .el-upload {
    border: 1px dashed black;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
      }
    }
    .el-input{
      width: 40%;
      float: left;
      margin-left: 2%;
      margin-top: 5%;
    }
   .timepick{
    // margin-top: 50px;
    height: 56px;
   }
    .el-button{
      position: absolute;
      bottom:10%
    }
  }
  .show{
    height: 100%;
    border-left:2px dashed #bababa;
    float: right;
    width: 30%;
    // background: url('../../assets/phone4.png') no-repeat;
    // background-size: cover;
    // background-position: center 0;
    .phone{
      border:1px solid black;
      width: 97%;
      height: 100%;
      border-radius: 20px;
      margin: 0 auto;
      position: relative;
      .some{
        height: 20px;
        width: 50%;
        // border: 1px solid black;
        position: absolute;
        margin-left: 25%;
        margin-top: 2%;
        .circle{
          border: 1px solid black;
          height: 40%;
          width: 5%;
          border-radius: 50px;
          margin-left: 30%;
        }
        .tangular{
          border: 1px solid black;
          // border-radius: 20%;
          border-top-left-radius: 10px;
           border-top-right-radius: 10px;
            border-bottom-left-radius: 10px;
             border-bottom-right-radius: 10px;
          height: 40%;
          width: 40%;
          margin-left: 40%;
          margin-top: -7%;
        }
      }
      .phone2{
        width: 90%;
        height: 90%;
        border: 1px solid black;
        position: absolute;
        margin-top: 10%;
        margin-left: 4%;
        // float: left;
         .top{
      z-index: 1;
      width: 100%;
      height: 13%;
      // margin: 0 auto;
      position: absolute;
      overflow: hidden;
      img{
        height: 100%;
        width: 100%;
      }
    }
    .card{
      z-index: 2;
      width: 96%;
      height: 16%;
      position: absolute;
      // margin-top: 80px;
      // margin-left: 65px;
      margin: 15% 2%;
       .el-card{
        position: relative;
        // border: 1px salmon solid;
      .el-card__body, .el-main {
       padding: 0px;
      }
      img{
          // border: 1px rgb(127, 139, 19) solid;
          width: 40px;
          height: 40px;
          margin-left: -10px;
          margin-top:-15px ;
          float: left;
        }
        .infoBox{
        // border: 1px salmon solid;
        position: absolute;
        width: 50%;
        margin-left: 20%;
        margin-top: -5%;
        height: 50%;
        p{
          margin-top: -6%;
          margin-left: -60%;
        }
        .rank{
          height: 60%;
          // overflow: hidden;
          margin-top:  -10%;
          img{
            height: 8px;
            width: 8px;
            margin-top: 6%;
            margin-left: -10%;
          }
          span{
            font-size:12px;
            margin-left: -50%;
            // text-align: left;
            margin-top: -60%;
            // margin-bottom: 20%;
            // border: 1px saddlebrown solid;
          }
        }
        .time{
          margin-top: -10%;
          margin-left: 40%;
          height: 60%;
          img{
            height: 10px;
            width:10px;
            margin-top: 5%;
             margin-left: 20%;
          }
          span{
             font-size:12px;
             margin-left: -10%;
          }
        }
      }
      .sc{
        position: absolute;
        border: 1px black solid;
       margin-left: 72%;
       margin-top: -8%;
        width: 15%;
        height: 30%;
        font-size: 10px;
      }
      .announce{
        position: absolute;
        // border: 1px solid saddlebrown;
        margin-top: 27px;
        margin-left: -16px;
        height: 20%;
        text-align: left;
        font-size: 12px;
        color: gray;
        padding-left: 2%;
      }
      }

    }
      }
    }

  }
}
</style>
