<template>
  <div id="gold_recharge">
    <!-- 金币充值盒子 -->
    <div class="jbcz_box">
      <!-- 充值套餐 -->
      <div class="recharge_combo">
        <!-- 充值套餐标题 -->
        <div class="title">
          <p><span>充值套餐(推荐)</span>金币为平台的虚拟货币，可用来支付任务佣金、增值服务等，不可抵用押金，不可提现</p>
        </div>
        <!-- 充值套餐内容 -->
        <div class="recharge_combo_content">
          <ul>
            <li v-for="(item,index) of priceArr" :key="index">
              <!-- 列表项内容盒子 -->
              <div class="item_div" @click="choose(index)" :class="show==index?'active_div':''">
                <!-- 赠送金币 -->
                <div class="give_gold" v-if="item.giftnum != 0">赠<span>{{item.giftnum}}</span>金币</div>
                <!-- 套餐明细 -->
                <div class="combo_detail">
                  <p><span class="color-orange">{{item.goldnum}}</span>金币</p>
                  <p><span>{{item.price}}<span style="font-size: 16px; color: #666;">元</span></span></p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 金币充值 -->
      <div class="gold_recharge">
        <!-- 金币充值标题 -->
        <div class="title">
          <p><span>金币充值</span></p>
        </div>
        <!-- 金币充值内容 -->
        <div class="gold_recharge_content">
          <ul>
            <!-- 充值金额 -->
            <li class="item_li">
              <span class="gold_title">充值金额</span>
              <el-input v-model="inputVal" placeholder="请输入内容" class="gold_input" @change="changeValue"></el-input>
              <p class="gold_p">100元起充，必须为100的整数倍</p>
            </li>
            <!-- 支付方式 -->
            <li class="item_li">
              <span class="payment">支付方式</span>
              <div class="zhifubao_pay" @click="choosePay(1)" :class="paytype==1?'active_pay':''">
                <img src="@/assets/img/recharge/zhifubao_pay_img.png" alt="">
                <span>支付宝</span>
              </div>
              <div class="yajin_pay" @click="choosePay(3)" :class="paytype==3?'active_pay':''">
                <img src="@/assets/img/recharge/yajin_pay_img.png" alt="">
                <span>押金支付</span>
              </div>
              <!--<div class="bank_pay" @click="choosePay(4)" :class="paytype==4?'active_pay':''">-->
                <!--<img src="@/assets/img/recharge/bank_pay_img.png" alt="">-->
                <!--<span>银行卡</span>-->
              <!--</div>-->
              <!-- 银行卡支付信息 -->
              <!--<div class="bank_pay_information" v-if="paytype==4">-->
                <!--<p>开户名：唐晓</p>-->
                <!--<p>开户行：中国建设银行股份有限公司济南站前广场支行</p>-->
                <!--<p>账号：6217 0023 4003 2001 986</p>-->
                <!--<p style="color: #666;">支付金额：{{money}}元<span style="color: #e92725;">（实际获得{{goldNum}}金币）</span>  </p>-->
              <!--</div>-->
              <!-- 其他支付金额信息 -->
              <p class="payment_p" v-if="paytype!=4">支付金额：<span>{{money}}元</span><span style="color: #e92725;">（实际获得{{goldNum}}金币）</span></p>
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
    <form method="post" name="jinbiform"></form>
  </div>
</template>

<script>
import {validata} from '@/assets/js/util/validata'
import {Message, Loading, MessageBox} from 'element-ui'

export default {
  name: 'GoldRecharge',
  data () {
    return {
      msg: `金币充值`,
      inputVal: '',  //输入的充值金额
      money: '',    //支付金额
      goldNum: '', //实际获得金币
      show: 0,    //默认第一个套餐被选中
      paytype: 1, //1-支付宝 3-押金支付 4-银行卡
      type: 2,    //类型 2-金币
      priceArr: [] //金币套餐基础数据
    }
  },
  async mounted () {
    //获取数据
    let data = await this.ajax({
      url: `SellerAccountInterface/getsetmeal?tk=${sessionStorage.token}`,
      needAlert: false
    })
    if(!data) return false

    this.priceArr = data.data
    //初始化金额与实际获得金币
    this.money = data.data[0].price
    this.goldNum = data.data[0].goldnum + data.data[0].giftnum
  },
  methods:{
    //选择套餐
    choose (index) {
      this.money = this.priceArr[index].price
      this.goldNum = this.priceArr[index].goldnum + this.priceArr[index].giftnum
      this.show = index
      this.inputVal = ''
    },
    //选择支付方式
    choosePay (index) {
      this.paytype = index
    },
    //输入框值改变
    changeValue () {
      if(this.inputVal%100 != 0){
        Message({
          message: `充值金额必须为100的整数倍`,
          duration: 1500,
          type: 'error'
        })
      }
      this.money = this.inputVal
      for (let i in this.priceArr) {
        if (this.priceArr[i].price == this.inputVal) {
          this.goldNum = this.priceArr[i].goldnum + this.priceArr[i].giftnum
          this.show = i
          return
        } else {
          this.goldNum = this.inputVal
          this.show = -1
        }
      }
    },
    async submit () {
      let type = this.type
      let paytype = this.paytype
      let money = this.money
      //验证输入的金额
      if(this.inputVal%100 != 0){
        Message({
          message: `充值金额必须为100的整数倍`,
          duration: 1500,
          type: 'error'
        })
        return false
      }
      //银行卡支付
      if (paytype == 4) {
        //充值类型
        sessionStorage.rechargeType = type
        //充值金额
        sessionStorage.rechargeMoney = money
        this.$router.push('/bankpay')
      //其他支付方式
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
          // document.jinbiform.action = data.msg
          // document.jinbiform.submit()
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
          MessageBox.alert(data.msg, {
            lockScroll: false,
            showClose: false,
            confirmButtonText: '支付成功',
            callback: () => {
              this.$store.dispatch('userInfo')
              this.$router.push(`/recharge`)
              this.$nextTick(() => {
                this.inputVal = ''
                this.paytype = 1
                this.show = 0
                this.money = this.priceArr[0].price
                this.goldNum = this.priceArr[0].goldnum + this.priceArr[0].giftnum
              })
            }
          })
        }
      }
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/recharge/goldrecharge.css';
</style>
