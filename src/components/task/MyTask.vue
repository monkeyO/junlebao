<template>
  <div class="my_task">
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
        <div class="my_task_box">
          <div class="select_condition">
            <!-- 选择条件 -->
            <SelectSearch ref="search" :type="1" :data="selected" @getTaskData="getTaskData"></SelectSearch>
          </div>
          <!-- 任务状态 -->
          <div class="my_task_state">
            <ul>
              <li @click="toggleDisplay('all')" :class="selected=='all'?'active_li':''"><span>全部</span></li>
              <li @click="toggleDisplay('underway')" :class="selected=='underway'?'active_li':''"><span>进行中</span></li>
              <li @click="toggleDisplay('unpaid')" :class="selected=='unpaid'?'active_li':''"><span>待支付</span></li>
              <li @click="toggleDisplay('wait')" :class="selected=='wait'?'active_li':''"><span>待审核</span></li>
              <li @click="toggleDisplay('completed')" :class="selected=='completed'?'active_li':''"><span>已完成</span></li>
              <li @click="toggleDisplay('nopass')" :class="selected=='nopass'?'active_li':''"><span>审核未通过</span></li>
            </ul>
          </div>
          <!-- 任务管理 -->
          <div class="my_task_review">
            <div class="my_task_item" v-for="item of tablePageData" :key="item.id">
              <div class="my_task_item_left">
                <img :src="item.commoditymasterimgurl" alt="" class="img_width">
              </div>
              <div class="my_task_item_middle">
                <h3 style="margin-left:2%" :class="item.state==3?'color-red':''">{{item.commodityname}}</h3>
                <div class="title" style="flex-wrap: wrap;">
                  <span class="pctype" :class="item.pctype|MYordericon"></span>
                  <span class="title_span omit" :title="item.shopname">{{item.shopname}}</span>
                  <span class="title_span" style="min-width: 47%;">任务支付时间：<span>{{item.paydate}}</span></span>
                  <span class="title_span">任务状态：<span :class="item.state==3?'color-red':''">{{item.state|MYorderstate}}</span></span>
                  <p style="margin-top:5px" v-if="item.state==3">失败理由：<span class="color-red">{{item.rejectremark}}</span></p>
                </div>
                <div class="content">
                  <div class="content_left">
                    <p>任务编号：<span>{{item.orderno}}</span><span @click="goDetail(item.orderno,item.datearea)" class="pointer" style="color:blue" v-if="item.ordertype!=13">【任务详情】</span></p>
                    <p>任务类型：<span>{{item.ordertype|MYordertype}}</span></p>
                    <p>执行天数：<span>{{item.alldays==0?1:item.alldays}}</span>天</p>
                  </div>
                  <div class="content_right">
                    <p>审核上线时间：<span>{{item.onlinedate}}</span></p>
                    <p>结算完成时间：<span>{{item.closedate}}</span></p>
                  </div>
                </div>
                <div class="count">
                  <div class="count_top">
                    <b>发布下单任务总数：<span>{{item.order_num}}</span>人</b>
                    <span class="count_span">已接手：<span>{{item.order_taken}}</span>个</span>
                    <span class="count_span">未接手：<span>{{item.order_untaken}}</span>个</span>
                    <span class="count_span">未通过：<span>{{item.order_unpass}}</span>个</span>
                  </div>
                  <div class="cuttingline"></div>
                  <div class="count_bottom">
                    <b>发布人气任务总数：<span>{{item.view_num}}</span>人</b>
                    <span class="count_span">已接手：<span>{{item.view_taken}}</span>个</span>
                    <span class="count_span">未接手：<span>{{item.view_untaken}}</span>个</span>
                    <span class="count_span">未通过：<span>{{item.view_unpass}}</span>个</span>
                  </div>
                </div>
              </div>
              <div class="my_task_item_right">
                <div class="my_task_btn">
                  <el-button type="danger" class="to_modify" v-if="item.state==3||item.state==0" @click="editTask(item.orderno,item.datearea,0,item.ordertype)">前去修改</el-button>
                  <el-button type="danger" class="delete_task" v-if="item.state==0" @click="removeTask(item.orderno,item.datearea)">删除任务</el-button>
                  <el-button type="danger" class="to_resend" v-if="item.state==2||item.state==6" @click="editTask(item.orderno,item.datearea,1,item.ordertype)">一键重新发布</el-button>
                </div>
              </div>
            </div>
            <!-- 分页数据 -->
            <div class="myelement_page" v-if="taskData.length>0">
              <el-pagination
                @current-change="currentChange"
                :current-page="nowpage"
                :page-size="pageSize"
                :total="taskData.length">
              </el-pagination>
            </div>
            <div v-else class="nodata">暂无数据</div>
          </div>
        </div>
      </el-col>
    </div>
  </div>
</template>
<script>
import Header from '@/components/public/Header'
import PersonList from '@/components/public/PersonList'
import {Message, Loading, MessageBox} from 'element-ui'
// 选择条件
import SelectSearch from '@/components/public/SelectSearch'
import {MYordericon,MYorderstate,MYordertype} from '@/assets/js/util/myfilter'

export default {
  name: 'MyTask',
  data () {
    return {
      selected: 'all', // all - 全部 underway - 进行中 unpaid - 待支付 wait - 待审核 completed - 已完成 nopass - 审核未通过
      currSelected: '', // 用来存储当前选择的tab标签
      banner: [],         // banner
      taskData: [],
      tablePageData: [], //显示数据
      nowpage: 1, //当前页
      pageSize: 5, //每页显示条数
    }
  },
  computed: {
  },
  async mounted () {
    // 获取轮播图，暂时使用商家中心接口获取，后期看情况改
    let data = await this.ajax({
      url: `SellerCenterInterface/getSellerCenter?tk=${sessionStorage.token}`,
      needAlert: false
    })
    if(!data) return false
    this.banner = data.banner

    //卖家中心跳转页面时，切换tab
    let active = this.$route.query.active
    if (active != undefined) {
      this.selected = active
    }else{
      //默认时间
      var nowD=new Date()
      var oneD=new Date(nowD.getFullYear(),nowD.getMonth(),1)
      let stime = oneD.getFullYear()+'-'+(oneD.getMonth()==0?12:oneD.getMonth())+'-'+oneD.getDate()
      let etime = nowD.getFullYear()+'-'+(nowD.getMonth()+1)+'-'+nowD.getDate()
      this.getTaskData({stime,etime})
    }
  },
  methods: {
    async getTaskData(data={}){
      //如果当前selected 不是字符串，就需要用currSelected作为参数进行查询，实现查询tab不切换的目的
      if(typeof this.selected != 'string'){
        data.state = this.currSelected
      }
      // 获取我的任务数据
      let getTaskData = await this.ajax({
        url: `TaskManageInterface/getorderlist?tk=${sessionStorage.token}`,
        data: data,
        needAlert: false
      })
      if(!getTaskData) return false
      this.taskData = getTaskData.data.list
      // // 默认显示第一页数据
      // this.currentChange(1)
      // 使用当前页进行显示，当前页默认为1
      this.currentChange(this.nowpage)
    },
    //去详情页
    goDetail(orderno,datearea){
      // orderno = window.btoa(orderno)
      // datearea = window.btoa(datearea)
      sessionStorage.orderno = orderno
      sessionStorage.datearea = datearea
      // this.$router.push(`/mytaskdetail?orderno=${orderno}&datearea=${datearea}`)
      this.$router.push(`/mytaskdetail`)
    },
    //编辑任务，reset ==0是编辑 ，==1是一件重发，type==13是问大家任务
    editTask(orderno,datearea,reset,type){
      // orderno = window.btoa(orderno)
      // datearea = window.btoa(datearea)
      sessionStorage.orderno = orderno
      sessionStorage.datearea = datearea
      sessionStorage.reset = reset
      if(type == "13"){
        // this.$router.push(`/asktask?orderno=${orderno}&reset=${reset}&datearea=${datearea}`)
        this.$router.push(`/asktask`)
      }else{
        // this.$router.push(`/task?orderno=${orderno}&reset=${reset}&datearea=${datearea}`)
        this.$router.push(`/task`)
      }
    },
    //删除任务
    async removeTask(orderno,datearea){
      this.$confirm('您将要删除此任务', '', {
        distinguishCancelAndClose: true,
        showClose: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
      .then(() => {
        //遮罩层开启
        let loading = Loading.service({
          text: '删除中',
          background: 'rgba(0,0,0,.5)'
        });
        // 获取我的任务数据
        this.ajax({
          url: `TaskManageInterface/delorder?tk=${sessionStorage.token}`,
          data: {orderno,datearea}
        }).then(data=>{
          //遮罩层关闭
          loading.close()

          if(!data) return false
          MessageBox.alert(data.msg,{
            lockScroll: false,
            showClose: false,
            confirmButtonText: '确定',
            callback: ()=>{
              //  储存当前选择元素 0待支付' 1待审核' 2审核完成' 3审核未通过' 4暂停任务' 5取消任务' 6已完成' 7商家取消任务'
              switch(this.selected){
                case 'all':
                  this.currSelected = ''
                break
                case 'unpaid':
                  this.currSelected = '0'
                break
                case 'wait':
                  this.currSelected = '1'
                break
                case 'underway':
                  this.currSelected = '2'
                break
                case 'nopass':
                  this.currSelected = '3'
                break
                case 'completed':
                  this.currSelected = '6'
                break
                default:
                  this.currSelected = ''
              }
              // 先存值，然后设置为随机数，触发搜索调用ajax获取全部数据，之后进行赋值
              let oselected = this.selected
              this.selected = Math.random()
              this.$nextTick(() => {
                this.selected = oselected
              })
            }
          })
        })
      })
      .catch(action => {
      })
    },
    // 处理选择的tab页
    toggleDisplay (str) {
      // 切换tab，把页面重置为第一页
      if(typeof str == 'string'){
        this.nowpage = 1
      }
      this.selected = str
    },
    //处理分页
    currentChange(page){
      this.nowpage = page
      var start = (page-1) * this.pageSize;
      var end = start + this.pageSize;
      this.tablePageData = this.taskData.slice(start, end)
    }
  },
  components: {
    Header,
    PersonList,
    SelectSearch
  },
  filters: {
    MYordericon,
    MYorderstate,
    MYordertype
  }
}
</script>
<style scoped>
.my_task{
  background: #F0F0F0;
}
.box{
  display: flex;
  justify-content: center;
}
.personlist{
  margin-right: 15px;
}
.my_task_box {
  background: #fff;
}
.select_condition {
  padding: 20px;
}
/* 任务状态样式 */
.my_task_state {
  padding: 10px 20px;
}
.my_task_state ul {
  height: 40px;
  line-height: 40px;
  background: #f2f2f2;
}
.my_task_state ul li {
  float: left;
  padding: 0 20px;
  cursor: pointer;
}
.active_li {
  background: #ff6400;
  color: #fff;
}
/* 任务管理样式 */
.my_task_review {
  padding: 15px 20px;
}
.my_task_item {
  height: 250px;
  padding: 15px;
  border: 1px solid #ccc;
  margin-bottom: 30px;
}
.my_task_item a {
  cursor: pointer;
  color: #224cde;
}
.my_task_item_left, .my_task_item_middle, .my_task_item_right {
  float: left;
}
.my_task_item_left {
  width: 16.2%;
  margin-right: 1%;
}
.my_task_item_middle {
  width: 67%;
  height: 100%;
}
.my_task_item_middle h3 {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 10px;
}
.title {
  width: 93%;
  padding: 5px;
  background: #f9efee;
  margin-left: 2%;
  margin-bottom: 5px;
  display: flex;
}
.title img {
  margin-right: 1%;
}
.title_span+.title_span {
  margin-left: 3%;
}
.content {
  width: 93%;
  padding: 5px;
  height: 70px;
  margin-left: 2%;
  margin-bottom: 5px;
}
.content p {
  margin-bottom: 8px;
}
.content_left {
  width: 57%;
  float: left;
}
.content_right {
  width: 43%;
  float: left;
}
.count {
  width: 91%;
  padding: 20px 10px;
  height: 60px;
  margin-left: 2%;
  background: #f8f8f8;
  text-align: center;
}
.count_top, .count_bottom {
  height: 30px;
  line-height: 30px;
}
.count_span {
  margin-left: 4%;
}
.cuttingline {
  width: 94%;
  height: 1px;
  background: #ccc;
  margin: 0 auto;
}
.my_task_item_right {
  width: 15%;
  height: 100%;
  border-left: 1px solid #ccc;
  text-align: right;
}
.my_task_btn {
  margin: 80px auto;
}
.to_modify, .delete_task, .to_resend {
  width: 90%;
  height: 35px;
  margin-bottom: 15px;
  margin-left: 10px;
  border: 0;
  color: #fff;
  cursor: pointer;
}
.omit {
  width: 21%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 媒体查询 */
/*@media screen and (max-width: 1550px) {*/
  /*.my_task_item_left {*/
    /*width: 15%;*/
  /*}*/
  /*.my_task_item_middle {*/
    /*width: 65%;*/
  /*}*/
  /*.my_task_item_right {*/
    /*width: 18%;*/
  /*}*/
  /*.title, .content, .count {*/
    /*width: 95%;*/
    /*padding-right: 0;*/
  /*}*/
  /*.count {*/
    /*padding-left: 4px;*/
  /*}*/
  /*.count span {*/
    /*margin-left: 2px;*/
  /*}*/
  /*.title span {*/
    /*margin-right: 0;*/
  /*}*/
  /*.to_modify, .delete_task, .to_resend {*/
    /*width: 90%;*/
    /*margin-left: 12px;*/
  /*}*/
/*}*/
</style>
