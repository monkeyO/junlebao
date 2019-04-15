<template>
  <div>
    <h3 style="margin-bottom: 20px;">设置访客计划</h3>
    <el-row>
      <el-col :span="3" style="width: 13%;">
        <img src="@/assets/img/task/task_a.png" alt="">
        <span>首日到店访客数：</span>
      </el-col>
      <el-col :span="4" class="input_margin_top">
        <el-input-number v-model="firstdaynum" :min="0" :step="10"  @change="checkFirst" label="访客人数"></el-input-number>
      </el-col>
      <el-col :span="6" class="plan_margin_left reject">
        必须为10的整数倍 ({{generalG}}金币/访客)
      </el-col>
      <el-col :span="3">
        <img src="@/assets/img/task/task_a.png" alt="">
        <span>任务执行天数：</span>
      </el-col>
      <el-col :span="4" class="input_margin_top plan_margin_left">
        <el-input-number v-model="taskactionday" :min="0" :max="7" label="执行天数"></el-input-number>
      </el-col>
      <el-col :span="1" class="plan_margin_left reject">
        天
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="3" style="width: 13%;">
        <img src="@/assets/img/task/task_a.png" alt="">
        <span>访客每日增长量：</span>
      </el-col>
      <el-col :span="2">
        <el-radio v-model="isrise" label="1">不增长</el-radio>
      </el-col>
      <el-col :span="2">
        <el-radio v-model="isrise" label="2">每日增长</el-radio>
      </el-col>
      <el-col :span="4" class="input_margin_top plan_margin_left">
        <el-input-number v-model="risenum" :min="0" label="日增长人数" :disabled="risenumFlag"></el-input-number>
      </el-col>
      <el-col :span="1" class="plan_margin_left">
        人
      </el-col>
    </el-row>

    <h4 style="margin-bottom: 10px;">浏览流量费用计算</h4>
    <el-row class="browse_flow">
      <el-col :span="5">执行天数</el-col>
      <el-col :span="5">首日入店访客 (个)</el-col>
      <el-col :span="4">每日增长量</el-col>
      <el-col :span="6">总计访客量</el-col>
      <el-col :span="4">费用合计</el-col>
    </el-row>

    <el-row class="browse_flow_content">
      <el-col :span="5">{{taskactionday}}</el-col>
      <el-col :span="5">{{firstdaynum}}</el-col>
      <el-col :span="4">{{risenum}}</el-col>
      <el-col :span="6">{{countTask}}</el-col>
      <el-col :span="4"><span>{{countTask}}</span> x <span>{{generalG}}</span> = <span>{{(countTask*generalG).toFixed(2)}}</span></el-col>
    </el-row>
  </div>
</template>
</template>
<script>
export default {
  name: 'Step3_1',
  data () {
    return {
      firstdaynum: 0,       // 首日到店访客数
      taskactionday: 0,     // 任务执行天数
      isrise: 0,            // 访客每日增长量
      risenum: 0,           // 增长人数
      risenumFlag: true,    // 默认不选中每日增长,设置为禁用状态
    }
  },
  watch: {
    isrise (value) {
      if(value == 2) {
        this.risenumFlag = false
      }else{
        this.risenumFlag = true
        this.risenum = 0
      }
    },
    countTask (value) {
      this.$emit('getData',{
        firstdaynum:this.firstdaynum,
        taskactionday:this.taskactionday,
        isrise:this.isrise,
        risenum:this.risenum,
        countTask:value,
        countTaskPrice:(value*this.generalG).toFixed(2)
      })
    }
  },
  methods: {
    checkFirst () {
      if(this.firstdaynum%10 != 0){
        alert('请正确填写访客人数')
      }
    }
  },
  computed: {
    // 计算访客总量
    countTask () {
      // a1+(a1+(n-1)*d)*n/2；a1-首选项； n-天数； d-差
      let sum = (this.firstdaynum+(this.firstdaynum+(this.taskactionday-1)*this.risenum))*this.taskactionday/2
      return sum
    },
    generalG () {
      return this.$attrs.data.generalG;       // 首日到店访客金币
    }
  }
}
</script>
<style scoped>
.browse_flow,
.popularity_plan,
.order_plan {
  background: #ff908f;
  color: #fff;
  border-bottom: 0;
  padding: 10px 0;
  margin-bottom: 0;
}
.plan_day {
  border-left: 2px solid #fff;
  width: 100%;
  text-align: center
}
.browse_flow_content,
.popularity_plan_content,
.order_plan_content {
  padding: 10px 0;
  border: 1px solid #999999;
  font-size: 15px;
  margin-bottom: 0;
  border-top: 0;
  border-bottom: 1px solid #dcdcdc;
}
</style>
