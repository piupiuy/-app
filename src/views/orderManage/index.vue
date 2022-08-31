<template>
  <div>
    <div class="big">
      <!-- 是否自动接单 -->
    <el-switch
  v-model="value"
 active-color="#13ce66"
  inactive-color="#ff4949"
  active-text="自动接单"
  inactive-text="取消自动接单">
</el-switch>
      <!-- 左边标签页 -->
    <div class="tabs">
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="新订单" name="first">
      <!-- <van-empty description="描述文字" v-if="orderList.length===0"/> -->
      <el-empty description="暂无新订单" v-if="orderList.length===0"></el-empty>
      <!-- 订单卡片 -->
        <div class="order"  v-for="(orderinfo,index) in orderList" :key="index" >
        <!-- 订单信息 -->
        <div class="orderinfo">
          <el-card>
            <!-- <img src="../../assets/bg.png" alt=""> -->
            <div class="info">
              <ul v-for="(order,i) in orderinfo " :key="i">
                <li><p>{{order.name}}</p></li>
                <li><p>x{{order.num}}</p></li>
                <li><p>￥{{order.price*order.num}}</p></li>
              </ul>
            </div>
            <span>待处理</span>
          </el-card>
        </div>
        <!-- 用户信息 -->
        <div class="userinfo" v-if="orders.length>0">
          <el-card>
            <p>总额：￥{{total[index]}}&nbsp;&nbsp;备注：{{orders[index].tableware}}&nbsp;&nbsp;{{orders[index].remark}}</p>
            <p >联系人：{{orders[index].userphone}} &nbsp;&nbsp; 地址：{{orders[index].address}}</p>
            <div class="btn"><span><el-button type="primary" @click="acceptOrder(orders[index].orderid,index,2)">接受</el-button> </span><span><el-button type="danger" @click="acceptOrder(orders[index].orderid,index,-2)">拒绝</el-button> </span></div>

          </el-card>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="已处理" name="second">
      <el-empty description="暂无内容" v-if="orderList2.length===0"></el-empty>
       <div class="order"  v-for="(orderinfo,index) in orderList2" :key="index">
        <!-- 订单信息 -->
        <div class="orderinfo">
          <el-card>
            <!-- <img src="../../assets/bg.png" alt=""> -->
            <div class="info">
              <ul v-for="(order,i) in orderinfo " :key="i">
                <li><p>{{order.name}}</p></li>
                <li><p>x{{order.num}}</p></li>
                <li><p>￥{{order.price*order.num}}</p></li>
              </ul>
            </div>
            <span v-show="orders2[index].orderStatus===2" style="color:#61AEFD;">已接单</span>
             <span v-show="orders2[index].orderStatus===3" style="color:#0DBC79;"> 已出餐</span>
              <span v-show="orders2[index].orderStatus===4" style="color:gray;">已完成</span>
               <span v-show="orders2[index].orderStatus===-1"  style="color:#FF976A;">已取消</span>
               <span v-show="orders2[index].orderStatus===-2"  style="color:#ff0000;">已拒绝</span>
          </el-card>
        </div>
        <!-- 用户信息 -->
        <div class="userinfo">
          <el-card>
            <p>总额：￥{{total2[index]}}&nbsp;&nbsp;备注：{{orders2[index].tableware}}&nbsp;&nbsp;{{orders2[index].remark}}</p>
            <p >联系人：{{orders2[index].userphone}} &nbsp;&nbsp; 地址：{{orders2[index].address}}</p>
            <div class="btn"><span><el-button type="primary" @click="acceptOrder(orders2[index].orderid,index,3)" :disabled="orders2[index].orderStatus>2? true:false">出餐</el-button> </span><span><el-button type="success" @click="acceptOrder(orders2[index].orderid,index,4)" :disabled="orders2[index].orderStatus>3? true:false">完成订单</el-button> </span></div>
          </el-card>
        </div>
      </div>
    </el-tab-pane>

    </el-tabs>
    </div>
    <!-- 今日订单概况 -->
    <div class="orderSum">
      <!-- <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span> -->
      <!-- 今日订单概况 -->
    <!-- </span> -->
   <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
  <!-- </div> -->
  <!-- <div  class="text item"> -->
   <!-- <p>已接订单：{{orderNum}}</p>
   <p>今日营业总额：￥{{todayCount}}</p> -->
  <!-- </div> -->
<!-- </el-card> -->
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>
      待处理订单
    </span>
   <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
  </div>
  <div  class="text item">
  <li>待接受订单：{{waitA}}<a href="">查看订单</a></li>
  <li>待配送订单：{{waitS}}<a href="">查看订单</a></li>
  <li>待退款订单：{{waitB}}<a href="">查看订单</a></li>
  </div>
</el-card>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
// 引入时间处理插件
import moment from 'moment'
export default {
  name: 'MerchantIndex',

  data () {
    return {
      activeName: 'second',
      value: false,
      // 订单列表
      orderList: [],
      total: [],
      orders: [],
      // 已处理的订单
      orders2: [],
      orderList2: [],
      total2: [],
      todayCount: 0,
      orderNum: 0,
      // 待接受订单
      waitA: 0,
      // 待配送
      waitS: 0,
      // 待退款
      waitB: 0
    }
  },

  mounted () {
    let token = window.localStorage.getItem('token')
    // 获取待处理的订单
    axios.post('/business/getorder', {token: token}).then(res => {
      if (res.data.code) {
        let orderList = res.data.data
        this.orders = orderList
        // console.log(orderList)
        // this.orderList用于存放所有的订单信息
        for (let i = 0; i < orderList.length; i++) {
          // 判断该店铺是否开启自动接单
          if (this.value) {
            this.acceptOrder(orderList[i].orderid, i, 2)
          }
          // orderinfo用于订单的商品信息
          let orderinfo = []
          //  当前订单
          let order = orderList[i]
          let dishname = order.dishNameArr.split('//')
          let num = order.dishNumArr.split('//')
          let price = order.priceArr.split('//')
          let total = 0
          for (let j = 0; j < dishname.length - 1; j++) {
            let obj = {name: dishname[j], num: num[j], price: price[j]}
            orderinfo.push(obj)
            total += parseInt(price[j])
          }
          this.orderList.push(orderinfo)
          this.total.push(total)
        }
        this.waitA = this.orderList.length
      }
    })
    // 获取已处理的订单
    axios.post('/business/getdeal', {token: token}).then(res => {
      if (res.data.code) {
        let orderList2 = res.data.data
        this.orders2 = orderList2
        // console.log(orderList)
        // this.orderList用于存放所有的订单信息
        for (let i = 0; i < orderList2.length; i++) {
          if (orderList2[i].orderStatus === 2) {
            this.waitS++
          }
          // orderinfo用于订单的商品信息
          let orderinfo = []
          //  当前订单
          let order = orderList2[i]
          let dishname = order.dishNameArr.split('//')
          let num = order.dishNumArr.split('//')
          let price = order.priceArr.split('//')
          let total = 0
          for (let j = 0; j < dishname.length - 1; j++) {
            let obj = {name: dishname[j], num: num[j], price: price[j]}
            orderinfo.push(obj)
            total += parseInt(price[j])
          }
          this.orderList2.push(orderinfo)
          this.total2.push(total)
        }
      }
    })

    this.getAccept()
  },

  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    // 接收订单
    acceptOrder (orderid, index, status) {
      axios.post('/business/accept', {orderid: orderid, status: status}).then((res) => {
        // console.log(res)
        if (res.data.code === 200) {
          // alert('接单成功')
          // 接单成功则该订单要移动到已处理
          this.$router.go(0)
        //  let info= this.orders[index]
        }
      }

      )
    },
    // 记录当天接受的订单数
    getAccept () {
      let token = window.localStorage.getItem('token')
      axios.post('/business/ordernum', {token: token}).then(res => {
        if (res.data.code === 200) {
          this.orderNum = res.data.data.length
          res.data.data.forEach(item => {
            this.todayCount += item.total
          })
        }
      })
    }
    // record(){
    //    // 执行定时任务
    //   setTimeout(() => {
    //     // this.getfootpathList('0点刷新')
    //     // this.getequipmentList('0点刷新')
    //     // 次天0点 执行每天24;00 刷新
    //     setInterval(() => {
    //       // this.getfootpathList('0点刷新')
    //       // this.getequipmentList('0点刷新')
    //     }, 1000 * 60 * 60 * 24)
    //   }, residueTemp)
    // }
  }
}
</script>

<style lang="scss" scoped>
.el-tab-pane{
  height: 80%
}
.order{
  width: 70%;
  margin-bottom: 1em;
  .orderinfo{
      .info{
        // display: inline-block;
        ul{
           li:first-child{
              font-size: 2em;
              font-weight: bold;
            }
          li{
            float: left;
            list-style: none;
            margin-right: 1em;
            width: 3em;
              p{
                font-size: 12px;
              }
          }
        }
      float: left;

    }

  }
  .userinfo{
    .el-card{
      p{
      text-align:left;
      font-size:x-small;
    }
    }

  }
  .btn{
    float: right;
      span{
           margin:1em;
      }
    }
}

.big{
  width: 100%;
  .tabs{
    width: 40em;
    float: left;
  }
  .orderSum{
    float: right;
    width:20em;
    .box-card{
      .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
      p{
        text-align: left;
      }
      li{
      list-style: none;
      display: block;
      height: 2em;
      text-align: left;
      //  p{
      // float: left;
      // }
      a{
        float: right;
        font-size: 12px;
        text-decoration: none;
        color: gray;
      }
    }
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  // span{
  //   text-align: left;
  // }
  .box-card {
    width: 480px;
  }
    }
  }
}
// .tabs{
//   height: 50%;
// }
</style>
