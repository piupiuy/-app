<template>
  <div>
    <template>
      <div class="head">
        <el-button @click="allUp">批量上架</el-button>
        <el-button @click="allDown">批量下架</el-button>
        <el-button @click="allDelete">批量删除</el-button>
        <el-button @click="allSet">批量设置规格</el-button>
      </div>
      <el-table  :data="tableData" height="30em"  style="width: 100%;" ref="multipleTable"  @selection-change="handleSelectionChange">
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
         <el-table-column prop="img" width="70">
          <template slot-scope="pic">
             <img :id="'img'+pic.$index" :src="imgList[pic.$index]" class="avatar" style="width:60px;height:60px;">
              <input type="file" value="0" :id="'file'+pic.$index" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg,image/jfif" @click="upload(pic.$index)"/>
          </template>
         </el-table-column>
        <el-table-column prop="dishname" width="100" label="商品名称">
          <template slot-scope="name">
             <el-input v-model="name.row.dishname" size="mini" ></el-input>
          </template>

        </el-table-column>
        <el-table-column prop="price" width="75" label="价格">
          <template slot-scope="sale">
            <el-input label="￥" v-model="sale.row.price" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="oprice"  width="75" label="原价">
           <template slot-scope="osale">
            <el-input  v-model="osale.row.oprice" size="mini"></el-input>
          </template>
           </el-table-column>
         <el-table-column prop="status"  width="110" label="商品状态">
          <template slot-scope="isSale">
            <el-select v-model="isSale.row.status" placeholder="请选择" size="mini">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </template>
         </el-table-column>
        <el-table-column prop="describeinfo"  width="140" label="描述">
          <template slot-scope="detail">
            <!-- <input v-model="detail.row.describe"></textarea> -->
            <el-input size="mini" v-model="detail.row.describeinfo"></el-input>
          </template>
         </el-table-column>
        <el-table-column prop="salenum"  width="60" label="销量"> </el-table-column>
        <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->

        <el-table-column label="操作">
          <template slot-scope="scope" class="operate">
            <el-button size="mini" type="primary" @click="updateDish(scope.$index)"
              >更新</el-button
            >
            <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button size="mini" type="primary"  @click="editSpecific(scope.$index)"
              >编辑规格</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加商品规格 -->
      <el-dialog title="编辑规格" :visible.sync="dialogFormVisible" @close="destoryInfo" closed="destoryInfo">
  <el-form :model="form">
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
      <el-button style="float:left;margin-top:5%" @click="addSpecific(1)">添加规格</el-button>
    </el-form-item>
    <el-form-item label="商品属性">
      <p>商品属性是配料不同口味不同的商品，如加糖，无糖</p>
      <!-- 添加的属性 -->
      <el-card v-for="(attr,i) in attrNum" :key="i">
         <el-button  style="float: right; padding: 3px 0" type="text" icon="el-icon-close" @click="closeAttr(1,i)"></el-button>
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
      </el-card>
      <el-button style="margin-top:5%;float:left;" @click="addAttr(1)">添加属性</el-button>
    </el-form-item>
    <el-form-item label="商品单位">
<el-input v-model="attrForm.unit"></el-input>
    </el-form-item>
    <el-form-item label="*最小购买量">
      <p>最小购买量为下单时加购一次会有多份</p>
<el-input v-model="attrForm.minsold"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitAttr">确 定</el-button>
  </div>
      </el-dialog>
      <!-- 分页器 -->
      <!-- 设置layout，表示需要显示的内容，用逗号分隔，布局元素会依次显示。prev表示上一页，next为下一页，pager表示页码列表，除此以外还提供了jumper和total，size和特殊的布局符号->，->后的元素会靠右显示，jumper表示跳页元素，total表示总条目数，size用于设置每页显示的页码数量。 -->
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :page-size="3"
          :total="dishList.length">
        </el-pagination>
      </div>
      <!--批量修改的规格数据 -->
       <el-dialog title="编辑规格" :visible.sync="dialogVisible">
  <el-form >
    <el-form-item label="*商品规格" >
      <p>商品规格决定价格和库存，如大份，小份</p>
      <el-row style="background-color:#F6F8F9;padding-left: 1%;">
      <el-row v-for="(specific,index) in speNum2" :key="index">
       <el-col :span="3">
          <p> *价格</p>
          <el-input style="width:70%" size="mini" v-model="attrForm2.price[index]"></el-input>
        </el-col>
        <el-col :span="3">
         <p>份量</p>
          <el-input style="width:70%" size="mini" v-model="attrForm2.weight[index]"></el-input>
        </el-col>
        <el-col :span="8">
          <p>*库存</p>
          <el-input style="width:42%" size="mini" placeholder="当前库存" v-model="attrForm2.inventory[index]" ></el-input>
          <el-input style="width:42%" size="mini" placeholder="每日库存"  v-model="attrForm2.dailyInventory[index]" ></el-input>
        </el-col>
        <el-col :span="6">
        <p   >*包装费(元)</p>
          <el-input style="width:100%" size="mini" v-model="attrForm2.pagfee[index]"></el-input>
        </el-col>
        </el-row>
         <el-checkbox label="自动补足库存" name="type" :checked="attrForm2.status" @change="attrForm2.status===false?attrForm2.status=true:attrForm2.status=false"></el-checkbox>
      </el-row>
      <el-button style="float:left;margin-top:5%" @click="addSpecific(2)">添加规格</el-button>
    </el-form-item>
    <el-form-item label="商品属性">
      <p>商品属性是配料不同口味不同的商品，如加糖，无糖</p>
      <!-- 添加的属性 -->
      <el-card v-for="(attr,i) in attrNum2" :key="i">
         <el-button  style="float: right; padding: 3px 0" type="text" icon="el-icon-close" @click="closeAttr(2,i)"></el-button>
        <!-- 第一列是属性名 -->
        <el-col :span="5">
        <el-input placeholder="属性名" style="width:70%" size="mini" v-model="attrForm2.attr[i].attrName"></el-input>
        </el-col>
        <!-- 其余为属性 -->
        <el-col :span="2">属性：</el-col>
        <el-col :span="5" >
           <el-input style="width:70%" size="mini"  v-model="attrForm2.attr[i].children[0]"></el-input>
           <el-input style="width:70%" size="mini" v-model="attrForm2.attr[i].children[1]"></el-input>
           <el-input style="width:70%" size="mini" v-model="attrForm2.attr[i].children[2]"></el-input>
        </el-col>
        <el-col :span="5">
        <el-input style="width:70%" size="mini" v-model="attrForm2.attr[i].children[4]"></el-input>
          <el-input style="width:70%" size="mini" v-model="attrForm2.attr[i].children[5]"></el-input>
         <el-input style="width:70%" size="mini" v-model="attrForm2.attr[i].children[6]"></el-input>
        </el-col>
       <el-col :span="5">
        <el-input style="width:70%" size="mini" v-model="attrForm2.attr[i].children[7]"></el-input>
         <el-input style="width:70%" size="mini" v-model="attrForm2.attr[i].children[8]"></el-input>
         <el-input style="width:70%" size="mini" v-model="attrForm2.attr[i].children[9]"></el-input>
        </el-col>
      </el-card>
      <el-button style="margin-top:5%;float:left;" @click="addAttr(2)">添加属性</el-button>
    </el-form-item>
    <el-form-item label="商品单位">
<el-input v-model="attrForm2.unit"></el-input>
    </el-form-item>
    <el-form-item label="*最小购买量">
      <p>最小购买量为下单时加购一次会有多份</p>
<el-input v-model="attrForm2.minsold"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="comfirmChange">确 定</el-button>
  </div>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import * as imageConversion from 'image-conversion'
import { mapState } from 'vuex'

export default {
  name: 'MerchantIndex',

  data () {
    return {
      // 图片相关数据
      isChange: 0,
      imageUrl: '',
      fileList: [],
      // 列表数据
      tableData: [

      ],
      name: '',
      // 在售状态数据
      options: [{
        value: 1,
        label: '在售'
      }, {
        value: 0,
        label: '已下架'
      }],
      imgList: [],
      message: '',
      multipleSelection: [],
      // 商品规格区的数据
      form: {},
      dialogFormVisible: false,
      // form: {
      //   name: '',
      //   region: '',
      //   date1: '',
      //   date2: '',
      //   delivery: false,
      //   type: [],
      //   resource: '',
      //   desc: ''
      // },
      // 商品规格的数量
      speNum: 0,
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
      showAttr: [],
      // 批量修改规格的数据：
      // 控制表单的显示
      dialogVisible: false,
      speNum2: 1,
      attrNum2: 1,
      attrForm2: {
        // 价格
        price: [0],
        // 份量
        weight: [0],
        // 每日库存
        dailyInventory: [0],
        // 当前库存
        inventory: [0],
        // 是否自动补足库存
        status: true,
        // 包装费
        pagfee: [0],
        // 属性集合
        // {attrName: '', children: ['', '', '', '', '', '', '', '', '']}
        attr: [{attrName: '', children: ['', '', '', '', '', '', '', '', '']}],
        // 单位
        unit: '',
        minsold: 1
      }

    }
  },
  created () {
    let params = {token: window.localStorage.getItem('token')}
    this.$store.dispatch('getDish', params).then(() => {
      this.dishList.forEach(item => {
        this.tableData.push(item)
        this.imgList.push(item.img)
        this.specificIdArr.push(item.specificId)
      })
    })
  },
  mounted () {
    let params = {specificIdArr: this.specificIdArr}
    var that = this
    setTimeout(function () {
      axios.post('/business/getspecific', params).then(res => {
        if (res.data.code === 200) {
          let tempArr = res.data.data
          that.attrInfo = tempArr
        }
      })
    }, 500)
  },
  methods: {
    // 选择按钮改变
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 修改图片的方法
    upload (index) {
      var file = document.getElementById(`file${index}`)
      var that = this
      file.onchange = function () {
        var fileData = this.files[0]// 获取到一个FileList对象中的第一个文件( File 对象),是我们上传的文件
        var pettern = /^image/
        if (!pettern.test(fileData.type)) {
          alert('图片格式不正确')
          return
        }
        if (fileData.size > 1024 * 1000) {
          alert('图片文件过大')
          return
        }
        // 压缩文件
        imageConversion.compressAccurately(fileData, 20).then(res => {
			    var reader = new FileReader()
          reader.readAsDataURL(res)// 异步读取文件内容，结果用data:url的字符串形式表示
          /* 当读取操作成功完成时调用 */
          reader.onload = function (e) {
            var el = window.document.getElementById(`img${index}`)
            el.setAttribute('src', this.result)
            that.imgList[index] = this.result
            that.dishList[index].img = this.result
            this.files = {}
            // // 将更改的索引值赋值给isChange
            // this.isChange = index
          }
		    })
      }
    },
    // 点击更新
    updateDish (index) {
      this.isChange = index
      this.open()
    },
    // 确认更新的弹框
    open () {
      this.$alert('确定要修改菜单内容吗？', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          let data = {dishRecord: this.dishList[this.isChange]}
          axios.post('/business/updatedish', data).then(res => {
            this.message = res.data.message
            if (res.data.code === 200) {
              let type = 'success'
              return type
            } else {
              let type = 'error'
              return type
            }
          }).then((type) => {
            this.$message({
              type: type,
              message: `${this.message}`
            })
          })
        }
      })
    },
    // 确认删除的弹框
    open1 (row) {
      this.$alert('确定要删除该商品吗？', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          axios.post('/business/deletedish', {dishid: row.dishid}).then(res => {
            this.message = res.data.message
            if (res.data.code === 200) {
              let type = 'success'
              return type
            } else {
              let type = 'error'
              return type
            }
          }).then((type) => {
            this.$message({
              type: type,
              message: `${this.message}`
            })
            window.location.reload()
          })
        }
      })
    },
    // 删除商品
    handleEdit (index, row) {
      this.open1(row)
    },
    // ------------------------商品规格处理--------------------------
    // 点击编辑规格
    editSpecific (index) {
      this.dialogFormVisible = true
      this.editId = this.dishList[index].specificId
      this.showAttr = this.attrInfo[index]
      // 展示相关数据
      this.attrForm.dailyInventory = this.attrInfo[index].dailyinvent.split('//')
      if (this.attrInfo[index].inventStatus === 1) {
        this.attrForm.status = true
      } else {
        this.attrForm.status = false
      }
      this.attrForm.inventory = this.attrInfo[index].inventory.split('//')
      this.attrForm.minsold = this.attrInfo[index].minsold
      this.attrForm.pagfee = this.attrInfo[index].pagfee.split('//')
      this.attrForm.price = this.attrInfo[index].price.split('//')
      this.speNum = this.attrForm.price.length
      this.attrForm.unit = this.attrInfo[index].unit
      this.attrForm.weight = this.attrInfo[index].weight.split('//')
      // 规格部分
      var arr = this.attrInfo[index].attr.split('!') // 得到：出现的次数，判断所有的属性数
      for (let i = 0; i < arr.length - 1; i++) {
        // let name=
        let namearr = arr[i].split(':')
        // 获得属性名
        let name = namearr[0]
        let children = namearr[1].split('//')
        this.attrForm.attr.push({attrName: name, children: children})
        this.attrNum++
      }
    },
    // 点击关闭
    destoryInfo () {
      this.dialogVisible = false
      this.attrForm.attr = []
      this.attrNum = 0
    },
    // 添加商品规格
    addSpecific (index) {
      if (index === 1) {
        this.speNum += 1
        this.attrForm.price.push(0)
        this.attrForm.weight.push('')
        this.attrForm.inventory.push(0)
        this.attrForm.dailyInventory.push(0)
        this.attrForm.pagfee.push(0)
      } else {
        this.speNum2 += 1
        this.attrForm2.price.push(0)
        this.attrForm2.weight.push('')
        this.attrForm2.inventory.push(0)
        this.attrForm2.dailyInventory.push(0)
        this.attrForm2.pagfee.push(0)
      }
    },
    // 提交商品规格
    submitAttr () {
      this.dialogFormVisible = false
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
      let params = {specificId: this.editId, price: priceArr, weight: weightArr, dailyInventory: dailyInventoryArr, minsold: this.attrForm.minsold, inventory: inventoryArr, pagfee: pagfeeArr, attr: attrArr, inventStatus: this.attrForm.status, unit: this.attrForm.unit}
      axios.post('/business/updatespecific', params).then(res => {
        if (res.data.code === 200) {
          alert(res.data.message)
        }
      })
    },
    // 获取商品规格信息
    getAttr () {

    },
    // 点击添加商品属性
    addAttr (index) {
      if (index === 1) {
        this.attrNum++
        this.attrForm.attr.push({attrName: '', children: ['', '', '', '', '', '', '', '', '']})
      } else {
        this.attrNum2++
        this.attrForm2.attr.push({attrName: '', children: ['', '', '', '', '', '', '', '', '']})
      }
    },
    // 删除商品属性
    closeAttr (index, i) {
      if (index === 1) {
        this.attrNum--
        let newArr = []
        for (let j = 0; j < this.attrForm.attr.length; j++) {
          if (i !== j) {
            newArr.push(this.attrForm.attr[j])
          }
        }
        this.attrForm.attr = newArr
      } else {
        this.attrNum2--
        let newArr = []
        for (let k = 0; k < this.attrForm2.attr.length; k++) {
          if (i !== k) {
            newArr.push(this.attrForm2.attr[k])
          }
        }
        this.attrForm2.attr = newArr
      }
    },
    // --------------------------------批量操作-------------------------------------------------
    // 获取选中的dishid和specificId
    getId () {
      let arr = this.$refs.multipleTable.selection
      let dishIdArr = []
      let specificIdArr = []
      if (arr.length > 0) {
        arr.forEach(item => {
          dishIdArr.push(item.dishid)
          specificIdArr.push(item.specificId)
        })
      }
      return {dishIdArr, specificIdArr}
    },
    // 批量上架
    allUp () {
      let data = this.getId()
      // 获得需要上架的数据
      let dishid = data.dishIdArr
      axios.post('/business/allup', {dishIdArr: dishid}).then(res => {
        alert(res.data.message)
        window.location.reload()
      })
    },
    // 批量下架
    allDown () {
      let data = this.getId()
      // 获得需要下架的数据
      let dishid = data.dishIdArr
      axios.post('/business/alldown', {dishIdArr: dishid}).then(res => {
        alert(res.data.message)
        window.location.reload()
      })
    },
    // 批量删除
    allDelete () {
      let data = this.getId()
      let dishid = data.dishIdArr
      axios.post('/business/alldelete', {dishIdArr: dishid}).then(res => {
        alert(res.data.message)
        window.location.reload()
      })
    },
    // 批量设置规格
    allSet () {
      this.dialogVisible = true
    },
    // 批量修改规格
    comfirmChange () {
      this.dialogVisible = false
      let data = this.getId()
      // 需要修改的规格
      let specificId = data.specificIdArr
      let priceArr = this.attrForm2.price.join('//')
      let weightArr = this.attrForm2.weight.join('//')
      let dailyInventoryArr = this.attrForm2.dailyInventory.join('//')
      let inventoryArr = this.attrForm2.inventory.join('//')
      let pagfeeArr = this.attrForm2.pagfee.join('//')
      let attrArr = ''
      this.attrForm2.attr.forEach(item => {
        let temp = item.attrName + ':' + item.children.join('//')
        attrArr = attrArr + temp + '!'
      })
      let params = {specificIdArr: specificId, price: priceArr, weight: weightArr, dailyInventory: dailyInventoryArr, minsold: this.attrForm2.minsold, inventory: inventoryArr, pagfee: pagfeeArr, attr: attrArr, inventStatus: this.attrForm2.status, unit: this.attrForm2.unit}

      axios.post('/business/allspecific', params).then(res => {
        alert(res.data.message)
      })
    }
  },
  computed: {
    ...mapState({
      dishList: (state) => state.dish.dishList
    })

  }
}
</script>

<style lang="scss" scoped>
.head{
  height: 3em;
  width: 100%;
}
p{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 13px;
  color: #9E9FA2;
  text-align: left;
}
// .el-col{
//   margin-right: 5%;
// }
.operate{
  .el-button{
    float: left;
    border: 1px solid saddlebrown;
  }
}
v-deep .el-row{
  height: 150px;
}
.time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 15%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
