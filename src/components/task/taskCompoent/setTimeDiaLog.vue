<template>
  <!-- 自定义下单时间弹窗 -->
  <el-dialog :lock-scroll="true" :visible.sync="customDialog"
              :close-on-click-modal="false" :close-on-press-escape="false"
              :show-close="false" class="keydialog" >
      <p class='header'>
        <span class='a'> 
          设置下单时间分布
        </span>
        <span class="color-red" style="font-size: 14px;text-align: left;display: block;margin-top: 10px;">自定义计划时间请选择大于当前时间的时间点 ，否则会审核不通过，例如 计划时间:14点 任务支付时间：14点05分，则任务会审核不通过，因为任务放出时间已经超过</span>
      </p>
      <div v-for="(item,index) of setTimeRangeArr" :key="index">
        <el-row class="mytitle">
          <el-date-picker v-model="item.date" value-format="yyyy-MM-dd" style="width: 18%;" 
            :disabled='index>0' 
            @change="changedate"
            :picker-options="pickerOptions">
          </el-date-picker>
          <span>当日单数：{{item.amount}}单</span>
        </el-row>
        <el-row class='mycol' style="border-left:1px solid #cccccc;border-top:0;">
          <el-col :span='8' style="height:116px;border-bottom:1px solid #cccccc;" v-for="(y,index1) of item.data" :key="index1">
            <div style="margin-top: 20px;">
              <span>计划：</span>
              <el-time-picker
                style="width:50%"
                v-model="y.time" value-format="HH:mm:ss"
                size="small" placeholder="请选择时间"
                :editable="false"
                :picker-options="{
                  selectableRange: '00:00:00 - 23:59:59'
                }">
              </el-time-picker>
            </div>
            <div style="margin-top:10px">
              <span>发布：</span>
              <el-input-number style="width:50%" v-model="y.num" :ref="'a'+index+index1" :min="0" size="small" :step="1" :max="item.amount" @change="limitAmount(index,index1,'a00')" @input="checkplanNum(index,index1)"></el-input-number>
            </div>
          </el-col>
          <el-col :span='8' style="height:116px;border-right:1px solid #cccccc;border-bottom:1px solid #cccccc;">
            <div @click="item.data.push({time:'',num:0})" class="addplan">＋新建计划</div>
          </el-col>
        </el-row>
      </div>
      <el-button type="info" style="padding-left: 40px;padding-right: 40px;margin-top: 10px;" @click="cancelSetCustom">取消</el-button>
      <el-button type="danger" style="padding-left: 40px;padding-right: 40px;margin-top: 10px;" @click="submitSetCustom">确认</el-button>
  </el-dialog>
</template>
</template>
<script>
import { Message, MessageBox } from 'element-ui'

export default {
  name: 'setTime',
  data () {
    return { 
      oldObj:[],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()-86400000;
        },
      }
    }
  },
  watch: {
  },
  mounted () {
    this.oldObj = JSON.parse(JSON.stringify(this.$attrs.data.obj))
  },
  methods: {
    // 取消自定义数据
    cancelSetCustom () {
      this.$emit('dialog','customDialog',this.oldObj)
    },
    // 确定自定义数据
    submitSetCustom () {
      let flag = true
      for(let i=0;i<this.setTimeRangeArr.length;i++){
        let sum = 0
        this.setTimeRangeArr[i].data.forEach(item=>{
          if(item.time == ""&&item.num!=0){
            Message({
              message: `第${i+1}天，未设置发布时间`,
              duration: 1500,
              type: 'error',
              showClose:'true'
            })
            flag = false
          }
          sum += item.num
        })
        if(this.setTimeRangeArr[i].amount != sum){
          Message({
            message: `第${i+1}天，总单数与设置单数不符`,
            duration: 1500,
            type: 'error',
            showClose:'true'
          })
          flag = false
        }
        if(!flag) return false
      }
      if(flag){
        this.$emit('dialog','customDialog')
      }
    },
    //计算限制单数
    limitAmount(i,y,ref){
      //没啥用，但是此操作可以强制重新渲染数据，达到刷新数据的效果
      this.$refs[ref][0]._props.label='刷新数据'
      
      this.$nextTick(()=>{
        let flag = false
        this.setTimeRangeArr.forEach((element,i)=>{
          let sum = 0
          element.data.forEach((e,y)=>{
            sum += parseInt(e.num)
            if(sum > element.amount){
              // 切换状态
              flag = true
              Message({
                message: `已超出当日最大单数`,
                duration: 1500,
                type: 'error',
                showClose:'true'
              })
            }     
          })
        })
        //根据记录的下标重新渲染数据
        if(flag){
          this.setTimeRangeArr[i].data[y].num = 0
        }
      })
    },
    // 修改整数
    checkplanNum(x,y){
      this.$nextTick(()=>{
        this.setTimeRangeArr[x].data[y].num = Math.round(this.setTimeRangeArr[x].data[y].num)
      })
    },
    //修改日期触发
    changedate(val){
      let curDate = new Date(val).getTime();
      this.setTimeRangeArr.forEach((e,i)=>{
        let nowDate = new Date(curDate + 24*60*60*1000*i)
        e.date = nowDate
      })
    },
    // //修改时间触发
    // changetime(val){
    //   console.log(val)
    //   let date = new Date(Date.now())
    //   let h = date.getHours()
    //   let m = date.getMinutes()
    //   let oh = val.slice(0,2)
    //   let om = val.slice(3,5)
    //   console.log(h,m)
    // }
    // submit () {
    //   this.i.enter = false
    //   this.i.setKeywordDialog = false
    //   //循环添加折扣数据
    //   let zhekouArr = []
    //   this.i.setRange.zhekouState.forEach(element => {
    //     this.getDiscount.forEach(res=>{
    //       if(element == res.name){
    //         zhekouArr.push({"name":res.index,"val":1})
    //       }
    //     })
    //   });
    //   this.i.setRange.zhekouList = zhekouArr
    //   //确认按钮存 this.i
    //   this.$emit('dialog',this.i, this.index)
    // },
    // cancel () {
    //   this.i.enter = false
    //   this.i.setKeywordDialog = false
    //   // 取消按钮存oldObj
    //   this.$emit('dialog',this.oldObj[0], this.index)
    // }
  },
  computed: {
    setTimeRangeArr(){
      return this.$attrs.data.obj
    },
    customDialog () {
      return this.$attrs.data.customDialog
    }
  }
}
</script>
<style scoped>

</style>
