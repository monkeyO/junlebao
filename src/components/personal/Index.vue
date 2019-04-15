<template>
    <div class='personal'>
        <Header :active=5></Header>
        <!-- 轮播图 -->
        <el-carousel :interval="5000" arrow="always" height="280px" v-if="chooseitem == 'person'" style='margin-top:20px'>
            <el-carousel-item v-for="(item,index) in banner" :key="index">
              <a :href="item.url">
                <img :src="item.imgurl" alt="" width="100%">
              </a>
            </el-carousel-item>
        </el-carousel>
        <!-- 内容 -->
        <div class='box con-box w1200'>
            <PersonList :active='chooseitem'></PersonList>
            <el-col :span="20" v-if="chooseitem == 'person'">
                <CenterInfo></CenterInfo>
                <!-- 说明 -->
                <el-row>
                  <div class="explain">
                    <p>押金：可用来支付平台的一切费用（任务押金、充值金币、绑定店铺等），可提现</p>
                    <p>金币：平台的虚拟货币，可用来支付任务佣金、增值服务等，不可抵用押金，不可提现</p>
                  </div>
                </el-row>
                <!-- 公告 -->
                <el-row style="margin-bottom: 20px;">
                  <div class="notice">
                    <el-tabs v-model="activeName" @tab-click="changegonggao">
                      <el-tab-pane label="网站公告" name="first" style='min-height: 48px;'>
                        <el-row>
                          <el-col :span="2" :offset="1">
                            <img src="@/assets/img/person/notice.png" alt="">
                          </el-col>
                          <el-col :span="20">
                            <el-carousel :interval="5000" arrow="never" height="48px" indicator-position="none" ref="gonggao">
                              <el-carousel-item v-for="item of gonggao" :key="item">
                                <el-col :span="10" v-for="(e,index) of item" :key="index+0.2">
                                  <router-link :to='"/personal?active=message&id="+e.id' >【网站公告】{{e.title}}</router-link>
                                </el-col>
                              </el-carousel-item>
                            </el-carousel>
                            <!-- <el-col :span="10" v-for="(item,index) of announcements" :key="index+0.2">
                              <router-link :to='"/personal?active=message&id="+item.id' v-if="item.program==1">【网站公告】{{item.title}}</router-link>
                            </el-col> -->
                          </el-col>
                        </el-row>
                      </el-tab-pane>
                      <el-tab-pane label="常见问题" name="second" style='min-height: 48px;'>
                        <el-row>
                          <el-col :span="2" :offset="1">
                            <img src="@/assets/img/person/notice.png" alt="">
                          </el-col>
                          <el-col :span="20">
                            <el-carousel :interval="5000" arrow="never" height="48px" indicator-position="none" ref="wenti">
                              <el-carousel-item v-for="item of wenti" :key="item">
                                <el-col :span="10" v-for="(e,index) of item" :key="index+0.2">
                                  <router-link :to='"/personal?active=message&id="+e.id' >【常见问题】{{e.title}}</router-link>
                                </el-col>
                              </el-carousel-item>
                            </el-carousel>
                            <!-- <el-col :span="10" v-for="(item,index) of announcements" :key="index+0.3">
                              <router-link :to='"/personal?active=message&id="+item.id' v-if="item.program==2">【常见问题】{{item.title}}</router-link>
                            </el-col> -->
                          </el-col>
                        </el-row>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </el-row>
                <el-row style="margin-bottom: 20px; position: relative;">
                  <div>
                    <router-link to="/invite">
                      <img src="@/assets/img/person/invite_banner.png" alt="" class="img_width">
                    </router-link>
                  </div>
                </el-row>
                <el-row>
                  <div class="title">
                    <h2>我的任务</h2>
                  </div>
                </el-row>
                <!-- 任务状态 -->
                <el-row style="background: #F0F0F0; margin-bottom: 20px;">
                  <div class="task_state">
                    <ul>
                      <li>
                        <router-link to="/mytask?active=unpaid">
                          <div class="task_state_img">
                            <img src="@/assets/img/person/task_img_1.png" alt="">
                          </div>
                          <div class="task_state_content">
                            <p>待支付</p>
                            <span>{{orderscount.nopay}}</span>
                          </div>
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/mytask?active=wait">
                          <div class="task_state_img">
                            <img src="@/assets/img/person/task_img_2.png" alt="">
                          </div>
                          <div class="task_state_content">
                            <p>审核中</p>
                            <span>{{orderscount.noverify}}</span>
                          </div>
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/mytask?active=underway">
                          <div class="task_state_img">
                            <img src="@/assets/img/person/task_img_3.png" alt="">
                          </div>
                          <div class="task_state_content">
                            <p>进行中</p>
                            <span>{{orderscount.ing}}</span>
                          </div>
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/mytask?active=completed">
                          <div class="task_state_img">
                            <img src="@/assets/img/person/task_img_4.png" alt="">
                          </div>
                          <div class="task_state_content">
                            <p>已完成</p>
                            <span>{{orderscount.complete}}</span>
                          </div>
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/mytask?active=nopass">
                          <div class="task_state_img">
                            <img src="@/assets/img/person/task_img_5.png" alt="">
                          </div>
                          <div class="task_state_content">
                            <p>未通过</p>
                            <span>{{orderscount.nopass}}</span>
                          </div>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </el-row>
                <el-row>
                  <div class="title">
                    <h2>订单中心</h2>
                  </div>
                </el-row>
                <el-row>
                  <!-- 审核任务 -->
                  <div class="review" style="position: relative">
                    <div class="select_condition">
                      <SelectSearch ref="search" :type="2" :data="selected" @getTaskData="getTaskData"></SelectSearch>
                      <WaitCheck :data="tablePageData" @setSelected="setSelected"></WaitCheck>
                      <!-- 分页数据 -->
                      <div class="myelement_page" v-if="taskData.length>0" style="margin-top: 10px;">
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
                </el-row>
            </el-col>
            <el-col :span="20" v-if="chooseitem == 'shop'">
              <!-- 绑定店铺 -->
              <BindingShop></BindingShop>
            </el-col>
            <el-col :span="20" v-if="chooseitem == 'info'">
              <!-- 账户管理 -->
              <AccountManage></AccountManage>
            </el-col>
            <el-col :span="20" v-if="chooseitem == 'message'">
              <!-- 账户管理 -->
              <MessageDetail></MessageDetail>
            </el-col>
        </div>
        <!-- 页面进入提示框 -->
        <el-dialog
          custom-class="person_firstDialog"
          :visible.sync="firstDialog"
          :show-close="false"
          :close-on-click-modal="false"
          width="30%">
          <img src="@/assets/img/person/firstDialog.png" usemap="#map"/>
          <map name="map" id="map">
            <area shape="circle" coords="558,23,14" @click="firstDialog = false"/>
            <area shape="rect" coords="96,527,499,606" @click="goInvite()" />
          </map>
        </el-dialog>
    </div>
</template>
<script>
import Header from '@/components/public/Header'
import PersonList from '@/components/public/PersonList'
// 个人中心
import CenterInfo from './CenterInfo'
// 账户管理
import AccountManage from './AccountManage'
// 公告详情
import MessageDetail from './MessageDetail'
// 绑定店铺
import BindingShop from './BindingShop'
// 选择条件
import SelectSearch from '@/components/public/SelectSearch'
// 待审核
import WaitCheck from './WaitCheck'
export default {
  name: 'Personal',
  data () {
    return {
      firstDialog: false,
      activeName: 'first',
      selected: 'all',
      currSelected:'',   //用来记录当前订单类型
      hackReset: true,   // 重置组件的黑科技
      banner:[],         // banner
      announcements: [], // 公告和常见问题
      gonggao:[], //轮播用的公告数据
      wenti:[], //轮播用的问题数据
      orderscount: {},   // 我的任务
      taskData:'',
      tablePageData: [], //显示数据
      nowpage: 1, //当前页
      pageSize: 10//每页显示条数
    }
  },
  async mounted () {
    // 判断不是店铺以及信息管理才显示弹窗
    if(this.$route.query.active != "shop" && this.$route.query.active != "info"){
      // 时间戳 没有就是改成true
      if (!localStorage.time && sessionStorage.token) {
        localStorage.time = new Date(new Date().setHours(24,0,0,0)).getTime()
        this.firstDialog = true
      } else if (localStorage.time && sessionStorage.token) {
        let time = new Date().getTime()
        if (time > localStorage.time) {
          localStorage.time = new Date(new Date().setHours(24,0,0,0)).getTime()
          this.firstDialog = true
        }
      }
    }
    // 获取商家中心信息
    let data = await this.ajax({
      url: `SellerCenterInterface/getSellerCenter?tk=${sessionStorage.token}`,
      needAlert: false
    })
    if(!data) return false

    this.banner = data.banner
    this.announcements = data.announcements
    this.orderscount = data.orderscount
    // 处理网站公告
    let arr = []
    data.announcements.filter(item=>item.program==1).forEach((element,i) => {
      arr.push(element)
      //每四条进行一次赋值
      if(i%4==3){
        this.gonggao.push([...arr])
        arr.length = 0
      }
    });
    // 如果有多余的 最后赋值到gonggao中
    if(arr.length>0){
      this.gonggao.push([...arr])
      arr.length = 0
    }
    // 处理常见问题
    data.announcements.filter(item=>item.program==2).forEach((element,i) => {
      arr.push(element)
      //每四条进行一次赋值
      if(i%4==3){
        this.wenti.push([...arr])
        arr.length = 0
      }
    });
    // 如果有多余的 最后赋值到wenti中
    if(arr.length>0){
      this.wenti.push([...arr])
      arr.length = 0
    }

    //默认时间
    var nowD=new Date()
    var oneD=new Date(nowD.getFullYear(),nowD.getMonth(),1)
    let stime = oneD.getFullYear()+'-'+(oneD.getMonth()==0?12:oneD.getMonth())+'-'+oneD.getDate()
    let etime = nowD.getFullYear()+'-'+(nowD.getMonth()+1)+'-'+nowD.getDate()
    this.getTaskData({stime,etime})
  },
  computed: {
    // 处理跳转路由时需要点亮的item
    chooseitem () {
      let active = this.$route.query.active
      if (active == undefined) {
        return 'person'
      } else {
        return active
      }
    }
  },
  components: {
    Header,
    PersonList,
    CenterInfo,
    AccountManage,
    MessageDetail,
    BindingShop,
    SelectSearch,
    WaitCheck
  },
  methods: {
    //获取任务列表
    async getTaskData(data={}){
      //如果当前selected 不是字符串，就需要用currSelected作为参数进行查询，实现查询tab不切换的目的
      if(typeof this.selected != 'string'){
        data.state = this.currSelected
      }
      var nowD=new Date();
      var oneD=new Date(nowD.getFullYear(),nowD.getMonth(),1);
      data.stime?'':data.stime = oneD.getFullYear()+'-'+(oneD.getMonth()==0?12:oneD.getMonth())+'-'+oneD.getDate()
      data.etime?'':data.etime = nowD.getFullYear()+'-'+(nowD.getMonth()+1)+'-'+nowD.getDate()

      // 获取我的任务数据
      let getTaskData = await this.ajax({
        url: `TaskManageInterface/gettasklist?tk=${sessionStorage.token}`,
        data: data,
        needAlert: false
      })
      if(!getTaskData) return false
      this.taskData = getTaskData.data.list
      // 使用当前页进行显示，当前页默认为1
      this.currentChange(this.nowpage)
    },
    // 获取selected
    setSelected(str){
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
      // 切换tab，把页面重置为第一页
      if(typeof str == 'string'){
        this.nowpage = 1
      }
      // 赋值tab,触发搜索按钮的搜索功能
      this.selected = str
    },
    //切换公告
    changegonggao(){
      this.$refs.wenti.next()
      this.$refs.gonggao.next()
    },
    // 重置组件数据
    refreshModule () {
      this.hackReset = false
      this.$nextTick(() => {
        this.hackReset = true
      })
    },
    //处理分页
    currentChange(page){
      this.nowpage = page
      var start = (page-1) * this.pageSize;
      var end = start + this.pageSize;
      this.tablePageData = this.taskData.slice(start, end)
    },
    goInvite(){
      this.firstDialog = false
      this.$router.push('/invite')
    }
  }
}
</script>
<style scoped>
.personal{
    background: #F0F0F0;
}
.box{
    display: flex;
    justify-content: center;
}
.personlist{
    margin-right: 15px;
}
.el-row {
    background: white;
    margin-bottom: 10px;
}
/* 说明样式 */
.explain {
  padding: 5px 20px;
  background: #ff7c7a;
  color: #fff;
}
.underline_active {
  transform: translateX(110px)!important;
}
/* 公告样式 */
.notice a{
  display: block;
  margin-bottom: 5px;
}
/* 标题样式 */
.title {
  background: #F0F0F0;
}
.title h2 {
  height: 25px;
  line-height: 25px;
  border-left: 4px solid #ff6400;
  padding-left: 15px;
}
.task_state ul li {
  float: left;
  width: 18.77%;
  margin-right: 15px;
}
.task_state ul li:last-child {
  margin-right: 0;
}
.task_state a {
  display: flex;
  width: 100%;
  background: #fff;
}
.task_state_img {
  width: 50%;
  text-align: center;
  padding: 12px 0;
}
.task_state_content {
  width: 50%;
  padding: 14px 0;
  color: #333333;
  font-size: 16px;
  font-weight: bold;
}
.task_state_content p {
  margin-bottom: 5px;
}
.task_state_content p, .task_state_content span {
  margin-left: 10px;
}

/* 审核任务样式 */
/* 审核任务 - 标记样式 */
/* .review .order, .review .evaluate, .review .screenshot {
  position: absolute;
  top: 14px;
  z-index: 10;
}
.review .order {
  left: 130px;
  top: 10px;
}
.review .evaluate {
  left: 300px;
  top: 10px;
}
.review .screenshot {
  left: 485px;
  top: 10px;
} */
/* 审核任务 - 选择条件样式 */
.select_condition {
  padding: 20px;
}

</style>
