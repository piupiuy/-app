<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item  label="名称">
        <el-input v-model="form.dishname"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="form.region" placeholder="请选择分类">
          <el-option v-for="(type,i) in this.types" :label="type.typename" :value="type.typeid" :key="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.detail"></el-input>
      </el-form-item>
      <!-- <el-form-item label="描述">
        <el-input type="textarea" v-model="form.detail"></el-input>
      </el-form-item> -->
      <!-- 商品活动（待完成） -->
      <!-- <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item> -->
      <el-form-item label="原价">
        <el-input-number
          v-model="form.oprice"
          :min="0"
          label="原价"
          :precision="2"
        ></el-input-number>
      </el-form-item>
      <el-form-item  label="售价">
        <el-input-number
          v-model="form.price"
          :min="0"
          label="原价"
          :precision="2"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <!-- 上传商品图片 -->
        <span style="float:left;" > 上传商品图片：</span>
        <el-upload style="float:left;"
  class="avatar-uploader"
  action="/business/upload"
  accept="image/jpeg,image/gif,image/png"
  :limit="1"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  name="file"
  :file-list="form.fileList"
  :on-exceed="imgChange"
  >
  <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon" style="border:1px dashed #d9d9d9"></i>
  </el-upload>
      </el-form-item>
      <!-- 商品规格 -->
      <el-form-item>
        <el-card>
        <el-form>
    <el-form-item label="*商品规格" >
      <p>商品规格决定价格和库存，如大份，小份</p>
      <el-row style="background-color:#F6F8F9;padding-left: 1%;">
      <el-row v-for="(specific,index) in speNum" :key="index">
       <el-col :span="3">
          <p> *价格</p>
          <el-input style="width:70%" size="mini" v-model="attrForm.price[index]"></el-input>
        </el-col>
        <el-col :span="3">
         <p>份量</p>
          <el-input style="width:70%" size="mini" v-model="attrForm.weight[index]"></el-input>
        </el-col>
        <el-col :span="8">
          <p>*库存</p>
          <el-input style="width:42%" size="mini" placeholder="当前库存" v-model="attrForm.inventory[index]" ></el-input>
          <el-input style="width:42%" size="mini" placeholder="每日库存"  v-model="attrForm.dailyInventory[index]" ></el-input>
        </el-col>
        <el-col :span="6">
        <p   >*包装费(元)</p>
          <el-input style="width:100%" size="mini" v-model="attrForm.pagfee[index]"></el-input>
        </el-col>
        </el-row>
         <el-checkbox label="自动补足库存" name="type" :checked="attrForm.status" @change="attrForm.status===false?attrForm.status=true:attrForm.status=false"></el-checkbox>
      </el-row>
      <el-button style="float:left;margin-top:5%" @click="addSpecific">添加规格</el-button>
    </el-form-item>
    <el-form-item label="商品属性">
      <p>商品属性是配料不同口味不同的商品，如加糖，无糖</p>
      <!-- 添加的属性 -->
      <el-card v-for="(attr,i) in attrNum" :key="i">
         <el-button  style="float: right; padding: 3px 0" type="text" icon="el-icon-close" @click="closeAttr(i)"></el-button>
        <!-- 第一列是属性名 -->
        <el-col :span="5">
        <el-input placeholder="属性名" style="width:70%" size="mini" v-model="attrForm.attr[i].attrName"></el-input>
        </el-col>
        <!-- 其余为属性 -->
        <el-col :span="2">属性：</el-col>
        <el-col :span="5" >
           <el-input style="width:70%" size="mini"  v-model="attrForm.attr[i].children[0]"></el-input>
           <el-input style="width:70%" size="mini" v-model="attrForm.attr[i].children[1]"></el-input>
           <el-input style="width:70%" size="mini" v-model="attrForm.attr[i].children[2]"></el-input>
        </el-col>
        <el-col :span="5">
        <el-input style="width:70%" size="mini" v-model="attrForm.attr[i].children[4]"></el-input>
          <el-input style="width:70%" size="mini" v-model="attrForm.attr[i].children[5]"></el-input>
         <el-input style="width:70%" size="mini" v-model="attrForm.attr[i].children[6]"></el-input>
        </el-col>
       <el-col :span="5">
        <el-input style="width:70%" size="mini" v-model="attrForm.attr[i].children[7]"></el-input>
         <el-input style="width:70%" size="mini" v-model="attrForm.attr[i].children[8]"></el-input>
         <el-input style="width:70%" size="mini" v-model="attrForm.attr[i].children[9]"></el-input>
        </el-col>
        <!-- <el-checkbox label="开启属性计费" name="type" :checked="attrForm.attr[i].status" @change="attrForm.attr[i].status===false?attrForm.attr[i].status=true:attrForm.attr[i].status=false"></el-checkbox> -->
      </el-card>
      <el-button style="margin-top:5%;float:left;" @click="addAttr">添加属性</el-button>
    </el-form-item>
    <el-form-item label="商品单位">
    <el-input v-model="attrForm.unit"></el-input>
        </el-form-item>
        <el-form-item label="*最小购买量">
          <p>最小购买量为下单时加购一次会有多份</p>
    <el-input v-model="attrForm.minsold"></el-input>
    </el-form-item>
       </el-form>
       </el-card>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as imageConversion from 'image-conversion'
import axios from 'axios'
export default {
  name: 'MerchantIndex',

  data () {
    return {
      form: {
        dishname: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: '',
        resource: '',
        desc: '',
        oprice: 0,
        price: 0,
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        num: 3,
        imageUrl: '',
        FileList: [],
        // 图片的base64数据
        mode: ''
        // 图片压缩数据的暂存

      },
      // 分类信息
      types: [],
      getMode: [],
      // 商品规格相关数据
      dialogFormVisible: false,
      // 商品规格的数量
      speNum: 1,
      // 商品属性的数量
      attrNum: 0,
      // 商品规格表
      attrForm: {
        // 价格
        price: [],
        // 份量
        weight: [],
        // 每日库存
        dailyInventory: [],
        // 当前库存
        inventory: [],
        // 是否自动补足库存
        status: true,
        // 包装费
        pagfee: [],
        // 属性集合
        // {attrName: '', children: ['', '', '', '', '', '', '', '', '']}
        attr: [],
        // 单位
        unit: '',
        minsold: 1
      },
      editId: 0,
      formLabelWidth: '120px',
      specificIdArr: [],
      attrInfo: [],
      // 查看的attr的信息
      showAttr: []
    }
  },

  mounted () {
    this.getType()
  },

  methods: {
    // --------------------------图片处理-------------------------------
    handleAvatarSuccess (res, file) {
      this.form.imageUrl = URL.createObjectURL(this.getMode[0])
      this.getBase64(this.getMode[0]).then(res => {
        this.form.mode = res
        this.form.fileList = []
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
        imageConversion.compressAccurately(file, 30).then(res => {
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
    // ------------------------------------------------------------
    // 优惠信息面包屑的处理方法
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // ----------------------------------商品规格相关-----------------------------------
    // 添加规格
    addSpecific () {
      this.speNum += 1
      this.attrForm.price.push(0)
      this.attrForm.weight.push('')
      this.attrForm.inventory.push(0)
      this.attrForm.dailyInventory.push(0)
      this.attrForm.pagfee.push(0)
    },
    // 点击添加商品属性
    addAttr () {
      this.attrNum++
      this.attrForm.attr.push({attrName: '', children: ['', '', '', '', '', '', '', '', '']})
    },
    // 删除商品属性
    closeAttr (i) {
      this.attrNum--
      let newArr = []
      for (let index = 0; index < this.attrForm.attr.length; index++) {
        if (i !== index) {
          newArr.push(this.attrForm.attr[index])
        }
      }
      this.attrForm.attr = newArr
    },
    num () {

    },
    // 提交添加的商品
    onSubmit () {
      if (this.form.dishname === '') {
        alert('请输入菜名')
      } else {
        // dish表部分
        // 规格表部分
        let priceArr = this.attrForm.price.join('//')
        let weightArr = this.attrForm.weight.join('//')
        let dailyInventoryArr = this.attrForm.dailyInventory.join('//')
        let inventoryArr = this.attrForm.inventory.join('//')
        let pagfeeArr = this.attrForm.pagfee.join('//')
        let attrArr = ''
        this.attrForm.attr.forEach(item => {
          let temp = item.attrName + ':' + item.children.join('//')
          attrArr = attrArr + temp + '!'
        })
        let attrData = {price: priceArr, weight: weightArr, dailyInventory: dailyInventoryArr, minsold: this.attrForm.minsold, inventory: inventoryArr, pagfee: pagfeeArr, attr: attrArr, inventStatus: this.attrForm.status, unit: this.attrForm.unit}
        let data = {form: this.form, attrData: attrData, token: window.localStorage.getItem('token')}
        axios.post('/business/adddish', data).then(res => {
          let type = ''
          if (res.data.code === 200) {
            type = 'success'
          } else {
            type = 'error'
          }
          this.open(type, res.data.message)
        })
      }
    },
    open (type, message) {
      this.$message({
        message: message,
        type: type
      })
      this.$router.push('/home/goodlist')
    },
    // 获取分类的信息
    getType () {
      let params = {token: window.localStorage.getItem('token')}
      axios.post('/business/gettype', params).then(res => {
        if (res.data.code === 200) {
          this.types = res.data.data
          console.log(this.types)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
.el-select{
  float: left;
}
.el-input-number{
  float: left;
}
.el-upload{
 div{
  float: left;
 }
}
</style>
