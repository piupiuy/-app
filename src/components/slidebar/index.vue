<template>
  <div>
    <el-row class="tac" style="height:100%">
    <el-col style="width:100%">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="height:100%">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-shop"></i>
          <span>店铺管理</span>
        </template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <router-link to="/home/count"><el-menu-item index="1-1" class="el-icon-s-data" >店铺统计</el-menu-item></router-link>
         <router-link to="/home/shopset"> <el-menu-item index="1-2" class="el-icon-s-operation">店铺配置</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-shopping-bag-1"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <router-link to="/home/goodlist"><el-menu-item index="1-1" class="el-icon-s-management">商品列表</el-menu-item></router-link>
          <router-link to="/home/addgood"><el-menu-item index="1-2" class="el-icon-circle-plus">添加商品</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      <router-link to="/home/type">
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">分类管理</span>
      </el-menu-item>
      </router-link>
      <router-link to="/home/comment">
      <el-menu-item index="4">
        <i class="el-icon-chat-dot-square"></i>
        <span slot="title">评价管理</span>
      </el-menu-item>
      </router-link>
      <router-link to="/home/order">
      <el-menu-item index="5">
        <i class="el-icon-s-order"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      </router-link>
      <router-link to="/home/decoration">
      <el-menu-item index="6">
        <i class="el-icon-magic-stick"></i>
        <span slot="title">店铺装修</span>
      </el-menu-item>
      </router-link>
    </el-menu>
  </el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  name: 'MerchantIndex',

  data () {
    return {

    }
  },

  mounted () {

  },

  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
