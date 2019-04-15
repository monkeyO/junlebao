<template>
    <div class="go_pay">
      <Header :active=5></Header>
      <div  class='box con-box w1200'>
        <div class="go_pay_box">
          <h3>付款信息：
            <template v-if="isvip">
              <span class='color-red' style="font-weight: normal;" v-if="isrebate!=-1">
                {{ordertotal>=50?`本次发布任务${ordertotal}单，已优惠${rebate}元`:`本次发布任务${ordertotal}单，差${50-ordertotal}单使用优惠`}}
              </span>
              <span class='color-red' style="font-weight: normal;" v-else>
                本次发布任务{{ordertotal}}单
              </span>
            </template>
            <template v-else>
              <span class='color-red' style="font-weight: normal;">
                本次发布任务{{ordertotal}}单
              </span>
            </template>
          </h3>
          <div class="need_to_pay">
            <span>本次任务需支付</span>
            <span class="color-red" style="float: right;">
              <span>押金：</span><span>{{yajinprice}}元</span>
              <span>金币：</span><span>{{jinbiprice}}元</span>
            </span>
          </div>
          <h3>请选择支付方式：</h3>
          <el-checkbox-group v-model="paytype">
            <div class="payment">
              <el-checkbox label="1">
                <img src="@/assets/img/common/cash.png" alt="">
                <span>押金支付&nbsp;&nbsp;(可用押金：<span>{{deposit}}元</span>)</span>
              </el-checkbox>
              <span style="float: right;">押金：<span style="color: #ec1213;">{{yajinprice}}</span>元</span>
            </div>
            <div class="payment">
              <el-checkbox label="2">
                <img src="@/assets/img/common/gold.png" alt="">
                <span>金币支付&nbsp;&nbsp;(可用金币：<span>{{money}}</span>个)</span>
              </el-checkbox>
              <span style="float: right;">金币：<span style="color: #ec1213;">{{jinbiprice}}</span>元</span>
            </div>
            <!-- <div class="payment">
              <el-checkbox label="3">
                <img src="@/assets/img/common/alipay.png" alt="">
                <span>支付宝支付</span>
              </el-checkbox>
            </div> -->
          </el-checkbox-group>
          <div class="pay_btn" v-if='showRecharge'>
            <el-button type="danger" @click="goRecharge()" style='font-size: 18px;'>押金不足请充值</el-button>
          </div>
          <div class="pay_btn" v-else>
            <el-button type="danger" @click="exit()" plain>上一步</el-button>
            <el-button type="danger" @click="pay()">确定</el-button>
          </div>
        </div>
      </div>
      <!-- 支付宝提交 -->
      <!-- <form method="post" name="taskPayform"></form> -->
    </div>
</template>

<script>
import Header from '@/components/public/Header'
import QRCode from 'qrcode'
import {validata} from '@/assets/js/util/validata'
import {Loading, MessageBox} from 'element-ui'

export default {
  name: 'TaskPay',
  data () {
    return {
      formAction: ``,
      taskid: ``,
      datearea: ``,
      isrebate: ``, // 是否显示优惠信息
      paytype: [], // 1 押金； 2 金币； 3 支付宝
      yajinprice:``, // 需支付押金
      jinbiprice:``, // 需支付金币
      sumprice: ``,   // 需支付的总价格
      ordertotal:``, // 本次任务发布单数
      deposit: ``,  // 可用押金
      money: ``,     // 可用金币
      rebate:0,     // 已优惠单数
      showRecharge:false, // 是否显示充值按钮
      isvip:false //会员信息
    }
  },
  components: {
    Header
  },
  async mounted () {
    let obj = this.$store.state.userInfo
    if(obj.isvip == 2){
      this.isvip = true
    }
    this.taskid = this.$route.params.id
    this.datearea = this.$route.params.datearea

    //获取拥有的金币押金数据
    let data = await this.ajax({
      url: `SellerAccountInterface/getusermoney?tk=${sessionStorage.token}`
    })
    if(!data) return false

    this.deposit = data.data.data1.deposit
    this.money = data.data.data1.money

    //获取需要支付金币押金数据
    let payData = await this.ajax({
      url: `PublishInterface/getorderinfo?tk=${sessionStorage.token}`,
      data:{"id":this.taskid,"datearea":this.datearea}
    })
    if(!payData) return false
    this.yajinprice = payData.data.yongjin
    this.jinbiprice = payData.data.jinbi
    this.sumprice = payData.data.orderprice
    this.ordertotal = payData.data.ordertotal
    this.isrebate = payData.data.isrebate
    this.rebate = payData.data.rebate

    // 判断是否需要显示去充值按钮
    //押金-需付押金 小于 需付金币-金币时，就是钱不够了
    let a = parseFloat(this.deposit)-parseFloat(this.yajinprice)
    let b = parseFloat(this.jinbiprice)-parseFloat(this.money)
    if(a<0){
      this.showRecharge = true
    }
    if(a>0 && a<b){
      this.showRecharge = true
    }
  },
  methods: {
    async pay(){
      let paytype  = this.paytype
      let orderno = this.taskid
      let datearea = this.datearea
      //没有选择支付方式
      if(paytype.length == 0){
        MessageBox.alert(`请先选择支付方式`,{
          lockScroll: false,
          showClose: false,
          confirmButtonText: '确定'
        })
        return false
      }
      //不可以只选金币
      if(paytype.join("-") == '2'){
        MessageBox.alert(`金币不可用来支付押金`,{
          lockScroll: false,
          showClose: false,
          confirmButtonText: '确定'
        })
        return false
      }
      //验证押金是否够用；
      if(paytype.join("-")=='1' && parseFloat(this.sumprice)>parseFloat(this.deposit)){
        MessageBox.alert(`押金不足，请选择其他方式`,{
          lockScroll: false,
          showClose: false,
          confirmButtonText: '确定'
        })
        return false
      }
      //验证押金金币是否够用；
      if(paytype.join("-")=='1-2'){
        if(parseFloat(this.yajinprice)>parseFloat(this.deposit)){
          MessageBox.alert(`押金不足，请选择其他方式`,{
            lockScroll: false,
            showClose: false,
            confirmButtonText: '确定'
          })
          return false
        }
        // if(parseFloat(this.jinbiprice)>parseFloat(this.money)){
        //   //押金-需付押金 小于 需付金币-金币时，就是钱不够了
        //   let a = parseFloat(this.deposit)-parseFloat(this.yajinprice)
        //   let b = parseFloat(this.jinbiprice)-parseFloat(this.money)
        //   if(a<b){
        //     MessageBox.alert(`押金、金币不足，请选择其他方式`,{
        //       lockScroll: false,
        //       showClose: false,
        //       confirmButtonText: '确定'
        //     })
        //     return false
        //   }
        // }
      }

      //遮罩层开启
      let loading = Loading.service({
        text: '支付中',
        background: 'rgba(0,0,0,.5)'
      })
      //获取数据
      let data = await this.ajax({
        url: `PublishInterface/paymentorder?tk=${sessionStorage.token}`,
        data: {paytype,orderno,datearea}
      })
      //遮罩层关闭
      loading.close()

      //待处理ajax数据
      if(!data) return false
      // 支付宝会返回快钱二维码
      if(data.data.img){
        QRCode.toDataURL(data.data.img)
        .then(url => {
          this.$confirm(`<p>需支付<span class="color-red">${data.data.money}</span>元</p><img src='${url}' width='100%' >`,`请用支付宝扫码支付`,{
            dangerouslyUseHTMLString:true,
            showClose: false,
            center: true,
            closeOnClickModal: false,
            confirmButtonClass: "cancelbtn",
            confirmButtonText: '支付完成',
            cancelButtonText: '支付遇到问题'
          })
          .then(() => {
            sessionStorage.orderno = data.data.orderno
            sessionStorage.datearea = data.data.datearea
            this.$router.push('/kuaiqianpay')
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: '请重新支付'
            })
          })
        })
        .catch(err => {
          alert(`生成支付宝失败，请重新支付`)
          console.log(err)
        })
      }else{
        MessageBox.alert(data.msg,{
          lockScroll: false,
          showClose: false,
          confirmButtonText: '支付成功',
          callback: ()=>{
            this.$store.dispatch('userInfo')
            this.$router.push(`/mytask`)
          }
        })
      }
    },
    exit(){
      // let orderno = window.btoa(this.taskid)
      // let datearea = window.btoa(this.datearea)
      sessionStorage.orderno = this.taskid
      sessionStorage.datearea = this.datearea
      if(sessionStorage.type){
        this.$router.push(`/asktask`)
      }else{
        this.$router.push(`/task`)
      }
    },
    // 押金不够去充值
    goRecharge(){
      this.$router.push(`/recharge?active=recharge-yajin`)
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/public/gopay.css';
</style>
