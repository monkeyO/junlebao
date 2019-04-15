<template>
  <el-dialog :visible.sync="i.setKeywordDialog"
    :lock-scroll="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    class="keydialog"
    >
    <p class='header'>
      <span class='a'>
        缩小搜索范围
        <span class='b'>
          买家选择搜索列表中的"
          <span class='c'>分类</span>
          "和"
          <span class='c'>排序</span>
          "缩小范围（选填）
        </span>
      </span>
    </p>
    <!-- 分类关键词 -->
    <el-row class='tableHead'>
      <el-col :span="4"></el-col>
      <el-col :span="4">示例</el-col>
      <el-col :span="4">示例</el-col>
      <el-col :span="3">1</el-col>
      <el-col :span="3">2</el-col>
      <el-col :span="3">3</el-col>
      <el-col :span="3">4</el-col>
    </el-row>
    <el-row class='tableBody' v-for="(x,index) in i.setRange.tableData" :key="index+2.1">
      <el-col :span="4">{{x.str}}</el-col>
      <el-col :span="4">{{x.str1}}</el-col>
      <el-col :span="4">{{x.str2}}</el-col>
      <el-col :span="3">
        <el-input v-model="x.data1" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="3">
        <el-input v-model="x.data2" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="3">
        <el-input v-model="x.data3" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="3">
        <el-input v-model="x.data4" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>

    <!-- 折扣与服务 -->
    <el-row class='zkfu' style='border-top: 1px dashed #ccc;margin-top:10px'  v-if="i.value!='pdd'">
      <el-col :span="4" style='font-size:18px'>
        <span><span class='color-red'>*</span>折扣与服务</span>
      </el-col>
      <el-col :span="20" :class="getDiscount.length>8?'lineH':''">
        <el-checkbox-group v-model="i.setRange.zhekouState">
          <el-checkbox :label="item.index" v-for="(item,index) of getDiscount" :key="index">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <!-- 排序方式 -->
    <el-row class='zkfu'>
      <el-col :span="4" style='font-size:18px'>
        <span><span class='color-red'>*</span>排序方式</span>
      </el-col>
      <el-col :span="6" style='font-size:18px'>
        <el-select v-model="i.setRange.paixuState" placeholder="请选择">
          <el-option v-for="item in getKorder" :key="item.id" :label="item.text" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <!-- 价格 -->
    <el-row class='zkfu'>
      <el-col :span="4" style='font-size:18px'>
        <span><span class='color-red'>*</span>价格</span>
      </el-col>
      <el-col :span="20" style='font-size:18px'>
        <el-input-number v-model="priceStart" :min="0" :precision="2" :step="1" style="width:25%"></el-input-number>
        <span>——</span>
        <el-input-number v-model="priceEnd" :min="0" :precision="2" :step="1" style="width:25%"></el-input-number>
      </el-col>
    </el-row>
    <!-- 发货地 -->
    <el-row class='zkfu' v-if="i.value!='jd'&&i.value!='pdd'">
      <el-col :span="4" style='font-size:18px'>
        <span><span class='color-red'>*</span>发货地</span>
      </el-col>
      <el-col :span="20" style='font-size:18px'>
        <el-select v-model="i.province" placeholder="请选择" style='width:20%;' @change="getArea($event),city=''">
          <el-option
            v-for="(item,index) in provinceArr"
            :key="index+2.2"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="city" placeholder="请选择" style='width:20%;' >
          <el-option
            v-for="(item,index) in cityArr"
            :key="index+2.3"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-button type="info" @click='cancel'>取消</el-button>
    <el-button type="danger" @click='submit'>确认</el-button>
  </el-dialog>
</template>
</template>
<script>
export default {
  name: 'KeyDialog',
  data () {
    return {
      city:this.$attrs.data.obj.city,
      priceStart:this.$attrs.data.obj.priceStart,
      priceEnd:this.$attrs.data.obj.priceEnd,
      provinceArr:``,
      cityArr:``,
      index: this.$attrs.data.index,
      oldObj:[]
    }
  },
  watch: {
  },
  mounted () {
    this.getArea(0)
    this.oldObj = [JSON.parse(JSON.stringify(this.$attrs.data.obj))]
    if(this.i.province !=""){
      this.getArea(this.i.province)
    }
  },
  methods: {
    //省市联动
    async getArea (pid) {
      if(typeof pid == "object"){
        pid = pid.target.value
      }
      let data = await this.ajax({
        url: `SellerAccountInterface/addr_of_express?pid=${pid}&t=${sessionStorage.token}`
      })
      if(!data) return false
      if(pid == 0 ){
        this.provinceArr = data.arealist
      }else{
        this.cityArr = data.arealist
      }
    },
    submit () {
      this.i.setKeywordDialog = false
      //循环添加折扣数据
      let zhekouArr = []
      this.i.setRange.zhekouState.forEach(element => {
        this.getDiscount.forEach(res=>{
          if(element == res.index){
            zhekouArr.push({"name":res.index,"val":1})
          }
        })
      });
      this.i.setRange.zhekouList = zhekouArr
      this.i.city = this.city
      this.i.priceStart = this.priceStart
      this.i.priceEnd = this.priceEnd
      //确认按钮存 this.i,不需要手动存；
      // this.$emit('dialog',this.i, this.index)
    },
    cancel () {
      this.i.setKeywordDialog = false
      this.oldObj[0].setKeywordDialog = false
      this.oldObj[0].setRange.zhekouList?"":this.oldObj[0].setRange.zhekouList=[]
      this.oldObj[0].priceStart?"":this.oldObj[0].priceStart=0
      this.oldObj[0].priceEnd?"":this.oldObj[0].priceEnd=0
      this.oldObj[0].province?"":this.oldObj[0].province=""
      this.oldObj[0].city?"":this.oldObj[0].city=""
      // 取消按钮存oldObj
      this.$emit('dialog',this.oldObj[0], this.index)
    }
  },
  computed: {
    i(){
      return this.$attrs.data.obj
    },
    getDiscount () {
      return this.$attrs.data.getDiscount
    },
    getKorder () {
      return this.$attrs.data.getKorder
    }
  }
}
</script>
<style scoped>
.tableHead .el-col,
.tableBody .el-col{
  height: 30px;
  line-height: 30px;
  border-left: 2px solid #fff;
  text-align: center;
}
.tableHead{
  height: 50px;
  padding: 10px 0;
  font-size: 15px;
  text-align: center;
  background: #ff8f8f;
  color: #FFF;
}
.tableBody{
  height: 50px;
  padding: 8px 0;
  border: 1px solid #cfcfcf;
  border-top: 0;
}
.tableBody .el-col {
  padding: 0;
}
.lineH{
  line-height: 35px !important;
}
</style>
