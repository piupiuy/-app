<template>
  <div>
    <!-- 头部列表区 -->
    <ul>
      <li><i><img src="../../../assets/money.png" alt=""></i> <div class="licontent">销售额<span>{{soldSum}}</span></div></li>
      <li><i><img src="../../../assets/sale.png" alt=""></i> <div class="licontent">总销量<span>{{soldCount}}</span></div></li>
      <li><i><img src="../../../assets/good.png" alt=""></i> <div class="licontent">商品数<span>{{dishNum}}</span></div></li>
    </ul>

    <!-- 评价区 -->
    <div class="comment">

      <div class="block">
          店铺评价
        <div class="combox">
          <span class="demonstration">综合评分</span>
          <el-rate v-model="value1"  disabled ></el-rate>
        </div>

        <div class="combox">
          <span class="demonstration">包装&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <el-rate v-model="value2" disabled ></el-rate>
        </div>
        <div class="combox">
          <span class="demonstration">食品得分</span>
          <el-rate v-model="value2" disabled></el-rate>
        </div>
      </div>
    </div>
    <!-- 统计区 -->
    <div class="count">
      <!-- 商品统计 -->

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
  name: 'Count',

  data () {
    return {
      value1: 0,
      value2: 0,
      value3: 0,
      soldSum: 0,
      soldCount: 0,
      dishNum: 0,
      obj: {}
    }
  },

  mounted () {
    // this.getInfo()
    axios.post('/business/gettotal', {storeid: window.localStorage.getItem('token')}).then(res => {
      if (res.data.code === 200) {
        this.soldSum = res.data.data[0].sold
        this.soldCount = res.data.data[0].count1
        this.dishNum = res.data.result[0].count2
      }
    })
    axios.post('/business/count', {storeid: window.localStorage.getItem('token')}).then(res => {
      if (res.data.code === 200) {
        // this.soldSum = res.data.data[0].sold
        // this.soldCount = res.data.data[0].count1
        // this.dishNum = res.data.result[0].count2
        console.log(res.data.data)
        this.value1 = res.data.data[0].shopRate
        this.value2 = res.data.data[0].pag
        this.value3 = res.data.data[0].taste
      }
    })
  },

  methods: {

  },
  computed: {
    ...mapState({
      userInfo: state => state.home.userInfo
    })
  }
}
</script>

<style lang="scss" scoped>
div{
  ul{
  height: 100px;
  // background: white;
  display: flex;
  justify-content: space-around;
  li{
    list-style: none;
    width: 30%;
    background: white;
    float: left;
    margin-right: 10px;
    i{
      float: left;
      // border: 1px solid salmon;
      margin-top: 20px;
      width: 130px;
      img{
        width: 50%;
      }

    }
    .licontent{
       margin-top: 20px;
       margin-right:30px;
      float: right;
      width: 60px;
      // border: 1px solid saddlebrown;
      color: gray;
      span{
        font-size: 30px;
        color: #000000;
      }
    }
  }
}
.comment{
  height: 200px;
  background: #ffffff;
  .block{
    float: left;
    margin-top: 10px;
    margin-left: 10px;

    .combox{
       margin-top: 20px;
        margin-bottom: 20px;
      width: 200px;
       span{
       float: left;
       .el-rate{
      float: right;
    }
    }

    }

  }
}
.count{
  height: 350px;
  background: #ffffff;
  margin: 10px auto;
}

}

</style>
