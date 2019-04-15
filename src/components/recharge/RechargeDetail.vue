<template>
    <div class="recharge_detail">
      <!-- 充值明细 -->
      <div class="czmx_box">
        <!-- 充值明细头部筛选条件 -->
        <div class="recharge_detail_header">
          <!-- 选择框 -->
          <el-select v-model="cz_type" filterable placeholder="请选择类型" style="width: 27%;">
            <el-option value="" label="全部"></el-option>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <span>起始时间：</span>
          <!-- 日期选择框 -->
          <!-- <el-date-picker v-model="cz_time" type="daterange"
            start-placeholder="开始日期" end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd"
            style="width: 45%;"
          ></el-date-picker> -->
          <!-- 日期选择框 -->
          <el-date-picker v-model="cz_time[0]" type="date" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd"
                          :clearable="false" :editable="false" placeholder="选择开始日期" style="width: 20%;"
          ></el-date-picker>
          <span style="margin:0 10px;">至</span>
          <el-date-picker v-model="cz_time[1]" type="date" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd"
                          :clearable="false" :editable="false" placeholder="选择结束日期" style="width: 20%;"
          ></el-date-picker>
          <!-- 按钮 -->
          <el-button type="danger" @click="getData()">提交</el-button>
        </div>
        <!-- 充值明细内容区 -->
        <div class="recharge_detail_content">
          <!-- 表格 -->
          <el-table :data="tablePageData" style="width: 100%">
            <el-table-column prop="createdate" label="充值时间" width="200px"></el-table-column>
            <el-table-column prop="code" label="充值单号" width="200px"></el-table-column>
            <el-table-column prop="money" label="实际支付"></el-table-column>
            <el-table-column prop="type" label="业务类型"></el-table-column>
            <el-table-column prop="state" label="充值状态"></el-table-column>
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
      </div>
    </div>
</template>

<script>
import {MessageBox} from 'element-ui'

export default {
  name: 'RechargeDetail',
  data () {
    return {
      msg: `充值明细`,
      options: [{
        value: '1',
        label: '充值押金'
      }, {
        value: '2',
        label: '充值金币'
      }, {
        value: '3',
        label: '充值会员'
      }],
      cz_type: '',
      cz_time: [],
      tableData: [],
      tablePageData: [], //显示数据
      nowpage: 1, //当前页
      pageSize: 10 //每页显示条数
    }
  },
  async mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      let cz_type = this.cz_type
      let cz_start = this.cz_time == null?"":this.cz_time[0]
      let cz_end = this.cz_time == null?"":this.cz_time[1]
      //获取数据
      let data = await this.ajax({
        url: `SellerMoneyInterface/recharge_details?tk=${sessionStorage.token}`,
        data: {cz_type,cz_start,cz_end},
        needAlert: false
      })
      if(!data) return false

      this.tableData = data.data
      // 默认显示第一页数据
      this.currentChange(1)
    },
    currentChange(page){
      this.nowpage = page
      var start = (page-1) * this.pageSize;
      var end = start + this.pageSize;
      this.tablePageData = this.tableData.slice(start, end)
    }
  },
  watch: {
    cz_time () {
      if (this.cz_time) {
        let date = new Date(this.cz_time[0]).getTime()
        let timedate = new Date(this.cz_time[1]).getTime()
        if (timedate < date) {
          MessageBox.alert(`结束日期不可小于开始日期，请重新选择`,{
            lockScroll: false,
            confirmButtonText: '关闭'
          })
          this.cz_time = []
        }
      }
    }
  }
}
</script>

<style scoped>
.czmx_box {
  height: 1180px;
}
/* 充值明细头部筛选条件样式 */
.recharge_detail_header {
  margin-top: 10px;
  padding-left: 20px;
}
/* 字体样式 */
.recharge_detail_header span {
  margin: 0 10px;
  font-size: 16px;
}
/* //分页样式 */
.myelement_page{
  margin-top: 10px;
}
</style>
