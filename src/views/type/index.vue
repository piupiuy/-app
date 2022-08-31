<template>
  <div>
<el-button @click="addType">添加分类</el-button>
<el-table
    :data="tableData"
    height="480"
    :border="true"
    style="width: 100%">
    <!-- 分类名称 -->
   <el-table-column  label="分类名称" width="140" key="slot" >
          <template v-slot="name">
          <!-- {{name.$index}} -->
          {{name.raw}}
             <el-input v-model="tableData[name.$index].typename " ></el-input>
          </template>
        </el-table-column>
    <el-table-column
      prop="choose"
      label="选择商品"
      width="280">
      <template v-slot="scope">
       <el-select
       @remove-tag="removeTag($event)"
       v-model="tableData[scope.$index].choose"
    multiple
    style="margin-left: 20px;"
    placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.dishid"
      :label="item.dishname"
      :value="item.dishname">
    </el-option>
  </el-select>
      </template>

    </el-table-column>
    <el-table-column
      prop="goodnum"
      label="商品数">
    </el-table-column>
    <el-table-column
      label="操作">
      <template v-slot="operScope">
      <el-button
          size="mini"
          type="primary"
          @click="updateToType(operScope.$index)"
          >更新</el-button>
        <el-button
          size="mini"
          @click="addToType(operScope.$index)"
          >添加</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteType(operScope.$index)"
          >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
export default {
  name: 'MerchantIndex',

  data () {
    return {
      tableData: [

      ],
      options: [],
      value2: [],
      typeName: '',
      // 未修改的数据
      removeChoose: []
    }
  },
  created () {
    let data = {token: window.localStorage.getItem('token')}
    axios.post('/business/dishinfo', data).then(res => {
      // 获取当前店铺的商品信息
      if (res.data.code === 200) {
        this.options = res.data.data
      }
    })
    axios.post('/business/gettype', data).then(res => {
      if (res.data.code === 200) {
        for (var i = 0; i < res.data.data.length; i++) {
          this.tableData.push(res.data.data[i])
          Vue.set(res.data.data[i], 'choose', [])
          let typeid = res.data.data[i].typeid
          // 遍历商品数组，判断商品的类型id是否等于此分类的类型id
          this.options.forEach(item => {
            if (typeid === parseInt(item.type)) {
              this.tableData[i].choose.push(item.dishname)
            }
          })

          // 计算该分类的商品数
          this.tableData[i].goodnum = this.tableData[i].choose.length
        }
      }
    })
  },
  mounted () {

  },

  methods: {
    addType () {
      this.tableData.push({typeName: '', choose: [], goodNum: 0})
    },
    addToType (index) {
      let goodnum = this.tableData[index].choose.length
      let typeName = this.tableData[index].typename
      let data = {goodnum: goodnum, typename: typeName, choose: this.tableData[index].choose, token: window.localStorage.getItem('token')}
      axios.post('/business/addtype', data).then(res => {
        alert(res.data.message)
      })
    },
    // 删除分类
    deleteType (index) {
      // 获得要删除的分类id
      let typeid = this.tableData[index].typeid
      this.open(typeid)
    },
    open (typeid) {
      this.$confirm('删除分类后不可恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 向后台提交删除的信息
        let data = {typeid: typeid}
        axios.post('/business/deletetype', data).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            location.reload()
          } else {
            this.$message({
              type: 'info',
              message: res.data.message
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除分类'
        })
      })
    },
    // 更新分类
    updateToType (index) {
      // 从分类中删除的商品的分类要改为null，新添加的分类要变为该分类的id
      let data = {typename: this.tableData[index].typename, goodnum: this.tableData[index].choose.length, choose: this.tableData[index].choose, token: window.localStorage.getItem('token'), typeid: this.tableData[index].typeid, removeChoose: this.removeChoose}
      axios.post('/business/updatetype', data).then(res => {
        this.removeChoose = []
        alert(res.data.message)
        if (res.data.code === 200) {
          location.reload()
        }
      })
    },
    // 获得移除的tag值
    removeTag (tag) {
      // (此处有bug，不能同时点击两处的tag)
      console.log(tag)
      this.removeChoose.push(tag)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button{
  float: left;
}
</style>
