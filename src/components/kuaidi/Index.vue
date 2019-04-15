<template>
  <div class='kuaidimanage'>
    <Header :active=5></Header>
    <div class='box con-box w1200'>
      <PersonList :active="chooseitem"></PersonList>
       <el-col :span="20">
         <!-- 温馨提示 -->
         <div class="warm_prompt">
           <p>温馨提示：</p>
           <p>1.以下任务买手已完成下单和支付，请导出快递信息并在<span class="warm_prompt_span">12小时内</span>去对应的电商平台点击发货；未及时发货可能会导致快递信息延迟；</p>
           <p>2.为了避免造成二次发货，发货完毕后<span class="warm_prompt_span">请回好卖符平台点击发货按钮；</span>表示该订单已在对应的电商平台发货；</p>
           <p>3.为了保障商家的数据安全；平台定期清理数据，以下订单<span class="warm_prompt_span">只保存15天内的数据；</span>请及时导出保存；</p>
           <p>4.若出现单号问题请及时联系在线客服QQ：8888888处理；</p>
         </div>
         <div class="title">
           <h2>快递管理</h2>
         </div>
         <div class="content">
           <!-- 筛选 -->
           <ul class="search_content clearfix">
             <li>
               <span>高级搜索：</span>
               <el-select v-model="search" placeholder="请选择" style="width: 60%">
                 <el-option v-for="item in searchoptions" :key="item.search" :label="item.searchlabel" :value="item.search"></el-option>
               </el-select>
             </li>
             <li style="margin-right: 100px;">
               <el-input v-model="searchValue" placeholder="" class="search_input"></el-input>
             </li>
             <li>
               <span>订单状态：</span>
               <el-select v-model="state" placeholder="请选择" style="width: 60%">
                 <el-option v-for="item in stateoptions" :key="item.state" :label="item.statelabel" :value="item.state"></el-option>
               </el-select>
             </li>
           </ul>
           <div style="padding-left: 10px; margin-top: 20px;">
             <span>时间筛选：</span>
             <!-- 日期选择框 -->
             <!-- <el-date-picker v-model="time" type="daterange" range-separator="至"
                             start-placeholder="开始日期" end-placeholder="结束日期"
                             :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd"
                             :clearable="false" style="width: 45%;"
             ></el-date-picker> -->
             <!-- 日期选择框 -->
            <el-date-picker v-model="time[0]" type="date" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd"
                            :clearable="false" :editable="false" placeholder="选择开始日期" style="width: 20%;"
            ></el-date-picker>
            <span style="margin:0 10px;">至</span>
            <el-date-picker v-model="time[1]" type="date" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd"
                            :clearable="false" :editable="false" placeholder="选择结束日期" style="width: 20%;"
            ></el-date-picker>
             <!-- 按钮 -->
             <el-button type="danger" class="btn_search" @click="searchData">搜索</el-button>
             <el-button type="danger" class="btn_search" @click="exportData">导出</el-button>
             <!-- 数据导出 -->
             <form :action="formAction" method="post" ref="exportform">
               <input type="hidden" name="stime" :value="time.length==2?time[0]:''">
               <input type="hidden" name="etime" :value="time.length==2?time[1]:''">
               <input type="hidden" name="state" :value="state">
               <input type="hidden" name="gxtype" :value="search">
               <input type="hidden" name="gxtypevalue" :value="searchValue">
             </form>
           </div>
           <!-- 批量发货 -->
           <div class="batch_operation">
             <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
             <el-button type="danger" class="btn_batch" @click="submitAll()" size="mini">批量发货</el-button>
           </div>
           <!-- 详情 -->
           <div class="batch_detail clearfix">
             <div class="batch_detail_title">
               <span style="margin-left: 3%;">任务编号</span>
               <span>子任务编号</span>
               <span style="margin-left: 2%;">店铺名称</span>
               <span style="margin-left: 6%;">买号</span>
               <span style="margin-left: 3.5%;">付款金额</span>
               <span style="margin-left: 3.5%;">订单编号</span>
               <span style="margin-left: 5.5%;">平台</span>
               <span style="margin-left: .5%;">快递方式</span>
               <span>快递单号</span>
               <span>快递创建时间</span>
               <span>订单状态</span>
               <span style="margin-left: 2%;">操作</span>
             </div>
             <div class="batch_detail_content clearfix">
               <ul>
                 <li v-for="(item,index) in dataList" :key="index">
                   <el-checkbox-group v-model="checkedLists" @change="handleCheckedCitiesChange" style="width: 2.5%;">
                     <el-checkbox :label="item.id" :disabled="item.state==1?false:true"></el-checkbox>
                   </el-checkbox-group>
                   <span style="width: 6%;" :title="item.orderno">{{item.orderno}}</span>
                   <span style="width: 6%; margin-left: .5%;" :title="item.taskno">{{item.taskno}}</span>
                   <span style="width: 12%; margin-left: .5%;" :title="item.shopname">{{item.shopname}}</span>
                   <span style="width: 10%;" :title="item.maihaoname">{{item.maihaoname}}</span>
                   <span style="width: 6%;" :title="item.donemon">{{item.donemon}}</span>
                   <span style="width: 14%;" :title="item.donecode">{{item.donecode}}</span>
                   <span style="width: 6%; margin-left: .5%;" :title="item.pctype|pctypeFilter">{{item.pctype|pctypeFilter}}</span>
                   <span style="width: 6%;" :title="item.log|logFilter">{{item.log|logFilter}}</span>
                   <span style="width: 6%;" :title="item.postno">{{item.postno}}</span>
                   <span style="width: 9.5%; margin-left: .5%;" :title="item.createdate">{{item.createdate}}</span>
                   <span style="width: 5%; margin-left: .5%;" :title="item.state|stateFilter" :class="item.state=='1'?'wait_type':''">{{item.state|stateFilter}}</span>
                   <button style="margin-left: 1%;" v-if="item.state=='1'" class="btn_operation" @click="submit(item.id, item.datearea)">点击发货</button>
                 </li>
                 <li v-if="packList.length>0">
                   <el-pagination
                     @current-change="currentChange"
                     :current-page="nowpage"
                     :page-size="pageSize"
                     :total="packList.length">
                   </el-pagination>
                 </li>
                 <li v-else>
                   <span style="display: block; margin: 0 auto;">暂无数据</span>
                 </li>
               </ul>
             </div>
           </div>
         </div>
       </el-col>
    </div>
  </div>
</template>

<script>
import Header from '@/components/public/Header'
import PersonList from '@/components/public/PersonList'
import {Message, MessageBox, Loading} from 'element-ui'

export default {
  name: 'backlist',
  data () {
    return {
      msg: '快递管理',
      dataList: [],
      packList: [], //快递列表
      formAction: `${URLconfig.HTTPURL}/TaskManageInterface/exportexpress?tk=${sessionStorage.token}`,
      search: '0', //高级搜索
      searchValue: '', //搜索输入框
      searchoptions: [ //高级搜索基础数据
        {
          search: '0',
          searchlabel: '全部'
        },
        {
          search: '1',
          searchlabel: '任务编号'
        },
        {
          search: '2',
          searchlabel: '子任务编号'
        },
        {
          search: '3',
          searchlabel: '买号'
        },
        {
          search: '4',
          searchlabel: '订单编号'
        }
      ],
      state: '0', //订单状态
      stateoptions: [ //订单状态基础数据
        {
          state: '0',
          statelabel: '全部'
        },
        {
          state: '2',
          statelabel: '已发货'
        },
        {
          state: '1',
          statelabel: '待发货'
        }
      ],
      time: [], //时间筛选
      checkAll: false, //全选框，默认false
      isIndeterminate: false,
      checkedLists: [],
      nowpage: 1, //当前页
      pageSize: 10 //每页显示条数

    }
  },
  components: {
    Header,
    PersonList
  },
  computed: {
    //处理跳转路由时需要点亮的item
    chooseitem () {
      let active = this.$route.query.active
      if (active == undefined) {
        return 'kuaidimanage'
      } else {
        return active
      }
    }
  },
  async mounted () {
    let nowD = new Date()
    let oneD = new Date(nowD.getFullYear(), nowD.getMonth(),1)
    let stime = oneD.getFullYear() + '-' + (oneD.getMonth()==0?12:oneD.getMonth()) + '-' + oneD.getDate()
    let etime = nowD.getFullYear() + '-' + (nowD.getMonth() + 1) + '-' + nowD.getDate()
    this.time = [stime, etime]
    //获取数据列表
    this.getPackList()
  },
  methods: {
    async getPackList () {
      let stime = this.time.length == 2? this.time[0]: ''
      let etime = this.time.length == 2? this.time[1]: ''
      let state = this.state
      let gxtype = this.search
      let gxtypevalue = this.searchValue

      //获取快递数据
      let data = await this.ajax({
        url: `TaskManageInterface/packagelist?tk=${sessionStorage.token}`,
        data: {stime, etime, state, gxtype, gxtypevalue}
      })
      if(!data) return false
      this.packList = data.data
      this.currentChange(this.nowpage)

      //初始化
      this.checkedLists = []
      this.checkAll = false
      this.isIndeterminate = false
    },
    //全选
    handleCheckAllChange (val) {
      this.checkedLists = []
      this.dataList.forEach(item => {
        if (item.state == 1) {
          this.checkedLists.push(item.id)
        }
      })

      if(this.checkedLists.length == 0) {
        MessageBox.alert(`当前页无可操作数据`,{
          lockScroll: false,
          showClose: false,
          confirmButtonText: '确定'
        })

        this.checkedLists = []
        this.checkAll = false
        this.isIndeterminate = false
      } else {
        this.checkedLists = val ? this.checkedLists: []
        this.isIndeterminate = false
      }
    },
    //单选
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.dataList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.dataList.length
    },
    //批量发货
    async submitAll () {
      if (this.checkedLists.length == 0) {
        MessageBox.alert(`请先选择需要确认的数据`,{
          lockScroll: false,
          showClose: false,
          confirmButtonText: '确定'
        })
        return false
      }

      let arr = []
      this.checkedLists.forEach((element,index) => {
        this.dataList.forEach((e,i) => {
          if (element == e.id) {
            arr[index] = {'id':e.id,'datearea':e.datearea}
          }
        })
      })

      let obj = {
        tcode: [...arr]
      }

      //遮罩层开启
      let loading = Loading.service({
        text: '提交中',
        background: 'rgba(0,0,0,.5)'
      })
      // 提交数据
      let data = await this.ajax({
        url: `TaskManageInterface/putpack?tk=${sessionStorage.token}`,
        data: obj
      })
      //遮罩层关闭
      loading.close()

      if(!data) return false
      MessageBox.alert(data.msg, {
        lockScroll: false,
        showClose: false,
        confirmButtonText: '确定',
        callback: () => {
          this.$nextTick(() => {
            this.getPackList()
          })
        }
      })
    },
    //单选发货
    async submit (id, datearea) {
      let obj = {
        tcode: [{id, datearea}]
      }

      //遮罩层开启
      let loading = Loading.service({
        text: '提交中',
        background: 'rgba(0,0,0,.5)'
      })
      // 提交数据
      let data = await this.ajax({
        url: `TaskManageInterface/putpack?tk=${sessionStorage.token}`,
        data: obj
      })
      //遮罩层关闭
      loading.close()

      if(!data) return false
      MessageBox.alert(data.msg, {
        lockScroll: false,
        showClose: false,
        confirmButtonText: '确定',
        callback: () => {
          this.$nextTick(() => {
            this.getPackList()
          })
        }
      })
    },
    //搜索
    async searchData () {
      let stime = this.time.length == 2? this.time[0]: ''
      let etime = this.time.length == 2? this.time[1]: ''
      let state = this.state
      let gxtype = this.search
      let gxtypevalue = this.searchValue

      let content = ''
      switch (gxtype) {
        case '1':
          content = '任务编号'
          break
        case '2':
          content = '子任务编号'
          break
        case '3':
          content = '买号'
          break
        case '4':
          content = '订单编号'
          break
      }

      if (gxtype != 0 && !gxtypevalue) {
        Message({
          message: `请输入${content}`,
          duration: 1500,
          type: 'warning'
        })
        return false
      }

      //获取快递数据
      let data = await this.ajax({
        url: `TaskManageInterface/packagelist?tk=${sessionStorage.token}`,
        data: {stime, etime, state, gxtype, gxtypevalue}
      })
      if(!data) return false
      this.packList = data.data
      this.currentChange(1)
    },
    //导出
    async exportData () {
      let gxtype = this.search
      let gxtypevalue = this.searchValue
      let content = ''
      switch (gxtype) {
        case '1':
          content = '任务编号'
          break
        case '2':
          content = '子任务编号'
          break
        case '3':
          content = '买号'
          break
        case '4':
          content = '订单编号'
          break
      }

      if (gxtype != 0 && !gxtypevalue) {
        Message({
          message: `请输入${content}`,
          duration: 1500,
          type: 'warning'
        })
        return false
      }

      this.formAction = `${URLconfig.HTTPURL}/TaskManageInterface/exportexpress?tk=${sessionStorage.token}`
      this.$refs.exportform.submit()
    },
    //分页
    currentChange (page) {
      this.nowpage = page
      let start = (page-1) * this.pageSize
      let end = start + this.pageSize
      this.dataList = this.packList.slice(start, end)
    }
  },
  watch: {
    time () {
      if (this.time) {
        let date = new Date(this.time[0]).getTime()
        let timedate = new Date(this.time[1]).getTime()
        if (timedate < date) {
          MessageBox.alert(`结束日期不可小于开始日期，请重新选择`,{
            lockScroll: false,
            confirmButtonText: '关闭'
          })
          this.time = []
        }
      }
    },
    nowpage () {
      this.checkedLists = []
      this.checkAll = false
      this.isIndeterminate = false
    }
  },
  filters: {
    logFilter (str) {
      switch (str) {
        case '1':
          return '中通'
          break
        case '2':
          return '圆通'
          break
        case '3':
          return '申通'
          break
      }
    },
    pctypeFilter (str) {
      switch (str) {
        case '1':
          return '淘宝'
          break
        case '2':
          return '天猫'
          break
        case '3':
          return '京东'
          break
        case '4':
          return '拼多多'
          break
        case '5':
          return '阿里巴巴'
          break
      }
    },
    stateFilter (str) {
      switch (str) {
        case '1':
          return '待发货'
          break
        case '2':
          return '已发货'
          break
      }
    }
  }
}
</script>

<style scoped>
.box{
  display: flex;
  justify-content: center;
}
.kuaidimanage{
  background: #f0f0f0;
}
/* 温馨提示 */
.warm_prompt {
  color: #fff;
  background: #fe8280;
  padding: 20px 0 20px 50px;
  letter-spacing: 1px;
}
.warm_prompt p+p {
  margin-top: 5px;
}
.warm_prompt_span {
  color: #f1fb0f;
}
/* 标题 */
.title {
  margin: 15px 0;
}
.title h2 {
  height: 25px;
  line-height: 25px;
  border-left: 4px solid #ff6400;
  padding-left: 15px;
}
/* 内容 */
.content {
  background: #fff;
  padding: 24px 20px;
}
.content .search_content li {
  width: 25%;
  float: left;
  text-align: center;
}
.content .btn_search {
  width: 15%;
  margin-left: 10px;
}
.content .batch_operation {
  margin: 20px 0 0 10px;
}
.content .btn_batch {
  margin-left: 15px;
}

.batch_detail {
  margin-top: 15px;
  border: 1px solid #ccc;
}
.batch_detail_title {
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
  background: #f8f8f8;
}
.batch_detail_content ul li {
  display: flex;
  align-items: center;
  padding: 15px 0;
  margin-left: 10px;
}
.batch_detail_content ul li span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  float: left;
}
.btn_operation {
  padding: 5px;
  background: #ed702d;
  color: #fff;
  border: 0;
}
.wait_type {
  color: #e83c3a;
}
</style>
