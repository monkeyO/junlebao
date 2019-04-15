<template>
  <div id="wait_check">
    <!-- 选择审核 -->
    <div class="select_review">
      <ul>
        <li @click="toggleDisplay('all')" :class="selected=='all'?'active_li':''"><span>全部订单</span></li>
        <li @click="toggleDisplay('wait')" :class="selected=='wait'?'active_li':''"><span>待审核</span></li>
        <li @click="toggleDisplay('underway')" :class="selected=='underway'?'active_li':''"><span>已审核</span></li>
        <li @click="toggleDisplay('nopass')" :class="selected=='nopass'?'active_li':''"><span>审核未通过</span></li>
      </ul>
    </div>
    <!--审核内容-->
    <div class="review_content">
      <div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-button type="danger" class="btn_batch" @click="submit()" size="mini">批量确认</el-button>
      </div>
      <div class="review_item" v-for="(item,index) in taskData" :key="index">
        <div class="review_item_title">
          <el-checkbox-group v-model="checkedLists" @change="handleCheckedCitiesChange" >
            <el-checkbox  :label="item.id" :disabled="(item.state=='6'&&item.isaudited=='0')||(item.state=='8'&&item.isaudited=='0')?false:true"></el-checkbox>
            <!--<span>{{item.createdate.substr(0,10)}}</span>-->
            <span>{{item.releasedate}}</span>
          </el-checkbox-group>
          <span>{{item.shopname}}</span>
          <span>任务编号：{{item.orderno}}</span>
          <!-- <span v-if="item.pctype!='3'&&item.pctype!='4'">旺旺号：{{item.name}}</span> -->
          <span>子任务编号：{{item.taskno}}</span>
          <span>
            订单号：{{item.donecode}}
            <span @click="childDetail(item.taskno,item.datearea)" style="color:blue" class="pointer">【详情】</span>
          </span>
          <span>
            任务状态：{{item.state|MYChildState(item.isaudited)}}
            <span v-if="(item.state==6&&item.isaudited==3)||(item.state==8&&item.isaudited==3)">原因：{{item.remark}}</span>
          </span>
        </div>
        <div class="review_item_content clearfix">
          <!-- 商品图片 -->
          <div class="product_image">
            <img :src="item.commoditymasterimgurl" alt="商品主图" width="130" height="130">
          </div>
          <!-- 商品详情 -->
          <div class="product_detail">
            <div class="left">
              <p>{{item.commodityname}}</p>
              <p>单价：{{item.commodityprice}}，拍{{item.personbuycount}}件</p>
            </div>
            <div class="right">
              <p>买号：{{item.name}}</p>
              <p>垫付金额：{{item.donemon}}元</p>
            </div>
            <p class="pinjiap" :title="item.evaluatecontent">评价：{{item.evaluatecontent}}</p>
          </div>
          <!-- 订单详情截图 -->
          <div class="evaluate_screenshot" v-if="item.state=='6'">
            <img :src="item.doneimg" alt="订单详情截图" @click="showIMG(item.doneimg)" style="display: inline-block; width: 100%; height: 100%; cursor: pointer;">
          </div>
          <!-- 评价截图 -->
          <div class="evaluate_screenshot" v-if="item.state=='8'&&item.isaudited!='2'">
            <img :src="item.praiseimg" alt="评价截图" @click="showIMG(item.praiseimg)" style="display: inline-block; width: 100%; height: 100%; cursor: pointer;">
          </div>
          <!-- 审核按钮 -->
          <div class="review_btn">
            <div><el-button type="danger" class="pass" @click="submit(1,item.id,item.datearea)" v-if="(item.state=='6'&&item.isaudited=='0')||(item.isaudited=='0'&&item.state=='8')">审核通过</el-button></div>
            <div><el-button type="danger" class="nopass" @click="submitnopass(2,item.id,item.datearea)" v-if="(item.state=='6'&&item.isaudited=='0')||(item.isaudited=='0'&&item.state=='8')">审核不通过</el-button></div>
          </div>
        </div>
      </div>
      <el-dialog
        title="审核不通过原因"
        :visible.sync="dialogVisible"
        width="30%">
        <div class="color-red">
          <el-radio v-model="remark" label="审核失败下单金额不正确" style="margin-left:0;display: block;margin-bottom:5px;">审核失败下单金额不正确</el-radio>
          <el-radio v-model="remark" label="审核失败订单编号不正确" style="margin-left:0;display: block;margin-bottom:5px;">审核失败订单编号不正确</el-radio>
          <el-radio v-model="remark" label="审核失败评价内容与任务要求不符" style="margin-left:0;display: block;margin-bottom:5px;">审核失败评价内容与任务要求不符</el-radio>
          <el-radio v-model="remark" label="审核失败上传评价截图不正确" style="margin-left:0;display: block;margin-bottom:5px;">审核失败上传评价截图不正确</el-radio>
          <el-radio v-model="remark" label="1" style="margin-left:0;display: block;margin-bottom:5px;">其他</el-radio>
          <el-input type="textarea" :rows="2" placeholder="请输入审核失败原因" v-model="Oremark" :disabled="remark!='1'"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false;submit(2,id,datearea)">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {Loading, MessageBox} from 'element-ui'
import {MYChildState} from '@/assets/js/util/myfilter'

export default {
  name: 'WaitCheck',
  data () {
    return {
      selected: 'all', // all-全部；  wait - 待审核； underway - 已审核； nopass - 审核未通过
      checkAll: false, // 全选框，默认false
      isIndeterminate: false,
      checkedLists: [],
      lists: [],
      id:``,
      datearea:``,
      dialogVisible:false,
      remark:`审核失败下单金额不正确`, // 审核失败原因
      Oremark:``//其他原因
    }
  },
  computed: {
    taskData () {
      let arr = []
      this.$attrs.data.forEach(element => {
        if ((element.state=='6'&&element.isaudited=='0')||(element.state=='8'&&element.isaudited=='0')){
          arr.push(element.id)
        }
      })
      this.lists = [...arr]
      return this.$attrs.data
    }
  },
  methods: {
    //点击查看图片
    showIMG(url){
      MessageBox.alert(`<img src='${url}' width='100%' >`,'',{
        dangerouslyUseHTMLString:true,
        showClose: false
      })
    },
    toggleDisplay (str) {
      this.checkAll = false
      this.checkedLists = []
      // str为数字 就是触发审核任务，不需要切换tab
      if(typeof str == 'string'){
        this.selected = str
      }
      this.$emit('setSelected',str)
    },
    handleCheckAllChange (val) {
      this.checkedLists = val ? this.lists : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.lists.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.lists.length
    },
    //处理审核不通过
    submitnopass(done, id, datearea){
      this.dialogVisible = true
      this.datearea = datearea
      this.id = id
    },
    //处理审核通过
    async submit(done, id, datearea){
      if(done == 2){
        if(this.remark == '1' && this.Oremark == ''){
           MessageBox.alert(`请输入审核失败原因`,{
            lockScroll: false,
            showClose: false,
            confirmButtonText: '确定'
          }).then(res=>{
            this.dialogVisible = true
          })
          return false
        }
        if(this.remark == '1'){
          this.remark = this.Oremark
        }
      }

      let obj = {}
      if(arguments.length == 3){
        obj = {
          done,
          remark:this.remark,
          tcode:[{id,datearea}]
        }
      }else{
        if(this.checkedLists.length == 0){
          MessageBox.alert(`请先选择需要确认的数据`,{
            lockScroll: false,
            showClose: false,
            confirmButtonText: '确定'
          })
          return false
        }
        this.checkedLists.forEach((element,index)=>{
          this.taskData.forEach((e,i)=>{
            if(element == e.id){
              this.checkedLists[index] = {'id':e.id,'datearea':e.datearea}
            }
          })
        })
        obj = {
            done: 1,
            remark:this.remark,
            tcode:[...this.checkedLists]
          }
      }

      //遮罩层开启
      let loading = Loading.service({
        text: '提交中',
        background: 'rgba(0,0,0,.5)'
      })
      // 提交数据
      let data = await this.ajax({
        url: `TaskManageInterface/todoput?tk=${sessionStorage.token}`,
        data: obj
      })
      //遮罩层关闭
      loading.close()

      if(!data) return false
      MessageBox.alert(data.msg,{
        lockScroll: false,
        showClose: false,
        confirmButtonText: '确定',
        callback: () => {
          this.toggleDisplay(Math.random())
          this.$nextTick(() => {
            // this.selected = 'all'
            this.remark = '审核失败下单金额不正确'
            this.Oremark = ''
          })
        }
      })
    },
    childDetail(orderno,datearea){
      // orderno = window.btoa(orderno)
      // datearea = window.btoa(datearea)
      sessionStorage.n_orderno = orderno
      sessionStorage.n_datearea = datearea
      // this.$router.push(`/childtaskdetail?orderno=${orderno}&datearea=${datearea}`)
      // this.$router.push(`/childtaskdetail`)
      //处理详情页需要单独打开一个新页面
      let routeUrl = this.$router.resolve({
          path: "/childtaskdetail"
      });
      window.open(routeUrl.href, '_blank');
    }
  },
  filters: {
    MYChildState
  }
}
</script>

<style scoped>
/* 审核任务 - 选择审核样式 */
.select_review {
  height: 54px;
  background: #f2f2f2;
  margin-top: 25px;
  padding: 10px 20px;
  box-sizing: border-box;
}
.select_review ul {
  /* padding-left: 20px; */
  height: 100%;
  margin: 0;
}
.select_review ul li {
  width: auto;
  /* height: 54px;
  line-height: 54px; */
  text-align: center;
  height: inherit;
  padding: 0 20px;
  cursor: pointer;
  float: left;
}
.select_review ul li span{
  display: block;
  height: 100%;
  line-height: 240%;
}
.active_li {
  background: #ff6400;
  color: #fff;
}
/* 审核任务 - 审核内容样式 */
.review_content {
  margin-top: 25px;
}
.review_content .btn_batch {
  margin-left: 15px;
}
.review_item {
  /*height: 200px;*/
  border: 1px solid #ccc;
  margin-top: 15px;
}
.review_item_title {
  min-height: 50px;
  padding: 10px;
  padding-top: 14px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
}
.review_item_title>span {
  margin-left: 25px;
  font-size: 13px;
}
.review_item_title div span {
  margin-left: 10px;
  font-size: 13px;
}
.review_item_title a {
  cursor: pointer;
  color: #224cde;
}
.review_item_content {
  padding: 10px;
  min-height: 130px;
}
/* 商品图片样式 */
.product_image {
  width: 130px;
  float: left;
}
/* 商品详情样式 */
.product_detail {
  float: left;
  padding: 10px;
  width: 40%;
  min-height: 110px;
}
.product_detail .left, .product_detail .right {
  display: inline-block;
}
.product_detail .left {
  width: 50%;
  margin-right: 10%;
}
.product_detail p {
  /*margin-bottom: 15px;*/
}
.product_detail p+p {
  margin-top: 10px;
}
.product_detail .pinjiap{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 10px;
}
/* 评价截图样式 */
.evaluate_screenshot {
  float: left;
  width: 18%;
  height: 100%;
  text-align: center;
}
/* 审核按钮样式 */
.review_btn {
  width: 20%;
  height: 90px;
  float: left;
  text-align: center;
  padding: 20px;
}
.pass, .nopass {
  width: 140px;
  height: 35px;
  margin-bottom: 15px;
  border: 0;
  color: #fff;
  cursor: pointer;
}

</style>
