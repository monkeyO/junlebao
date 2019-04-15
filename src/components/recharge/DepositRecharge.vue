<template>
  <div id="deposit_recharge">
    <!-- 押金充值盒子 -->
    <div class="yjcz_box">
      <!-- 押金充值 -->
      <div class="deposit_recharge">
        <!-- 押金充值标题 -->
        <div class="title">
          <p><span>押金充值</span></p>
        </div>
        <!-- 押金充值内容 -->
        <div class="deposit_recharge_content">
          <ul>
            <!-- 充值金额 -->
            <li class="item_li">
              <span class="deposit_title">充值金额</span><el-input v-model="money" placeholder="请输入内容" class="deposit_input" @change="changeValue"></el-input>
              <p class="deposit_p">100元起充，必须为100的整数倍</p>
            </li>
            <!-- 支付方式 -->
            <li class="item_li">
              <span class="payment">支付方式</span>
              <div class="zhifubao_pay" @click="choosePay(1)" :class="paytype==1?'active_pay':''">
                <img src="@/assets/img/recharge/zhifubao_pay_img.png" alt="">
                <span>支付宝</span>
              </div>
              <!--<div class="bank_pay" @click="choosePay(4)" :class="paytype==4?'active_pay':''">-->
                <!--<img src="@/assets/img/recharge/bank_pay_img.png" alt="">-->
                <!--<span>银行卡</span>-->
              <!--</div>-->
              <!--<div class="bank_pay_information" v-if="paytype==4">-->
                <!--<p>开户名：唐晓</p>-->
                <!--<p>开户行：中国建设银行股份有限公司济南站前广场支行</p>-->
                <!--<p>账号：6217 0023 4003 2001 986</p>-->
                <!--<p style="color: #666;">支付金额：{{money}}元<span style="color: #e92725;">（实际获得{{money}}金币）</span>  </p>-->
              <!--</div>-->
              <p class="payment_p" v-if="paytype!=4">支付金额：<span>{{money}}元</span><span style="color: #e92725;">（实际获得{{money}}押金）</span></p>
            </li>
            <!-- 确认支付 -->
            <li class="item_li">
              <el-button type="danger" class="submit_btn" @click="submit">确认支付</el-button>
            </li>
          </ul>
        </div>
      </div>
      <!-- 温馨提示 -->
      <div class="warm_prompt">
        <div>
          <h3>温馨提示</h3>
          <p>1.如遇到点击确认支付没有反应，请确认您的网页是否设置了弹窗拦截。</p>
          <p>2.线下支付完成后，请提供转账截图，充值账号及时联系客服，以便能快速帮您充值。</p>
          <p>3.如果支付中遇到其他问题，请联系在线客服咨询。QQ：8888888</p>
        </div>
        <div>
          <p><span>【特别提醒】：</span>由于部分浏览器不兼容问题，因此可能会出现无法充值的情况，请更换其他浏览器比如【枫树】、【火狐】进行操作，若更换浏览器仍然不能解决问题，请联系在线客服QQ：800833972，给您带来的不便，敬请谅解。</p>
        </div>
      </div>
    </div>
    <!-- 支付宝提交 -->
    <form method="post" name="yajinform"></form>
  </div>
</template>

<script>
import {validata} from '@/assets/js/util/validata'
import {Message, Loading, MessageBox} from 'element-ui'

export default {
  name: 'DepositRecharge',
  data () {
    return {
      msg: `押金充值`,
      money: '',  //充值钱数
      paytype: 1, //1-支付宝 4-银行卡
      type: 1 //类型 1-押金
    }
  },
  methods: {
    //输入框值改变
    changeValue () {
      if(this.money % 100 != 0){
        Message({
          message: `充值金额必须为100的整数倍`,
          duration: 1500,
          type: 'error'
        })
      }
    },
    //选择支付方式
    choosePay (index) {
      this.paytype = index
    },
    async submit () {
      let money = this.money
      let type = this.type
      let paytype = this.paytype

      //需要验证的数据
      let validataArr = [
        {'val': money, 'type': 'isnull', 'name': '充值金额'}
      ]
      //如果验证不通过就return false
      if(!validata(validataArr)) return false

      if(money % 100 != 0){
        Message({
          message: `充值金额必须为100的整数倍`,
          duration: 1500,
          type: 'error'
        });
        return false
      }
      //银行卡支付
      if (paytype == 4) {
        //充值类型
        sessionStorage.rechargeType = type
        //充值金额
        sessionStorage.rechargeMoney = money
        this.$router.push('/bankpay')
      //支付宝支付
      } else {
        //遮罩层开启
        let loading = Loading.service({
          text: '支付中',
          background: 'rgba(0,0,0,.5)'
        })
        //获取数据
        let data = await this.ajax({
          url: `SellerMoneyInterface/confirmpay?tk=${sessionStorage.token}`,
          data: {type, paytype, money}
        })
        //遮罩层关闭
        loading.close()

        if(!data) return false
        if (data.state == 1) {
          //支付宝支付
          // document.yajinform.action = data.msg
          // document.yajinform.submit()
          //块钱支付
          this.$confirm(`<img src='${data.qrcode}' width='100%'>`, '请用支付宝扫码支付', {
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
              sessionStorage.type = 1
              this.$router.push('/kuaiqianpay')
            })
            .catch(action => {
              this.$message({
                type: 'info',
                message: '请重新支付'
              })
            })
        } else {
          MessageBox.alert(data.msg,{
            lockScroll: false,
            confirmButtonText: '支付成功',
            callback: ()=>{
              this.$store.dispatch('userInfo')
              this.$router.push(`/recharge`)
            }
          })
        }
      }
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/recharge/depositrecharge.css';
</style>
