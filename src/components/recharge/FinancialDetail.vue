<template>
    <div id="financial_detail">
      <!-- 资金明细 -->
      <div class="zjmx_box">
        <!-- 充值明细头部筛选条件 -->
        <div class="financial_detail_header">
          <!-- 选择框 -->
          <el-select v-model="mx_type" filterable placeholder="请选择类型" style="width: 27%;">
            <el-option value="" label="全部"></el-option>
            <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
          <span>起始时间：</span>
          <!-- 日期选择框 -->
          <!-- <el-date-picker v-model="mx_time" type="daterange"
            start-placeholder="开始日期" end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd"
            style="width: 41%;"
          ></el-date-picker> -->
          <!-- 日期选择框 -->
          <el-date-picker v-model="mx_time[0]" type="date" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd"
                          :clearable="false" :editable="false" placeholder="选择开始日期" style="width: 20%;"
          ></el-date-picker>
          <span style="margin:0 10px;">至</span>
          <el-date-picker v-model="mx_time[1]" type="date" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd"
                          :clearable="false" :editable="false" placeholder="选择结束日期" style="width: 20%;"
          ></el-date-picker>
          <!-- 按钮 -->
          <el-button type="danger" @click="getData">提交</el-button>
          <el-button type="danger" @click="exportData" style='margin-left:0'>导出</el-button>
        </div>
        <!-- 数据导出 -->
        <form :action="formAction" method="post" ref="myform"></form>
        <!-- 充值明细内容区 -->
        <div class="financial_detail_content">
          <!-- 表格 -->
          <el-table :data="tablePageData" style="width: 100%">
            <el-table-column prop="shopname" label="店铺名"></el-table-column>
            <el-table-column prop="out_trade_no" label="任务编号" width="200px"></el-table-column>
            <el-table-column prop="createdate" label="时间"  width="200px"></el-table-column>
            <el-table-column prop="type" label="收支类型"></el-table-column>
            <el-table-column prop="money" label="金额"></el-table-column>
          </el-table>
        </div>
        <div class="myelement_page" v-if="tableData.length>0">
          <el-pagination
            @current-change="currentChange"
            :current-page="nowpage"
            :page-size="pageSize"
            :total="tableData.length">
          </el-pagination>
        </div>
        <!-- 温馨提示 -->
        <div class="warm_prompt">
          <p>温馨提示：</p>
          <p>为了保障商家的账户安全，平台会定期清理数据，清理后系统会自动删除，不做保留，如需保留资金明细的商家请自行导出后保存</p>
        </div>
      </div>
    </div>
</template>

<script>
import {MessageBox} from 'element-ui'

export default {
  name: 'FinancialDetail',
  data () {
    return {
      msg: `资金明细`,
      formAction: `${URLconfig.HTTPURL}/SellerMoneyInterface/exportexcel?tk=${sessionStorage.token}`,
      options: [],
      mx_type: '',
      mx_time: [],
      tableData: [],
      tablePageData: [], //显示数据
      nowpage: 1, //当前页
      pageSize: 10 //每页显示条数
    }
  },
  async mounted () {
    this.getData()
    this.getOption()
  },
  methods: {
    //获取data数据
    async getData () {
      let mx_type = this.mx_type
      let mx_start = this.mx_time == null?"":this.mx_time[0]
      let mx_end = this.mx_time == null?"":this.mx_time[1]
      //获取数据
      let data = await this.ajax({
        url: `SellerMoneyInterface/capital_details?tk=${sessionStorage.token}`,
        data: {mx_type,mx_start,mx_end},
        needAlert: false
      })
      if(!data) return false

      this.tableData = data.data
      //默认显示第一页数据
      this.currentChange(1)
    },
    //获取option数据
    async getOption () {
      //获取数据
      let data = await this.ajax({
        url: `SellerMoneyInterface/paytype?tk=${sessionStorage.token}`,
        needAlert: false
      })
      if(!data) return false

      this.options = data.data
    },
    exportData(){
      this.formAction = `${URLconfig.HTTPURL}/SellerMoneyInterface/exportexcel?tk=${sessionStorage.token}`
      this.$refs.myform.submit()
    },
    //处理分页
    currentChange(page){
      this.nowpage = page
      var start = (page-1) * this.pageSize;
      var end = start + this.pageSize;
      this.tablePageData = this.tableData.slice(start, end)
    }
  },
  watch: {
    mx_time () {
      if (this.mx_time) {
        let date = new Date(this.mx_time[0]).getTime()
        let timedate = new Date(this.mx_time[1]).getTime()
        if (timedate < date) {
          MessageBox.alert(`结束日期不可小于开始日期，请重新选择`,{
            lockScroll: false,
            confirmButtonText: '关闭'
          })
          this.mx_time = []
        }
      }
    }
  }
}
</script>

<style scoped>
.zjmx_box {
  height: 1180px;
}
/* 充值明细头部筛选条件样式 */
.financial_detail_header {
  margin-top: 10px;
  padding-left: 20px;
}
/* 字体样式 */
.financial_detail_header span {
  margin: 0 10px;
  font-size: 16px;
}
.warm_prompt {
  font-size: 16px;
  color: #333;
  padding: 60px 34px;
  letter-spacing: 1px;
}
</style>
