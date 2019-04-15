<template>
  <div class="my_task_detail">
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
        <div class="my_task_detail_box">
          <div class="title">
            <h2>发布任务详情</h2>
          </div>
          <div class="detail">
            <el-row>
              <el-col :span="7" class="item_img">
                <img :src="orderinfo.commoditymasterimgurl" alt="">
              </el-col>
              <el-col :span="16" class="detail_content">
                <h2>{{orderinfo.commodityname}}</h2>
                <el-row style="text-align: center; margin-bottom: 20px;">
                  <el-col :span="5" style="border-right: 1px solid #ccc;">
                    <h3>发布平台</h3>
                    <span class="content_span">{{orderinfo.pctype|MYpctype}}</span>
                  </el-col>
                  <!-- <el-col :span="7" style="border-right: 1px solid #ccc;">
                    <h3>店铺名</h3>
                    <span class="content_span">{{orderinfo.shopname}}</span>
                  </el-col> -->
                  <el-col :span="6" style="border-right: 1px solid #ccc;">
                    <h3>任务渠道</h3>
                    <span class="content_span">{{orderinfo.clientype=="1"?'无线端任务':'PC端任务'}}</span>
                  </el-col>
                  <el-col :span="6">
                    <h3>任务类型</h3>
                    <span class="content_span">{{orderinfo.ordertype|MYordertype}}</span>
                  </el-col>
                </el-row>
                <div class="detail_bottom">
                  <el-row>
                    <el-col :span="11">
                      <img src="@/assets/img/task/msg_1.png" alt="">
                      <span class="span_title">任务编号：<span>{{orderinfo.orderno}}</span></span>
                    </el-col>
                    <el-col :span="11" :offset="1">
                      <img src="@/assets/img/task/msg_2.png" alt="">
                      <span class="span_title">任务支付时间：<span>{{orderinfo.paydate=="0"?'未支付':orderinfo.paydate}}</span></span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="11">
                      <img src="@/assets/img/task/msg_2.png" alt="">
                      <span class="span_title">任务上线时间：<span>{{orderinfo.onlinedate}}</span></span>
                    </el-col>
                    <el-col :span="11" :offset="1">
                      <img src="@/assets/img/task/msg_3.png" alt="">
                      <span class="span_title">任务状态：<span style="color: #39312f;">{{orderinfo.state|MYorderstate}}</span></span>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="detail_box">
            <p>
              <span class="detail_box_title">任务支付金额：</span> 金币：<span>{{orderinfo.gold}}</span> 押金：<span>{{orderinfo.yajin}}</span>
              (商品押金:{{orderinfo.commoditymoney}}元 运费押金:{{orderinfo.freightmoney}}元 下单:{{orderinfo.cost}}金币 <span v-if="orderinfo.ordertype=='3'||orderinfo.ordertype=='4'">人气:{{orderinfo.visitorgold}}金币</span>
               增值服务费:{{orderinfo.addservicedmoney}}金币  平台代返款:{{orderinfo.depositmoney}}金币  平台待确认截图费：{{orderinfo.depositbackmoney}}金币)
            </p>
          </div>
          <div class="detail_box">
            <p>
              <span class="detail_box_title">商品链接：</span>
              <span style="word-break: break-all;"><a :href="orderinfo.commodityurl" target="_blank">{{orderinfo.commodityurl}}</a></span>
            </p>
          </div>
          <div class="other_box clearfix">
            <ul>
              <li>
                <span class="other_box_title">任务执行天数：</span><span>{{orderinfo.alldays}}</span>天
              </li>
              <li>
                <span class="other_box_title">单品售价：</span><span>{{orderinfo.commodityprice}}</span>元
              </li>
              <li>
                <span class="other_box_title">拍下件数：</span><span>{{orderinfo.personbuycount}}</span>件
              </li>
              <li>
                <span class="other_box_title">页面展示价格：</span><span>{{orderinfo.commodityshowprice}}</span>元
              </li>
              <li>
                <span class="other_box_title">运费收取方式：</span><span>{{orderinfo.logmoney=="1"?"产品不包邮":"产品本身包邮"}}</span>
              </li>
              <li>
                <span class="other_box_title">支付要求：</span><span :title='orderinfo.zhifu'>{{orderinfo.zhifu}}</span>
              </li>
              <li style="width:100%">
                <span class="other_box_title">商家备注：</span><span :title='orderinfo.remark'>{{orderinfo.remark}}</span>
              </li>
            </ul>
          </div>

          <div class="detail_table">
            <el-row class="detail_table_title">
              <!-- <el-col :span="8">发布下单任务总数：<span>{{dataxiadan.num}}</span>人</el-col>
              <el-col :span="8" style="border-left: 2px solid #fff;">发布人气任务总数：<span>{{datarenqi.num}}</span>人</el-col> -->
              <el-col :span="8">关键词</el-col>
            </el-row>
            <el-row class="detail_table_body">
              <!-- <el-col :span="8">
                <p v-for="(item,index) of dataxiadan.data" :key="index">第{{item.days}}天：<span>{{item.totalperson}}</span>人</p>
              </el-col>
              <el-col :span="8" style="border-left: 2px solid #ccc;">
                <p v-for="(item,index) of datarenqi.data" :key="index">第{{item.days}}天：<span>{{item.totalperson}}</span>人</p>
              </el-col> -->
              <el-col :span="8">
                <p v-for="(item,index) of datakeyword" :key="index">
                  <span v-if="item.keyword&&orderinfo.ordertype!='7'">{{item.keyword}}：{{item.pordernum}}人</span>
                  <span v-if="item.keyword&&orderinfo.ordertype=='7'" style="display: flex; align-items: center; justify-content: center;">
                    <img :src="item.keyword" alt="" style="display: inline-block; width: 100px; height: 100px;">:{{item.pordernum}}人
                  </span>
                </p>
              </el-col>
            </el-row>
          </div>

          <div class="title">
            <h2>增值服务</h2>
          </div>
          <div class="other_box clearfix">
            <ul>
              <li v-for="(item,index) of orderinfo.zengzhi" :key="index">
                <span class="other_box_title">{{item.classname}}：</span><span :title="item.value">{{item.value}}</span>
              </li>
            </ul>
          </div>
          <div class="title">
            <h2>子任务列表</h2>
          </div>

          <div class="subtask_table">
            <el-row class="subtask_table_title">
              <el-col :span="5">子任务编号</el-col>
              <el-col :span="5" style="border-left: 2px solid #fff;">买号</el-col>
              <el-col :span="5" style="border-left: 2px solid #fff;">订单编号</el-col>
              <el-col :span="5" style="border-left: 2px solid #fff; border-right: 2px solid #fff;">任务状态</el-col>
              <el-col :span="4">
                <button class="export_btn" @click="exportData">任务订单导出</button>
                <form :action="formAction" method="post" ref="exportform">
                  <input type="hidden" name="gxtype" value="1">
                  <input type="hidden" name="gxtypevalue" :value="orderinfo.orderno">
                </form>
              </el-col>
            </el-row>
            <el-row class="subtask_table_body" v-for="(item,index) of subOrderinfo" :key="index">
              <el-col :span="5">{{item.taskno}}</el-col>
              <el-col :span="5" style="border-left: 2px solid #ccc;">{{item.name}}</el-col>
              <el-col :span="5" style="border-left: 2px solid #ccc;">{{item.donecode}}</el-col>
              <el-col :span="5" style="border-left: 2px solid #ccc;">{{item.state|MYChildState(item.isaudited)}}</el-col>
              <el-col :span="4" style="border-left: 2px solid #ccc;">
                <el-button type="danger" plain @click="childDetail(item.taskno,item.datearea)">子任务详情</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </div>
  </div>
</template>
<script>
import Header from '@/components/public/Header'
import PersonList from '@/components/public/PersonList'
import {MYpctype,MYorderstate,MYordertype,MYChildState} from '@/assets/js/util/myfilter'

export default {
  name: 'MyTaskDetail',
  data(){
    return {
      formAction:``,
      banner: [],         // banner
      orderno: ``,
      datearea: ``,
      orderinfo: {},      // 订单信息
      subOrderinfo:{},
      dataxiadan:{},
      datarenqi:{},
      datakeyword:{}
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name != 'childtaskdetail') {
      delete sessionStorage.orderno
      delete sessionStorage.datearea
    }
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
    let orderno = sessionStorage.orderno
    let datearea = sessionStorage.datearea
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
        url: `TaskManageInterface/getorder?tk=${sessionStorage.token}`,
        data: {orderno,datearea},
        needAlert: false
      })
      if(!data) return false
      this.orderinfo = data.data.order
      this.subOrderinfo = data.data.sub_order
      this.dataxiadan = data.data.xiadan
      this.datarenqi = data.data.renqi
      this.datakeyword = data.data.keyword
    },
    childDetail(orderno,datearea){
      // orderno = window.btoa(orderno)
      // datearea = window.btoa(datearea)
      sessionStorage.n_orderno = orderno
      sessionStorage.n_datearea = datearea
      // this.$router.push(`/childtaskdetail?orderno=${orderno}&datearea=${datearea}`)
      this.$router.push(`/childtaskdetail`)
    },
    //导出数据
    exportData(){
      this.formAction = `${URLconfig.HTTPURL}/Order/exportexcel?tk=${sessionStorage.token}`
      // 使用settimeout 挂起程序等action赋值完成
      setTimeout(()=>{
        this.$refs.exportform.submit()
      })
    }
  },
  filters: {
    MYpctype,
    MYorderstate,
    MYordertype,
    MYChildState
  },
  computed: {
  },
  components: {
    Header,
    PersonList
  }
}
</script>
<style scoped>
.my_task_detail{
  background: #F0F0F0;
}
.box{
  display: flex;
  justify-content: center;
}
.personlist{
  margin-right: 15px;
}
.my_task_detail_box {
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
.detail {
  margin: 20px auto 50px;
}
.detail .item_img img {
  display: block;
  /*width: 312px;*/
  width: 290px;
  height: 100%;
}
.detail .detail_content {
  margin-left: 35px;
}
.detail_content h2 {
  margin-bottom: 20px;
  color: #5f5f5f;
}
.detail_content h3 {
  margin-bottom: 10px;
  color: #676767;
}
.detail_content .content_span {
  font-size: 16px;
  color: #b2b2b2;
}
.detail .detail_bottom {
  padding: 0 0 30px 15px;
}
.detail img {
  vertical-align: middle;
}
.span_title {
  font-size: 15px;
  color: #39312f;
}
.span_title span {
  font-size: 14px;
  color: #8d8d8d;
}
.detail_box {
  color: #8d8d8d;
  font-size: 16px;
  padding-bottom: 25px;
  border-bottom: 1px solid #cbcbcb;
  margin-top: 25px;
  line-height: 24px;
}
.detail_box .detail_box_title {
  color: #39312f;
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
}
.detail_table, .subtask_table {
  text-align: center;
  margin-bottom: 25px;
}
.detail_table_title, .subtask_table_title {
  padding: 15px 0;
  background: #ff8f8e;
  font-size: 16px;
  color: #fff;
}
.subtask_table_title {
  display: flex;
  align-items: center;
  line-height: 24px;
  padding: 8px 0;
}
.detail_table_body, .subtask_table_body {
  padding: 20px 0;
  border: 1px solid #ccc;
  border-top: 0;
}
.subtask_table_body {
  font-size: 16px;
  color: #8d8d8d;
  padding: 10px 0;
}
.export_btn {
  color: #fff;
  background: #4b52e5;
  border: 0;
  padding: 8px 14px;
  border-radius: 3px;
  font-size: 14px;
}
</style>
