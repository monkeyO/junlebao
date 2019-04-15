<template>
  <div class="child_task_detail">
    <Header :active=5></Header>
    <!-- 轮播图 -->
    <el-carousel :interval="5000" arrow="always" height="280px" style='margin-top:20px'>
      <el-carousel-item v-for="(item,index) in banner" :key="index">
        <a :href="item.url">
          <img :src="item.imgurl" alt="" width="100%">
        </a>
      </el-carousel-item>
    </el-carousel>
    <!-- 内容 -->
    <div class="box con-box w1200">
      <PersonList active='my-task'></PersonList>
      <el-col :span="20">
        <div class="child_task_detail_box">
          <div class="title">
            <h2>子任务详情</h2>
          </div>
          <div class="other_box clearfix">
            <ul>
              <li>
                <span class="other_box_title">任务编号：</span><span>{{dataorder.orderno}}</span>
              </li>
              <li style="width: 27%;">
                <span class="other_box_title">买号：</span><span>{{dataorder.name}}</span>
              </li>
              <li style="width: 33%;">
                <span class="other_box_title">子任务编号：</span><span :title="dataorder.taskno">{{dataorder.taskno}}</span>
              </li>
              <li>
                <span class="other_box_title">订单号：</span><span>{{dataorder.donecode}}</span>
              </li>
              <li style="width: 27%;">
                <span class="other_box_title">任务状态：</span><span :title="dataorder.state|MYChildState(dataorder.isaudited)">{{dataorder.state|MYChildState(dataorder.isaudited)}}</span>
              </li>
              <li style="width: 33%;">
                <span class="other_box_title">付款金额：</span><span>{{dataorder.donemon}}元</span>
              </li>
              <li>
                <span class="other_box_title">买手接手时间：</span>{{dataorder.getdate}}<span></span>
              </li>
              <li style="width: 100%;">
                <span class="other_box_title">评价：</span><span>{{dataorder.evaluatecontent}}</span>
              </li>
            </ul>
          </div>
          <div class="title">
            <h2>买手收货信息</h2>
          </div>
          <div class="other_box clearfix">
            <ul>
              <li>
                <span class="other_box_title">收件人姓名：</span><span>{{dataorder.collectuser}}</span>
              </li>
              <li>
                <span class="other_box_title">收货人电话：</span><span>{{dataorder.collectphone}}</span>
              </li>
              <li style="width: 100%;">
                <span class="other_box_title">收货人地址：</span><span :title="dataorder.address">{{dataorder.province}}{{dataorder.city}}{{dataorder.area}}{{dataorder.address}}</span>
              </li>
            </ul>
          </div>
          <div class="title" style="border-bottom: 0; padding-bottom: 35px;">
            <h2>任务截图</h2>
          </div>
          <div class="task_screenshot clearfix">
            <ul>
              <li v-for="(item,index) of dataorder.img" :key="index">
                <img :src="item.value" alt="" width="180" height="240" @click="showIMG(item.value)" style="cursor: pointer;">
                <p>{{item.name}}</p>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </div>
  </div>
</template>
<script>
import Header from '@/components/public/Header'
import PersonList from '@/components/public/PersonList'
import {MYChildState} from '@/assets/js/util/myfilter'
import {MessageBox} from 'element-ui'

export default {
  name: 'ChildTaskDetail',
  data(){
    return {
      banner: [],         // banner
      orderno: ``,
      datearea: ``,
      dataorder:{}
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name != 'mytaskdetail') {
      delete sessionStorage.orderno
      delete sessionStorage.datearea
    }
    delete sessionStorage.n_orderno
    delete sessionStorage.n_datearea
    delete sessionStorage.reset
    delete sessionStorage.type
    next()
  },
  async mounted(){
    // 获取轮播图，暂时使用商家中心接口获取，后期看情况改
    let data = await this.ajax({
      url: `SellerCenterInterface/getSellerCenter?tk=${sessionStorage.token}`,
      needAlert: false
    })
    if(!data) return false
    this.banner = data.banner

    // 获取数据
    // let orderno = this.$route.query.orderno
    // let datearea = this.$route.query.datearea
    let orderno = sessionStorage.n_orderno
    let datearea = sessionStorage.n_datearea
    if(orderno!=undefined && datearea!=undefined){
      // this.orderno = window.atob(orderno)
      // this.datearea = window.atob(datearea)
      this.orderno = orderno
      this.datearea = datearea
      this.getinfor(this.orderno,this.datearea)
    }
  },
  methods: {
    //获取任务详情数据
    async getinfor(orderno,datearea){
      let data = await this.ajax({
        url: `TaskManageInterface/gettaskinfo?tk=${sessionStorage.token}`,
        data: {orderno,datearea},
        needAlert: false
      })
      if(!data) return false
      this.dataorder = data.data
    },
    showIMG(url){
     MessageBox.alert(`<img src='${url}' width='100%' >`,'',{
        dangerouslyUseHTMLString:true,
        showClose: false
      });
    },
  },
  computed: {
  },
  filters: {
    MYChildState
  },
  components: {
    Header,
    PersonList
  }
}
</script>
<style scoped>
.child_task_detail{
  background: #F0F0F0;
}
.box{
  display: flex;
  justify-content: center;
}
.personlist{
  margin-right: 15px;
}
.child_task_detail_box {
  background: #fff;
  padding: 25px;
}
.title {
  padding-bottom: 20px;
  border-bottom: 1px solid #cbcbcb;
}
.title h2 {
  height: 20px;
  line-height: 20px;
  font-size: 18px;
  letter-spacing: 2px;
  border-left: 4px solid #ff4251;
  padding-left: 15px;
}
.other_box {
  width: 100%;
  margin-bottom: 30px;
}
.other_box ul li {
  width: 30.1%;
  float: left;
  border-bottom: 1px solid #cbcbcb;
  margin-right: 45px;
  line-height: 70px;
  color: #8d8d8d;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.other_box ul li:nth-child(3n) {
  margin-right: 0;
}
.other_box_title {
  color: #39312f;
  letter-spacing: 1px;
}
.task_screenshot ul li {
  width: 18.96%;
  float: left;
  margin-right: 75px;
}
.task_screenshot ul li:nth-child(4n) {
  margin-right: 0;
}
.task_screenshot ul li img {
  display: block;
}
.task_screenshot ul li p {
  font-size: 16px;
  text-align: center;
  padding: 15px 0 20px;
  color: #8d8d8d;
  letter-spacing: 2px;
}

</style>
