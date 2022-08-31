<template>
  <div>
    <div class="comment" v-for="(comment,index) in commentList" :key="index">
    <el-row>
      <!-- 用户信息，菜品信息 -->
      <el-col :span="16">
        <div class="grid-content bg-purple-light">
          <img src="../../assets/user.png" alt="" style="width:30px;height:30px;float: left;"> <p>{{comment.userid}}</p>
        </div>
      </el-col>
    </el-row>
    <!-- 用户评分 -->
     <el-row>
      <el-col :span="16">
      <div class="grid-content bg-purple-light">
        <p><span>满意度：{{comment.shopRate}}颗星</span> <span>包装评分：{{comment.pag}}颗星</span> <span>味道：{{comment.taste}}颗星</span></p>
      </div>
      </el-col>
      <!-- 用户评价 -->
      <el-col :span="16">
      <div class="grid-content bg-purple-light">
      <p> 评价：{{comment.commentInfo}}</p>
      </div>
      </el-col>
    </el-row>
    <!-- 回复 -->
    <div v-if="comment.replyInfo===null">
    {{comment.replyInfo}}
      <el-row  v-if="!show">
      <el-col :span="16">
        <textarea name="" id="" cols="100" rows="4" v-model="reply"></textarea>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">
        <el-button type="primary" @click="Reply(comment.commentId)"  v-if="!show">点击提交</el-button>
        <el-button type="primary" @click="goReply" v-if="show">点击回复</el-button>
        </div>
      </el-col>
    </el-row>
    </div>
    <el-row v-else>
       <el-col :span="16">
       <p style="text-align:left;" >已回复：{{comment.replyInfo}}</p>
       </el-col>
    </el-row>
</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MerchantIndex',

  data () {
    return {
      commentList: [],
      show: true,
      // 回复
      reply: ''
    }
  },

  mounted () {
    axios.post('/business/getcomment', {storeid: window.localStorage.getItem('token')}).then(res => {
      if (res.data.code === 200) {
        this.commentList = res.data.data
      }
    })
  },

  methods: {
    goReply () {
      this.show = false
    },
    // 提交回复
    Reply (commentid) {
      axios.post('/business/reply', {commentId: commentid, reply: this.reply}).then(res => {
        if (res.data.code === 200) {
          alert('回复成功')
          this.reply = ''
          this.show = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.comment{
  background: white;
  margin-bottom: 2em;
}
.el-row {
    margin-bottom: 0px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    // background: #e5e9f2;
    background:white;
    p{
      text-align: left;
    }
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
