<template>
  <div id="select_search">
    <!-- 选择条件 -->
      <ul>
        <li>
          <span>任务平台：</span>
          <el-select v-model="taskplatform" placeholder="请选择" @change="getOptData">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in taskplatformoptions" :key="item.taskplatform" :label="item.taskplatformlabel" :value="item.taskplatform"></el-option>
          </el-select>
        </li>
        <li>
          <span>店铺：</span>
          <el-select v-model="shop" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in shopoptions" :key="item.id" :label="item.shopname" :value="item.id"></el-option>
          </el-select>
        </li>
        <li>
          <span>任务类型：</span>
          <el-select v-model="type" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in typeoptions" :key="item.ordertype" :label="item.name" :value="item.ordertype" v-if="item.ordertype != 13"></el-option>
          </el-select>
        </li>
        <li>
          <span>终端：</span>
          <el-select v-model="terminal" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in terminaloptions" :key="item.terminal" :label="item.terminallabel" :value="item.terminal"></el-option>
          </el-select>
        </li>
      </ul>
      <ul>
        <li class="advanced_search">
          <span>高级搜索：</span>
          <el-select v-model="search" placeholder="请选择">
            <!-- <el-option label="全部" value=""></el-option> -->
            <el-option v-for="item in searchoptions" :key="item.search" :label="item.searchlabel" :value="item.search"></el-option>
          </el-select>
        </li>
        <li>
          <el-input v-model="searchValue" placeholder="" class="search_input"></el-input>
        </li>
      </ul>
      <div style="padding-left: 10px;">
        <span>发布任务起止时间：</span>
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
        <form :action="formAction" method="post" ref="exportform">
          <input type="hidden" name="pctype" :value="taskplatform">
          <input type="hidden" name="shopid" :value="shop">
          <input type="hidden" name="ordertype" :value="type">
          <input type="hidden" name="clientype" :value="terminal">
          <input type="hidden" name="state" :value="state">
          <input type="hidden" name="gxtype" :value="search">
          <input type="hidden" name="gxtypevalue" :value="searchValue">
          <input type="hidden" name="stime" :value="time.length==2?time[0]:''">
          <input type="hidden" name="etime" :value="time.length==2?time[1]:''">
        </form>
      </div>
    </div>
</template>

<script>
import {MessageBox} from 'element-ui'
export default {
  name: 'SelectSearch',
  data () {
    return {
      formAction:``,
      listtype: this.$attrs.type,//任务列表类型，1 任务列表，2子任务列表
      taskplatform: '', // 任务平台
      shop: '', // 店铺
      type: '', // 任务类型
      terminal: '', // 终端
      search: '1', // 高级搜索
      searchValue: '', // 搜索输入框
      time: [],
      // 任务平台选择器
      taskplatformoptions: [
        {
          taskplatform: '1',
          taskplatformlabel: '淘宝'
        }, {
          taskplatform: '2',
          taskplatformlabel: '天猫'
        }, {
          taskplatform: '3',
          taskplatformlabel: '京东'
        }, {
          taskplatform: '4',
          taskplatformlabel: '拼多多'
        }, {
          taskplatform: '5',
          taskplatformlabel: '阿里巴巴'
        }
      ],
      shopoptions: [],
      typeoptions: [],
      // 终端选择器
      terminaloptions: [
        {
          terminal: '1',
          terminallabel: '手机端'
        }, {
          terminal: '2',
          terminallabel: '电脑端'
        }
      ],
      // 高级搜索选择器
      searchoptions: [
        {
          search: '1',
          searchlabel: '任务编号'
        }, {
          search: '2',
          searchlabel: '子任务编号'
        }, {
          search: '3',
          searchlabel: '旺旺号'
        }, {
          search: '4',
          searchlabel: '订单号'
        }
      ]
    }
  },
  methods: {
    async getOptData(){
      let pctype = this.taskplatform
      // 获取对应平台店铺数据
      let data = await this.ajax({
        url: `SellerAccountInterface/sellershoplist?tk=${sessionStorage.token}`,
        data: {pctype},
        needAlert: false
      })
      if(!data) return false
      this.shopoptions = data.data.shop_list
      this.typeoptions = data.data.pctype_list
      this.shop = ''
      this.type = ''
    },
    searchData () {
      let pctype = this.taskplatform
      let shopid = this.shop
      let ordertype = this.type
      let clientype = this.terminal
      let state = this.state
      let gxtype = this.searchValue==""?'':this.search
      let gxtypevalue = this.searchValue
      let stime = this.time.length==2?this.time[0]:''
      let etime = this.time.length==2?this.time[1]:''
      let data = {pctype,shopid,ordertype,clientype,state,gxtype,gxtypevalue,stime,etime}
      this.$emit('getTaskData',data)
    },
    exportData(){
      if(this.listtype == 1){
        this.formAction = `${URLconfig.HTTPURL}/Order/exportorder?tk=${sessionStorage.token}`
      }else if(this.listtype == 2){
        this.formAction = `${URLconfig.HTTPURL}/Order/exportexcel?tk=${sessionStorage.token}`
      }
      // 使用settimeout 挂起程序等action赋值完成
      setTimeout(()=>{
        this.$refs.exportform.submit()
      })
    },
  },
  mounted (){
    // 设置默认任务起止时间
    var nowD=new Date()
    var oneD=new Date(nowD.getFullYear(),nowD.getMonth(),1)
    let stime = oneD.getFullYear()+'-'+(oneD.getMonth()==0?12:oneD.getMonth())+'-'+oneD.getDate()
    let etime = nowD.getFullYear()+'-'+(nowD.getMonth()+1)+'-'+nowD.getDate()
    this.time = [stime, etime]
    this.getOptData()
  },
  computed: {
    state (){
      //  0待支付' 1待审核' 2审核完成' 3审核未通过' 4暂停任务' 5取消任务' 6已完成' 7商家取消任务'
      switch(this.$attrs.data){
        case 'all':
          return  ''
        break
        case 'unpaid':
          return  '0'
        break
        case 'wait':
          return  '1'
        break
        case 'underway':
          return  '2'
        break
        case 'nopass':
          return  '3'
        break
        case 'completed':
          return  '6'
        break
        default:
          return this.$attrs.data
      }
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
    state () {
      this.searchData()
    }
  }
}
</script>

<style scoped>
/* 审核任务 - 选择条件样式 */
.select_condition ul {
  height: 40px;
  margin-bottom: 20px;
}
.select_condition ul li {
  width: 25%;
  float: left;
  text-align: center;
}
.select_condition .btn_search {
  width: 15%;
  margin-left: 10px;
}

</style>
