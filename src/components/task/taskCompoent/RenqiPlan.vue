<template>
    <div>
      <template>
        <el-col :span="2">{{title}}</el-col>
        <el-col :span="2" class='reject'>{{taskactionday}}</el-col>
        <el-col :span="4">
          <el-select v-model="operatenum" placeholder="请选择" value-key='50%'>
            <el-option v-for="(item,index) in optionsOperateNum" :key="index" :label="item.label" :value="item.val"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="isrise2" placeholder="请选择" @change="changeisrise">
            <el-option v-for="(item,index) in optionsIsRise" :key="index" :label="item.label" :value="item.val"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class='reject'>{{firstdaynum}}</el-col>
        <el-col :span="2" class='reject'>{{risenum}}</el-col>
        <el-col :span="3" class='reject'>{{countTask}}</el-col>
        <el-col :span="4" class='reject'><span>{{countTask}}</span> x <span>{{ratio}}</span> = <span>{{(countTask*ratio).toFixed(2)}}</span></el-col>
      </template>
    </div>
  </template>
</template>
<script>
export default {
  name: 'RenqiPlan',
  computed: {
    day () {
      return this.$attrs.data.day
    },
    title() {
      return this.$attrs.data.obj.title
    },
    type() {
      return this.$attrs.data.obj.type
    },
    ratio() {
      return this.$attrs.data.obj.money
    },
    taskactionday() {
      return this.$attrs.data.taskactionday
    },
    firstdaynum() {
      return this.$attrs.data.firstdaynum
    },
    risenum() {
      return this.$attrs.data.risenum
    },
    countTask() {
      // a1+(a1+(n-1)*d)*n/2；a1-首选项； n-天数； d-差
      let sum = (this.firstdaynum+(this.firstdaynum+(this.taskactionday-1)*this.risenum))*this.taskactionday/2
      if(this.isrise2 == 1){
        sum = this.firstdaynum * this.taskactionday
      }
      sum = Math.round(sum*this.operatenum)
      return sum
    },
    isrise (){
      return this.$attrs.data.isrise
    }
  },
  watch: {
    countTask(value) {
      // $emit 监听父级事件 类目名称的type、类目标题、类目访客总数、价格 ,比例,天数,每日操作占比,是否每日增长
      this.$emit('getVisitorNum',this.type,this.title,value,value*this.ratio,this.ratio,this.day,this.operatenum,this.isrise2)
    },
    isrise(val){
      this.isrise2 = val
    }
  },
  methods: {
    //切换是否每日增长时触发
    changeisrise(){
      let value = this.countTask
      this.$emit('getVisitorNum',this.type,this.title,value,value*this.ratio,this.ratio,this.day,this.operatenum,this.isrise2)
    }
  },
  data(){
    return {
      operatenum: this.$attrs.data.obj.operatenum==undefined?0.5:this.$attrs.data.obj.operatenum,        // 每日操作数量占比
      isrise2: this.$attrs.data.obj.isrise2||"1",           // 选择是否每日增长
      optionsOperateNum: [
        {val:0, label:'0'},
        {val:0.1, label:'10%'},
        {val:0.2, label:'20%'},
        {val:0.3, label:'30%'},
        {val:0.4, label:'40%'},
        {val:0.5, label:'50%'},
        {val:0.6, label:'60%'},
        {val:0.7, label:'70%'},
        {val:0.8, label:'80%'},
        {val:0.9, label:'90%'},
        {val:1, label:'100%'},
        ],
      optionsIsRise: [
        {val:"2", label:'增长'},
        {val:"1", label:'不增长'}
      ],
    }
  }  
}
</script>
<style scoped>

</style>
