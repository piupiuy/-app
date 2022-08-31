<template>
  <div>
    <el-form :rules="rules" >
      <el-form-item label="店铺名称" prop="name" class="shopname">
        <!-- <span>店铺名称 :</span> -->
        <el-input v-model="storeName" name="shopname" placeholder="请输入内容"></el-input>
     </el-form-item>
      <!-- 店铺公告 -->
      <el-form-item label="店铺公告" prop="announce" class="announce">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
          v-model="textarea2"
          class="announce"
        >
        </el-input>
      </el-form-item >
      <!-- 优惠信息 -->
      <el-form-item class="activity" prop="discount">
        <span>店铺优惠:</span>
        <div class="info">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput"
            >添加优惠信息</el-button
          >
        </div>
      </el-form-item >
      <!-- 商家信息 -->
      <el-form-item  class="shopinfo" prop="info">
        <p>商家信息:</p>
        <div class="inputcontent">
          <div  v-for="(shop,index) in shopInfo" :key="index">
          <el-input :class="'info'+index" v-model="shopInfo[index]" placeholder="请输入内容" @focus="getFocus(index)"></el-input>
          </div>
           <el-input class="addinfo" v-model="addinfo" v-show="addkey" placeholder="请输入内容" @blur="writeok"></el-input>
          <!-- <el-input v-model="input" placeholder="请输入内容"></el-input>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <el-input v-model="input" placeholder="请输入内容"></el-input> -->
        </div>
        <el-button type="primary" @click="addInfo">添加</el-button>
        <el-button type="danger" @click="subInfo">删除</el-button>
      </el-form-item >
      <!-- 其他 -->
      <!-- 起送价 -->
      <el-form-item  class="other">
        <div>
          <span>起送价:</span>
          <el-input-number v-model="num1" :min="1"  label="描述文字"></el-input-number>
        </div>
        <div>
          <span>配送费:</span>
          <el-input-number v-model="num2" :min="1"  label="描述文字"></el-input-number>
        </div>
      </el-form-item >
      <!-- 类型 -->
      <el-form-item>
        <span>店铺类型</span>
        <el-select v-model="value" placeholder="请选择" style="float:left;margin-left:4em;">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 地址 -->
     <!-- <div class="addressBox">
      地址：<el-input v-model="address"></el-input>
      <el-button size="mini">点击修改地址</el-button>
     </div> -->
      <el-form-item prop="address" class="address">
      地址信息：
        <el-cascader
        style="margin:5%"
      size="large"
      :options="options"
      v-model="selectedOptions"
      @change="handleChange"
      :placeholder="place"
      >
       </el-cascader>
  <el-input
    placeholder="请输入详细地址"
    suffix-icon="el-icon-location-outline"
    v-model="detailAddress">
  </el-input>

      </el-form-item >
      <div class="submit">
        <!-- 提交按钮 -->
      <el-button type="primary" @click="submitForm">提交</el-button>
      </div>

    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
// 导入地址
import {regionData, CodeToText} from 'element-china-area-data'
import * as imageConversion from 'image-conversion'
import { mapState } from 'vuex'
// 导入压缩的方法
import {compress} from '../../../utils/imageHandle'
export default {
  name: 'MerchantIndex',

  data () {
    return {
      mode: '',
      // 换头像
      imageUrl: '',
      // 商品公告
      textarea2: '',
      // 优惠信息
      dynamicTags: [],
      discountInfo: '',
      inputVisible: false,
      inputValue: '',
      // 店铺信息
      shopInfo: [],
      // 其他信息
      // 起送价
      num1: 1,
      // 配送费
      num2: 2,
      input: '',
      // 店铺名称
      storeName: '',
      // 监听店铺名称的定时
      timer: null,
      limit: 1,
      // 上传的文件列表
      fileList: [],
      // 添加店铺信息的控制词
      addkey: false,
      addinfo: '',
      // 删除店铺信息
      focu: 0,
      // 地址信息
      options: regionData,
      selectedOptions: [],
      addtions: {},
      detailAddress: '',
      // 显示省市区
      place: '',
      getMode: [],
      rules: {
        name: [
          {required: false, message: '请输入店铺名称', trigger: 'blur'}
        ],
        address: [
          {required: false, message: '请输入地址', trigger: 'blur'}
        ]
      },
      // 店铺类型
      options1: [
        {
          value: '选项1',
          label: '家常菜'
        }, {
          value: '选项2',
          label: '酒水饮料'
        }, {
          value: '选项3',
          label: '炸鸡汉堡'
        }, {
          value: '选项4',
          label: '暖胃粉面'
        }, {
          value: '选项5',
          label: '超市便利'
        }, {
          value: '选项6',
          label: '小吃'
        }, {
          value: '选项7',
          label: '甜品蛋糕'
        }, {
          value: '选项8',
          label: '夏日饮品'
        }
      ],
      value: ''
    }
  },
  mounted () {
    // 店铺名
    this.storeName = this.storeInfo.storename
    // 店铺公告
    this.textarea2 = this.storeInfo.public
    // 起送
    this.num1 = this.storeInfo.startfee
    // 配送费
    this.num2 = this.storeInfo.sendfee
    // 显示店铺优惠信息
    if (this.storeInfo.discount.length > 0) {
      this.dynamicTags = this.storeInfo.discount.split('//')
      this.dynamicTags.filter(function (s) {
        return s && s.trim() // 注：IE9(不包含IE9)以下的版本没有trim()方法
      })
    }
    // 显示店铺类型
    let type = this.storeInfo.shopType
    this.options1.forEach(item => {
      if (item.label === type) {
        this.value = item.value
      }
    })
    this.discountInfo = this.discountInfo + this.storeInfo.discount
    // 显示店铺信息
    this.shopInfo = this.storeInfo.info.split('//')
    // 显示店铺图片
    this.imageUrl = this.storeInfo.avatar
    // 显示地址信息
    // this.selectedOptions=[]
    let i
    if (this.storeInfo.address.indexOf('县') === -1) {
      i = this.storeInfo.address.indexOf('区')
    } else {
      i = this.storeInfo.address.indexOf('县')
    }
    this.place = this.storeInfo.address.substring(0, i + 1)
    this.detailAddress = this.storeInfo.address.substring(i + 2, this.storeInfo.address.length)
  },

  methods: {
    // ------------------------修改店铺名和店铺公告---------------------------
    // updateName () {
    //   let params = {name: this.storeName, token: window.localStorage.getItem('token')}
    //   axios.post('/business/name', params).then((res) => {
    //     alert(res.data.message)
    //   })
    // },
    // updatePublic () {
    //   let params = {public: this.textarea2, token: window.localStorage.getItem('token')}
    //   axios.post('/business/public', params).then((res) => {
    //     alert(res.data.message)
    //   })
    // },
    // -----------------------------------------------------
    // ------------------------------------------------------
    // 优惠信息面包屑删除的处理方法
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    // 点击添加
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 添加优惠信息
    handleInputConfirm () {
      let inputValue = this.inputValue
      // 如果填入了优惠信息，则添加优惠信息面包屑
      if (inputValue) {
        this.dynamicTags.push(inputValue)
        // 将优惠信息添加到后台
        // 拼接优惠信息
        // if (this.discountInfo === '') {
        //   this.discountInfo = inputValue
        // } else {
        //   this.discountInfo = this.discountInfo + '//' + inputValue
        // }

        // let params = {discount: this.discountInfo, token: window.localStorage.getItem('token')}
        // this.$store.dispatch('submitDiscount', params).then((res) => {
        //   if (res === 200) {
        //     alert('添加优惠信息成功')
        //     // 修改优惠信息后更新vuex中的店铺信息
        //     let param = {token: window.localStorage.getItem('token')}
        //     this.$store.dispatch('getInfo', param)
        //   }
        // })
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // ---------------------------图片处理----------------------------
    // 图片修改
    handleAvatarSuccess (res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.imageUrl = URL.createObjectURL(this.getMode[0])
      this.getBase64(this.getMode[0]).then(res => {
        this.mode = res
        this.getMode = []
        this.fileList = []
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
    // 这里使用的不是立即提交，所以这里异步返回的结果也没办法接收
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
      return new Promise((resolve) => {
        imageConversion.compressAccurately(file, 30).then(res => {
			    resolve(res)
          // 把压缩得到的数据存储到data
          this.getMode[0] = res
		    })
      })
    },
    imgChange (files, fileList) {
      this.imageUrl = ''
      this.handleAvatarSuccess(200, fileList[0])
      this.imageUrl = URL.createObjectURL(fileList[0].raw)
    },
    // --------------------------用户信息的添加与删除-----------------------------
    addInfo () {
      this.addkey = true
      // let input = window.document.querySelector('addinfo')
      // console.log(input.value)
      this.writeok()
    },
    writeok () {
      if (this.addinfo !== '') {
        let newInfo = this.addinfo
        this.shopInfo.push(newInfo)
        this.addkey = false
        this.addinfo = ''
      }
    },
    getFocus (index) {
      this.focu = index
    },
    subInfo () {
      // let el = window.document.querySelector(`.info${this.focu}`)
      // let value=el.value
      alert(this.focu)
      this.shopInfo.splice(this.focu, 1)
      // el.remove()
    },
    // -------------------------修改地址------------------------------
    handleChange (value) {
      // 我们选择地址后，selectedOptions 会保存对应的区域码，例如北京的区域码为'110000'
      // 我们要取出区域码对应的汉字，就需要用CodeToText(区域码)进行输出
      this.addtions.selectedOptions = value
      var name = ''
      this.selectedOptions.map(item => { name += CodeToText[item] + '/' })
      console.log(this.selectedOptions)
      this.addtions.names = name
      console.log(this.addtions.names)
      console.log(this.addtions)
    },
    // -----------------------提交---------------------------------
    // 提交表单
    submitForm () {
      this.discountInfo = this.dynamicTags.join('//')
      let storeInfo = this.shopInfo.join('//')
      let arr = this.value.split('')
      let index = parseInt(arr[2])
      let type = this.options1[index - 1].label
      console.log(type)
      let params = {
        storeName: this.storeName,
        storePublic: this.textarea2,
        discountInfo: this.discountInfo,
        storeInfo: storeInfo,
        start: this.num1,
        send: this.num2,
        // pic: this.mode,
        token: window.localStorage.getItem('token'),
        totalAddress: this.addtions.names + this.detailAddress,
        type: type
      }
      axios.post('/business/updateinfo', params).then(res => {
        alert(res.data.message)
        if (res.data.code === 200) {
          this.$router.push('/home/count')
        }
      })
    }
  },
  watch: {
    // 对店铺名进行监听
    // 'storeName': {
    //   handler: function (newValue, oldValue) {
    //     // 设置防抖和首次加载不执行
    //     if (newValue !== this.storeInfo.storename) {
    //       if (this.timer) {
    //         clearTimeout(this.timer)
    //       }
    //       this.timer = setTimeout(() => {
    //         this.updateName()
    //       }, 1500)
    //     }
    //   },
    //   immediate: false
    // },
    // 'textarea2': {
    //   handler: function (newValue, oldValue) {
    //     // 设置防抖和首次加载不执行
    //     if (newValue !== this.storeInfo.public) {
    //       if (this.timer) {
    //         clearTimeout(this.timer)
    //       }
    //       this.timer = setTimeout(() => {
    //         this.updateName()
    //       }, 1500)
    //     }
    //   },
    //   immediate: false
    // }
  },
  computed: {
    ...mapState({
      storeInfo: state => state.home.userinfo
    })
  }
}
</script>

<style lang="scss" scoped>
form {
  span {
    float: left;
  }
  .shopname {
    width: 100%;
    margin-bottom: 1em;
    // span {
    //   float: left;
    // }
    .el-input {
      width: 65em;
    }
  }
  .avatar {
    width: 100%;
    margin-bottom: 1em;
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
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
  .announce {
    margin-bottom: 1em;
    width: 100%;
    // span {
    //   float: left;
    // }
    .announ {
      width: 65em;
    }
  }
  .activity {
    margin-bottom: 1em;
    span {
      margin-right: 1em;
    }
    .info {
      .el-tag + .el-tag {
        margin-left: 1em;
      }
      .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
      .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
      }
    }
  }
  .shopinfo {
    p {
      text-align: left;
    }
    .inputcontent {
      .el-input {
        width: 65em;
        margin-bottom: 1em;
      }
    }
  }
  .other {
    div {
      margin-bottom: 1em;
      .el-input-number {
        margin-right: 40em;
      }
    }
  }
  // .addressBox{
  //   float: left;
  //   width: 50em;
  // }
  .address{
    // display: block;
    float: left;
    margin-bottom: 1em;
    width: 100%;
   margin: 0;
   padding: 0;
    .el-input{
      width: 40%;
    }
  }
  .submit{
    margin-top: 10em;
    display: block;
    width:100%;
    .el-cascader::placeholder{
      color: black !important;
    }
    .el-button{
    margin: 1em auto;
  }
  }

}
</style>
