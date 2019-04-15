<template>
    <div class="go_pay">
      <Header :active=5></Header>
      <div  class='box con-box w1200'>
        <div class="go_pay_box">
          <h3>1.付款信息：</h3>
          <div class="need_to_pay">
            <span>绑定/换绑店铺需支付</span>
            <span class="color-red" style="float: right;">{{useraliprice}}元</span>
          </div>
          <h3>2.请选择支付方式：</h3>
          <div class="payment">
            <el-radio v-model="paytype" label="1">
              <img src="@/assets/img/common/cash.png" alt="">
              <span>押金支付&nbsp;&nbsp;(可用押金：<span>{{deposit}}元</span>)</span>
            </el-radio>
            <!--<span style="float: right;">押金：<span style="color: #ec1213;">{{deposit}}</span>元</span>-->
          </div>
          <div class="payment">
            <el-radio v-model="paytype" label="2">
            <!-- <el-checkbox v-model="checked2"> -->
              <img src="@/assets/img/common/gold.png" alt="">
              <span>金币支付&nbsp;&nbsp;(可用金币：<span>{{money}}</span>个)</span>
            <!-- </el-checkbox> -->
            </el-radio>
            <!--<span style="float: right;">金币：<span style="color: #ec1213;">{{money}}</span>元</span>-->
          </div>
          <div class="payment">
            <el-radio v-model="paytype" label="3">
              <img src="@/assets/img/common/alipay.png" alt="">
              <span>支付宝支付</span>
            </el-radio>
          </div>
          <div class="pay_btn">
            <el-button type="danger" @click="exit()" plain>取消</el-button>
            <el-button type="danger" @click="pay()">确定</el-button>
          </div>
        </div>
      </div>
      <!-- 支付宝提交 -->
      <form method="post" name="payform"></form>
    </div>
</template>

<script>
import Header from '@/components/public/Header'
import {validata} from '@/assets/js/util/validata'
import {Loading, MessageBox} from 'element-ui'

export default {
  name: 'GoPay',
  data () {
    return {
      formAction: ``,
      shopid: ``, //店铺id
      paytype: `3`, //1-押金 2-金币 3-支付宝
      useraliprice: ``, //绑定/换绑店铺需支付金额
      deposit: ``, //押金
      money: `` //金币
    }
  },
  components: {
    Header
  },
  async mounted () {
    this.shopid = this.$route.params.id

    //获取数据
    let data = await this.ajax({
      url: `SellerAccountInterface/getusermoney?tk=${sessionStorage.token}`
    })
    if(!data) return false

    this.useraliprice = data.data.data2.alimoney
    this.deposit = data.data.data1.deposit
    this.money = data.data.data1.money
  },
  methods: {
    //支付
    async pay(){
      let paytype  = this.paytype
      let shopid = this.shopid

      //遮罩层开启
      let loading = Loading.service({
        text: '支付中',
        background: 'rgba(0,0,0,.5)'
      });
      //获取数据
      let data = await this.ajax({
        url: `SellerAccountInterface/confirmpayment?tk=${sessionStorage.token}`,
        data: {paytype,shopid}
      })
      //遮罩层关闭
      loading.close()

      //待处理ajax数据
      if(!data) return false
      if (data.state == 1) {
        //支付宝支付
        // document.payform.action = data.msg
        // document.payform.submit()
        //块钱支付
        this.$confirm(`<img src='${data.qrcode}' width='100%'>`, '押金不足, 请用支付宝扫码支付', {
          dangerouslyUseHTMLString: true,
          showClose: false,
          center: true,
          closeOnClickModal: false,
          confirmButtonClass: "cancelbtn",
          confirmButtonText: '支付完成',
          cancelButtonText: '支付遇到问题'
        })
          .then(() => {
            sessionStorage.orderno = data.orderno
            sessionStorage.type = 3
            this.$router.push('/kuaiqianpay')
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: '请重新支付'
            })
          })
      } else {
        MessageBox.alert(data.msg, {
          lockScroll: false,
          showClose: false,
          confirmButtonText: '支付成功',
          callback: () => {
            this.$store.dispatch('userInfo')
            this.$router.push(`/personal?active=shop`)
          }
        })
      }
    },
    exit(){
      this.$router.push(`/personal?active=shop`)
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/public/gopay.css';
</style>
