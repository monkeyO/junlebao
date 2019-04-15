<template>
  <div class='orderappeal'>
    <Header :active=2></Header>
    <div class='box con-box'>
       <el-col :span="24" style="background: #fff;">
        <div class="pay_success w1200">
          <div class="complete_img">
            <img src="@/assets/img/common/complete.png" alt="">
          </div>
          <div class="success_content">
            <p style="font-size: 30px; color: #000;">{{title}}</p>
            <p style="font-size: 25px; color: #5e5e5e; margin-top: 10px;">{{remark}}</p>
          </div>
        </div>
         <div class="operate_button">
           <router-link to="/task">发布新任务</router-link>
           <router-link :to="btnLink">{{btnContent}}</router-link>
         </div>
       </el-col>
    </div>
  </div>
</template>

<script>
import Header from '@/components/public/Header'

export default {
  name: 'PaySuccess',
  data () {
    return {
      msg: '支付成功',
      title: ``, //标题
      remark: ``, //内容
      btnContent: ``, //按钮内容
      btnLink: `` //链接
    }
  },
  components: {
    Header
  },
  mounted(){
    let type = this.$route.query.type
    switch(type) {
      case 'appeal':
        this.title = '订单申诉成功!'
        this.remark = '平台工作人员将尽快为您处理'
        this.btnContent = '返回订单申诉'
        this.btnLink = '/orderappeal'
        break
      case 'black':
        this.title = '已拉黑成功!'
        this.remark = '此买号将不再接手您家的任务'
        this.btnContent = '返回黑名单'
        this.btnLink = '/blacklist'
        break
    }
  }
}
</script>

<style scoped>
.box{
    display: flex;
    justify-content: center;
}
.orderappeal{
  background: #f0f0f0;
}
.con-box {
  padding-bottom: 0;
}
/* 支付/申诉成功 */
.pay_success {
  text-align: center;
}
.complete_img {
  margin-top: 170px;
}
.complete_img img {
  margin-left: -30px;
}
.success_content {
  margin-top: 48px;
  letter-spacing: 1px;
}
.operate_button {
  margin-top: 58px;
  text-align: center;
}
.operate_button a {
  display: inline-block;
  width: 252px;
  height: 55px;
  line-height: 55px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  background: #f53d69;
  border-radius: 6px;
}
.operate_button a+a {
  margin-left: 40px;
}
</style>
